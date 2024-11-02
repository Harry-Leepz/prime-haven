import PropertyCardSkeleton from "@/components/skeletons/PropertyCardSkeleton";

export default function Loading() {
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {Array.from({ length: 9 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
