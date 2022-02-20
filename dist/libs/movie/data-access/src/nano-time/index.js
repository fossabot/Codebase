'use strict';
const BigInt = require('big-integer');
const loadNs = process.hrtime();
const loadMs = new Date().getTime();
function nanoseconds() {
    let diffNs = process.hrtime(loadNs);
    return BigInt(loadMs).times(1000000).add(BigInt(diffNs[0]).times(1000000000).plus(diffNs[1])).toString();
}
function microseconds() {
    return BigInt(nanoseconds()).divide(1000).toString();
}
module.exports = nanoseconds;
module.exports.microseconds = module.exports.micro = microseconds;

//# sourceMappingURL=index.js.map