const fs = require("fs");
const os = require("os");

const nativeRecursiveFsWatchSupport = ["darwin", "win32"];
console.log(os.platform());

if (!nativeRecursiveFsWatchSupport.includes(os.platform())) {
  // read dir asynch recursively and run watch on each directory
} else {
  fs.watch('./', { encoding: 'utf8', recursive: true }, (eventType, filename) => {
    console.log(eventType);
    if (filename) {
      console.log(filename);
      // Prints: <Buffer ...>
    }
  });
}