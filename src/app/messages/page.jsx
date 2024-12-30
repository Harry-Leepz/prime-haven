import connectDB from "../../../config/database";

import Message from "../../../models/Message";
import Property from "../../../models/Property";

import { getSessionUser } from "@/utils/getSessionUser";

import convertToObject from "@/utils/convertToObject";

export default async function MessagesPage() {
  await connectDB();

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const allMessages = [...readMessages, ...unreadMessages].map((messageDoc) => {
    const message = convertToObject(messageDoc);
    message.sender = convertToObject(message.sender);
    message.property = convertToObject(message.property);
    return message;
  });

  return (
    <section className='bg-slate-100 '>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>
          <div className='space-y-4'>
            {allMessages.length === 0 && (
              <p className='text-center text-xl'>No messages found.</p>
            )}
            {allMessages.map((message) => (
              <h3 key={message._id}>{message.name}</h3>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
