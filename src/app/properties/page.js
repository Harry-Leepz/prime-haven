import PaginationControls from "@/components/pagination/PaginationControls";
import connectDB from "../../../config/database";
import Property from "../../../models/Property";

import PropertyCard from "@/components/layout/PropertyCard";

export default async function PropertiesPage({
  searchParams: { page = 1, pageSize = 6 },
}) {
  await connectDB();

  // pagination logic
  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});

  const properties = await Property.find({}).skip(skip).limit(pageSize);

  const showPagination = total > pageSize;

  return (
    <section className='px-4 py-6 min-h-[81vh]'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 && <p>No properties found</p>}
        {properties.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
      {showPagination && (
        <PaginationControls
          page={parseInt(page)}
          pageSize={parseInt(pageSize)}
          total={parseInt(total)}
        />
      )}
    </section>
  );
}
