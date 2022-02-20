/* eslint no-useless-call: "off" */ // Taken from: https://github.com/mathiasbynens/String.prototype.codePointAt
//             /blob/master/tests/tests.js
"use strict";
module.exports = function(t, a) {
    a(t.length, 1, "Length");
    // String that starts with a BMP symbol
    a(t.call("abc\uD834\uDF06def", ""), 97);
    a(t.call("abc\uD834\uDF06def", "_"), 97);
    a(t.call("abc\uD834\uDF06def"), 97);
    a(t.call("abc\uD834\uDF06def", -Infinity), undefined);
    a(t.call("abc\uD834\uDF06def", -1), undefined);
    a(t.call("abc\uD834\uDF06def", -0), 97);
    a(t.call("abc\uD834\uDF06def", 0), 97);
    a(t.call("abc\uD834\uDF06def", 3), 119558);
    a(t.call("abc\uD834\uDF06def", 4), 57094);
    a(t.call("abc\uD834\uDF06def", 5), 100);
    a(t.call("abc\uD834\uDF06def", 42), undefined);
    a(t.call("abc\uD834\uDF06def", Infinity), undefined);
    a(t.call("abc\uD834\uDF06def", Infinity), undefined);
    a(t.call("abc\uD834\uDF06def", NaN), 97);
    a(t.call("abc\uD834\uDF06def", false), 97);
    a(t.call("abc\uD834\uDF06def", null), 97);
    a(t.call("abc\uD834\uDF06def", undefined), 97);
    // String that starts with an astral symbol
    a(t.call("\uD834\uDF06def", ""), 119558);
    a(t.call("\uD834\uDF06def", "1"), 57094);
    a(t.call("\uD834\uDF06def", "_"), 119558);
    a(t.call("\uD834\uDF06def"), 119558);
    a(t.call("\uD834\uDF06def", -1), undefined);
    a(t.call("\uD834\uDF06def", -0), 119558);
    a(t.call("\uD834\uDF06def", 0), 119558);
    a(t.call("\uD834\uDF06def", 1), 57094);
    a(t.call("\uD834\uDF06def", 42), undefined);
    a(t.call("\uD834\uDF06def", false), 119558);
    a(t.call("\uD834\uDF06def", null), 119558);
    a(t.call("\uD834\uDF06def", undefined), 119558);
    // Lone high surrogates
    a(t.call("\uD834abc", ""), 55348);
    a(t.call("\uD834abc", "_"), 55348);
    a(t.call("\uD834abc"), 55348);
    a(t.call("\uD834abc", -1), undefined);
    a(t.call("\uD834abc", -0), 55348);
    a(t.call("\uD834abc", 0), 55348);
    a(t.call("\uD834abc", false), 55348);
    a(t.call("\uD834abc", NaN), 55348);
    a(t.call("\uD834abc", null), 55348);
    a(t.call("\uD834abc", undefined), 55348);
    // Lone low surrogates
    a(t.call("\uDF06abc", ""), 57094);
    a(t.call("\uDF06abc", "_"), 57094);
    a(t.call("\uDF06abc"), 57094);
    a(t.call("\uDF06abc", -1), undefined);
    a(t.call("\uDF06abc", -0), 57094);
    a(t.call("\uDF06abc", 0), 57094);
    a(t.call("\uDF06abc", false), 57094);
    a(t.call("\uDF06abc", NaN), 57094);
    a(t.call("\uDF06abc", null), 57094);
    a(t.call("\uDF06abc", undefined), 57094);
    a.throws(function() {
        t.call(undefined);
    }, TypeError);
    a.throws(function() {
        t.call(undefined, 4);
    }, TypeError);
    a.throws(function() {
        t.call(null);
    }, TypeError);
    a.throws(function() {
        t.call(null, 4);
    }, TypeError);
    a(t.call(42, 0), 52);
    a(t.call(42, 1), 50);
    a(t.call({
        toString: function() {
            return "abc";
        }
    }, 2), 99);
    a.throws(function() {
        t.apply(undefined);
    }, TypeError);
    a.throws(function() {
        t.apply(undefined, [
            4
        ]);
    }, TypeError);
    a.throws(function() {
        t.apply(null);
    }, TypeError);
    a.throws(function() {
        t.apply(null, [
            4
        ]);
    }, TypeError);
    a(t.apply(42, [
        0
    ]), 52);
    a(t.apply(42, [
        1
    ]), 50);
    a(t.apply({
        toString: function() {
            return "abc";
        }
    }, [
        2
    ]), 99);
};

//# sourceMappingURL=shim.js.map