const fs = require("fs");

function readfile() {
  fs.readFile("./read-example.txt", "utf-8", (err, data) => {
    if (err) {
      console.log("Cannot read file: ", err);
    }
    console.log("data from file: ", data);
  });
}
readfile();
