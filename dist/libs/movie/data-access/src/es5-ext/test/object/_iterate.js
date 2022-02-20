"use strict";
module.exports = function(t, a1) {
    var o = {
        raz: 1,
        dwa: 2,
        trzy: 3
    }, o2 = {}, o3 = {}, arr, i = -1;
    t = t("forEach");
    t(o, function(value, name, self, index) {
        o2[name] = value;
        a1(index, ++i, "Index");
        a1(self, o, "Self");
        a1(this, o3, "Scope");
    }, o3);
    a1.deep(o2, o);
    arr = [];
    o2 = {};
    i = -1;
    t(o, function(value, name, self, index) {
        arr.push(value);
        o2[name] = value;
        a1(index, ++i, "Index");
        a1(self, o, "Self");
        a1(this, o3, "Scope");
    }, o3, function(a, b) {
        return o[b] - o[a];
    });
    a1.deep(o2, o, "Sort by Values: Content");
    a1.deep(arr, [
        3,
        2,
        1
    ], "Sort by Values: Order");
};

//# sourceMappingURL=_iterate.js.map