"use strict";
exports.chooseMethod = chooseMethod;
var _nativeJs = require("./methods/native.js");
var _indexedDbJs = require("./methods/indexed-db.js");
var _localstorageJs = require("./methods/localstorage.js");
var _simulateJs = require("./methods/simulate.js");
var _util = require("./util");
// order is important
const METHODS = [
    _nativeJs.default,
    _indexedDbJs.default,
    _localstorageJs.default
];
/**
 * The NodeMethod is loaded lazy
 * so it will not get bundled in browser-builds
 */ if (_util.isNode) {
    /**
     * we use the non-transpiled code for nodejs
     * because it runs faster
     */ const NodeMethod = require('../../src/methods/' + // use this hack so that browserify and others
    // do not import the node-method by default
    // when bundling.
    'node.js');
    /**
     * this will be false for webpackbuilds
     * which will shim the node-method with an empty object {}
     */ if (typeof NodeMethod.canBeUsed === 'function') {
        METHODS.push(NodeMethod);
    }
}
function chooseMethod(options) {
    let chooseMethods = [].concat(options.methods, METHODS).filter(Boolean);
    // directly chosen
    if (options.type) {
        if (options.type === 'simulate') {
            // only use simulate-method if directly chosen
            return _simulateJs.default;
        }
        const ret = chooseMethods.find((m)=>m.type === options.type
        );
        if (!ret) throw new Error('method-type ' + options.type + ' not found');
        else return ret;
    }
    /**
     * if no webworker support is needed,
     * remove idb from the list so that localstorage is been chosen
     */ if (!options.webWorkerSupport && !_util.isNode) {
        chooseMethods = chooseMethods.filter((m)=>m.type !== 'idb'
        );
    }
    const useMethod = chooseMethods.find((method)=>method.canBeUsed()
    );
    if (!useMethod) throw new Error('No useable methode found:' + JSON.stringify(METHODS.map((m)=>m.type
    )));
    else return useMethod;
}

//# sourceMappingURL=method-chooser.js.map