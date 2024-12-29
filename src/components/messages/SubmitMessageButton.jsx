import { useFormStatus } from "react-dom";

import { FaPaperPlane } from "react-icons/fa";

export default function SubmitMessageButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className='bg-slate-800 hover:bg-slate-950 text-white font-bold py-3 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center gap-3'
      type='submit'
      disabled={pending}
    >
      <FaPaperPlane />
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}
