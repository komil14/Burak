
export function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chunked = chunkArray(testArray, 3);
console.log(chunked);
