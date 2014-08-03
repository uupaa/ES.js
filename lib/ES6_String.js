//{@ES6
(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

var ES6_String = {
    "prototype": {
        "repeat":       String_repeat,      // String#repeat(count:Integer):String
        "reverse":      String_reverse      // String#reverse():String
    }
};

// --- class / interfaces ----------------------------------
// --- implements ------------------------------------------
function String_repeat(count) { // @arg Integer repeat count. negative is 0
                                // @ret String repeated string
                                // @desc repeat strings
    count = count | 0;
    return (this.length && count > 0) ? new Array(count + 1).join(this) : "";
}

function String_reverse() { // @ret String
                            // @desc reverse characters
    return this.split("").reverse().join("");
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
global["Extend"](global["String"],
                 global["ES_" in global ? "ES_" : "ES"]["6"]["String"] = ES6_String);

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@ES6

