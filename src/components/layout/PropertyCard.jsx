import Image from "next/image";
import Link from "next/link";

import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";

export default function PropertyCard({ property }) {
  const { images, name, rates, beds, baths, square_feet, location, type } =
    property;

  const getPriceForDisplay = (rates) => {
    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `$${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `$${rates.nightly.toLocaleString()}/night`;
    }
  };

  const arrayOfAvailableRates = Object.keys(rates)
    .filter((rate) => rates[rate] !== null)
    .map((rate) => rate.charAt(0).toUpperCase() + rate.slice(1));

  return (
    <div className='rounded-xl shadow-md relative'>
      <Image
        src={images[0]}
        width={0}
        height={0}
        sizes='100vw'
        alt={name}
        className='w-full h-auto rounded-t-xl'
      />
      <div className='p-4'>
        <div className='text-left md:text-center lg:text-left mb-6'>
          <div className='text-gray-600'>{type}</div>
          <h3 className='text-xl font-bold'>{name}</h3>
        </div>
        <h3 className='absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-slate-900 font-bold text-right md:text-center lg:text-right'>
          {getPriceForDisplay(rates)}
        </h3>

        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className='md:hidden lg:inline' /> {beds}
            <span className='md:hidden lg:inline'>Beds</span>
          </p>
          <p>
            <FaBath className='md:hidden lg:inline' /> {baths}
            <span className='md:hidden lg:inline'>Baths</span>
          </p>
          <p>
            <FaRulerCombined className='md:hidden lg:inline' />
            {square_feet} <span className='md:hidden lg:inline'>sqft</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          {arrayOfAvailableRates.map((rate) => (
            <p key={rate}>
              <FaMoneyBill className='md:hidden lg:inline' /> {rate}
            </p>
          ))}
        </div>

        <div className='border border-slate-500 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarker className='fa-solid fa-location-dot text-lg text-orange-700' />
            <span className='text-orange-700'>
              {location.city} {location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className='h-[36px] bg-slate-900 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
