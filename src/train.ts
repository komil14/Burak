// TASK H:
function positiveInt(arr: number[]): string {
  const positiveInts = arr.filter(num => num > 0 && Number.isInteger(num));
  return positiveInts.join('');
}

console.log(positiveInt([3, -1, 4, 1.5, 2, -3, 5]));



// TASK G:
// function getHighestIndex(arr: number[]): number {
//   let highest = -Infinity;
//   let highestIndex = -1;

//   arr.forEach((num, index) => {
//     if (num > highest) {
//       highest = num;
//       highestIndex = index;
//     }
//   });

//   return highestIndex;
// }

// // Test cases
// console.log(getHighestIndex([5, 21, 12, 21, 8])); 
// console.log(getHighestIndex([-10, -20, -5, -15]));
// console.log(getHighestIndex([1, 2, 3, 4, 5]));


// console.log("Hello World");

// import moment from "moment";

// const currentTime = moment().format("YYYY MM DD");
// console.log(currentTime);


// const person: string = "Burak";
// const age: number = 25;

// console.log(`My name is ${person} and I am ${age} years old.`);

// Architectural pattern: MVC, Dependency Injection, MVP

// MVC = MODEL VIEW CONTROLLER

// Design pattern: Middleware, Decorator