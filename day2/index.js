const fs = require('fs');

let lines = fs.readFileSync('./input.txt', 'utf8').split('\n');

const scorePerChoice = {
  X: 1,
  Y: 2,
  Z: 3,
}

const isWin = {
  A: 'Y',
  B: 'Z',
  C: 'X',
}

const isLose = {
  A: 'Z',
  B: 'X',
  C: 'Y',
}

const isDraw = {
  A: 'X',
  B: 'Y',
  C: 'Z',
}

let score = 0;

for (let line of lines) {

  const opponentMove = line.split(' ')[0];
  const outcome = line.split(' ')[1];

  if(!opponentMove || !outcome) {
    break;
  }

  if (outcome === 'Y') {
    score += 3 + scorePerChoice[isDraw[opponentMove]];
  } else if (outcome === 'X') {
    score += scorePerChoice[isLose[opponentMove]];
  } else {
    score += 6 + scorePerChoice[isWin[opponentMove]];
  }
}

console.log(score);
