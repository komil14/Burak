/**
ZT-TASK

Shunday function yozing, u parametridagi string ichida 1 martadan ortiq qaytarilmagan birinchi harf indeksini qaytarsin. MASALAN: firstUniqueCharIndex("stamp") return 0.

@MITASK
 */

function firstUniqueCharIndex(str: string): number {
    const charCount: { [key: string]: number } = {};

    for (let char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    for (let i = 0; i < str.length; i++) {
        if (charCount[str[i]] === 1) {
            return i;
        }
    }

    return -1; 
}

console.log(firstUniqueCharIndex("stamp"));
console.log(firstUniqueCharIndex("swiss")); 
console.log(firstUniqueCharIndex("aabbcc")); 