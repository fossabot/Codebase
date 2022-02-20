/* global performance */ 'use strict';
let now;
if (global.process && process.hrtime) {
    const hrtime = process.hrtime;
    now = ()=>{
        const hr = hrtime();
        return (hr[0] * 1000000000 + hr[1]) / 1000;
    };
} else if (global.performance && performance.now) {
    const timing = performance.timing;
    const start = timing && timing.navigationStart || Date.now();
    now = ()=>(start + performance.now()) * 1000
    ;
} else {
    now = ()=>Date.now() * 1000
    ;
}
module.exports = now;

//# sourceMappingURL=now.js.map