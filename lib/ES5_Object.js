//{@ES5
(function(global) {
"use strict";

// --- dependency module -----------------------------------
var Extend = global["Extend"] || require("uupaa.extend.js");

// --- local variable --------------------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
// --- implement -------------------------------------------
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

// --- export ----------------------------------------------
Extend(global["Object"], global["ES_" in global ? "ES_" : "ES"]["5"]["Object"] = {
    "keys":             Object_keys,        // Object.keys(obj:Any):Array
    "freeze":           function() { }      // Object.freeze(obj:Object):void
});

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@ES5

