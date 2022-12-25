const fs = require('fs');

let rockPaths = fs.readFileSync('./input.txt', 'utf8').split('\n').slice(0, -1).map((p) => p.split(' -> ').map((coordinate) => coordinate.split(',').map((c) => parseInt(c))));

let matrix = new Array(1000).fill('.').map(() => new Array(1000).fill('.'));

let deepestRockY = 0;

function fillMatrix() {
  matrix = new Array(1000).fill('.').map(() => new Array(1000).fill('.'));

  for (let path of rockPaths) {
    for (let [index, apex] of path.entries()) {
      matrix[apex[1]][apex[0]] = '#';
      deepestRockY = Math.max(deepestRockY, apex[1]);

      if (index + 1 < path.length) {
        const nextApex = path[index + 1];

        for (let x = apex[0] + 1; x < nextApex[0]; x++) {
          matrix[apex[1]][x] = '#';
        }

        for (let x = apex[0] - 1; x > nextApex[0]; x--) {
          matrix[apex[1]][x] = '#';
        }

        for (let y = apex[1] + 1; y < nextApex[1]; y++) {
          matrix[y][apex[0]] = '#';
        }

        for (let y = apex[1] -1; y > nextApex[1]; y--) {
          matrix[y][apex[0]] = '#';
        }
      }
    }
  }
}


let rockBottom = false;
let part1 = 0;

fillMatrix();

while(!rockBottom) {
  let  sandPosition = {x: 500, y: 0};
  let sandResting = false;

  while(!sandResting) {
    if (sandPosition['y'] + 1 > deepestRockY) {
      rockBottom = true;
      break;
    }
    const down = matrix[sandPosition['y'] + 1][sandPosition['x']];;
    const diagonalLeft = matrix[sandPosition['y'] + 1][sandPosition['x'] - 1];
    const diagonalRight = matrix[sandPosition['y'] + 1][sandPosition['x'] + 1];


    if (down !== '#' && down !== 'o') {
      sandPosition.y = sandPosition.y + 1;
    } else if (diagonalLeft !== '#' && diagonalLeft !== 'o') {
      sandPosition.x--;
      sandPosition.y++;
    } else if (diagonalRight !== '#' && diagonalRight !== 'o') {
      sandPosition.x++;
      sandPosition.y++;
    } else {
      part1++;
      matrix[sandPosition['y']][sandPosition['x']] = 'o';
      sandResting = true;
    }
  }
}

console.log('part1', part1);

fillMatrix();
let part2 = 0;

let sandPosition = {};

while(sandPosition.x !== 500 || sandPosition.y !== 0) {
  sandPosition = {x: 500, y: 0};
  let sandResting = false;
  part2++;

  while(!sandResting) {
    if (sandPosition['y'] === deepestRockY + 1) {
      matrix[sandPosition['y']][sandPosition['x']] = 'o';
      sandResting = true;
      break;
    }

    const down = matrix[sandPosition['y'] + 1][sandPosition['x']];;
    const diagonalLeft = matrix[sandPosition['y'] + 1][sandPosition['x'] - 1];
    const diagonalRight = matrix[sandPosition['y'] + 1][sandPosition['x'] + 1];


    if (down !== '#' && down !== 'o') {
      sandPosition.y = sandPosition.y + 1;
    } else if (diagonalLeft !== '#' && diagonalLeft !== 'o') {
      sandPosition.x--;
      sandPosition.y++;
    } else if (diagonalRight !== '#' && diagonalRight !== 'o') {
      sandPosition.x++;
      sandPosition.y++;
    } else {
      matrix[sandPosition['y']][sandPosition['x']] = 'o';
      sandResting = true;
    }
  }
}

console.log('part2', part2);
