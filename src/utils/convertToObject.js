// This function converts MongoDB lean documents to regular JavaScript objects
export default function convertToObject(leanDocuments) {
  // Iterate over each key in the leanDocuments object
  for (const key of Object.keys(leanDocuments)) {
    // Check if the value at the current key has a toJSON method and a toString method
    // This is often true for MongoDB document fields like ObjectIds and Dates
    if (leanDocuments[key].toJSON && leanDocuments[key].toString) {
      // Convert the value to a string using toString() and reassign it to the same key
      // This step is usually done to ensure that non-primitive values (like ObjectIds)
      // are represented as strings, making them easier to work with in regular objects
      leanDocuments[key] = leanDocuments[key].toString();
    }
  }

  // Return the modified leanDocuments object with all applicable values converted to strings
  return leanDocuments;
}
