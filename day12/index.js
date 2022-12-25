const fs = require('fs');

let matrix = fs.readFileSync('./input.txt', 'utf8').split('\n').slice(0, -1).map((line) => line.split(''));

let startingPosition = {};
let endPosition = {};

for (const [i, line] of matrix.entries()) {
  for (const [j, column] of line.entries()) {
    if (column === 'S') {
      startingPosition = {x: j, y: i};
    } else if (column === 'E') {
      endPosition = {x: j, y: i};
    }
  }
}

function getElevationValue(position) {
  const elem = matrix[position.y][position.x];

  if (elem === 'S') {
    return 1;
  } else if (elem === 'E') {
    return 26;
  } else {
   return elem.charCodeAt(0) - 96;
  }
}

let part1 = Infinity;
let minNumOfIterationsPerCoordinates = matrix.map((l) => l.map(() => Infinity));

function findNextPaths(currentPath, iterations) {
  iterations++;

  if (iterations > part1) {
    return;
  }

  const newPaths = new Array();
  const currentPosition = currentPath[currentPath.length - 1];

  if (minNumOfIterationsPerCoordinates[currentPosition.y][currentPosition.x] <= iterations) {
    return;
  } else {
    minNumOfIterationsPerCoordinates[currentPosition.y][currentPosition.x] = iterations;
  }

  const possiblePositions = [];

  if (currentPosition.x - 1 >= 0) {
    possiblePositions.push({x: currentPosition.x - 1, y: currentPosition.y});
  }

  if (currentPosition.x + 1 < matrix[0].length) {
    possiblePositions.push({x: currentPosition.x + 1, y: currentPosition.y});
  }

  if (currentPosition.y - 1 >= 0) {
    possiblePositions.push({x: currentPosition.x, y: currentPosition.y - 1});
  }

  if (currentPosition.y + 1 < matrix.length) {
    possiblePositions.push({x: currentPosition.x, y: currentPosition.y + 1});
  }

  for (let pos of possiblePositions) {
    // Check if already been there
    let beenThere = false;
    for (let previousPosition of currentPath) {
      if (previousPosition.x === pos.x && previousPosition.y === pos.y) {
        beenThere = true;
        break;
      }
    }

    if (beenThere) {
      continue;
    }

    if (getElevationValue(pos) <= getElevationValue(currentPosition) + 1) {
      if (pos.x === endPosition.x && pos.y === endPosition.y) {
        part1 = Math.min(part1, iterations);
        newPaths.push(currentPath.concat([pos]));
      }

       findNextPaths(currentPath.concat([pos]), iterations);
    }
  }

  return newPaths;
}

findNextPaths([startingPosition], 0);

console.log('part1', part1);

for (const [i, line] of matrix.entries()) {
  for (const [j, column] of line.entries()) {
    if (column === 'a') {
      findNextPaths([{x: j, y: i}], 0);
    }
  }
}


console.log('Part2', part1);
