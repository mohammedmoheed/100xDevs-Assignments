const fs = require("fs");
const { resolve } = require("path");

function readfile(filePath) {
  console.log("Reading file");
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      console.log("Read opertation completed");
      resolve(data);
    });
  });
}

function writefile(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject(err);
      }
      console.log("success at writing file");
      resolve();
    });
  });
}

function cleanData(data) {
  return data.replace(/\s+/g, " ").trim();
}

async function cleanFile(file) {
  let data = await readfile(file);
  let cleandata = cleanData(data);
  await writefile(file, cleandata);
}

cleanFile("./file-cleaner.txt");
