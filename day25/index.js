const fs = require('fs');

const sum = fs.readFileSync('./input.txt', 'utf8').split('\n').slice(0, -1).reduce((sum, line) => {
  return line.split('').reverse().reduce((sum, number, index) => {
    if (number === '=') {
      return sum - 2 * 5 ** index;
    } else if (number === '-') {
      return sum - 5 ** index;
    } else {
      return sum + number * 5 ** index;
    }
  }, sum)
}, 0);

function maxForNumberOfNumbers(numberOfNumbers) {
  let max = 0;
  for (let i = 0; i < numberOfNumbers; i++) {
    max += 3 * 5 ** i;
  }

  return max;
}

function minForNumberOfNumbers(numberOfNumbers) {
  let max = 0;
  for (let i = 0; i < numberOfNumbers; i++) {
    max += -2 * 5 ** i;
  }

  return max;
}

let numberOfNumbers = 1;

while(true) {
  const max  = maxForNumberOfNumbers(numberOfNumbers);
  if (max >= sum) {
    break;
  } else {
    numberOfNumbers++;
  }
}

let remaining = sum;
let part1 = '';
for (let i = numberOfNumbers - 1; i >=0; i--) {
  if (remaining === 0) {
    console.log('in there');
    part1 += '0';
    continue;
  } else {
    for (let j = 3 ; j > -3; j--) {
      const currentVal = j * 5 ** i;
      let valueCurrentPos;

      if (currentVal >= remaining) {
        if (currentVal + minForNumberOfNumbers(i) <= remaining) {
          valueCurrentPos = j;
        }
      } else {
        if (currentVal + maxForNumberOfNumbers(i) >= remaining) {
          valueCurrentPos = j;
        }
      }

      if (valueCurrentPos !== undefined) {
        if (valueCurrentPos === -2) {
          part1 += '=';
        } else if (valueCurrentPos === -1) {
          part1 += '-';
        } else {
          part1 += valueCurrentPos.toString();
        }
        console.log(part1, j, currentVal, valueCurrentPos, 5 ** i);
        remaining = remaining - valueCurrentPos * 5 ** i;
        console.log('remaining', remaining);
        break;
      }
    }
  }
}
console.log(part1);
