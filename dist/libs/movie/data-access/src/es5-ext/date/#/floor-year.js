"use strict";
var floorMonth = require("./floor-month");
module.exports = function() {
    floorMonth.call(this).setMonth(0);
    return this;
};

//# sourceMappingURL=floor-year.js.map