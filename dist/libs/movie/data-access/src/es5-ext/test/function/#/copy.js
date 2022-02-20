"use strict";
module.exports = function(t, a1) {
    var foo = "raz", bar = "dwa";
    // eslint-disable-next-line func-names
    var fn = function marko(a, b) {
        return this + a + b + foo + bar;
    };
    var result, o = {};
    fn.prototype = o;
    fn.foo = "raz";
    result = t.call(fn);
    a1(result.length, fn.length, "Length");
    a1(result.name, fn.name, "Length");
    a1(result.call("marko", "el", "fe"), "markoelferazdwa", "Body");
    a1(result.prototype, fn.prototype, "Prototype");
    a1(result.foo, fn.foo, "Custom property");
};

//# sourceMappingURL=copy.js.map