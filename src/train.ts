/*
X-TASK:

 Shunday function yozing, uni object va string parapetrlari bolsin. Function string parametri object ichida necha marotaba takrorlanganligini qaytarsin (nested object bolsa ham sanasin)
 MASALAN: countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model') return 2

@MITASK
*/
export function countOccurrences(obj: any, key: string): number {
  let count = 0;

  function recursiveCount(o: any) {
    for (const k in o) {
      if (k === key) {
        count++;
      }
      if (typeof o[k] === 'object' && o[k] !== null) {
        recursiveCount(o[k]);
      }
    }
  }

  recursiveCount(obj);
  return count;
} 
console.log(countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model')); 
console.log(countOccurrences({a: 1, b: {c: 2, d: {a: 3}}}, 'a'));