const fs = require('fs');
let cubes = fs.readFileSync('./input.txt', 'utf8').split('\n').slice(0, -1).map((l) => l.split(',').map((v) => parseInt(v)));

/**
 * 1,1,1 + 2,1,1 => YES (1 side)
 * 1,1,1 + 3,1,1 => NO
 * 1,1,1 + 0,1,1 => YES (1 side)
 *
 * Apexes of 1,1,1 => 1,1,1 + 1,1,2 + 1,2,1 + 1,2,2 + 2,1,1 + 2,1,2 + 2,2,1 + 2,2,2
 *
 * 2,2,1 => 2,2,1 + 2,2,2 + 2,3,1 + 2,3,2 + 3,2,1 + 3,2,2 + 3,3,1 + 3,3,2
 * 2,2,2 => 2,2,2 + 2,2,3 + 2,3,2 + 2,3,3 + 3,2,2 + 3,2,3 + 3,3,2 + 3,3,3
 * 2,2,3 => 2,2,3 + 2,2,4 + 2,3,3 + 2,3,4 + 3,2,3 + 3,2,4 + 3,3,3 + 3,3,4
 * 2,2,4 => 2,2,4 + 2,2,5 + 2,3,4 + 2,3,5 + 3,2,4 + 3,2,5 + 3,3,4 + 3,3,5
 * 2,2,6 => 2,2,6 + 2,2,7 + 2,3,6 + 2,3,7 + 3,2,6 + 3,2,7 + 3,3,6 + 3,3,7
 *
 */

cubes = cubes.map((c) => {
  const position =  {x: c[0], y: c[1], z: c[2]};
  const apex = [];

  for (let xOffset = 0; xOffset < 2; xOffset++) {
    for (let yOffset = 0; yOffset < 2; yOffset++) {
      for (let zOffset = 0; zOffset < 2; zOffset++) {
        apex.push({x: position.x + xOffset, y: position.y + yOffset, z: position.z + zOffset})
      }
    }
  }

  const faces = [
      {
        apex:
        [{x: position.x, y: position.y, z: position.z},
      {x: position.x + 1, y: position.y, z: position.z},
      {x: position.x, y: position.y + 1, z: position.z},
      {x: position.x + 1, y: position.y + 1, z: position.z}],
      label: 'front',
    },
      {
        apex: [
          {x: position.x, y: position.y, z: position.z},
          {x: position.x, y: position.y + 1, z: position.z},
          {x: position.x, y: position.y, z: position.z + 1},
          {x: position.x, y: position.y + 1, z: position.z + 1}
        ],
        label: 'left'
      },
    {
        apex: [
          {x: position.x, y: position.y, z: position.z},
          {x: position.x, y: position.y, z: position.z + 1},
          {x: position.x + 1, y: position.y, z: position.z},
          {x: position.x + 1, y: position.y, z: position.z + 1}
        ],
        label: 'bottom'
      },
    {
      apex: [
        {x: position.x + 1, y: position.y + 1, z: position.z + 1},
        {x: position.x + 1, y: position.y, z: position.z + 1},
        {x: position.x + 1, y: position.y + 1, z: position.z},
        {x: position.x + 1, y: position.y, z: position.z}
      ],
      label: 'right'
    },
    {
      apex: [
        {x: position.x + 1, y: position.y + 1, z: position.z + 1},
        {x: position.x + 1, y: position.y, z: position.z + 1},
        {x: position.x, y: position.y + 1, z: position.z + 1},
        {x: position.x, y: position.y, z: position.z + 1},
      ],
      label: 'back',
    },
    {
      apex: [
        {x: position.x + 1, y: position.y + 1, z: position.z + 1},
        {x: position.x + 1, y: position.y + 1, z: position.z},
        {x: position.x, y: position.y + 1, z: position.z + 1},
        {x: position.x, y: position.y + 1, z: position.z}
      ],
      label: 'top',
    },
  ]
  return {
    position,
    apex,
    faces,
  }
});

let visibleSides = cubes.length * 6;

for (let [currentIndex, cube] of cubes.entries()) {
  for (let followingIndex = currentIndex + 1; followingIndex < cubes.length; followingIndex++) {
    const followingCube = cubes[followingIndex];

    const matchingApex = followingCube.apex.filter((followingApex) => cube.apex.some((a) => a.x === followingApex.x && a.y === followingApex.y && a.z === followingApex.z)).length

    if (matchingApex === 4) {
      visibleSides -= 2;
    } if (matchingApex > 4) {
      throw new Error();
    }
  }
}

console.log("part1", visibleSides);

visibleSides = cubes.length * 6;

function sameFace(leftFace, rightFace) {
  return leftFace.apex.every((leftApex) => rightFace.apex.some((rightApex) => rightApex.x === leftApex.x && rightApex.y === leftApex.y && rightApex.z === leftApex.z))
}

let part2 = 0;

for (let [currentIndex, cube] of cubes.entries()) {
  const visibleFaces = cube.faces.filter((face) => {
    let isCovered = false;
    for (let [i, otherCube] of cubes.entries()) {
      if (i === currentIndex) {
        continue;
      }

      isCovered = otherCube.faces.some((otherFace) => {
        return sameFace(otherFace, face);
      });

      if (isCovered) {
        break;
      }
    }

    if (isCovered) {
      return false;
    }

    const label = face.label;

    let transposedFaces = cube.faces.map((face) => {
      if (face.label !== 'right' && face.label !== 'top' && face.label !== 'front') {
        return undefined;
      }

      if (label === 'right') {
        return {
          ...face,
          apex: face.apex.map((apex) => ({...apex, x: apex.x + 1})),
        }
      } else if (label ==='left') {
        return {
          ...face,
          apex: face.apex.map((apex) => ({...apex, x: apex.x - 1})),
        }
      } else if (label ==='top') {
        return {
          ...face,
          apex: face.apex.map((apex) => ({...apex, y: apex.y + 1})),
        }
      } else if (label ==='bottom') {
        return {
          ...face,
          apex: face.apex.map((apex) => ({...apex, y: apex.y - 1})),
        }
      } else if (label ==='front') {
        return {
          ...face,
          apex: face.apex.map((apex) => ({...apex, z: apex.z - 1})),
        }
      } else if (label ==='back') {
        return {
          ...face,
          apex: face.apex.map((apex) => ({...apex, z: apex.z + 1})),
        }
      }
    })

    transposedFaces = transposedFaces.filter((face) => face !== undefined);

    let foundLabels = new Set();

    for (let otherCube of cubes) {
      for (let otherFace of otherCube.faces) {
        if (otherFace.label !== 'right' && otherFace.label !== 'top' && otherFace.label !== 'front') {
          continue;
        }

        const transposedFace = transposedFaces.find((f) => f.label === otherFace.label)

        const otherApex = otherFace.apex[0];
        const transposedApex = transposedFace.apex[0];

        if (otherFace.label === 'right') {
          if (otherApex.y === transposedApex.y && otherApex.z === transposedApex.z) {
            if (otherApex.x < transposedApex.x) {
              foundLabels.add('left')
            } else {
              foundLabels.add('right');
            }
          }
        } else if (otherFace.label === 'top') {
          if (otherApex.x === transposedApex.x && otherApex.z === transposedApex.z) {
            if (otherApex.y <= transposedApex.y) {
              foundLabels.add('bottom')
            } else {
              foundLabels.add('top');
            }
          }
        } else if (otherFace.label === 'front') {
          if (otherApex.x === transposedApex.x && otherApex.y === transposedApex.y) {
            if (otherApex.z < transposedApex.z) {
              foundLabels.add('front')
            } else {
              foundLabels.add('back');
            }
          }
        }
      }
    }

    if (foundLabels.size > 3) {
      console.log(foundLabels);
      console.log('more than 2!');
    }
    isCovered = foundLabels.size === 6;

    return !isCovered;
  });

  part2 += visibleFaces.length;
}

console.log("part2", part2);
