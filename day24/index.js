const fs = require('fs');
const mode = 'real'

if (mode === 'sample') {
  input = fs.readFileSync('./input-sample.txt', 'utf8');
} else if (mode === 'real') {
  input = fs.readFileSync('./input.txt', 'utf8');
}

input = input.split('\n').slice(0, -1).map((l) => l.split(''));

const map = input.map((line, i) => {
  return line.map((column, i) => {
    if (column === '#' || column === '.') {
      return column;
    } else {
      return [column];
    }
  });
});

const startingPosition = {x: map[0].findIndex((c) => c === '.'),y: 0};
let endPosition = {x: map[map.length - 1].findIndex((c) => c === '.'),y: map.length - 1}
let bestRound = Infinity;
let scenarios = [{position: startingPosition, round: 1}];

const mapAtRound = [map];
let positionsAtRound = {};
let roundOffset = 0;

function computeBestRound() {
  while(scenarios.length !== 0) {
    const [{round, position}] = scenarios.splice(0, 1);

    if (!positionsAtRound[round]) {
      positionsAtRound[round] = [];
    }

    const previous = positionsAtRound[round].find((p) => p.x === position.x && p.y === position.y);

    if (previous) {
      if (previous.round <= round) {
        continue;
      } else {
        previous.round = round;
      }
    } else {
      positionsAtRound[round].push({x: position.x, y: position.y, round})
    }

    const minimumAdditionalRounds = Math.max(Math.abs((endPosition.x - position.x)) + Math.abs((endPosition.y - position.y)) - 1, 0);

    if (round + minimumAdditionalRounds >= bestRound) {
      continue;
    }

    const realRound = round + roundOffset;
    if (!mapAtRound[realRound]) {
      let newMap = JSON.parse(JSON.stringify(mapAtRound[realRound - 1]));

      let newPositions = [];
      for (const [lineIndex, line] of newMap.entries()) {
        for (const [columnIndex, column] of line.entries()) {
          if (Array.isArray(column)) {
            for (const blizzard of column) {
              let newPosition;
              if (blizzard === '<') {
                newPosition = {x: columnIndex - 1, y: lineIndex};
                if (newPosition.x < 1) {
                  newPosition.x = map[0].length - 2;
                }
              } else if (blizzard === '>') {
                newPosition = {x: columnIndex + 1, y: lineIndex};
                if (newPosition.x > map[0].length - 2) {
                  newPosition.x = 1;
                }
              } else if (blizzard === '^') {
                newPosition = {x: columnIndex, y: lineIndex - 1};
                if (newPosition.y < 1) {
                  newPosition.y = map.length - 2;
                }
              } else if (blizzard === 'v') {
                newPosition = {x: columnIndex, y: lineIndex + 1};
                if (newPosition.y > map.length - 2) {
                  newPosition.y = 1;
                }
              }

              newPositions.push({...newPosition, symbol: blizzard});
            }

            newMap[lineIndex][columnIndex] = '.';
          }
        }
      }

      for (const position of newPositions) {
        if (!Array.isArray(newMap[position.y][position.x])) {
          newMap[position.y][position.x] = [];
        }
        newMap[position.y][position.x].push(position.symbol);
      }

      mapAtRound[realRound] = newMap;
    }

    const newMap = mapAtRound[realRound];

    let moves = [];

    if (endPosition.x === 1) {
      if (position.x - endPosition.x > position.y - endPosition.y) {
        moves = ['<', '^', 'stay', 'v', '>'];
      } else {
        moves = ['^', '<', 'stay', '>', 'v'];
      }
    } else {
      if (endPosition.x - position.x > endPosition.y - position.y) {
        moves = ['>', 'v', 'stay', '^', '<'];
      } else {
        moves = ['v', '>', 'stay', '<', '^'];
      }
    }

    moves.reverse();

    for (let move of moves) {
      let x = position.x;
      let y = position.y;

      if (move === '>') {
        x += 1;
      } else if (move === '<') {
        x -=1;
      } else if (move === '^') {
        y -=1;
      } else if (move === 'v') {
        y += 1;
      }

      if (y < 0 || y >= newMap.length || newMap[y][x] === '#' || Array.isArray(newMap[y][x])) {
        continue;
      }

      if (y === endPosition.y) {
        if (bestRound > round) {
          console.log('best round', round);
          bestRound = round;
          break;
        }
      }

      scenarios.unshift({position: {x, y}, round: round + 1});
    }
  }
}

computeBestRound();
let firstPath = bestRound;
console.log('part1', bestRound);

positionsAtRound = {};
bestRound = Infinity;
roundOffset = firstPath;
scenarios = [{position: {x: endPosition.x, y: endPosition.y}, round: 1}];
endPosition = {x: map[0].findIndex((c) => c === '.'),y: 0};

computeBestRound()
positionsAtRound = {};
let secondPath = bestRound;
console.log(secondPath);
roundOffset = firstPath + secondPath;
bestRound = Infinity
scenarios = [{position: startingPosition, round: 1}];
endPosition = {x: map[map.length - 1].findIndex((c) => c === '.'),y: map.length - 1}

computeBestRound();

console.log('part2', firstPath + secondPath + bestRound);
