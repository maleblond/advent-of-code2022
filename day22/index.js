const fs = require('fs');
const mode = 'real'


if (mode === 'sample') {
  input = fs.readFileSync('./input-sample.txt', 'utf8');
} else if (mode === 'real') {
  input = fs.readFileSync('./input.txt', 'utf8');
}

let map = input.split('\n\n')[0].split('\n').map((line) => {
  const values = line.split('');
  return {
    values,
    startIndex: values.findIndex((v) => v !== ' '),
    endIndex: values.reduce((prev, currentVal, currentIndex) => {
      if (currentVal !== ' ') {
        prev = currentIndex;
      }

      return prev;
    }, 0)
  };
})

let numbers = input.split('\n\n')[1].split('\n')[0].split('R').flatMap((c) => c.split('L'));
let directions = input.split('\n\n')[1].split('\n')[0].replace(/\d+/g, '');

const moves = new Array(numbers.length * 2 - 1).fill(undefined).map((_v, index) => {
  if (index % 2 == 0) {
    return parseInt(numbers[index / 2]);
  } else {
    return directions[(index -1) / 2];
  }
});

let currentPosition = {
  x: map[0].startIndex,
  y: 0,
  orientation: 0,
};

const orientations = ['R', 'D', 'L', 'T'];

function getValueAt(position) {
  return map[position.y].values[position.x] || ' ';
}

// for (let move of moves) {
//   if (isNaN(move)) {
//     let newOrientation = currentPosition.orientation;

//     if (move === 'L') {
//       newOrientation -= 1;
//     } else {
//       newOrientation += 1;
//     }

//     if (newOrientation < 0) {
//       newOrientation = orientations.length - 1;
//     } else if (newOrientation === orientations.length) {
//       newOrientation = 0;
//     }

//     currentPosition.orientation = newOrientation;
//   } else {
//     console.log('previousPosition', {...currentPosition});
//     for (let i = 0; i < move; i++) {
//       const newPosition = {
//         x: currentPosition.x,
//         y: currentPosition.y,
//       }

//       const orientation = orientations[currentPosition.orientation];
//       if (orientation === 'R') {
//         newPosition.x += 1;

//         if (newPosition.x > map[newPosition.y].endIndex) {
//           newPosition.x = map[newPosition.y].startIndex;
//         }
//       } else if (orientation === 'L') {
//         newPosition.x -= 1;

//         if (newPosition.x < map[newPosition.y].startIndex) {
//           newPosition.x = map[newPosition.y].endIndex;
//         }
//       } else if (orientation === 'T') {
//         newPosition.y -=1;

//         if(newPosition.y < 0 || getValueAt({y: newPosition.y, x: newPosition.x}) === ' ') {
//           for (let line = map.length - 1; line > -1; line--) {
//             if (getValueAt({y: line, x: newPosition.x}) !== ' ') {
//               newPosition.y = line;
//               break;
//             }
//           }
//         }
//       } else if (orientation === 'D') {
//         newPosition.y += 1;

//         if (newPosition.y >= map.length || getValueAt({y: newPosition.y, x: newPosition.x}) === ' ') {
//           for (let line = 0; line < map.length; line++) {
//             if (getValueAt({y: line, x: newPosition.x}) !== ' ') {
//               newPosition.y = line;
//               break;
//             }
//           }
//         }
//       } else {
//         throw new Error();
//       }
//       const valueNewPosition = getValueAt({y: newPosition.y, x: newPosition.x}) ;
//       if (valueNewPosition === '#') {
//         break;
//       } else if (valueNewPosition === ' ') {
//         throw new Error();
//       } else if (valueNewPosition === '.') {
//         currentPosition.x = newPosition.x;
//         currentPosition.y = newPosition.y;
//       } else {
//         throw new Error();
//       }
//     }
//     console.log(currentPosition);
//   }
// }

// const part1 = (currentPosition.x + 1) * 4 + (currentPosition.y + 1) * 1000 + currentPosition.orientation;
// console.log('part1', part1);

let cubes = [
  {
    startX: 50,
    endX: 99,
    startY: 0,
    endY: 49,
    name: 'top',
  },
  {
    startX: 100,
    endX: 149,
    startY: 0,
    endY: 49,
    name: 'right'
  },
  {
    startX: 50,
    endX: 99,
    startY: 50,
    endY: 99,
    name: 'front',
  },
  {
    startX: 50,
    endX: 99,
    startY: 100,
    endY: 149,
    name: 'bottom',
  },
  {
    startX: 0,
    endX: 49,
    startY: 100,
    endY: 149,
    name: 'left',
  },
  {
    startX: 0,
    endX: 49,
    startY: 150,
    endY: 199,
    name: 'back'
  }
];

currentPosition = {
  x: map[0].startIndex,
  y: 0,
  orientation: 0,
};

function getCube(position) {
  return cubes.find((c) => c.startX <= position.x && c.endX >= position.x && c.startY <= position.y && c.endY >= position.y);
}

function getCubeByName(name) {
  return cubes.find((c) => c.name === name);
}

for (let move of moves) {
  if (isNaN(move)) {
    let newOrientation = currentPosition.orientation;

    if (move === 'L') {
      newOrientation -= 1;
    } else {
      newOrientation += 1;
    }

    if (newOrientation < 0) {
      newOrientation = orientations.length - 1;
    } else if (newOrientation === orientations.length) {
      newOrientation = 0;
    }

    currentPosition.orientation = newOrientation;
  } else {
    for (let i = 0; i < move; i++) {
      const newPosition = {
        x: currentPosition.x,
        y: currentPosition.y,
        orientation: currentPosition.orientation,
      }

      const orientation = orientations[currentPosition.orientation];
      if (orientation === 'R') {
        newPosition.x += 1;
      } else if (orientation === 'L') {
        newPosition.x -= 1;
      } else if (orientation === 'T') {
        newPosition.y -=1;
      } else if (orientation === 'D') {
        newPosition.y += 1;
      } else {
        throw new Error();
      }

      const currentCube = getCube(currentPosition);
      const newCube = getCube(newPosition);

      if (currentCube !== newCube) {
        if (currentCube.name === 'left') {
          if (newPosition.x < currentCube.startX) {
            // Move to top cube (DOUBLECHECKED)
            newPosition.x = getCubeByName('top').startX;
            newPosition.y = getCubeByName('top').startY + currentCube.endY - currentPosition.y;
            newPosition.orientation = 0; // right

            if (getCube(newPosition).name !== 'top') {
              throw new Error()
            }
          } else if (newPosition.x > currentCube.endX) {
            // Move to bottom cube
            if (getCube(newPosition).name !== 'bottom') {
              throw new Error()
            }
          } else if (newPosition.y < currentCube.startY) {
            // Move to front (DOUBLECHECKED)
            newPosition.x = getCubeByName('front').startX;
            newPosition.y = getCubeByName('front').startY + currentPosition.x - currentCube.startX;
            newPosition.orientation = 0 // right
            if (getCube(newPosition).name !== 'front') {
              throw new Error()
            }
          } else if (newPosition.y > currentCube.endY) {
            //Move to back (DOUBLECHECKED)
            if (getCube(newPosition).name !== 'back') {
              throw new Error()
            }
          }
        } else if (currentCube.name === 'right') {
          if (newPosition.x < currentCube.startX) {
            // Move to top cube (DOUBLECHECKED)

            if (getCube(newPosition).name !== 'top') {
              throw new Error()
            }
          } else if (newPosition.x > currentCube.endX) {
            // Move to bottom cube (DOUBLECHECKED)
            newPosition.x = getCubeByName('bottom').endX;
            newPosition.y = getCubeByName('bottom').startY + currentCube.endY - currentPosition.y
            newPosition.orientation = 2; // Left

            if (getCube(newPosition).name !== 'bottom') {
              throw new Error()
            }
          } else if (newPosition.y < currentCube.startY) {
            // Move to back (DOUBLECHECKED)
            newPosition.x = getCubeByName('back').startX + currentPosition.x - currentCube.startX;
            newPosition.y = getCubeByName('back').endY;

            newPosition.orientation = 3; // TOP

            if (getCube(newPosition).name !== 'back') {
              throw new Error()
            }
          } else if (newPosition.y > currentCube.endY) {
            // Move to front (DOUBLECHECKED)
            newPosition.x = getCubeByName('front').endX;
            newPosition.y = getCubeByName('front').startY + currentPosition.x - currentCube.startX;

            newPosition.orientation = 2; // Left

            if (getCube(newPosition).name !== 'front') {
              throw new Error()
            }
          }
        } else if (currentCube.name === 'top') {
          if (newPosition.x < currentCube.startX) {
            // Move to left cube (DOUBLECHECKED)
            newPosition.x = getCubeByName('left').startX;
            newPosition.y = getCubeByName('left').startY + currentCube.endY - currentPosition.y;
            newPosition.orientation = 0; // RIGHT

            if (getCube(newPosition).name !== 'left') {
              throw new Error()
            }
          } else if (newPosition.x > currentCube.endX) {
            // Move to right cube (DOUBLECHECKED)

            if (getCube(newPosition).name !== 'right') {
              throw new Error()
            }
          } else if (newPosition.y < currentCube.startY) {
            // Move to back (DOUBLECHECKED)
            newPosition.x = getCubeByName('back').startX;
            newPosition.y = getCubeByName('back').startY + currentPosition.x - currentCube.startX;

            newPosition.orientation = 0; // right

            if (getCube(newPosition).name !== 'back') {
              throw new Error()
            }
          } else if (newPosition.y > currentCube.endY) {
            // Move to front

            if (getCube(newPosition).name !== 'front') {
              throw new Error()
            }
          }
        } else if (currentCube.name === 'front') {
          if (newPosition.x < currentCube.startX) {
            // Move to left cube (DOUBLECHECKED)
            newPosition.x = getCubeByName('left').startX + currentPosition.y - currentCube.startY;
            newPosition.y = getCubeByName('left').startY;

            newPosition.orientation = 1; // down

            if (getCube(newPosition).name !== 'left') {
              throw new Error()
            }
          } else if (newPosition.x > currentCube.endX) {
            // Move to right cube (DOUBLE CHECKED)
            newPosition.x = getCubeByName('right').startX + currentPosition.y - currentCube.startY;
            newPosition.y = getCubeByName('right').endY;

            newPosition.orientation = 3; // top

            if (getCube(newPosition).name !== 'right') {
              throw new Error()
            }
          } else if (newPosition.y < currentCube.startY) {
            // Move to top (DOUBLE CHECKED)

            if (getCube(newPosition).name !== 'top') {
              throw new Error()
            }
          } else if (newPosition.y > currentCube.endY) {
            // Move to bottom (DOUBLE CHECKED)

            if (getCube(newPosition).name !== 'bottom') {
              throw new Error()
            }
          }
        } else if (currentCube.name === 'bottom') {
          if (newPosition.x < currentCube.startX) {
            // Move to left (DOUBLECHECKED)
            if (getCube(newPosition).name !== 'left') {
              throw new Error()
            }
          } else if (newPosition.x > currentCube.endX) {
            // Move to right cube (DOUBLECHECKED)
            newPosition.x = getCubeByName('right').endX;
            newPosition.y = getCubeByName('right').startY + currentCube.endY - currentPosition.y;

            newPosition.orientation = 2; // Left

            if (getCube(newPosition).name !== 'right') {
              throw new Error()
            }
          } else if (newPosition.y < currentCube.startY) {
            // Move to front (DOUBLECHECKED)

            if (getCube(newPosition).name !== 'front') {
              throw new Error()
            }
          } else if (newPosition.y > currentCube.endY) {
            // Move to back (DOUBLE CHECKED)
            newPosition.x = getCubeByName('back').endX;
            newPosition.y = getCubeByName('back').startY + currentPosition.x - currentCube.startX;

            newPosition.orientation = 2; // Left

            if (getCube(newPosition).name !== 'back') {
              throw new Error()
            }
          }
        } else if (currentCube.name === 'back') {
          if (newPosition.x < currentCube.startX) {
            // Move to top (DOUBLECHECKED)
            newPosition.x = getCubeByName('top').startX + currentPosition.y - currentCube.startY;
            newPosition.y = getCubeByName('top').startY;

            newPosition.orientation = 1; // down

            if (getCube(newPosition).name !== 'top') {
              throw new Error()
            }
          } else if (newPosition.x > currentCube.endX) {
            // Move to bottom (DOUBLECHECKED)
            newPosition.x = getCubeByName('bottom').startX + currentPosition.y - currentCube.startY;
            newPosition.y = getCubeByName('bottom').endY;
            newPosition.orientation = 3; // TOP

            if (getCube(newPosition).name !== 'bottom') {
              throw new Error()
            }
          } else if (newPosition.y < currentCube.startY) {
            // Move to left

            if (getCube(newPosition).name !== 'left') {
              throw new Error()
            }
          } else if (newPosition.y > currentCube.endY) {
            // Move to right
            newPosition.x = getCubeByName('right').startX + currentPosition.x - currentCube.startX;
            newPosition.y = getCubeByName('right').startY;
            newPosition.orientation = 1; // Down

            if (getCube(newPosition).name !== 'right') {
              throw new Error()
            }
          }
        } else {
          throw new Error
        }

        console.log('after', newPosition);
      }

      const valueNewPosition = getValueAt({y: newPosition.y, x: newPosition.x}) ;
      if (valueNewPosition === '#') {
        break;
      } else if (valueNewPosition === ' ') {
        throw new Error();
      } else if (valueNewPosition === '.') {
        currentPosition.x = newPosition.x;
        currentPosition.y = newPosition.y;
        currentPosition.orientation = newPosition.orientation;
      } else {
        throw new Error();
      }
    }
  }
}

const part2 = (currentPosition.x + 1) * 4 + (currentPosition.y + 1) * 1000 + currentPosition.orientation;
console.log('part2', part2);
