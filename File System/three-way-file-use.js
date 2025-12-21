// **** Promises API ***** //
const fs = require("fs/promises");

(async ()=> {
    try {
        await fs.copyFile("file.txt", "copied-promises.txt");
    } catch (error) {
        console.log(error);
    }
})();

//**** Callback API ****//
// const fs = require("fs");
// fs.copyFile("file.txt", "copied-callback.txt", (error)=> {
//     if(error) console.log(errror);
// });


// ***** Synchronous API **** //
// const fs = require("fs");
// fs.copyFileSync("file.txt", "copied-synchronous.txt");