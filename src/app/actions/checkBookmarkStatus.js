"use server";

import connectDB from "../../../config/database";
import User from "../../../models/User";

import { getSessionUser } from "@/utils/getSessionUser";

export default async function checkBookmarkStatus(propertyId) {
  await connectDB();

  const sessionsUser = await getSessionUser();

  if (!sessionsUser || !sessionsUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionsUser;

  const user = await User.findById(userId);

  let isPropertyBookmarked = user.bookmarks.includes(propertyId);

  return { isPropertyBookmarked };
}
