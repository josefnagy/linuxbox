//  --------------------------- 2. --------------------------------------
//  Napište funkci, která po uplynutí stanoveného času napíše součin dvou čísel. Využijte přitom tyto vlastnosti JavaScriptu:
// - Promise
// - Arrow functions
// - Template literals

const delayedMultiply = (num1, num2, delay) => {
  const HALF_HOUR_IN_MILISECONDS = 1000 * 60 * 30;

  const areNumbers = (...args) => {
    return args.every((arg) => {
      return typeof arg === "number";
    });
  };

  const inRange = (start, end) => (number) => number >= start && number <= end;
  const halfHourRange = inRange(0, HALF_HOUR_IN_MILISECONDS);

  return new Promise((resolve, reject) => {
    if (!areNumbers(num1, num2, delay) || !halfHourRange(delay)) {
      reject(new Error("Wrong function parameters."));
    }

    // Try / catch bloky jsem zde umístil pouze demonstrativně, ne proto že by jich bylo potřeba. setTimeout funkce by neměla hodit error. Obecně je ale vhodné mít u Promis API nějaký error handling, protože se zpravidla používají na operace, které můžou skončit errorem (např. zápis, čtení z DB, fetchování dat z nějakého API atd...).

    try {
      setTimeout(() => {
        resolve(`${num1 * num2}`);
      }, delay);
    } catch (err) {
      reject(new Error(err));
    }
  });
};

delayedMultiply(10, 5, 5000)
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
