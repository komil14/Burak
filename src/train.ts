/**
O-TASK:

Shunday function yozing, u har xil valuelardan iborat array qabul qilsin va array ichidagi sonlar yigindisini hisoblab chiqqan javobni qaytarsin.
MASALAN: calculateSumOfNumbers([10, "10", {son: 10}, true, 35]) return 45

@MITASK

 */

function calculateSumOfNumbers(arr: any[]): number {
    return arr.reduce((sum, item) => {
        if (typeof item === 'number') {
            return sum + item;
        }
        return sum;
    }, 0);
}

console.log(calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]));


