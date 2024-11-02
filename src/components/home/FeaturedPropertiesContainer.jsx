import Link from "next/link";

import PropertyCard from "@/components/layout/PropertyCard";
import propertiesData from "@/fixtures/properties.json";

export default function FeaturedPropertiesContainer() {
  const recentProperties = propertiesData.slice(0, 3);

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h2 className='text-3xl font-bold text-slate-700 mb-6 text-center'>
            Recent Properties
          </h2>
          {propertiesData.length === 0 && <p>No properties found</p>}
          {recentProperties.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className='m-auto max-w-lg my-6 px-6'>
        <Link
          href={"/properties"}
          className='block bg-slate-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-slate-500 text-center'
        >
          View All Properties
        </Link>
      </section>
    </>
  );
}
