"use client";
import { useState } from "react";

import Image from "next/image";

export default function ProfileProperties({ properties: initialProperties }) {
  const [properties, setProperties] = useState(initialProperties);
  return properties.map((property) => (
    <div className='mb-10' key={property._id}>
      <a href='/property.html'>
        <Image
          className='h-32 w-full rounded-md object-cover'
          src={property.images[0]}
          alt='Property Image'
          height={800}
          width={800}
        />
      </a>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>{property.name}</p>
        <p className='text-gray-600'>
          Address: {property.location.street}, {property.location.city},{" "}
          {property.location.state} {property.location.zipcode}
        </p>
      </div>
      <div className='mt-2'>
        <a
          href='/add-property.html'
          className='bg-slate-900 text-white px-3 py-3 rounded-md mr-2 hover:bg-slate-600'
        >
          Edit
        </a>
        <button
          className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
          type='button'
        >
          Delete
        </button>
      </div>
    </div>
  ));
}
