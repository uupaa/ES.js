//{@ES7
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
var ES7 = {
    "Object": {
        "prototype": {
//          "observe":          Object_observe,
//          "unobserve":        Object_unobserve,
        }
    },
    "Array": {
        "prototype": {
//          "observe":          Array_observe,
//          "unobserve":        Array_unobserve,
            "has":              Array_includes,
            "includes":         Array_includes,
        }
    }
};

// --- implements ------------------------------------------
// === Object ==============================================

// === Array ===============================================
function Array_includes(searchElement, // @arg Any
                        position) {    // @arg Integer = 0
                                       // @ret Boolean
    position = position || 0;
    var iz = this.length;

    if (iz === 0) {
        return false;
    }

    var i = 0;

    if (position >= 0) {
        i = position;
    } else {
        i = position + iz;
        if (i < 0) {
            i = 0;
        }
    }

    if (searchElement === searchElement) {
        for (; i < iz; ++i) {
            if (this[i] === searchElement) {
                return true;
            }
        }
    } else if (isNaN(searchElement)) {
        for (; i < iz; ++i) {
            if (isNaN(this[i])) {
                return true;
            }
        }
    } else { // maybe Symble, ... etc
        throw TypeError("Unsupported type");
    }
    return false;
}

// --- validate / assertions -------------------------------
//{@dev
//function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
//function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
global["ES_" in global ? "ES_" : "ES"]["7"] = ES7;
global["ES_" in global ? "ES_" : "ES"]["extend"](global, ES7);

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@ES7

