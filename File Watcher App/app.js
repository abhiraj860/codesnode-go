const fs = require("fs/promises");

// open (32) a file and it will give file descriptor
// read or write


(async ()=> {

    const createFile = (async (path)=> {
        try {
            // we want to check whether or we already have that file or not
            const existingFile = await fs.open(path, "r");
            // we already have the file
            existingFile.close();
            console.log(`The file exists in the path ${path}`);
        } catch (e) {
            // we don't have the file, now we should create it
            const newFileHandler = await fs.open(path, "w");
            console.log("A new file was successfully created");
            newFileHandler.close();
        }
        
        await fs.writeFile(path, "Hello This is abhiraj");
    });

    const deleteFile = async (path) => {
        try {
            const fileHandler = await fs.open(path, "r");
            fileHandler.close();
            await fs.unlink(path);
            console.log(`Deleting ${path}...`);
        } catch (e) {
            console.log(`File not present in the ${path}`);
        }
        
    }

   
    const renameFile = async (oldPath, newPath)=> {
        try {
            await fs.rename(oldPath, newPath);
            console.log(`Renamed ${oldPath} to ${newPath}`);
        } catch (e) {
            if(e.code === "ENOENT") {
                console.log("No file at this path to rename, or the destination doesn't exist");
            }
        }
        
    }

    let addedContent;
     const addToFile = async (path,content) => {
        if (addedContent === content) return;
        addedContent = content;
        try {
            const filePresent = await fs.open(path, "a");
            await filePresent.write(content);
            await filePresent.close();
            
            console.log("Content was added successfully");
        } catch (e) {
            if(e.code === "ENOENT") {
                console.log("File not present");
            }
        }
    }

    // commands
    const CREATE_FILE = "create a file$$";
    const DELETE_FILE = "delete the file$$";
    const RENAME_FILE = "rename the file$$";
    const ADD_TO_FILE = "add to the file$$";


    const commandFileHandler = await fs.open("./command.txt", "r");
    commandFileHandler.on("change", async ()=> {
         // Get the size of the file
            const size = (await commandFileHandler.stat()).size;
            // Allocate our buffer with the size of the file
            const buff = Buffer.alloc(size);
            // Location at which we want to start filling our buffer
            const offset = 0;
            // How many bytes we want to read
            const length = buff.byteLength;
            // the position that we want to start reading the file from
            const position = 0;

            // we always want to read the whole content
            await commandFileHandler.read(buff, offset, length, position);

            // Decoder 001110101 ===> meaningful
            // Encoder meaningful ===> 010101000
            const command = buff.toString("utf-8");
            const runCommand = command.includes("$$");
            // create a file:
            // create a file <path>
            if(command.includes(CREATE_FILE) && runCommand) {
                const filePath = command.substring(CREATE_FILE.length + 1);
                createFile(filePath);
            }

            // delete file 
            // delete a file <path>
            if(command.includes(DELETE_FILE) && runCommand) {
                const filePath = command.substring(DELETE_FILE.length + 1);
                deleteFile(filePath);
            }

            // rename file:
            // rename the file path <path> to <new-path>
            if(command.includes(RENAME_FILE) && runCommand) {
                const _idx = command.indexOf(" to ");
                const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
                const newFilePath = command.substring(_idx + 4);

                renameFile(oldFilePath, newFilePath);
            }

            // add to file:
            // add to file <path> this content: <content>
            if(command.includes(ADD_TO_FILE) && runCommand) {
                const _idx = command.indexOf(" this content ");
                const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
                const content = command.substring(_idx + 14);
                addToFile(filePath, content);
            }
    });

    // Watcher....
    const watcher = fs.watch("./command.txt");
    for await (const event of watcher) {
        if (event.eventType === "change") {
            commandFileHandler.emit("change");   
        }
    }
})();