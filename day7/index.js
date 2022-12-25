const fs = require('fs');

let lines = fs.readFileSync('./input.txt', 'utf8').split('\n');
const rootDir = createNewDir('/');
let currentDir;

function createNewDir(name, parent) {
  return {
    name,
    parent,
    files: [],
    dirs: [],
  }
}

function createNewFile(name, size) {
  return {
    name,
    size,
  }
}

for (let line of lines) {
  if (line === '') {
    break;
  }

  const tokens = line.split(' ');
  if (tokens[0] === '$') {
    if (tokens[1] === 'cd') {
      const cdArg = tokens[2];

      if (cdArg === '..') {
        currentDir = currentDir.parent;
      } else if (cdArg === '/') {
        currentDir = rootDir;
      } else {
        currentDir = currentDir.dirs.find((d) => d.name === cdArg) || createNewDir(cdArg, currentDir);
      }
    } else if (tokens[1] === 'ls') {
      continue;
    }
  } else if (tokens[0] === 'dir') {
    const name = tokens[1];

    if(!currentDir.dirs.some((d) => d.name === name)) {
      currentDir.dirs.push(createNewDir(name, currentDir));
    }
  } else {
    const size = Number(tokens[0]);
    const name = tokens[1]

    if(!currentDir.files.some((d) => d.name === name)) {
      currentDir.files.push(createNewFile(name, size));
    }
  }
}

let part1 = 0;
let part2;
let part2Threshold;

function traverseDir(dir, ignoreRootFiles = false) {
  let size = 0;

  if (dir.name !== '/' || !ignoreRootFiles) {
    for (let file of dir.files) {
      size += file.size;
    }
  }

  for (let subDir of dir.dirs) {
    size += traverseDir(subDir, false);
  }

  if (size <= 100000) {
    part1 += size;
  }

  dir.size = size;
  if (part2Threshold && size >= part2Threshold && (!part2 || part2.size > size)) {
    part2 = dir;
  }

  return size;
}

traverseDir(rootDir, true);
console.log("part1", part1);

traverseDir(rootDir, false);
part2Threshold = 30000000 - (70000000 - rootDir.size);
traverseDir(rootDir, false)
