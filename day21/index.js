const fs = require('fs');
let monkeys = {};

const sum = fs.readFileSync('./input.txt', 'utf8').split('\n').slice(0, -1).map((line) => {
  const monkey = {};
  const part2 = line.split(':')[1];

  if (!isNaN(Number(part2))) {
    monkey.number = parseInt(part2);
  } else {
    monkey.otherMonkeys = [part2.split(' ')[1], part2.split(' ')[3]];
    monkey.operation = `monkeys.${monkey.otherMonkeys[0]}.number ${part2.split(' ')[2]} monkeys.${monkey.otherMonkeys[1]}.number`;
  }

  monkeys[line.split(':')[0]] = monkey;
});
setMonkeys();
let dependencies = ['root'];

let currentIndex = 0;

function compute() {
  while(currentIndex < dependencies.length) {
    const lastMonkey = monkeys[dependencies[currentIndex]];

    for (const monkey of lastMonkey.otherMonkeys) {
      if (monkeys[monkey].otherMonkeys) {
        dependencies.push(monkey);
      }
    }

    currentIndex++;
  }

  for (let i = dependencies.length - 1; i > -1; i--) {
    const monkey = monkeys[dependencies[i]];
      monkey.number = parseInt(eval(monkey.operation));
  }
}

compute();
// console.log(monkeys.root);
// console.log('pmlp', monkeys.plmp); // 17319158961933
// console.log('rmtt', monkeys.rmtt); // 7628196411405


setMonkeys();
monkeys.humn.number = 3876907167495;

dependencies = ['root'];
function computePart2() {
  let currentIndex = 0;
  while(currentIndex < dependencies.length) {
    const lastMonkey = monkeys[dependencies[currentIndex]];

    for (const monkey of lastMonkey.otherMonkeys) {
      if (monkeys[monkey].otherMonkeys) {
        dependencies.push(monkey);
      }
    }

    currentIndex++;
  }

  for (let i = dependencies.length - 1; i > -1; i--) {
    const monkey = monkeys[dependencies[i]];
      monkey.number = parseInt(eval(monkey.operation));
  }
}

computePart2();
console.log('pmlp', monkeys.plmp); // 17319158974173
console.log('rmtt', monkeys.rmtt); // 7628196411405
