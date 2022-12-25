const fs = require('fs');

let moves = fs.readFileSync('./input.txt', 'utf8').split('\n');

let headPosition = {
  x: 0,
  y: 0,
};

let knotPositions = new Array(9).fill(undefined).map(() => ({x: 0, y: 0}));

const tailPositionHistory = [knotPositions[knotPositions.length -1]];

function moveHead(direction) {
  if (direction === "R") {
    headPosition = {
      x: headPosition.x + 1,
      y: headPosition.y,
    }
  } else if (direction === 'L') {
    headPosition = {
      x: headPosition.x - 1,
      y: headPosition.y,
    }
  } else if (direction === 'U') {
    headPosition = {
      x: headPosition.x,
      y: headPosition.y + 1,
    }
  } else if (direction === 'D') {
    headPosition = {
      x: headPosition.x,
      y: headPosition.y - 1,
    }
  }
}

function makeKnotFollowPrevious(previousKnot, currentKnot) {
  /**
   * Possible cases
   *        -HHH-
   *        H---H
   *        H-T-H
   *        H---H
   *        -HHH-
   **/
  const xDiff = previousKnot.x - currentKnot.x;
  const yDiff = previousKnot.y - currentKnot.y;
  const xAbsDiff = Math.abs(xDiff);
  const yAbsDiff = Math.abs(yDiff);

  if (xAbsDiff < 2 && yAbsDiff < 2) {
    return {...currentKnot};
  }

  console.log('before', previousKnot, currentKnot);
  if (xAbsDiff > 2 || yAbsDiff > 2) {
    throw new Error(`x or y diff is > 2: ${xAbsDiff}, ${yAbsDiff}`);
  }

  let xMove = 0;

  if (xDiff > 0) {
    xMove = 1;
  } else if (xDiff < 0) {
    xMove = -1
  }

  let yMove = 0;

  if (yDiff > 0) {
    yMove = 1;
  } else if (yDiff < 0) {
    yMove = -1
  }

  const newPosition = {
    x: currentKnot.x + xMove,
    y: currentKnot.y + yMove,
  };

  console.log('after', previousKnot, newPosition);

  return newPosition;
}

for (let move of moves) {
  if (move === '') {
    break;
  }

  const direction = move.split(' ')[0];
  const count = Number(move.split(' ')[1]);

  for (let i = 0; i < count; i++) {
    moveHead(direction);

    for (let j = 0; j < knotPositions.length; j++) {
      console.log(j, j === 0 ? headPosition : knotPositions[j - 1]);
      knotPositions[j] = makeKnotFollowPrevious(j === 0 ? headPosition : knotPositions[j - 1], knotPositions[j]);
    }

    const tailPosition = knotPositions[knotPositions.length - 1];

    if (!tailPositionHistory.some((p) => p.x === tailPosition.x && p.y === tailPosition.y)) {
      tailPositionHistory.push(tailPosition);
    }
  }
}

console.log('part1', tailPositionHistory.length);
