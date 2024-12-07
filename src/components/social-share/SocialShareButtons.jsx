import { FaShare } from "react-icons/fa";

export default function SocialShareButtons({ property }) {
  return (
    <button className='bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-4 rounded-full flex items-center justify-center gap-3'>
      <FaShare /> Share Property
    </button>
  );
}
