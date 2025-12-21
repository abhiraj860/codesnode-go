const fs = require("node:fs/promises");
const {pipeline} = require("node:stream");

// Memory usage is around the same size of the file
// Execution time is 85 ms
// (async () => {
//     console.time("copy");
//     const destFile = await fs.open("text-copy.txt", "w");
//     const results = await fs.readFile("text.txt");
//     await destFile.write(results);
//     console.timeEnd("copy");
// })();

// Streaming solution
// Memory usage is very less than the same size of the file
// Execution time is 157 ms
// (async () => {
//     console.time("copy");

//     const srcFile = await fs.open("text.txt", "r");
//     const destFile = await fs.open("text-copy.txt", "w");

//     let bytesRead = -1;
//     while (bytesRead !== 0) {
//         const readResult = await srcFile.read();
//         bytesRead = readResult.bytesRead;
//         if(bytesRead !== 16384) {
//             const indexOfNotFilled = readResult.buffer.indexOf(0);
//             const newBuffer = Buffer.alloc(indexOfNotFilled);
//             readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);
//             destFile.write(newBuffer); 
//         } else {
//             destFile.write(readResult.buffer);
//         }
//     }

//     console.timeEnd("copy");
// })();


// Piping solution
// Memory usage is very less than the same size of the file
// Execution time is 100.118 ms
// (async () => {
//     console.time("copy");

//     const srcFile = await fs.open("text.txt", "r");
//     const destFile = await fs.open("text-copy.txt", "w");

//     const readStream =  await srcFile.createReadStream();
//     const writeStream = await destFile.createWriteStream();

//     readStream.pipe(writeStream);

//     readStream.on("end", ()=> {
//         console.timeEnd("copy");
//     });
    

// })();


(async () => {
    console.time("copy");

    const srcFile = await fs.open("text.txt", "r");
    const destFile = await fs.open("text-copy.txt", "w");

    const readStream =  await srcFile.createReadStream();
    const writeStream = await destFile.createWriteStream();

    pipeline(readStream, writeStream, (err)=> {
        console.log(err);
        console.timeEnd("copy");
    })
    

})();