const EventEmitter = require("events");

class Emitter extends EventEmitter {}

const myE = new Emitter();

myE.on("foo", () => {
    console.log("1. An Event occurred");
});

myE.on("foo", () => {
    console.log("2. An Event occurred");
});

myE.once("foo", (x)=> {
    console.log("An Event occurred with parameter:");
    console.log(x);
});

// myE.once("bar", ()=> {
//     console.log("An event occurred bar");
// });



myE.emit("foo");
myE.emit("foo", "some text");
myE.emit("foo", "some text");
myE.emit("foo", "some text");
myE.emit("foo", "some text");

// myE.emit("bar");
// myE.emit("bar");
// myE.emit("bar");
// myE.emit("bar");
// myE.emit("bar");
// myE.emit("bar");

