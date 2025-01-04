"use server";

import connectDB from "../../../config/database";

import Message from "../../../models/Message";

import { getSessionUser } from "@/utils/getSessionUser";

export default async function getUnreadMessageCount() {
  await connectDB();

  const sessionsUser = await getSessionUser();

  if (!sessionsUser || !sessionsUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionsUser;

  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return count;
}
