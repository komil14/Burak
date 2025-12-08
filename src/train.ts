/* New task ZD-TASK:
@MITASK
*/

const changeNumberInArray = (
  index: number,
  arr: number[],
  newNumber: number
): number[] => {
  if (index < 0 || index >= arr.length) {
    throw new Error("Index out of bounds");
  }
  const newArr = [...arr];
  newArr[index] = newNumber;
  return newArr;
};

const result = changeNumberInArray(3, [1, 3, 7, 2], 0);
console.log(result);
