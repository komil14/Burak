/*
TASK ZJ:

Shunday function yozing, u berilgan array ichidagi
raqamlarni qiymatini hisoblab qaytarsin.

MASALAN: reduceNestedArray([1, [1, 2, [4]]]); return 8;
*/

function reduceNestedArray(arr: any[]): number {
  let sum = 0;

  function helper(subArr: any[]) {
    for (const item of subArr) {
      if (Array.isArray(item)) {
        helper(item);
      } else if (typeof item === 'number') {
        sum += item;
      }
    }
  }

  helper(arr);
  return sum;
}

// Misol uchun
console.log(reduceNestedArray([1, [1, 2, [4]]])); // 8
console.log(reduceNestedArray([[[5]], 3, [2, [1]]])); // 11
console.log(reduceNestedArray([10, [20, [30, [40]]]])); // 100