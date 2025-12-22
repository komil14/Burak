/*
ZH-TASK:

Shunday function yozing, u berilgan array parametrni ichidagi eng katta raqamgacha tushib qolgan raqamlarni hammasini bir array qilib qaytarsin. 
MASALAN: findDisappearedNumbers([1, 3, 4, 7]) return [2, 5, 6]

@MITASK
*/

function findDisappearedNumbers(nums: number[]): number[] {
  const maxNum = Math.max(...nums);
  const numSet = new Set(nums);
  const disappearedNumbers: number[] = [];

  for (let i = 1; i <= maxNum; i++) {
    if (!numSet.has(i)) {
      disappearedNumbers.push(i);
    }
  }

  return disappearedNumbers;
}
console.log(findDisappearedNumbers([1, 3, 4, 7]));
