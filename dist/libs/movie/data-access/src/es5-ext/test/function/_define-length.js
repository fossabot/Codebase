"use strict";
module.exports = function(t, a1) {
    var foo = "raz", bar = "dwa", fn = function(a, b) {
        return this + a + b + foo + bar;
    }, result;
    result = t(fn, 3);
    a1(result.call("marko", "el", "fe"), "markoelferazdwa", "Content");
    a1(result.length, 3, "Length");
    a1(result.prototype, fn.prototype, "Prototype");
};

//# sourceMappingURL=_define-length.js.map