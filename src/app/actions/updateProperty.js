"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import connectDB from "../../../config/database";
import Property from "../../../models/Property";

import { getSessionUser } from "@/utils/getSessionUser";

export default async function updateProperty(propertyId, formData) {
  await connectDB();
  const user = await getSessionUser();

  if (!user || !user.userId) {
    throw new Error("User ID is required!");
  }

  const { userId } = user;

  // Check if the property exists and belongs to the user
  const existingProperty = await Property.findById(propertyId);

  if (!existingProperty) {
    throw new Error("Property not found!");
  }

  if (existingProperty.owner.toString() !== userId) {
    throw new Error(
      "You do not have permission to make changes to this property!"
    );
  }

  const property = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: formData.getAll("amenities"),
    rates: {
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
      nightly: formData.get("rates.nightly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    property
  );

  if (!updatedProperty) {
    throw new Error("Failed to update property!");
  }

  revalidatePath("/", "layout");
  redirect(`/properties/${updatedProperty._id}`);
}
