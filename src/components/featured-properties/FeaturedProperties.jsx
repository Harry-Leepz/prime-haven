import connectDB from "../../../config/database";

import Property from "../../../models/Property";

export default async function FeaturedProperties() {
  await connectDB();

  const properties = await Property.find({
    is_featured: true,
  }).lean();

  return properties.length > 0 ? (
    <section className='px-4 pt-6 pb-10 bg-slate-200'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-slate-700 mb-6 text-center'>
          Featured Properties
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {properties.map((property) => (
            <div key={property._id}>
              <h2>{property.name}</h2>
              <p>{property.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null;
}
