import Link from "next/link";

import connectDB from "../../../../config/database";

import Property from "../../../../models/Property";

import convertToObject from "@/utils/convertToObject";

import PropertyCard from "@/components/layout/PropertyCard";
import SearchForm from "@/components/propertySearch/SearchForm";
import { FaArrowLeft } from "react-icons/fa";

export default async function SearchResultsPage({
  searchParams: { location, type },
}) {
  await connectDB();

  const locationRegex = new RegExp(location, "i");

  let query = {
    $or: [
      { name: locationRegex },
      { description: locationRegex },
      { "location.street": locationRegex },
      { "location.city": locationRegex },
      { "location.state": locationRegex },
      { "location.zipcode": locationRegex },
    ],
  };

  if (type && type !== "All") {
    const typeRegex = new RegExp(type, "i");
    query.type = typeRegex;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToObject(propertiesQueryResults);

  const searchResultsHeader = (
    <h1 className='text-2xl mb-4'>
      {properties.length === 0 && "No properties found"}
      {properties.length > 0 && `Search Results Found : ${properties.length}`}
    </h1>
  );

  return (
    <>
      <section className='bg-slate-900 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-4'>
          <SearchForm />
        </div>
      </section>
      <section className='py-6 px-4 min-h-[73.2vh]'>
        <div className='max-w-sm my-6 px-6'>
          <Link
            href={"/properties"}
            className='bg-slate-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-slate-500 text-center flex items-center'
          >
            <FaArrowLeft className='mr-2' />
            View All Properties
          </Link>
        </div>
        <div className='container-xl lg:container m-auto px-6 py-6'>
          {searchResultsHeader}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
