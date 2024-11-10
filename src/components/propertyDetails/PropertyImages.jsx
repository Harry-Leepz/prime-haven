import Image from "next/image";

export default function PropertyImages({ images }) {
  return (
    <section className='bg-slate-100 p-4'>
      <div className='container m-auto'>
        {images.length === 1 && (
          <Image
            src={images[0]}
            alt='Property Image'
            className='object-cover h-[400px] mx-auto rounded-xl'
            width={1800}
            height={400}
            priority
          />
        )}
        {images.length > 1 && (
          <div className='grid grid-cols-2 gap-4'>
            {images.map((image, index) => (
              <div
                key={index}
                className={`${
                  images.length === 3 && index === 2
                    ? "col-span-2"
                    : "col-span-1"
                }`}
              >
                <Image
                  src={image}
                  alt='Property Image'
                  className='object-cover h-[400px] w-full rounded-xl'
                  width={1800}
                  height={400}
                  priority
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
