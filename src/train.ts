/* 
VPS =====> Vertual Private Server
A virtual machine running on a physical server.

VPC =====> Vertual Private Cloud
A private network inside a cloud platform

*/

/* Project Standards:
-Logging standards(Morgan Format)
- Naming standards
    function, method, variable => CAMEL case
    class => PASCAL case
    folder => KEBAB case
    css => SNAKE case

-ERROR HANDLING 

*/

/*N-TASK: */

const palindromCheck = (word: string) => {
  const reversed = word.split("").reverse().join("");
  return reversed === word ? true : false;
};

console.log(palindromCheck("daad"));


