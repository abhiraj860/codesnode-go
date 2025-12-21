function foo() {
    var a = arguments[0] !== (void 0) ? arguments[0] : 2;
    console.log(a);
}

foo();
foo(42);
console.log(void 0);