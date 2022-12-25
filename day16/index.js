const fs = require('fs');
const { DefaultDeserializer } = require('v8');

const valves = {};

function parseValve(str) {
  const words = str.split(' ');

  const name = words[1];
  const rate = parseInt(words[4].replace('rate=', '').replace(';'));
  const otherValves = words.slice(9).map((w) => w.replace(',', ''));

  valves[name] = {
    name,
    rate,
    otherValves,
  }
}

fs.readFileSync('./input.txt', 'utf8').split('\n').slice(0, -1).forEach(parseValve);


let maxMinutes = 30;
let maxPressure = 0;

function nextMinute(scenario, minute) {
  minute++;

  if (minute >= maxMinutes) {
    maxPressure = Math.max(maxPressure, scenario.pressure);
    return;
  }

  if (scenario.currentValve.rate !== 0 && !scenario.openedValves.includes(scenario.currentValve.name)) {
    nextMinute({
      currentValve: scenario.currentValve,
      pressure: scenario.pressure + ((maxMinutes - minute) * scenario.currentValve.rate),
      openedValves: scenario.openedValves.concat([scenario.currentValve.name])
    }, minute);
  }

    for (let valve of scenario.currentValve.otherValves.filter((v) => v !== scenario.previousMove)) {
      nextMinute({
        ...scenario,
        currentValve: valves[valve],
        previousMove: scenario.currentValve.name,
      }, minute);
    }
}

let currentScenario = {openedValves: [], pressure: 0, currentValve: valves['AA']};
nextMinute(currentScenario, 0);
console.log('part1', maxPressure);


let maxPressurePart2 = 0;
maxMinutes = 15;

const sortedValves = Object.values(valves).sort((v1, v2) => v2.rate - v1.rate);
function maxScoreForMinutes(scenario, minute) {
  const possibleValves = sortedValves.filter((v) => !scenario.openedValves.includes(v.name))

  let additionalScore = 0;
  let remainingMinutes = maxMinutes - minute;

  while (remainingMinutes > 0) {
    additionalScore += remainingMinutes * possibleValves.splice(0, 1)[0].rate;

    remainingMinutes -= 2;
  }

  return scenario.pressure + additionalScore;
}

function nextMinutePart2(scenario, minute) {
  minute++;

  if (minute >= maxMinutes) {
    maxPressurePart2 = Math.max(maxPressurePart2, scenario.pressure);
    return;
  }

  if (maxScoreForMinutes(scenario, minute) <= maxPressurePart2) {
    return;
  }

  const possibleMovesByIndex = [[], []];

  for (const [i, currentValve] of scenario.currentValves.entries()) {
    if (currentValve.rate !== 0 && !scenario.openedValves.includes(currentValve.name)) {
      possibleMovesByIndex[i].push({
        nextValve: currentValve,
        pressureAdded: ((maxMinutes - minute) * currentValve.rate),
        previousMove: null,
      });
    }

    for (let valve of currentValve.otherValves.filter((v) => v !== scenario.previousMoves[i])) {
      possibleMovesByIndex[i].push({
        nextValve: valves[valve],
        previousMove: currentValve,
      });
    }
  }

  for (let firstPossibleMove of possibleMovesByIndex[0]) {
    for (let secondPossibleMove of possibleMovesByIndex[1]) {
      if (firstPossibleMove.pressureAdded && secondPossibleMove.pressureAdded && firstPossibleMove.nextValve === secondPossibleMove.nextValve) {
        continue;
      }

      let newPressure = scenario.pressure;
      let openedValves = [...scenario.openedValves];

      if (firstPossibleMove.pressureAdded) {
        openedValves.push(firstPossibleMove.nextValve.name);
        newPressure += firstPossibleMove.pressureAdded;
      }

      if (secondPossibleMove.pressureAdded) {
        openedValves.push(secondPossibleMove.nextValve.name);
        newPressure += secondPossibleMove.pressureAdded;
      }

      nextMinutePart2({
        openedValves,
        pressure: newPressure,
        currentValves: [firstPossibleMove.nextValve, secondPossibleMove.nextValve],
        previousMoves: [firstPossibleMove.previousMove, secondPossibleMove.previousMove],
      }, minute)
    }
  }
}

currentScenario = {openedValves: [], pressure: 0, currentValves: [valves['AA'], valves['AA']], previousMoves: [null, null]};
nextMinutePart2(currentScenario, 0);
console.log('part2', maxPressurePart2);
