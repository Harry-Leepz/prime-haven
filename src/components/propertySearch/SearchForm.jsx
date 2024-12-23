"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function SearchForm() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("All");

  const router = useRouter();

  const propertyTypes = [
    "All",
    "Apartment",
    "Studio",
    "Condo",
    "House",
    "Cabin Or Cottage",
    "Loft",
    "Room",
    "Other",
  ];

  const onSubmithandler = (e) => {
    e.preventDefault();

    if (location.trim() === "" && type === "All") {
      router.push("/properties");
    } else {
      const query = `?location=${location}&type=${type}`;
      router.push(`/properties/search-results${query}`);
    }
  };

  return (
    <form
      onSubmit={onSubmithandler}
      className='mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'
    >
      <div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
        <label htmlFor='location' className='sr-only'>
          Location
        </label>
        <input
          type='text'
          id='location'
          placeholder='Enter Location (City, State, Zip, etc)'
          className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-slate-500'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className='w-full md:w-2/5 md:pl-2'>
        <label htmlFor='property-type' className='sr-only'>
          Property Type
        </label>
        <select
          id='property-type'
          className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-slate-500'
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {propertyTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <button
        type='submit'
        className='md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-slate-700 text-white hover:bg-slate-500 focus:outline-none focus:ring focus:ring-slate-500'
      >
        Search
      </button>
    </form>
  );
}
