/**
 * This function splits an array into a number of sub arrays.
 */
function splitArray(numbers, noOfArrays) {
  const size = numbers.length / noOfArrays;
  const results = [];
  for (let i = 0; i < numbers.length; i += size) {
    const batch = numbers.slice(i, i + size);
    results.push(batch);
  }
  console.log("Results:", results);
  return results;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const noOfArrays = 3;
splitArray(numbers, noOfArrays);
