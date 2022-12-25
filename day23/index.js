const fs = require('fs');
const mode = 'real'

if (mode === 'sample') {
  input = fs.readFileSync('./input-sample.txt', 'utf8');
} else if (mode === 'real') {
  input = fs.readFileSync('./input.txt', 'utf8');
}

input.split('\n').slice(0, -1).map((l) => l.split(''));

function getPosition(y, x) {
  return Boolean(positions[y] && positions[y][x]);
}

function setPosition(y, x) {
  positions[y] = positions[y] || {};
  positions[y][x] = true;
}


let positions = {};

let numberOfElves = 0;

for (const [y, line] of input.split('\n').slice(0, -1).map((l) => l.split('')).entries()) {
  for (const [x, column] of line.entries()) {
    if (column === '#') {
      setPosition(parseInt(y), parseInt(x));
      numberOfElves++;
    }
  }
}

const directions = ['up', 'down', 'left', 'right'];

for (let round = 1; round <= 10; round++) {
  let newPositions = [];

  for (let y in positions) {
    y = parseInt(y);

    for (let x in positions[y]) {
      x = parseInt(x);

      let noElves = true;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <=1; j++) {
          if (i === 0 && j === 0) {
            continue;
          }

          if (getPosition(y + i, x + j)) {
            noElves = false;
            break;
          }
        }

        if (!noElves) {
          break;
        }
      }

      if (noElves) {
        continue;
      }


      for (let i = 0; i < directions.length; i++) {
        const index = (i + (round - 1)) % directions.length;
        const direction = directions[index];
        let canMove = true;

        if (direction === 'up') {
          for (let xOffset = -1; xOffset <= 1; xOffset++) {
            if (getPosition(y - 1, x + xOffset)) {
              canMove = false;
              break;
            }
          }

          if (canMove) {
            newPositions.push({y: y - 1, x: x, fromY: y, fromX: x});
            break;
          }
        } else if (direction === 'down') {
          for (let xOffset = -1; xOffset <= 1; xOffset++) {
            if (getPosition(y + 1, x + xOffset)) {
              canMove = false;
              break;
            }
          }

          if (canMove) {
            newPositions.push({y: y + 1, x: x, fromY: y, fromX: x});
            break;
          }
        } else if (direction === 'left') {
          for (let yOffset = -1; yOffset <= 1; yOffset++) {
            if (getPosition(y + yOffset, x -1)) {
              canMove = false;
              break;
            }
          }

          if (canMove) {
            newPositions.push({y: y, x: x - 1, fromY: y, fromX: x});
            break;
          }
        } else if (direction === 'right') {
          for (let yOffset = -1; yOffset <= 1; yOffset++) {
            if (getPosition(y + yOffset, x + 1)) {
              canMove = false;
              break;
            }
          }

          if (canMove) {
            newPositions.push({y, x: x + 1, fromY: y, fromX: x});
            break;
          }
        } else {
          throw new Error();
        }
      }
    }
  }
  newPositions = newPositions.filter((p1, i1) => !newPositions.some((p2, i2) => i1 !== i2 && p2.x === p1.x && p2.y === p1.y));

  for (const move of newPositions) {
    delete positions[move.fromY][move.fromX];
    if (Object.keys(positions[move.fromY]).length === 0) {
      delete positions[move.fromY];
    }

    setPosition(move.y, move.x);
  }
}

const minX = Object.values(positions).reduce((min, v) => Math.min(min, Object.keys(v).reduce((min, v) => Math.min(min, parseInt(v)), Infinity)), Infinity);
const maxX = Object.values(positions).reduce((max, v) => Math.max(max, Object.keys(v).reduce((max, v) => Math.max(max, parseInt(v)), -Infinity)), -Infinity);;
const minY = Object.keys(positions).reduce((min, v) => Math.min(min, parseInt(v)), Infinity);;
const maxY = Object.keys(positions).reduce((max, v) => Math.max(max, parseInt(v)), -Infinity);


console.log('part1', (1 + maxX - minX) * (1 + maxY - minY) - numberOfElves);

positions = {};

for (const [y, line] of input.split('\n').slice(0, -1).map((l) => l.split('')).entries()) {
  for (const [x, column] of line.entries()) {
    if (column === '#') {
      setPosition(parseInt(y), parseInt(x));
    }
  }
}

let newPositions = [];
let round = 0;

do {
  round++;
  newPositions = [];

  for (let y in positions) {
    y = parseInt(y);

    for (let x in positions[y]) {
      x = parseInt(x);

      let noElves = true;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <=1; j++) {
          if (i === 0 && j === 0) {
            continue;
          }

          if (getPosition(y + i, x + j)) {
            noElves = false;
            break;
          }
        }

        if (!noElves) {
          break;
        }
      }

      if (noElves) {
        continue;
      }


      for (let i = 0; i < directions.length; i++) {
        const index = (i + (round - 1)) % directions.length;
        const direction = directions[index];
        let canMove = true;

        if (direction === 'up') {
          for (let xOffset = -1; xOffset <= 1; xOffset++) {
            if (getPosition(y - 1, x + xOffset)) {
              canMove = false;
              break;
            }
          }

          if (canMove) {
            newPositions.push({y: y - 1, x: x, fromY: y, fromX: x});
            break;
          }
        } else if (direction === 'down') {
          for (let xOffset = -1; xOffset <= 1; xOffset++) {
            if (getPosition(y + 1, x + xOffset)) {
              canMove = false;
              break;
            }
          }

          if (canMove) {
            newPositions.push({y: y + 1, x: x, fromY: y, fromX: x});
            break;
          }
        } else if (direction === 'left') {
          for (let yOffset = -1; yOffset <= 1; yOffset++) {
            if (getPosition(y + yOffset, x -1)) {
              canMove = false;
              break;
            }
          }

          if (canMove) {
            newPositions.push({y: y, x: x - 1, fromY: y, fromX: x});
            break;
          }
        } else if (direction === 'right') {
          for (let yOffset = -1; yOffset <= 1; yOffset++) {
            if (getPosition(y + yOffset, x + 1)) {
              canMove = false;
              break;
            }
          }

          if (canMove) {
            newPositions.push({y, x: x + 1, fromY: y, fromX: x});
            break;
          }
        } else {
          throw new Error();
        }
      }
    }
  }
  newPositions = newPositions.filter((p1, i1) => !newPositions.some((p2, i2) => i1 !== i2 && p2.x === p1.x && p2.y === p1.y));

  for (const move of newPositions) {
    delete positions[move.fromY][move.fromX];
    if (Object.keys(positions[move.fromY]).length === 0) {
      delete positions[move.fromY];
    }

    setPosition(move.y, move.x);
  }
} while (newPositions.length !== 0)

console.log(round);
