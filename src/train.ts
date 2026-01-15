/**
 

Shunday function yozing, u 2 ta array parametr qabul qilsin.
Siz bu ikki arrayning qiymatlari o'xshash bo'lishini 
(ya'ni, ularning barcha elementlari bir xil bo'lishini) tekshirishingiz kerak.

MASALAN:
areArraysEqual([1, 2, 3], [3, 1, 2]) // true

 */

function areArraysEqual(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
        return false;
    }

    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();

    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    return true;
}

console.log(areArraysEqual([1, 2, 3], [3, 1, 2])); // true
console.log(areArraysEqual([1, 2, 2], [2, 1, 1])); // false
console.log(areArraysEqual(['a', 'b', 'c'], ['c', 'b', 'a'])); // true
console.log(areArraysEqual([1, 2, 3], [4, 5, 6])); // false