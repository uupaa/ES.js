//{@ES5
(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

var ES5_Object = {
    "keys":             Object_keys,        // Object.keys(obj:Any):Array
    "freeze":           function() { }      // Object.freeze(obj:Object):void
};

// --- class / interfaces ----------------------------------
// --- implements ------------------------------------------
function Object_keys(obj) { // @arg Object|Function|Array
                            // @ret KeyStringArray [key, ... ]
    var rv = [], key, i = 0;

    // [IE6][IE7][IE8] host-objects has not hasOwnProperty
    if ( !("hasOwnProperty" in obj) ) {
        for (key in obj) {
            rv[i++] = key;
        }
    } else {
        for (key in obj) {
            if ( obj["hasOwnProperty"](key) ) {
                rv[i++] = key;
            }
        }
    }
    return rv;
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
global["Extend"](global["Object"],
                 global["ES_" in global ? "ES_" : "ES"]["5"]["Object"] = ES5_Object);

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@ES5

