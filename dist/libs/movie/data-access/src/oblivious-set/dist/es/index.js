"use strict";
exports.removeTooOldValues = removeTooOldValues;
exports.now = now;
exports.ObliviousSet = void 0;
/**
 * this is a set which automatically forgets
 * a given entry when a new entry is set and the ttl
 * of the old one is over
 */ var ObliviousSet = /** @class */ function() {
    function ObliviousSet1(ttl) {
        this.ttl = ttl;
        this.set = new Set();
        this.timeMap = new Map();
    }
    ObliviousSet1.prototype.has = function(value) {
        return this.set.has(value);
    };
    ObliviousSet1.prototype.add = function(value) {
        var _this = this;
        this.timeMap.set(value, now());
        this.set.add(value);
        /**
         * When a new value is added,
         * start the cleanup at the next tick
         * to not block the cpu for more important stuff
         * that might happen.
         */ setTimeout(function() {
            removeTooOldValues(_this);
        }, 0);
    };
    ObliviousSet1.prototype.clear = function() {
        this.set.clear();
        this.timeMap.clear();
    };
    return ObliviousSet1;
}();
exports.ObliviousSet = ObliviousSet;
function removeTooOldValues(obliviousSet) {
    var olderThen = now() - obliviousSet.ttl;
    var iterator = obliviousSet.set[Symbol.iterator]();
    /**
     * Because we can assume the new values are added at the bottom,
     * we start from the top and stop as soon as we reach a non-too-old value.
     */ while(true){
        var value = iterator.next().value;
        if (!value) {
            return; // no more elements
        }
        var time = obliviousSet.timeMap.get(value);
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
} //# sourceMappingURL=index.js.map

//# sourceMappingURL=index.js.map