// 0100 1000 0110 1001 0010 0001
const {Buffer} = require("buffer");

const memoryContainer = Buffer.alloc(3); // 24bits / 8 => 3 bytes

memoryContainer[0] = 0b01001000;
memoryContainer[1] = 0b01101001;
memoryContainer[2] = 0b00100001;


console.log(memoryContainer);
console.log(memoryContainer.toString("hex"));
console.log(memoryContainer.toString("utf-8"));