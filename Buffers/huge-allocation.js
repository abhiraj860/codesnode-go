const {Buffer, constants} = require("buffer");

const b = Buffer.alloc(1e9); // 1,000,000,000 bytes (1 GB)

console.log(constants.MAX_LENGTH);

setInterval(()=>{
    b.fill(0x22);
}, 5000);
