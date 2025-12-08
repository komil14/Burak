/* 
VPS =====> Vertual Private Server
A virtual machine running on a physical server.

VPC =====> Vertual Private Cloud
A private network inside a cloud platform

*/

import { T } from "./libs/types/common";

/* Project Standards:
-Logging standards(Morgan Format)
- Naming standards
    function, method, variable => CAMEL case
    class => PASCAL case
    folder => KEBAB case
    css => SNAKE case

-ERROR HANDLING 

*/

/*ZD-TASK:
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
