const fs = require('fs');


function parseMonkeys() {
  let monkeys = [];

  let monkeysInput = fs.readFileSync('./input.txt', 'utf8').split('\n\n');

  for (let monkeyInput of monkeysInput) {
    if(monkeyInput === '')  {
      break;
    }

    const info = monkeyInput.split('\n');

    const monkey = {};

    monkey.items = info[1].replace('Starting items: ', '').split(', ').map(Number);
    let operations = info[2].replace('Operation: new = old ', '').replace('old', 'worry');

    monkey.getNewWorryLevel = (worry) => eval(`worry ${operations}`)

    monkey.divisibleBy = Number(info[3].replace('Test: divisible by ', ''));

    let tmp = info[4].split(' ');
    monkey.trueMonkey = Number(tmp[tmp.length - 1]);

    tmp = info[5].split(' ');
    monkey.falseMonkey = Number(tmp[tmp.length - 1]);

    monkeys.push(monkey);
  }

  return monkeys;
}

let monkeys = parseMonkeys();

let part1 = new Array(monkeys.length).fill(0);

for (let round = 1; round <= 1; round ++) {
  for (const [monkeyIndex, monkey] of monkeys.entries()) {
    for (const item of monkey.items) {
      part1[monkeyIndex]++;
      let updatedItem = monkey.getNewWorryLevel(item);
      updatedItem = updatedItem / 3;

      if (updatedItem % monkey.divisibleBy === 0) {
        monkeys[monkey.trueMonkey].items.push(updatedItem);
      } else {
        monkeys[monkey.falseMonkey].items.push(updatedItem);
      }
    }

    monkey.items = [];
  }
}


part1 = part1.sort((a, b) => b - a);
console.log(part1[0] * part1[1]);

monkeys = parseMonkeys();

const commonDivisor = monkeys.reduce((acc, i)=> acc * i.divisibleBy, 1);
let part2 = new Array(monkeys.length).fill(0);

for (let round = 1; round <= 10000; round ++) {
  for (const [monkeyIndex, monkey] of monkeys.entries()) {
    for (const item of monkey.items) {
      part2[monkeyIndex]++;
      let updatedItem = monkey.getNewWorryLevel(item);

      updatedItem = updatedItem % commonDivisor;

      if (updatedItem % monkey.divisibleBy === 0) {
        monkeys[monkey.trueMonkey].items.push(updatedItem);
      } else {
        monkeys[monkey.falseMonkey].items.push(updatedItem);
      }
    }

    monkey.items = [];
  }
}

part2 = part2.sort((a, b) => b - a);
console.log(part2[0] * part2[1]);

