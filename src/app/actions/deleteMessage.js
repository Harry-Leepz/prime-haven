"use server";

import { revalidatePath } from "next/cache";

import connectDB from "../../../config/database";
import Message from "../../../models/Message";

import { getSessionUser } from "@/utils/getSessionUser";

export default async function deleteMessage(messageId) {
  await connectDB();

  const sessionsUser = await getSessionUser();

  if (!sessionsUser || !sessionsUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionsUser;

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error("Message not found");
  }

  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  await message.deleteOne();

  revalidatePath("/messages", "page");
}
