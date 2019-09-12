const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFile } = require('child_process');

const platform = os.platform();
const nativeRecursiveFsWatchSupport = ["darwin", "win32"];
const separator = path.sep;

// if (!nativeRecursiveFsWatchSupport.includes(platform)) {
//   console.log(`You are on ${platform}`)
//   // read dir asynch recursively and run watch on each directory
// } else {
//   fs.watch('./', { encoding: 'utf8', recursive: true }, (eventType, filename) => {
//     console.log(eventType);
//     if (filename) {
//       console.log(filename);
//       // Prints: <Buffer ...>
//     }
//   });
// }

const basePath = `.${separator}`;

const watchedFolders = [];


const watchForChanges = (directory, options = { encoding: "utf8", recursive: false }) => {
  watchedFolders.push(directory);
  let count = 0;
  fs.watch(directory, options, (eventType, fileName) => {
    count++;
    if (fileName && count === 1) {
      readdirRecursively(directory);
      console.log(directory, fileName, eventType);
    }
  });
};

const child = () => { 
    execFile('node', ['./src/test.js'], (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      console.log(stdout);
    });
};
let count = 0;
const readdirRecursively = (directory, options = { encoding: "utf8", withFileTypes: true }) => {
  console.log(directory, count++);
  
  if (!watchedFolders.includes(directory)) {
    watchForChanges(directory);
  }
  fs.readdir(directory, options, (err, files) => files !== undefined && files
    .filter(f => f.isDirectory())
    .map(dirEnt => directory + dirEnt.name + separator)
    .forEach(folder => readdirRecursively(folder, options)));
};


const testRun = (path) => {
  readdirRecursively(path);
};

testRun(basePath);

// fs.readdir(basePath, { encoding: "utf8", withFileTypes: true }, (err, files) => {
//   fs.watch(basePath, { encoding: 'utf8', recursive: true }, (eventType, filename) => {
//     if (filename) {
//       console.log(filename);
//       // Prints: <Buffer ...>
//     }
// });
//   const folders = files.filter(f => f.isDirectory()).map(dirEnt => dirEnt.name);
//   console.log("files -> ", folders);
//   folders.forEach(folder => {
//     fs.watch
//   });
// });

// fs.watch(basePath, { encoding: 'utf8', recursive: true }, (eventType, filename) => {
//   if (filename) {
//     console.log(filename);
//     // Prints: <Buffer ...>
//   }
// });