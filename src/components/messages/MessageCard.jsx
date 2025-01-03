"use client";

import { useState } from "react";

import { toast } from "react-toastify";

import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";

import { useMessageContext } from "@/context/MessageContext";

export default function MessageCard({ message }) {
  const [isRead, setIsRead] = useState(message.read);

  const { setUnreadMessageCount } = useMessageContext();

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);
    setIsRead(read);
    setUnreadMessageCount((prevCount) =>
      read ? prevCount - 1 : prevCount + 1
    );
    toast.success(`Message marked as ${read ? "read" : "unread"}`);
  };

  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setUnreadMessageCount((prevCount) => (isRead ? prevCount : prevCount - 1));
    toast.success("Message Deleted Successfully");
  };

  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border border-slate-200'>
      {!isRead && (
        <div className='absolute top-2 right-2 bg-yellow-500 text-white py-1 px-2 rounded-tl-md rounded-br-md'>
          New
        </div>
      )}
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Property Inquiry: </span>
        {message.property.name}
      </h2>
      <p className='text-slate-700'>{message.body}</p>

      <ul className='mt-4'>
        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className='text-blue-400'>
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className='text-blue-400'>
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {new Date(message.createdAt).toLocaleString("en-GB", {
            timeZone: "UTC",
          })}
        </li>
      </ul>

      <button
        className='mt-4 mr-3 bg-slate-900 text-white py-1 px-3 rounded-md'
        onClick={handleReadClick}
      >
        {isRead ? "Mark as Unread" : "Mark as Read"}
      </button>
      <button
        className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </div>
  );
}
