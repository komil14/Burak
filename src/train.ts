// ZA-TASK:

function sortByAge(arr: { age: number }[]): { age: number }[] {
    return arr.sort((a, b) => a.age - b.age);
}   

const input = [{ age: 23 }, { age: 21 }, { age: 13 }];
const output = sortByAge(input);
console.log(output); 

