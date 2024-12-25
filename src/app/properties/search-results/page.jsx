import connectDB from "../../../../config/database";

import Property from "../../../../models/Property";

import convertToObject from "@/utils/convertToObject";

export default async function SearchResultsPage({
  searchParams: { location, type },
}) {
  console.log(location, type);
  await connectDB();

  const locationRegex = new RegExp(location, "i");

  let query = {
    $or: [
      { name: locationRegex },
      { description: locationRegex },
      { "location.street": locationRegex },
      { "location.city": locationRegex },
      { "location.state": locationRegex },
      { "location.zipcode": locationRegex },
    ],
  };

  if (type && type !== "All") {
    const typeRegex = new RegExp(type, "i");
    query.type = typeRegex;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToObject(propertiesQueryResults);
  console.log(properties);

  return <div>page</div>;
}
