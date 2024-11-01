import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <footer className='bg-slate-900 py-4 mt-24'>
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between px-4'>
        <div className='mb-4 md:mb-0'>
          <Image
            width={32}
            height={32}
            className='h-8 w-auto'
            src='/images/logo-white.png'
            alt='Prime Haven Logo'
          />
        </div>
        <div className='flex flex-wrap justify-center md:justify-start mb-4 md:mb-0 text-white'>
          <ul className='flex space-x-4'>
            <li>
              <Link href='/properties'>Properties</Link>
            </li>
            <li>
              <Link href='/terms'>Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className='text-sm text-white mt-2 md:mt-0'>
            &copy; {currentYear} Prime Haven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
