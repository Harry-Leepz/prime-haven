import Image from "next/image";
import Link from "next/link";

import {
  FaBed,
  FaBath,
  FaMapMarker,
  FaMoneyBill,
  FaRulerCombined,
} from "react-icons/fa";

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
            <FeaturedPropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  ) : null;
}

function FeaturedPropertyCard({ property }) {
  const getPriceForDisplay = (rates) => {
    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `$${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `$${rates.nightly.toLocaleString()}/night`;
    }
  };

  const arrayOfAvailableRates = Object.keys(property.rates)
    .filter((rate) => property.rates[rate] !== null)
    .map((rate) => rate.charAt(0).toUpperCase() + rate.slice(1));

  return (
    <div className='bg-white rounded-xl shadow-md relative flex flex-col md:flex-row'>
      <Image
        src={property.images[0]}
        alt={property.name}
        className='w-full h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl md:w-2/5'
        width={0}
        height={0}
        sizes='100vw'
      />
      <div className='p-6'>
        <h3 className='text-xl font-bold'>Seaside Retreat</h3>
        <div className='text-gray-600 mb-4'>Condo</div>
        <h3 className='absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-slate-950 font-bold text-right md:text-center lg:text-right'>
          {getPriceForDisplay(property.rates)}
        </h3>
        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className='md:hidden lg:inline' />
            <span className='md:hidden lg:inline'> {property.beds} Beds</span>
          </p>
          <p>
            <FaBath className='md:hidden lg:inline' />
            <span className='md:hidden lg:inline'> {property.baths} Baths</span>
          </p>
          <p>
            <FaRulerCombined className='md:hidden lg:inline' />
            <span className='md:hidden lg:inline'>
              {" "}
              {property.square_feet} sqft
            </span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          {arrayOfAvailableRates.map((rate) => (
            <p key={rate}>
              <FaMoneyBill className='md:hidden lg:inline' /> {rate}
            </p>
          ))}
        </div>

        <div className='border border-gray-200 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarker className=' text-orange-700' />
            <span className='text-orange-700'>
              {" "}
              {property.location.city} {property.location.state}
            </span>
          </div>
          <Link
            href={`properties/${property._id}`}
            className='h-[36px] bg-slate-900 hover:bg-slate-950 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
