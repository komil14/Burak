/**

ZP-TASK

Shunday function yozing, u parametridagi string ichidagi raqam va sonlarni sonini sanasin. MASALAN: countNumberAndLetters("string152%\¥") return {number:3, letter:6}.

@MITASK
*/

function countNumberAndLetters(input: string): { number: number; letter: number } {
    let numberCount = 0;
    let letterCount = 0;

    for (const char of input) {
        if (char >= '0' && char <= '9') {
            numberCount++;
        } else if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
            letterCount++;
        }
    }

    return { number: numberCount, letter: letterCount };
}

console.log(countNumberAndLetters("string152%\\¥")); // { number: 3, letter: 6 }