/*
ZL-TASK:

Shunday function yozing, u parametrda berilgan stringni kebab casega otkazib qaytarsin. Bosh harflarni kichik harflarga ham otkazsin.
MASALAN: stringToKebab(“I love Kebab”) return “i-love-kebab”

@MITASK
*/

function stringToKebab(str: string): string {
    return str
        .toLowerCase() 
        .trim() 
        .replace(/\s+/g, '-') 
        .replace(/[^a-z0-9-]/g, ''); 
}

console.log(stringToKebab("I love Kebab")); 
console.log(stringToKebab("  Hello World!  "));
console.log(stringToKebab("MIT task is fun")); 

