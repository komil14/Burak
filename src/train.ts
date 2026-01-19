/**
ZS-TASK

Shunday function yozing, u parametridagi arrayni ichidagi 1 marta kelgan elemnetni qaytarsin. MASALAN: singleNumber([4, 2, 1, 2, 1]) return 4.

@MITASK
 */

function singleNumber(nums: number[]): number {
    const numCount: { [key: number]: number } = {};

    for (const num of nums) {
        if (numCount[num]) {
            numCount[num]++;
        } else {
            numCount[num] = 1;
        }
    }

    for (const num in numCount) {
        if (numCount[num] === 1) {
            return parseInt(num);
        }
    }

    throw new Error("No single number found");
}

console.log(singleNumber([4, 2, 1, 2, 1]));