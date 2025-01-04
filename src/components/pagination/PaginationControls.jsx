import Link from "next/link";

export default function PaginationControls({ page, pageSize, total }) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <section className='container mx-auto flex justify-center items-center my-8'>
      {page > 1 && (
        <Link
          href={`/properties?page=${page - 1}`}
          className='mr-2 px-2 py-1 border border-slate-900 rounded'
        >
          Previous
        </Link>
      )}

      <span className='mx-2'>
        Page {page} of {totalPages}
      </span>

      {page < totalPages && (
        <Link
          href={`/properties?page=${page + 1}`}
          className='ml-2 px-2 py-1 border border-slate-900 rounded'
        >
          Next
        </Link>
      )}
    </section>
  );
}
