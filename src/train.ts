/* Project Standarts:
- Logging standard
- Naming standard:
  - camelCase => variables, functions, methods, object properties
  - PascalCase => classes, interfaces
  - kebab-case => file names, URLs
  - snake_case => database columns, css

-Error handling standard:
  - try-catch
  - centralized error handling middleware



API types:
  - Traditional API
  - RESTful API
  - GraphQL API
  
*/



// TASK H-2:
// function extractDigits(input: string): string {
//   const digits = input.split('').filter(char => /\d/.test(char));
//   return digits.join('');
// }

// console.log(extractDigits("m14i1t"));

// // TASK H:
// function positiveInt(arr: number[]): string {
//   const positiveInts = arr.filter(num => num > 0 && Number.isInteger(num));
//   return positiveInts.join('');
// }

// console.log(positiveInt([3, -1, 4, 1.5, 2, -3, 5]));



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