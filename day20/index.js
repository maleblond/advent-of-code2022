const fs = require('fs');
let numbers = fs.readFileSync('./input.txt', 'utf8').split('\n').slice(0, -1).map((n, i) => ({number: parseInt(n), moved: false, i}));

function findNextIndexToMove() {
  const sortedByIndex = [...numbers].filter((n) => !n.moved).sort((l, r)=> l.i - r.i);

  return numbers.findIndex((n) => n === sortedByIndex[0]);
}

function moveNumbers() {
  let index = findNextIndexToMove();

  while(index !== -1) {
    const number = numbers[index];

    number.moved = true;
    numbers.splice(index, 1);

    let newPosition = (index + number.number) % (numbers.length);

    if (newPosition === 0 && number.number < 0) {
      newPosition = numbers.length;
    } else if (newPosition === numbers.length && number.number > 0) {
      newPosition = 0;
    }
    numbers.splice(newPosition, 0, number)

    index = findNextIndexToMove();
  }
}

moveNumbers();

let zeroIndex = numbers.findIndex((n) => n.number === 0);
const part1 = numbers[(zeroIndex + 1000) % numbers.length].number + numbers[(zeroIndex + 2000) % numbers.length].number + numbers[(zeroIndex + 3000) % numbers.length].number;

console.log(part1)


numbers = fs.readFileSync('./input.txt', 'utf8').split('\n').slice(0, -1).map((n, i) => ({number: parseInt(n) * 811589153, moved: false, i}));

function findNextIndexToMove() {
  const sortedByIndex = [...numbers].filter((n) => !n.moved).sort((l, r)=> l.i - r.i);

  return numbers.findIndex((n) => n === sortedByIndex[0]);
}

function moveNumbersPart2() {
  for (let i = 0; i < 10; i++) {
    let index = findNextIndexToMove();

    while(index !== -1) {
      const number = numbers[index];

      number.moved = true;
      numbers.splice(index, 1);

      let newPosition = (index + number.number) % (numbers.length);

      if (newPosition === 0 && number.number < 0) {
        newPosition = numbers.length;
      } else if (newPosition === numbers.length && number.number > 0) {
        newPosition = 0;
      }
      numbers.splice(newPosition, 0, number)

      index = findNextIndexToMove();
    }

    for (let number of numbers) {
      number.moved = false;
    }
  }
}

moveNumbersPart2();

zeroIndex = numbers.findIndex((n) => n.number === 0);
const part2 = numbers[(zeroIndex + 1000) % numbers.length].number + numbers[(zeroIndex + 2000) % numbers.length].number + numbers[(zeroIndex + 3000) % numbers.length].number;

console.log(part2)
