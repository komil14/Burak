/*
Z-TASK:

Shunday function yozing, uni sonlardan tashkil topgan array qabul qilsin. Function arraydagi juft sonlarni yigindisini qaytarsin
MASALAN: sumEvens([1,2,3]) return 2

@MITASK
*/
export function sumEvens(numbers: number[]): number {
  return numbers
    .filter((num) => num % 2 === 0)
    .reduce((acc, curr) => acc + curr, 0);
}   
 console.log(sumEvens([1, 2, 3, 4, 5, 6]));

