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

// --- export ----------------------------------------------
Extend(global["String"], global["ES_" in global ? "ES_" : "ES"]["6"]["String"] = {
    "prototype": {
        "repeat":       String_repeat,      // String#repeat(count:Integer):String
        "reverse":      String_reverse      // String#reverse():String
    }
});

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@ES6

