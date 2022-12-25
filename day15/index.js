const fs = require('fs');
const { finished } = require('stream');

function parseSensor(sensor) {
  const x = sensor.match(/x=\-?[0-9]+/g).map((x) => parseInt(x.replace('x=', '')));
  const y = sensor.match(/y=\-?[0-9]+/g).map((x) => parseInt(x.replace('y=', '')));

  return {
    x: x[0],
    y: y[0],
    beaconX: x[1],
    beaconY: y[1]
  }
}

let sensors = fs.readFileSync('./input.txt', 'utf8').split('\n').slice(0, -1).map(parseSensor);

// let part1Row = new Array(10000000);
// let indexOffset = 5000000
// let part1Y = 2000000;

// for (let sensor of sensors) {
//   if (sensor.beaconY === part1Y) {
//     part1Row[sensor.beaconX + indexOffset] = 'B';
//   }

//   const yDistanceSensorAndRow = Math.abs(sensor.y - part1Y);
//   const distanceSensorAndBeacon = Math.abs(sensor.x - sensor.beaconX) + Math.abs(sensor.y - sensor.beaconY);
//   const xOffset = distanceSensorAndBeacon - yDistanceSensorAndRow;

//   if (xOffset < 0) {
//     continue;
//   }

//   for (let i = sensor.x - xOffset; i <= sensor.x + xOffset; i++) {
//     const index = i +  indexOffset;
//     if (part1Row[index] !== 'B') {
//       part1Row[index] = '#'
//     }
//   }
// }

// const part1 = part1Row.filter((v) => v === '#').length;
// console.log('part1', part1);

const intervalsPerLine = new Array(4000001).fill(undefined).map(() => []);

function addIntervalToLine(lineIndex, interval) {
  let intervals = intervalsPerLine[lineIndex];
  intervals.push(interval);

  intervals = intervals.sort((left, right) => left[0] - right[0]);

  let numberOfMerge = 0;


  for (let i = 1; i < intervals.length; i++) {
    const rightInterval = intervals[i];

    if (intervals[0][0] - 1 <= rightInterval[1] && intervals[0][1] + 1 >= rightInterval[0]) {
      intervals[0][0] = Math.min(intervals[0][0], rightInterval[0]);
      intervals[0][1] = Math.max(intervals[0][1], rightInterval[1]);
      numberOfMerge++;
    } else {
      break;
    }
  }

  intervals.splice(1, numberOfMerge);
}

for (let sensor of sensors) {
  const distanceSensorAndBeacon = Math.abs(sensor.x - sensor.beaconX) + Math.abs(sensor.y - sensor.beaconY);

  for (let i = -distanceSensorAndBeacon; i <= distanceSensorAndBeacon; i++) {
    const y = sensor.y + i;

    const xOffset = distanceSensorAndBeacon - Math.abs(i);

    if (y >= 0 && y <= 4000000) {
      addIntervalToLine(y, [Math.max(sensor.x - xOffset, 0), Math.min(sensor.x + xOffset, 4000000)])
    }
  }
}

let y;
let x;

console.log(intervalsPerLine)
for (let line = 0; line < intervalsPerLine.length; line++) {
  if (intervalsPerLine[line].length > 1) {
    x = intervalsPerLine[line][0][1] + 1;
    y = line;
    break
  }
}

console.log("Part2", x, y, x * 4000000 + y);
