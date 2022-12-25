const fs = require('fs');
let blueprints = fs.readFileSync('./input.txt', 'utf8').split('\n').slice(0, -1).map((blueprint) => {
  return {
    ore: {
      ore: parseInt(blueprint.split(' ')[6])
    },
    clay: {
      ore: parseInt(blueprint.split(' ')[12])
    },
    obsidian: {
      ore: parseInt(blueprint.split(' ')[18]),
      clay: parseInt(blueprint.split(' ')[21]),
    },
    geode: {
      ore: parseInt(blueprint.split(' ')[27]),
      obsidian: parseInt(blueprint.split(' ')[30])
    },
    bestGeodes: 0,
  }
});


function cloneScenario(scenario) {
  return {
    ...scenario,
    robots: {...scenario.robots},
    resources: {...scenario.resources},
  };
}

let previousScenarios = {};
// const shallowCompare = (obj1, obj2) =>
//   Object.keys(obj1).length === Object.keys(obj2).length &&
//   Object.keys(obj1).every(key => obj1[key] === obj2[key]);

// function nextMinute(blueprint, scenario, minute) {
//   // for (let previousScenario of (previousScenarios[minute] || [])) {
//   //   if (scenario.resources.geode < previousScenario.resources.geode) {
//   //     return;
//   //   }

//     // if (shallowCompare(scenario.resources, previousScenario.resources) && shallowCompare(scenario.robots, previousScenario.robots)) {
//     //   return;
//     // }

//     // if (Object.entries(scenario.robots).every(([robotType, number]) => {
//     //   if (robotType === 'clay' || robotType === 'ore' || robotType === 'bestGeodes') {
//     //     return true;
//     //   }
//     //   return previousScenario.robots[robotType] > number;
//     // }) && Object.entries(scenario.resources).every(([resource, number]) => {
//     //   return previousScenario.robots[resource] > number;
//     // })) {
//     //   return;
//     // }


//     // if (Object.entries(scenario.resources).every(([resource, number]) => {
//     //   previousScenario.robots[resource] > number;
//     // })) {
//     //   return;
//     // }

//     // if (scenario.resources.geode < previousScenario.resources.geode) {
//     //   return;
//     // }
//   // }

//   const key = `${scenario.resources.ore},${scenario.resources.clay},${scenario.resources.obsidian},${scenario.resources.geode},${scenario.robots.ore},${scenario.robots.clay},${scenario.robots.obsidian},${scenario.robots.geode}`;

//   previousScenarios[minute] = previousScenarios[minute] || {};
//   if(previousScenarios[minute] && previousScenarios[minute][key]) {
//     return;
//   }

//   previousScenarios[minute][`${scenario.resources.ore},${scenario.resources.clay},${scenario.resources.obsidian},${scenario.resources.geode},${scenario.robots.ore},${scenario.robots.clay},${scenario.robots.obsidian},${scenario.robots.geode}`] = true

//   scenario = cloneScenario(scenario);

//   let newRobotsPossibilities = ['none'];

//   for (let [robotType, resources] of Object.entries(blueprint)) {
//     if (robotType === 'bestGeodes') {
//       continue;
//     }

//     const hasEnoughResources = Object.entries(resources).every(([resourceName, value]) => {
//         return scenario.resources[resourceName] >= value;
//     });

//     if (hasEnoughResources) {
//       newRobotsPossibilities.push(robotType);
//     }
//   }

//   if (newRobotsPossibilities.includes('geode')) {
//     newRobotsPossibilities = ['geode'];
//   }

//   if (minute === 23) {
//     if (scenario.robots.geode === 0 && !newRobotsPossibilities.includes('geode')) {
//       return;
//     }
//   }

//   if (scenario.robots.geode === 0 && scenario.robots.obsidian === 0 && minute > 20) {
//     return;
//   }

//   // newRobotsPossibilities = [newRobotsPossibilities[Math.floor(Math.random() * newRobotsPossibilities.length)]]

//   // if (scenario.resources.obsidian >= blueprint.geode.obsidian && !newRobotsPossibilities.includes('geode')) {
//   //   newRobotsPossibilities = ['none'];
//   // }

//   scenario.resources.ore += scenario.robots.ore;
//   scenario.resources.clay += scenario.robots.clay;
//   scenario.resources.obsidian += scenario.robots.obsidian;
//   scenario.resources.geode += scenario.robots.geode;

//   if (minute == 24) {
//     if (scenario.resources.geode > blueprint.bestGeodes) {
//       console.log('in there', scenario.resources.geode);
//       blueprint.bestGeodes = scenario.resources.geode;
//     }
//     return;
//   }

//   for (let robot of newRobotsPossibilities) {
//     if (robot === 'none') {
//       nextMinute(blueprint, scenario, minute + 1);
//     } else {
//       const newScenario = cloneScenario(scenario);

//       for (let [resourceName, value] of Object.entries(blueprint[robot])) {
//         newScenario.resources[resourceName] -= value;
//       }

//       newScenario.robots[robot]++;
//       nextMinute(blueprint, newScenario, minute + 1);
//     }
//   }
// }

// function assessBlueprint(blueprint) {
//   previousScenarios = {};
//   let scenario = {
//     robots: {ore: 1, clay: 0, obsidian: 0, geode: 0},
//     resources: {ore: 0, clay: 0, obsidian: 0, geode: 0},
//   };

//   nextMinute(blueprint, scenario, 1)
// }

// let part1 = 0;
// for (const [index, blueprint] of blueprints.entries()) {
//   console.log(index);
//   assessBlueprint(blueprint);

//   part1 += (index + 1) * blueprint.bestGeodes;
// }

// console.log('part1', part1);


function nextMinutePart2(blueprint, scenario, minute) {
  // for (let previousScenario of (previousScenarios[minute] || [])) {
  //   if (scenario.resources.geode < previousScenario.resources.geode) {
  //     return;
  //   }

    // if (shallowCompare(scenario.resources, previousScenario.resources) && shallowCompare(scenario.robots, previousScenario.robots)) {
    //   return;
    // }

    // if (Object.entries(scenario.robots).every(([robotType, number]) => {
    //   if (robotType === 'clay' || robotType === 'ore' || robotType === 'bestGeodes') {
    //     return true;
    //   }
    //   return previousScenario.robots[robotType] > number;
    // }) && Object.entries(scenario.resources).every(([resource, number]) => {
    //   return previousScenario.robots[resource] > number;
    // })) {
    //   return;
    // }


    // if (Object.entries(scenario.resources).every(([resource, number]) => {
    //   previousScenario.robots[resource] > number;
    // })) {
    //   return;
    // }

    // if (scenario.resources.geode < previousScenario.resources.geode) {
    //   return;
    // }
  // }

  // if (scenario.robots.obsidian === 0 && minute > 27) {
  //   return;
  // }

  const key = `${scenario.resources.ore},${scenario.resources.clay},${scenario.resources.obsidian},${scenario.resources.geode},${scenario.robots.ore},${scenario.robots.clay},${scenario.robots.obsidian},${scenario.robots.geode}`;

  previousScenarios[minute] = previousScenarios[minute] || {bestGeodes: scenario.resources.geode};
  if(previousScenarios[minute][key]) {
    return;
  }

  if (minute > 25 && scenario.robots.obsidian === 0) {
    return;
  }

  if (minute > 27 && scenario.robots.geode === 0) {
    return;
  }

  if (minute > 30 && blueprint.bestGeodes > (1 + scenario.resources.geode + (scenario.robots.geode * 2))) {
    return;
  }

  const remainingMinutes = 32 - minute;

  /// ........
  /// b+b+b+b+ = 17 geodes
  /// .
  const maxPossibleGeodes = scenario.resources.geode + scenario.robots.geode + (remainingMinutes * (scenario.robots.geode + 1)) + Math.ceil(remainingMinutes * (remainingMinutes / 4)) + 5
  if (minute !== 32 && blueprint.bestGeodes > maxPossibleGeodes) {
    return;
  }

  // if (previousScenarios[minute].bestGeodes > scenario.resources.geode) {
  //   return;
  // } else if (previousScenarios[minute].bestGeodes < scenario.resources.geode) {
  //   previousScenarios[minute].bestGeodes = scenario.resources.geode;
  // }


  previousScenarios[minute][key] = true

  scenario = cloneScenario(scenario);

  let newRobotsPossibilities = ['none'];

  for (let [robotType, resources] of Object.entries(blueprint)) {
    if (robotType === 'bestGeodes') {
      continue;
    }

    const hasEnoughResources = Object.entries(resources).every(([resourceName, value]) => {
        return scenario.resources[resourceName] >= value;
    });

    if (hasEnoughResources) {
      newRobotsPossibilities.push(robotType);
    }
  }

  const valueByType = {
    geode: 1,
    obsidian: 2,
    clay: 3 + Math.floor(Math.random() * 3),
    ore: 3 + Math.floor(Math.random() * 3),
    none: 4,
  }


  newRobotsPossibilities.sort((l, r) => {

    return valueByType[l]  - valueByType[r];
  });

  if (minute === 31) {
    if (scenario.robots.geode === 0 && !newRobotsPossibilities.includes('geode')) {
      return;
    }
  }

  // newRobotsPossibilities = [newRobotsPossibilities[Math.floor(Math.random() * newRobotsPossibilities.length)]]

  // if (scenario.resources.obsidian >= blueprint.geode.obsidian && !newRobotsPossibilities.includes('geode')) {
  //   newRobotsPossibilities = ['none'];
  // }

  scenario.resources.ore += scenario.robots.ore;
  scenario.resources.clay += scenario.robots.clay;
  scenario.resources.obsidian += scenario.robots.obsidian;
  scenario.resources.geode += scenario.robots.geode;

  if (minute == 32) {
    if (scenario.resources.geode > blueprint.bestGeodes) {
      console.log('in there', scenario.resources.geode);
      blueprint.bestGeodes = scenario.resources.geode;
    }
    return;
  }

  for (let robot of newRobotsPossibilities) {
    if (robot === 'none') {
      nextMinutePart2(blueprint, scenario, minute + 1);
    } else {
      const newScenario = cloneScenario(scenario);

      for (let [resourceName, value] of Object.entries(blueprint[robot])) {
        newScenario.resources[resourceName] -= value;
      }

      newScenario.robots[robot]++;
      nextMinutePart2(blueprint, newScenario, minute + 1);
    }
  }
}

function assessBlueprintPart2(blueprint) {
  previousScenarios = {};
  let scenario = {
    robots: {ore: 1, clay: 0, obsidian: 0, geode: 0},
    resources: {ore: 0, clay: 0, obsidian: 0, geode: 0},
  };

  nextMinutePart2(blueprint, scenario, 1)
}

let part2 = 1;
for (const [index, blueprint] of blueprints.slice(0,3).entries()) {
  console.log(index);
  assessBlueprintPart2(blueprint);

  part2 *= blueprint.bestGeodes;
}

console.log('part2', part2);
