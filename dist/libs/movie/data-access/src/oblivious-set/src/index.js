"use strict";
exports.removeTooOldValues = removeTooOldValues;
exports.now = now;
let ObliviousSet = class ObliviousSet {
    has(value) {
        return this.set.has(value);
    }
    add(value) {
        this.timeMap.set(value, now());
        this.set.add(value);
        /**
         * When a new value is added,
         * start the cleanup at the next tick
         * to not block the cpu for more important stuff
         * that might happen.
         */ setTimeout(()=>{
            removeTooOldValues(this);
        }, 0);
    }
    clear() {
        this.set.clear();
        this.timeMap.clear();
    }
    constructor(ttl){
        this.ttl = ttl;
        this.set = new Set();
        this.timeMap = new Map();
    }
};
exports.ObliviousSet = ObliviousSet;
function removeTooOldValues(obliviousSet) {
    const olderThen = now() - obliviousSet.ttl;
    const iterator = obliviousSet.set[Symbol.iterator]();
    /**
     * Because we can assume the new values are added at the bottom,
     * we start from the top and stop as soon as we reach a non-too-old value.
     */ while(true){
        const value = iterator.next().value;
        if (!value) {
            return; // no more elements
        }
        const time = obliviousSet.timeMap.get(value);
        if (time < olderThen) {
            obliviousSet.timeMap.delete(value);
            obliviousSet.set.delete(value);
        } else {
            // We reached a value that is not old enough
            return;
        }
    }
}
function now() {
    return new Date().getTime();
}

//# sourceMappingURL=index.js.map