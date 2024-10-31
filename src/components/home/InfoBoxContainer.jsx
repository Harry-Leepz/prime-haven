import InfoBox from "./InfoBox";

export default function InfoBoxContainer() {
  return (
    <section>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <InfoBox
            title={"For Renters"}
            description={
              "Find your dream rental property. Bookmark properties and contact owners."
            }
            linkText={"Browse Properties"}
            linkUrl={"/properties"}
            backgroundColor={"bg-gray-100"}
          />
          <InfoBox
            title={"For Property Owners"}
            description={`List your properties and reach potential tenants. Rent as an
              airbnb or long term.`}
            linkText={"Add Property"}
            linkUrl={"/properties/add"}
            backgroundColor={"bg-blue-100"}
          />
        </div>
      </div>
    </section>
  );
}
