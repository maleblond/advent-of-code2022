const fs = require('fs');

let rucksacks = fs.readFileSync('./input.txt', 'utf8').split('\n');

let score = 0;

function scoreForItem(item) {
  if (item.toUpperCase() === item) {
    return item.charCodeAt(0) - 38;
  } else {
    return item.charCodeAt(0) - 96;
  }
}

for (let sack of rucksacks) {
  if (sack.length === 0) {
    break;
  }
  const countPerCompartment = sack.length / 2;
  const firstCompartment = new Set(sack.slice(0,countPerCompartment).split(''));

  for (let item of new Set(sack.slice(countPerCompartment).split(''))) {
    if (firstCompartment.has(item)) {
      score += scoreForItem(item);
    }
  }
}

console.log(score);
rucksacks = fs.readFileSync('./input.txt', 'utf8').split('\n');

let scorePart2 = 0;

for (let i = 0; i < rucksacks.length; i += 3) {
  const groups = rucksacks.slice(i, i + 3);

  if (groups.length < 3) {
    break;
  }
  const commonItems =  new Set(groups[0].split('').filter((item) => groups.slice(1, 3).every((group) => group.includes(item))));

  if (commonItems.length > 1) {
    throw new Error();
  }

  scorePart2 += scoreForItem([...commonItems][0]);
};

console.log(scorePart2);
