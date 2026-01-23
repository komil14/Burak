/**
ZU-TASK

Shunday function yozing, u parametridagi array ichida takrorlanmagan raqamlar yig'indisini qaytarsin. MASALAN: sumOfUnique([1,2,3,2]) return 4.

@MITASK
 */

function sumOfUnique(arr: number[]): number {
    const numCount: { [key: number]: number } = {};
    let sum = 0;

    for (const num of arr) {
        if (numCount[num]) {
            numCount[num]++;
        } else {
            numCount[num] = 1;
        }
    }

    for (const num in numCount) {
        if (numCount[num] === 1) {
            sum += parseInt(num);
        }
    }

    return sum;
}

console.log(sumOfUnique([1, 2, 3, 2]));
console.log(sumOfUnique([4, 5, 6, 5, 4, 7]));