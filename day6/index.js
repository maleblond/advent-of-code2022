const fs = require('fs');

let data = fs.readFileSync('./input.txt', 'utf8').split('');

let part1;

for (let i = 13; i < data.length; i++) {
  subData = data.slice(i - 13, i + 1).sort();

  let allUnique = true;
  for (let j = 0; j < subData.length - 1; j++ ) {
    if (subData[j] === subData[j + 1]) {
      allUnique = false;
      break;
    }
  }

  if (allUnique) {
    part1 =i+1  ;
    break;
  }
}

console.log("part1", part1)
