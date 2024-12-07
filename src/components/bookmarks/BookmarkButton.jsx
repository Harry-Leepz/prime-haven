import { FaBookmark } from "react-icons/fa";

export default function BookmarkButton({ property }) {
  return (
    <button className='bg-slate-900 hover:bg-slate-950 text-white font-bold w-full py-4 rounded-full flex items-center justify-center gap-3'>
      <FaBookmark /> Bookmark Property
    </button>
  );
}
