(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _isNodeOrNodeWebKit = !!global.global;
//var _runOnNodeWebKit =  _isNodeOrNodeWebKit &&  /native/.test(setTimeout);
//var _runOnNode       =  _isNodeOrNodeWebKit && !/native/.test(setTimeout);
//var _runOnWorker     = !_isNodeOrNodeWebKit && "WorkerLocation" in global;
//var _runOnBrowser    = !_isNodeOrNodeWebKit && "document" in global;

// --- class / interfaces ----------------------------------
var ES = {
    "5":        null,
    "6":        null,
    "7":        null,
    "extend":   extend,
//{@dev
    "repository": "https://github.com/uupaa/ES.js"
//}@dev
};

// --- implements ------------------------------------------
function extend(target,       // @arg Global
                constructors, // @arg ConstructorObject - { "Object": { keys: Object_keys, ... }, ... }
                override) {   // @arg Boolean = false
//{@dev
    if (!global["BENCHMARK"]) {
        $valid($type(constructors, "Object"),       extend, "constructors");
        $valid($type(override,     "Boolean|omit"), extend, "override");
    }
//}@dev

    override = override || false;

    for (var klass in constructors) {
        if ( !(klass in target) ) {
            target[klass] = {};
        }
        _extend(target[klass], constructors[klass], override);
    }

    function _extend(target, object, override) {
        for (var key in object) { // "keys", "prototype", ...
            if (key === "prototype") {
                // --- extend Object.property ---
                if (!(key in target)) { // target has prototype?
                    target[key] = {};   // target["prototype"] = {}
                }
                for (var prop in object[key]) {
                    _defineProperty(target[key], prop, object[key][prop], override);
                }
            } else {
                _defineProperty(target, key, object[key], override);
            }
        }
    }

    function _defineProperty(obj, key, value, override) {
        if ( override || !(key in obj) ) {
            Object.defineProperty(obj, key, {
                "configurable": true, // false is immutable
                "enumerable": false,  // false is invisible(for in loop)
                "writable": true,     // false is read-only
                "value": value
            });
        }
    }
}

// --- validate / assertions -------------------------------
//{@dev
function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if (typeof module !== "undefined") {
    module["exports"] = ES;
}
global["ES" in global ? "ES_" : "ES"] = ES; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

