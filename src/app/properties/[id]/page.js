import Link from "next/link";

import { FaArrowLeft } from "react-icons/fa";

import connectDB from "../../../../config/database";
import Property from "../../../../models/Property";

import PropertyHeaderImage from "@/components/propertyDetails/PropertyHeaderImage";
import PropertyInformation from "@/components/propertyDetails/PropertyInformation";
import PropertyImages from "@/components/propertyDetails/PropertyImages";

export default async function PropertyDetailsPage({ params }) {
  await connectDB();
  const property = await Property.findById(params.id).lean();

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} alt={property.name} />

      <section className='max-w-sm my-6 px-6'>
        <Link
          href={"/properties"}
          className='bg-slate-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-slate-500 text-center flex items-center'
        >
          <FaArrowLeft className='mr-2' />
          View All Properties
        </Link>
      </section>

      <section className='bg-slate-100'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            {/* Property Info section goes here */}
            <PropertyInformation property={property} />
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
}
