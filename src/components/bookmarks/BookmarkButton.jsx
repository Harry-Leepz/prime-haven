"use client";
import { useSession } from "next-auth/react";

import bookmarkProperty from "@/app/actions/bookmarkProperty";

import { toast } from "react-toastify";

import { FaBookmark } from "react-icons/fa";

export default function BookmarkButton({ property }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const onClickHandler = async () => {
    if (!userId) {
      toast.error("You need to be logged in to bookmark a property");
      return;
    }

    bookmarkProperty(property._id).then((response) => {
      if (response.error) return toast.error(response.error);

      toast.success(response.message);
    });
  };

  return (
    <button
      className='bg-slate-900 hover:bg-slate-950 text-white font-bold w-full py-4 rounded-full flex items-center justify-center gap-3'
      onClick={onClickHandler}
    >
      <FaBookmark /> Bookmark Property
    </button>
  );
}
