import connectDB from "../../../config/database";
import Property from "../../../models/Property";

import PropertyCard from "@/components/layout/PropertyCard";

export default async function PropertiesPage() {
  await connectDB();
  const properties = await Property.find({}).lean();

  return (
    <section className='px-4 py-6'>
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
    </section>
  );
}
