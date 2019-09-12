const fs = require("fs");
const path = require("path");
const os = require("os");

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

const readdirRecursively = (directory, options) => {
  console.log(directory);
  fs.watch(directory, { encoding: "utf8", recursive: true }, (eventType, fileName) => {
    if (fileName) {
      console.log(fileName);
    }
  });
  fs.readdir(directory, options, (err, files) => files !== undefined && files
    .filter(f => f.isDirectory())
    .map(dirEnt => directory + dirEnt.name + separator)
    .forEach(folder => readdirRecursively(folder, options)));
};

readdirRecursively(basePath, { encoding: "utf8", withFileTypes: true });

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