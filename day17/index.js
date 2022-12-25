const fs = require('fs');
const jetPatterns = fs.readFileSync('./input.txt', 'utf8').split('\n')[0].split('');
const numberOfRocks = 1000000000000;
// const numberOfRocks = 2022;
const rocks = [
  {pattern: [['#', '#', '#', '#']], width: 4, height: 1},
  {pattern: [
    ['.', '#', '.'],
    ['#', '#', '#'],
    ['.', '#', '.'],
  ], width: 3, height: 3},
  {pattern: [
    ['.', '.', '#'],
    ['.', '.', '#'],
    ['#', '#', '#']
  ], width: 3, height: 3},
  {pattern: [
    ['#'],
    ['#'],
    ['#'],
    ['#']
  ], width: 1, height: 4},
  {pattern: [
    ['#', '#'],
    ['#', '#']
  ], width: 2, height: 2}
]

const chamberWidth = 7;
let chamber = new Array(10000000).fill(undefined).map(() => new Array(chamberWidth).fill(undefined));
let highestY = 0;
let jetPatternIndex = -1;

function nextJetPattern() {
  jetPatternIndex++;
  jetPatternIndex = jetPatternIndex % jetPatterns.length;
  const pattern = jetPatterns[jetPatternIndex];

  return pattern;
}

function checkPositionsBlocked(positions) {
  for (let position of positions) {
    if (position.x < 0 || position.x >= chamberWidth) {
      return true;
    }

    if (position.y === 0) {
      return true;
    }

    if (chamber[position.y][position.x] === '#') {
      return true
    }
  }

  return false;
}

const repeatingPatterns = {};

console.time('total');
let foundPattern = false;
let toAdd = 0;

for (let i = 0; i < numberOfRocks; i++) {
  const rock = rocks[i % rocks.length];
  let rockPositions = [];

  const startBottomLeft = {x: 2, y: highestY + 4};
  let isBlocked = false;

  for (let line = 0; line < rock.pattern.length; line++) {
    const linePattern = rock.pattern[rock.pattern.length - 1 - line];
    for (let column = 0; column < linePattern.length; column++) {
      if (linePattern[column] === '#') {
        rockPositions.push({x: column + startBottomLeft.x, y: line + startBottomLeft.y});
      }
    }
  }
  while (!isBlocked) {
    const jet = nextJetPattern();
    let newPositions = [];

    if (jet === '>') {
      newPositions = rockPositions.map((p) => ({...p, x: p.x + 1}))

      if (!checkPositionsBlocked(newPositions)) {
        rockPositions = newPositions;
      }
    } else {
      newPositions = rockPositions.map((p) => ({...p, x: p.x - 1}))

      if (!checkPositionsBlocked(newPositions)) {
        rockPositions = newPositions;
      }
    }

    newPositions = rockPositions.map((p) => ({...p, y: p.y - 1}))

    isBlocked = checkPositionsBlocked(newPositions);

    if (!isBlocked) {
      rockPositions = newPositions;
    }
  }

  for (let position of rockPositions) {
    chamber[position.y][position.x] = '#';

    if (position.y > highestY) {
      highestY = position.y;
    }
  }

  if (foundPattern) {
    continue;
  }

  repeatingPatterns[jetPatternIndex] = repeatingPatterns[jetPatternIndex] || {};

  if (repeatingPatterns[jetPatternIndex][i % rocks.length]) {
    const pattern = repeatingPatterns[jetPatternIndex][i % rocks.length]

    let matches = true;
    for (let [i, currentHighestLine] of chamber.slice(highestY-20, highestY + 1).entries()) {
      for (let [j, currentHighestColumn] of currentHighestLine.entries()) {
        if (pattern.highestLines[i][j] !== currentHighestColumn) {
          console.log("NOT MATCHING");
          matches = false;
          break;
        }
      }
  }

    if (matches) {
      foundPattern = true;
      const rocksDiff = i - pattern.rock;
      const highestYDiff = highestY - pattern.highestY;
      console.log(pattern, rocksDiff, highestYDiff);

      i = numberOfRocks - ((numberOfRocks - pattern.rock) % rocksDiff);
      toAdd = (highestYDiff * Math.floor((numberOfRocks - pattern.rock) / rocksDiff)) - highestYDiff;
      console.log(toAdd, i);
    }
  } else {
    repeatingPatterns[jetPatternIndex][i % rocks.length] = {
      rock: i,
      highestLines: chamber.slice(highestY - 20, highestY + 1), // highestY per column would be better 
      highestY,
    }
  }
}

console.log('part2', highestY + toAdd);
