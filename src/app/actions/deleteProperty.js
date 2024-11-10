"use server";

import { revalidatePath } from "next/cache";

import cloudinary from "../../../config/cloudinary";
import connectDB from "../../../config/database";
import Property from "../../../models/Property";

import { getSessionUser } from "@/utils/getSessionUser";

export default async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("You need to be logged in to delete a property");
  }

  const { userId } = sessionUser;

  await connectDB();
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error("Property not found");
  }

  if (property.owner.toString() !== userId) {
    throw new Error("You are not the owner of this property");
  }

  // Delete the images from Cloudinary
  // extract the pulic id for the images
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });
  if (publicIds.length > 0) {
    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy("primehaven/" + publicId);
    }
  }

  await property.deleteOne();
  revalidatePath("/", "layout");
}
