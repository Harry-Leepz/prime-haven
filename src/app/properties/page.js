import PropertyCard from "@/components/layout/PropertyCard";
import propertiesData from "@/fixtures/properties.json";

export default function PropertiesPage() {
  console.log(propertiesData);
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {propertiesData.length === 0 && <p>No properties found</p>}
        {propertiesData.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {propertiesData.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
