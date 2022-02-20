'use strict';
try {
    module.exports = require('node-gyp-build')(__dirname);
} catch (e) {
    module.exports = require('./fallback');
}

//# sourceMappingURL=index.js.map