const fs = require('fs');

let instructions = fs.readFileSync('./input.txt', 'utf8').split('\n');

const cycles = [1];

for (let instruction of instructions) {
  const cmd = instruction.split(' ')[0];
  const lastValue = cycles[cycles.length - 1];

  cycles.push(lastValue);
  if (cmd === 'addx') {
    cycles.push(lastValue + Number(instruction.split(' ')[1]));
  }
}

const samples = [20, 60, 100, 140, 180, 220];
let part1 = 0;

for (const sample of samples) {
  part1 += sample * cycles[sample - 1];
}

console.log("Part1", part1)

for (let i = 0; i < 6; i++) {
  for (let j = 0; j< 40; j++) {
    const value = cycles[i * 40 + j];

    if (value - 1 <= j && value + 1 >= j) {
      process.stdout.write('#')
    } else {
      process.stdout.write('.')
    }
  }

  process.stdout.write("\n");
}
