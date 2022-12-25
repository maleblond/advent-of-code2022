const fs = require('fs');

let pairs = fs.readFileSync('./input.txt', 'utf8').split('\n');

let scorePart1 = 0;
let scorePart2 = 0;
for (let pair of pairs) {
  if (pair.length === 0) {
    break;
  }

  const sections = pair.split(',').map((i) => i.split('-').map((i) => Number(i)));

  const lowestStart = sections.reduce((min, section) => Math.min(min, section[0]), Infinity);
  const highestEnd = sections.reduce((max, section) => Math.max(max, section[1]), 0);

  if (sections.some((s) => s[0] === lowestStart && s[1] === highestEnd)) {
    scorePart1+=1;
  }

  if (sections[0][0] <= sections[1][1] && sections[0][1] >= sections[1][0]) {
    scorePart2 += 1;
  }
}

console.log(scorePart1);
console.log(scorePart2);
