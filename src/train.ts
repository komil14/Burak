/*
ZG-TASK:

Shunday function yozing, u berilgan string parametrni snake casega otkazib qaytarsin. 
MASALAN: capitalizeWords('name should be a string') return 'name_should_be_a_string'

@MITASK
*/

export function capitalizeWords(input: string): string {
  return input.split(' ').join('_');
} 

// Test cases
console.log(capitalizeWords('name should be a string')); 
console.log(capitalizeWords('hello world'));
console.log(capitalizeWords('convert this to snake case')); 