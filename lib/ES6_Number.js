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
// --- implement -------------------------------------------
function Number_isNaN(any) { // @arg Any
                             // @ret Boolean
    return typeof any === "number" && global.isNaN(any);
}

function Number_isFinite(any) { // @arg Any
                                // @ret Boolean
    return typeof any === "number" && global.isFinite(any);
}

function Number_isInteger(any) { // @arg Any
                                 // @ret Boolean
                                 // @desc is integer
    return typeof any === "number" && global.isFinite(any) &&
                  any > -0x20000000000000 &&
                  any <  0x20000000000000 &&
                  Math.floor(any) === any;
}

function Number_toInteger(any) { // @arg Any
                                 // @ret Integer
                                 // @desc to integer
    var num = +any;

    if (num !== num) { // isNaN(num)
        return +0;
    }
    if (num === 0 || !global.isFinite(num)) {
        return num;
    }
    return (num < 0 ? -1 : 1) * Math.floor(Math.abs(num));
}

// --- export ----------------------------------------------
Extend(global["Number"], global["ES_" in global ? "ES_" : "ES"]["6"]["Number"] = {
    "isNaN":            Number_isNaN,       // Number.isNaN(any:Any):Boolean
    "isFinite":         Number_isFinite,    // Number.isFinite(any:Any):Boolean
    "isInteger":        Number_isInteger,   // Number.isInteger(any:Any):Boolean
    "toInteger":        Number_toInteger    // Number.toInteger(any:Any):Integer
});

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@ES6

