"use client";
import { useState, useEffect } from "react";

import { useSession } from "next-auth/react";

import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";

import { toast } from "react-toastify";

import { FaBookmark } from "react-icons/fa";

export default function BookmarkButton({ property }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    checkBookmarkStatus(property._id).then((response) => {
      if (response.error) return toast.error(response.error);

      setIsBookmarked(response.isPropertyBookmarked);
      setLoading(false);
    });
  }, [userId, property._id]);

  const onClickHandler = async () => {
    if (!userId) {
      toast.error("You need to be logged in to bookmark a property");
      return;
    }

    bookmarkProperty(property._id).then((response) => {
      if (response.error) return toast.error(response.error);

      setIsBookmarked(response.isPropertyBookmarked);
      toast.success(response.message);
    });
  };

  if (loading) {
    return <p className='text-center'>Loading...</p>;
  }

  return isBookmarked ? (
    <button
      className='bg-red-700 hover:bg-red-900 text-white font-bold w-full py-4 rounded-full flex items-center justify-center gap-3'
      onClick={onClickHandler}
    >
      <FaBookmark /> Remove Bookmark
    </button>
  ) : (
    <button
      className='bg-slate-900 hover:bg-slate-950 text-white font-bold w-full py-4 rounded-full flex items-center justify-center gap-3'
      onClick={onClickHandler}
    >
      <FaBookmark /> Bookmark Property
    </button>
  );
}
