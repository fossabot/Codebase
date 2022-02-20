"use strict";
var module = require('./index.es5.js');
var BroadcastChannel = module.BroadcastChannel;
var createLeaderElection = module.createLeaderElection;
window['BroadcastChannel2'] = BroadcastChannel;
window['createLeaderElection'] = createLeaderElection;

//# sourceMappingURL=browserify.index.js.map