const fs = require('fs');

let [init, moves] = fs.readFileSync('./input.txt', 'utf8').split('\n\n');
init = init.split('\n');

function getLetterAt(stack, index) {
  const letter = init[index].charAt(stack * 4 + 1);

  if (letter === ' ') {
    return undefined;
  }

  return letter;
}

function parseMove(move) {
  return {
    count: Number(move.split(' ')[1]),
    from: Number(move.split(' ')[3]),
    to: Number(move.split(' ')[5]),
  }
}

let stacks = new Array(9).fill(undefined).map((item, stackIndex) => {
  return new Array(8).fill(undefined).map((item, itemIndex) => {
    return getLetterAt(stackIndex, itemIndex);
  }).filter((i) => i);
})


for (let move of moves.split('\n')) {
  if (move === '') {
    break;
  }
  const parsedMove  = parseMove(move);

  const fromStack = stacks[parsedMove['from'] - 1]
  const toStack = stacks[parsedMove['to'] - 1]


  const removedItems = fromStack.splice(0, parsedMove['count']);
  toStack.unshift(...removedItems);
}

let part1 = '';

for (let stack of stacks) {
  part1 = part1 + stack[0];
}

console.log('part1', part1)
