//{@ES6
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
function String_trim() { // @ret String
    return this.replace(/^\s+/, "").replace(/\s+$/, "");
}

// --- export ----------------------------------------------
Extend(global["String"], global["ES_" in global ? "ES_" : "ES"]["5"]["String"] = {
    "prototype": {
        "trim":         String_trim         // String#trim():String
    }
});

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@ES6

