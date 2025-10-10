
// TASK G:
function getHighestIndex(arr: number[]): number {
  let highest = -Infinity;
  let highestIndex = -1;

  arr.forEach((num, index) => {
    if (num > highest) {
      highest = num;
      highestIndex = index;
    }
  });

  return highestIndex;
}

// Test cases
console.log(getHighestIndex([5, 21, 12, 21, 8])); 
console.log(getHighestIndex([-10, -20, -5, -15]));
console.log(getHighestIndex([1, 2, 3, 4, 5]));