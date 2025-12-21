// const fs = require("fs/promises");

// It takes 23 sec 
// CPU usecase 100%
// Memory Usage 50MB
/*
(async () => {
    console.time("writeMany");
    const fileHandler = await fs.open("text.txt", "w");
    for (let i = 0; i <= 1000000; i++) {
        await fileHandler.write(` ${i} `);
    }
    await fileHandler.close();
    console.timeEnd("writeMany");
})()
*/

// It takes 2 sec 
// CPU usecase 100%
// Memory Usage 50MB
// const fs = require("fs");
// (async () => {
//     console.time("writeMany");
//     fs.open("text.txt", "w", (err, fd) => {
//         for (let i = 0; i <= 1000000; i++) {
//             const buff = Buffer.from(` ${i} `, "utf-8");
//             // fs.write(fd, ` ${i} `, ()=>{});
//             fs.writeSync(fd, buff);

//         }
//         console.timeEnd("writeMany");
//     });
// })()



// DON'T do it this way
// Using Streams to write to the file
// It takes 0.5 sec 
// CPU usecase 100%
// Memory Usage 30 MB (VERY HIGH)
// const fs = require("fs/promises");

// (async () => {
//     console.time("writeMany");
//     const fileHandler = await fs.open("text.txt", "w");

//     const stream = fileHandler.createWriteStream();

//     for (let i = 0; i <= 1000000; i++) {
//         const buff = Buffer.from(` ${i} \n`, "utf-8");
//         stream.write(buff);
//     }
//     await fileHandler.close();
//     console.timeEnd("writeMany");
// })()

const fs = require("fs/promises");

(async () => {
    console.time("writeMany");
    const fileHandler = await fs.open("text.txt", "w");

    const stream = fileHandler.createWriteStream();

    stream.on("close", ()=> {
        console.log("Stream was closed");
    });
    // console.log(stream.writableHighWaterMark);

    // // 8 bits = 1 byte
    // // 1000 bytes = 1 Kilobyte
    // // 1000 kilobyte = 1 megabyte

    // const buff = Buffer.alloc(65535, 10);
    // console.log(stream.write(buff));
    // console.log(stream.write(Buffer.alloc(1, "a")));
    // console.log(stream.write(Buffer.alloc(1, "a")));
    // console.log(stream.write(Buffer.alloc(1, "a")));
    // console.log(stream.write(Buffer.alloc(1, "a")));
    // console.log(stream.write(Buffer.alloc(1, "a")));
    // console.log(stream.write(Buffer.alloc(1, "a")));

    // console.log(stream.writableLength);

    // stream.on("drain", () => {
    //     console.log(stream.write(Buffer.alloc(655, "a")));
    //     console.log(stream.writableLength);
    //     console.log("We are now safe to write more");
    // });
    // console.log(buff);

    // setInterval(()=>{}, 1000);

    let i = 0;
    const numberOfWrites = 1e9;

    const writeMany = () => {
        while (i < numberOfWrites) {
            const buff = Buffer.from(` ${i} \n`);

            // This is the last write
            
            // if stream.write turns false stop the loop
            if (!stream.write(buff)) break;
            if (i === numberOfWrites - 1) {
                 return stream.end(buff); // last write to the buffer post which we cannot write
            }
            i++;
        }
    }

    writeMany();

    // resume our loop once our streams internal buffer is emptied
    stream.on("drain", () => {
        // console.log("Drained");
        writeMany();
    });

    stream.on("finish", async () => {
        await fileHandler.close();
        console.timeEnd("writeMany");
    });


})()
