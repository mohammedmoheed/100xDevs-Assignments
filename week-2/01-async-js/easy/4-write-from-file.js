const fs = require("fs");

function writefile() {
  fs.writeFile("./example.txt", "hi moheed here", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("successfully written to the file");
  });
}
writefile();
