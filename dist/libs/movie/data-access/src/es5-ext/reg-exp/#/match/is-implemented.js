"use strict";
var re = /foo/;
module.exports = function() {
    if (typeof re.match !== "function") return false;
    return re.match("barfoobar") && !re.match("elo");
};

//# sourceMappingURL=is-implemented.js.map