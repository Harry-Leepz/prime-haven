"use server";

import { revalidatePath } from "next/cache";

import connectDB from "../../../config/database";
import User from "../../../models/User";

import { getSessionUser } from "@/utils/getSessionUser";

export default async function bookmarkProperty(propertyId) {
  await connectDB();

  const sessionsUser = await getSessionUser();

  if (!sessionsUser || !sessionsUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionsUser;

  const user = await User.findById(userId);

  let isPropertyBookmarked = user.bookmarks.includes(propertyId);

  let message;

  if (isPropertyBookmarked) {
    user.bookmarks.pull(propertyId);
    message = "Property removed from bookmarks";
    isPropertyBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    message = "Property added to bookmarks";
    isPropertyBookmarked = true;
  }

  await user.save();
  revalidatePath("/properties/saved", "page");

  return { message, isPropertyBookmarked };
}
