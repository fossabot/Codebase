"use strict";
/**
 * Module dependencies.
 */ var tty = require('tty');
var util = require('util');
/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */ exports = module.exports = require('./debug');
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
/**
 * Colors.
 */ exports.colors = [
    6,
    2,
    3,
    4,
    5,
    1
];
/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */ exports.inspectOpts = Object.keys(process.env).filter(function(key) {
    return /^debug_/i.test(key);
}).reduce(function(obj, key) {
    // camel-case
    var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
        return k.toUpperCase();
    });
    // coerce string value into JS value
    var val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
    else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
    else if (val === 'null') val = null;
    else val = Number(val);
    obj[prop] = val;
    return obj;
}, {});
/**
 * The file descriptor to write the `debug()` calls to.
 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
 *
 *   $ DEBUG_FD=3 node script.js 3>debug.log
 */ var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
if (1 !== fd && 2 !== fd) {
    util.deprecate(function() {}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')();
}
var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */ function useColors() {
    return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(fd);
}
/**
 * Map %o to `util.inspect()`, all on a single line.
 */ exports.formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split('\n').map(function(str) {
        return str.trim();
    }).join(' ');
};
/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */ exports.formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
};
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    var name = this.namespace;
    var useColors1 = this.useColors;
    if (useColors1) {
        var c = this.color;
        var prefix = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m';
        args[0] = prefix + args[0].split('\n').join('\n' + prefix);
        args.push('\u001b[3' + c + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
    } else {
        args[0] = new Date().toUTCString() + ' ' + name + ' ' + args[0];
    }
}
/**
 * Invokes `util.format()` with the specified arguments and writes to `stream`.
 */ function log() {
    return stream.write(util.format.apply(util, arguments) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    if (null == namespaces) {
        // If you set a process.env field to null or undefined, it gets cast to the
        // string 'null' or 'undefined'. Just delete instead.
        delete process.env.DEBUG;
    } else {
        process.env.DEBUG = namespaces;
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    return process.env.DEBUG;
}
/**
 * Copied from `node/src/node.js`.
 *
 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
 */ function createWritableStdioStream(fd1) {
    var stream1;
    var tty_wrap = process.binding('tty_wrap');
    // Note stream._type is used for test-module-load-list.js
    switch(tty_wrap.guessHandleType(fd1)){
        case 'TTY':
            stream1 = new tty.WriteStream(fd1);
            stream1._type = 'tty';
            // Hack to have stream not keep the event loop alive.
            // See https://github.com/joyent/node/issues/1726
            if (stream1._handle && stream1._handle.unref) {
                stream1._handle.unref();
            }
            break;
        case 'FILE':
            var fs = require('fs');
            stream1 = new fs.SyncWriteStream(fd1, {
                autoClose: false
            });
            stream1._type = 'fs';
            break;
        case 'PIPE':
        case 'TCP':
            var net = require('net');
            stream1 = new net.Socket({
                fd: fd1,
                readable: false,
                writable: true
            });
            // FIXME Should probably have an option in net.Socket to create a
            // stream from an existing fd which is writable only. But for now
            // we'll just add this hack and set the `readable` member to false.
            // Test: ./node test/fixtures/echo.js < /etc/passwd
            stream1.readable = false;
            stream1.read = null;
            stream1._type = 'pipe';
            // FIXME Hack to have stream not keep the event loop alive.
            // See https://github.com/joyent/node/issues/1726
            if (stream1._handle && stream1._handle.unref) {
                stream1._handle.unref();
            }
            break;
        default:
            // Probably an error on in uv_guess_handle()
            throw new Error('Implement me. Unknown stream file type!');
    }
    // For supporting legacy API we put the FD here.
    stream1.fd = fd1;
    stream1._isStdio = true;
    return stream1;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */ function init(debug) {
    debug.inspectOpts = {};
    var keys = Object.keys(exports.inspectOpts);
    for(var i = 0; i < keys.length; i++){
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
}
/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */ exports.enable(load());

//# sourceMappingURL=node.js.map