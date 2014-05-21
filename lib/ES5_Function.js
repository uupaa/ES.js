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
function Function_bind(context      // @arg that context
                       /* ... */) { // @var_args Any arguments
                                    // @ret Function
    var that = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var VoidClass = function() {};

    var rv = function(/* ... */) { // @var_args Any bound arguments
                return that.apply(this instanceof VoidClass ? this : context,
                            Array.prototype.concat.call(
                                    args,
                                    Array.prototype.slice.call(arguments)));
            };

    VoidClass.prototype = that.prototype;

    rv.prototype = new VoidClass();
    return rv;
}

// --- export ----------------------------------------------
Extend(global["Function"], global["ES_" in global ? "ES_" : "ES"]["5"]["Function"] = {
    "prototype": {
        "bind":         Function_bind       // Function#bind(context:that, ...:Any):Function
    }
});

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@ES5

