const fs = require('fs');

let data = fs.readFileSync('./input.txt', 'utf8');

data = data.split('\n\n');

sums = data.map((group) => {
  return group.split('\n').reduce((sum, i) => sum + Number(i), 0);
}).sort((a,b ) => a - b);

console.log(sums[sums.length - 1]);
console.log(sums[sums.length - 1] + sums[sums.length - 2]  + sums[sums.length - 3] );

