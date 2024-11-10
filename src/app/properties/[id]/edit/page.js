import connectDB from "../../../../../config/database";
import Property from "../../../../../models/Property";

import convertToObject from "@/utils/convertToObject";

import EditPropertyForm from "@/components/edit/EditPropertyForm";

export default async function EditPage({ params }) {
  await connectDB();

  const propertyDocument = await Property.findById(params.id).lean();
  const property = convertToObject(propertyDocument);

  if (!property) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }

  return (
    <section className='bg-slate-100'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <EditPropertyForm property={property} />
        </div>
      </div>
    </section>
  );
}
