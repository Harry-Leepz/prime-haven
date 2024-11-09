"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import cloudinary from "../../../config/cloudinary";

import connectDB from "../../../config/database";
import Property from "../../../models/Property";

import { getSessionUser } from "@/utils/getSessionUser";

const addProperty = async (formData) => {
  await connectDB();
  const user = await getSessionUser();

  if (!user || !user.userId) {
    throw new Error("User ID is required!");
  }

  const { userId } = user;

  const amenities = formData.getAll("amenities");
  const images = formData.getAll("images").filter((image) => image.name !== "");

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
    amenities,
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

  // Upload images to Cloudinary
  const imageUrls = [];
  for (const image of images) {
    const imageBuffer = await image.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // convert image to base64
    const base64 = imageData.toString("base64");
    // make request to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64}`,
      { folder: "primehaven" }
    );
    imageUrls.push(result.secure_url);
  }

  property.images = imageUrls;

  const newProperty = new Property(property);
  await newProperty.save();

  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
};

export default addProperty;
