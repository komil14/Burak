import { T } from "./libs/types/common";

/*
P-TASK:
*/

function objectToArray(obj: T) {
  return Object.entries(obj);
}

console.log(objectToArray({ a: 10, g: 20 }));
