import Link from "next/link";

export default function InfoBox({
  title,
  description,
  linkText,
  linkUrl,
  backgroundColor,
}) {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <p className='mt-2 mb-4'>{description}</p>
      <Link
        href={linkUrl}
        className={`inline-block bg-slate-900 text-white rounded-lg px-4 py-2 hover:bg-gray-500`}
      >
        {linkText}
      </Link>
    </div>
  );
}
