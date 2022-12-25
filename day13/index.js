const fs = require('fs');

function compareLists(leftList, rightList) {
  for (let i = 0; i < leftList.length; i++) {
    let leftItem = leftList[i];
    let rightItem = rightList[i];

    if (i >= rightList.length) {
      return 1;
    }

    if (Array.isArray(leftItem) || Array.isArray(rightItem)) {
      if (!Array.isArray(leftItem)) {
        leftItem = [leftItem];
      }

      if (!Array.isArray(rightItem)) {
        rightItem = [rightItem];
      }

      const listComparison = compareLists(leftItem, rightItem)

      if (listComparison !== 0) {
        return listComparison;
      } else {
        continue;
      }
    }

    if (leftList[i] > rightList[i]) {
      return 1;
    } else if (leftList[i] < rightList[i]) {
      return -1;
    }
  }

  return leftList.length === rightList.length ? 0 : -1;
}

let input = fs.readFileSync('./input.txt', 'utf8');
input = input.substring(0, input.length - 1);
// let pairs = input.split('\n\n');
// let part1 = 0;

// for (let [index, pair] of pairs.entries()) {
//   let packets = pair.split('\n').map(JSON.parse)

//   leftPacket = packets[0];
//   rightPacket = packets[1];

//   if (compareLists(leftPacket, rightPacket) <= 0) {
//     part1 += 1 + index;
//   }
// }

// console.log("PART1", part1);

let packets = input.split('\n').filter((l) => l !== '').map(JSON.parse);
packets.push([[2]]);
packets.push([[6]]);

packets = packets.sort(compareLists);

console.log(packets);

const firstDivider = packets.findIndex((p) => p.length === 1 && Array.isArray(p[0]) && p[0].length === 1 && p[0][0] === 2) + 1;
const secondDivider =  packets.findIndex((p) => p.length === 1 && Array.isArray(p[0]) && p[0].length === 1 && p[0][0] === 6) + 1;

console.log("part2", firstDivider * secondDivider);
