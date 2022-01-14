//  --------------------------- 1. --------------------------------------
// Implementujte funkci Deklarace funkce: string print(string)(string)
// Code:    print('Hello')('World')
// Output:  Hello World

// Code:    print('Good')('Luck')
// Output:  Good Luck

function print(string) {
  return function (string2) {
    return `${string} ${string2}`;
  };
}

console.log(print("Hello")("World"));
console.log(print("Good")("Luck"));
