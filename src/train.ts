/*
ZK-TASK:

Shunday function yozing, u har soniyada bir marta consolega 1 dan 5 gacha bolgan raqamlarni chop etsin va 5 soniyadan keyin ishini toxtatsin.
MASALAN: printNumbers()
*/

function printNumbers() {
    let count = 1;
    const intervalId = setInterval(() => {
        console.log(count);
        if (count === 5) {
            clearInterval(intervalId);
        }
        count++;
    }, 1000);
}

printNumbers();
