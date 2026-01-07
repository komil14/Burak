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

/*
ZO-TASK

Shunday function yozing, u parametrdagi string ichidagi qavslar miqdori balansda ekanligini aniqlasin. Ya'ni ochish("(") va yopish(")") qavslar soni bir xil bolishi kerak. MASALAN: areParenthesesBalanced("string()ichida(qavslar)soni()balansda") return true.

@MITASK
*/

function areParenthesesBalanced(str: string): boolean {
    let balance = 0;

    for (const char of str) {
        if (char === '(') {
            balance++;
        } else if (char === ')') {
            balance--;
            if (balance < 0) {
                return false; 
            }
        }
    }

    return balance === 0;
}

console.log(areParenthesesBalanced("string()ichida(qavslar)soni()balansda"));


