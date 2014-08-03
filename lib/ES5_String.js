//{@ES5
(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

var ES5_String = {
    "prototype": {
        "trim":         String_trim         // String#trim():String
    }
};

// --- class / interfaces ----------------------------------
// --- implements ------------------------------------------
function String_trim() { // @ret String
    return this.replace(/^\s+/, "").replace(/\s+$/, "");
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
                 global["ES_" in global ? "ES_" : "ES"]["5"]["String"] = ES5_String);

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@ES5

