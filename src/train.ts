/**
ZV-TASK

Shunday function yozing, u parametridagi array ichidagi barcha nollarni array oxiriga qoyib qolgan raqamlar ketma-ketligini saqlasin. MASALAN: moveZeroes([0, 1, 0, 3, 12]) return [1, 3, 12, 0, 0].

@MITASK
 */

function moveZeroes(nums: number[]): number[] {
    let nonZeroIndex = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[nonZeroIndex] = nums[i];
            nonZeroIndex++;
        }
    }   
    for (let i = nonZeroIndex; i < nums.length; i++) {
        nums[i] = 0;
    }
    return nums;
}   
console.log(moveZeroes([0, 1, 0, 3, 12])); 
console.log(moveZeroes([0, 0, 1]));
console.log(moveZeroes([4, 2, 0, 0, 3, 0, 5]));