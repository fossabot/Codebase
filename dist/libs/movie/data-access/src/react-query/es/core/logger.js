"use strict";
exports.getLogger = getLogger;
exports.setLogger = setLogger;
// TYPES
// FUNCTIONS
var logger = console;
function getLogger() {
    return logger;
}
function setLogger(newLogger) {
    logger = newLogger;
}

//# sourceMappingURL=logger.js.map