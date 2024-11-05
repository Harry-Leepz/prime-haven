import {
  FaBath,
  FaBed,
  FaCheck,
  FaMapMarker,
  FaRulerCombined,
  FaTimes,
} from "react-icons/fa";

export default function PropertyInformation({ property }) {
  const {
    type,
    name,
    location,
    rates,
    beds,
    baths,
    square_feet,
    description,
    amenities,
  } = property;

  return (
    <main>
      <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
        <div className='text-gray-500 mb-4'>{type}</div>
        <h1 className='text-3xl font-bold mb-4'>{name}</h1>
        <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
          <FaMapMarker className='fa-solid fa-location-dot text-lg text-orange-700 mr-2' />
          <p className='text-orange-700'>
            {`${location.street} ${location.city}, ${location.state} ${location.zipcode}`}
          </p>
        </div>

        <h3 className='text-lg font-bold my-6 bg-gray-800 text-white p-2'>
          Rates & Options
        </h3>
        <div className='flex flex-col md:flex-row justify-around'>
          <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 font-bold'>Nightly</div>
            <div className='text-2xl font-bold'>
              {rates.nightly ? (
                `$${rates.nightly.toLocaleString()}`
              ) : (
                <FaTimes className='text-red-700 mr-2' />
              )}
            </div>
          </div>
          <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 font-bold'>Weekly</div>
            <div className='text-2xl font-bold'>
              {rates.weekly ? (
                `$${rates.weekly.toLocaleString()}`
              ) : (
                <FaTimes className='text-red-700 mr-2' />
              )}
            </div>
          </div>
          <div className='flex items-center justify-center mb-4 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 font-bold'>Monthly</div>
            <div className='text-2xl font-bold'>
              {rates.monthly ? (
                `$${rates.monthly.toLocaleString()}`
              ) : (
                <FaTimes className='text-red-700 mr-2' />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <h3 className='text-lg font-bold mb-6'>Description & Details</h3>
        <div className='flex justify-center gap-4 text-slate-900 mb-4 text-xl space-x-9'>
          <p>
            <FaBed className='hidden sm:inline mr-2' />
            <span className='sm:inline font-bold'>
              {beds > 1 ? `${beds} Beds` : `${beds} Bed`}
            </span>
          </p>
          <p>
            <FaBath className='hidden sm:inline mr-2' />
            <span className=' sm:inline font-bold'>
              {baths > 1 ? `${baths} Baths` : `${baths} Bath`}
            </span>
          </p>
          <p>
            <FaRulerCombined className='hidden sm:inline mr-2' />
            <span className=' sm:inline font-bold'>{square_feet} sqft</span>
          </p>
        </div>
        <p className='text-gray-500 mb-4 font-light'>
          {description ? description : "No description available."}
        </p>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <h3 className='text-lg font-bold mb-6'>Amenities</h3>

        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none'>
          {amenities.map((amenity, index) => (
            <li key={index}>
              <FaCheck className=' text-green-600 mr-3 inline-block' />
              {amenity}
            </li>
          ))}
        </ul>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <div id='map'>Map feature coming soon! Check back later.</div>
      </div>
    </main>
  );
}
