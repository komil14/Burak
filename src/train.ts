//V TASK 
function countChars(str) {
  const result = {};

  for (let char of str) {
    if (result[char]) {
      result[char]++; 
    } else {
      result[char] = 1;
    }
  }

  return result;
}

console.log(countChars("hello")); 


// U-TASK:
function sumOdds(num: number): number {
    let count = 0;
    for (let i = 0; i < num; i++) {
        if (i % 2 !== 0) {
            count++;
        }
    }
    return count;
}

//console.log(sumOdds(9));


// // S-TASK:

// function missingNumber(nums: number[]): number {
//     const n = nums.length;
//     const expectedSum = (n * (n + 1)) / 2;
//     const actualSum = nums.reduce((acc, curr) => acc + curr, 0);
//     return expectedSum - actualSum;
// }

// console.log(missingNumber([3, 0, 1])); // 2
// console.log(missingNumber([0, 1]));    // 2
// console.log(missingNumber([9,6,4,2,3,5,7,0,1])); // 8


// T-TASK:

// function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {
//     const mergedArray: number[] = [];
//     let i = 0;
//     let j = 0;

//     while (i < arr1.length && j < arr2.length) {
//         if (arr1[i] < arr2[j]) {
//             mergedArray.push(arr1[i]);
//             i++;
//         } else {
//             mergedArray.push(arr2[j]);
//             j++;
//         }
//     }

//     while (i < arr1.length) {
//         mergedArray.push(arr1[i]);
//         i++;
//     }

//     while (j < arr2.length) {
//         mergedArray.push(arr2[j]);
//         j++;
//     }

//     return mergedArray;
// }

// console.log(mergeSortedArrays([0,3,4,31], [4,6,30]));
// console.log(mergeSortedArrays([1,5,9], [2,6,8]));
