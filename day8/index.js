const fs = require('fs');

let lines = fs.readFileSync('./input.txt', 'utf8').split('\n');
let matrix = lines.slice(0, lines.length - 1).map((l) => l.split('').map((n) => Number(n)));
console.log(matrix);
let part1 = 0;

for(let line = 0; line < matrix.length; line++) {
  for (let column = 0; column < matrix[line].length; column++) {
    const currentHeight = matrix[line][column];
    let isVisible = true;

    // Check left
    for (let beforeColumnIndex = column - 1; beforeColumnIndex >= 0; beforeColumnIndex--) {
      if (matrix[line][beforeColumnIndex] >= currentHeight) {
        isVisible = false;
        break;
      }
    }

    if (isVisible) {
      part1++;
      continue;
    }

    isVisible = true;
    // Check right
    for (let afterColumnIndex = column + 1; afterColumnIndex < matrix[line].length; afterColumnIndex++) {
      if (matrix[line][afterColumnIndex] >= currentHeight) {
        isVisible = false;
        break;
      }
    }

    if (isVisible) {
      part1++;
      continue;
    }

    // Check top
    isVisible = true;
    for (let beforeLineIndex = line - 1; beforeLineIndex >= 0; beforeLineIndex--) {
      if (matrix[beforeLineIndex][column] >= currentHeight) {
        isVisible = false;
        break;
      }
    }

    if (isVisible) {
      part1++;
      continue;
    }

    // Check below
    isVisible = true;
    for (let afterLineIndex = line + 1; afterLineIndex < matrix.length; afterLineIndex++) {
      if (matrix[afterLineIndex][column] >= currentHeight) {
        isVisible = false;
        break;
      }
    }

    if (isVisible) {
      part1++;
      continue;
    }
  }
}

console.log("PART1", part1);

let part2 = 0;

for(let line = 0; line < matrix.length; line++) {
  for (let column = 0; column < matrix[line].length; column++) {
    const currentHeight = matrix[line][column];
    let counts = [];
    let currentCount = 0;

    // Check left
    for (let beforeColumnIndex = column - 1; beforeColumnIndex >= 0; beforeColumnIndex--) {
      currentCount++;

      if (matrix[line][beforeColumnIndex] >= currentHeight) {
        break;
      }
    }

    counts.push(currentCount)

    currentCount = 0;
    // Check right
    for (let afterColumnIndex = column + 1; afterColumnIndex < matrix[line].length; afterColumnIndex++) {
      currentCount++;

      if (matrix[line][afterColumnIndex] >= currentHeight) {
        break;
      }
    }

    counts.push(currentCount)

    // Check top
    currentCount = 0;
    for (let beforeLineIndex = line - 1; beforeLineIndex >= 0; beforeLineIndex--) {
      currentCount++;

      if (matrix[beforeLineIndex][column] >= currentHeight) {
        break;
      }
    }

    counts.push(currentCount)

    // Check below
    currentCount = 0;
    for (let afterLineIndex = line + 1; afterLineIndex < matrix.length; afterLineIndex++) {
      currentCount++;

      if (matrix[afterLineIndex][column] >= currentHeight) {
        break;
      }
    }

    counts.push(currentCount)

    const score = counts.slice(1).reduce((result, current) => result * current, counts[0])
    part2=Math.max(part2, score);
  }
}

console.log("PART2", part2);
