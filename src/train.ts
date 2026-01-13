/**

ZQ-TASK

Shunday function yozing, u parametridagi array ichida 2 marta qaytarilgan sonlarni alohida araryda qaytarsin. MASALAN: findDuplicates([1,2,3,4,5,4,3,4]) return [3, 4].

@MITASK

 */

function findDuplicates(arr: number[]): number[] {
    const seen = new Set<number>();
    const duplicates = new Set<number>();

    for (const num of arr) {
        if (seen.has(num)) {
            duplicates.add(num);
        } else {
            seen.add(num);
        }
    }
    return Array.from(duplicates);
}

const result = findDuplicates([1, 2, 3, 4, 5, 4, 3, 4]);
console.log(result);