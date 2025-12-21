const {Buffer} = require("buffer");

const buff = Buffer.alloc(1000, 0);
const unsafeBuffer = Buffer.allocUnsafe(10000); // No default 0
const unsafeSlowBuffer = Buffer.allocUnsafeSlow(2);
// const fillBuffer = Buffer.fill();
// const concatBuffer = Buffer.concat(    );

console.log(Buffer.poolSize >>> 1);

/*
for(let i = 0; i < unsafeBuffer.length; i++) {
    if(unsafeBuffer[i] !== 0) {
        console.log(`Element at position ${i} has the value of ${unsafeBuffer[i].toString(2)}`);
    }
}
*/

/*
for(let i = 0; i < buff.length; i++) {
    if(buff[i] !== 0) {
        console.log(`Element at position ${i} has the value of ${buff[i].toString(2)}`);
    }
}
*/

// console.log(unsafeBuffer.toString("hex"));
// console.log(unsafeBuffer);