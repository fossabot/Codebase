/* eslint no-eval: "off" */ "use strict";
module.exports = function(t, a1) {
    a1.deep(t.call(function(a, b) {
        return this[a] + this[b];
    }), {
        args: "a, b",
        body: " return this[a] + this[b]; "
    });
    a1.deep(t.call(function() {}), {
        args: "",
        body: ""
    });
    // eslint-disable-next-line no-unused-vars
    a1.deep(t.call(function(raz) {}), {
        args: "raz",
        body: ""
    });
    a1.deep(t.call(function() {
        Object();
    }), {
        args: "",
        body: " Object(); "
    });
    try {
        eval("(() => {})");
    } catch (e) {
        // Non ES2015 env
        return;
    }
    a1.deep(t.call(eval("(() => {})")), {
        args: "",
        body: ""
    });
    a1.deep(t.call(eval("((elo) => foo)")), {
        args: "elo",
        body: "foo"
    });
    a1.deep(t.call(eval("(elo => foo)")), {
        args: "elo",
        body: "foo"
    });
    a1.deep(t.call(eval("((elo, bar) => foo())")), {
        args: "elo, bar",
        body: "foo()"
    });
};

//# sourceMappingURL=to-string-tokens.js.map