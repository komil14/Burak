/*
ZM-TASK

Shunday function yozing, u function parametrda berilgan sonni har bir raqamini kvadratiga ogirib qaytarsin. MASALAN: squareDigits(9119) return "811181".

@MITASK
*/

function squareDigits(num: number): string {
    return num
        .toString()
        .split('')
        .map((digit) => {
            const digitNum = parseInt(digit, 10);
            return (digitNum * digitNum).toString();
        })
        .join('');
}

console.log(squareDigits(9119)); 

