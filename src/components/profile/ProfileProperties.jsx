"use client";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { toast } from "react-toastify";

import deleteProperty from "@/app/actions/deleteProperty";

export default function ProfileProperties({ properties: initialProperties }) {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteClick = async (propertyId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirm) return;

    await deleteProperty(propertyId);
    const updatedProperties = properties.filter(
      (property) => property._id !== propertyId
    );
    setProperties(updatedProperties);

    toast.success("Property deleted successfully");
  };

  return properties.map((property) => (
    <div className='mb-10' key={property._id}>
      <Link href={`properties/${property._id}`}>
        <Image
          className='h-32 w-full rounded-md object-cover'
          src={property.images[0]}
          alt='Property Image'
          height={800}
          width={800}
        />
      </Link>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>{property.name}</p>
        <p className='text-gray-600'>
          Address: {property.location.street}, {property.location.city},{" "}
          {property.location.state} {property.location.zipcode}
        </p>
      </div>
      <div className='mt-2'>
        <Link
          href={`properties/${property._id}/edit`}
          className='bg-slate-900 text-white px-3 py-3 rounded-md mr-2 hover:bg-slate-600'
        >
          Edit
        </Link>
        <button
          className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
          type='button'
          onClick={() => handleDeleteClick(property._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
}
