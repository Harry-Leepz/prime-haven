import Image from "next/image";

import connectDB from "../../../config/database";
import Property from "../../../models/Property";

import { getSessionUser } from "@/utils/getSessionUser";

export default async function ProfilePage() {
  await connectDB();

  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;
  if (!userId) {
    throw new Error("You need to be logged in to view this page");
  }

  const properties = await Property.find({ user: userId }).lean();
  console.log(properties);

  return (
    <section className='bg-slate-100 min-h-[83vh]'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                <Image
                  className='h-32 w-32 md:h-48 md:w-48 rounded-md mx-auto md:mx-0 border-4 border-slate-900'
                  src={sessionUser.user.image || "/images/profile.png"}
                  alt='User Profile Image'
                  width={200}
                  height={200}
                />
              </div>

              <h2 className='text-2xl mb-4'>
                <span className='font-bold block'>Name: </span>{" "}
                {sessionUser.user.name}
              </h2>
              <h2 className='text-2xl'>
                <span className='font-bold block'>Email: </span>{" "}
                {sessionUser.user.email}
              </h2>
            </div>

            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>

              <div className='mb-10'>
                <a href='/property.html'>
                  <Image
                    className='h-32 w-full rounded-md object-cover'
                    src='/images/properties/b1.jpg'
                    alt='Property 2'
                    height={800}
                    width={800}
                  />
                </a>
                <div className='mt-2'>
                  <p className='text-lg font-semibold'>Property Title 2</p>
                  <p className='text-gray-600'>Address: 456 Elm St</p>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
