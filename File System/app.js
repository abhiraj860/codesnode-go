const fs = require("fs");

const content = fs.readFileSync("./txt.txt");

console.log(content.toString("utf-8"));