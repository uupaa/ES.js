//{@ES5
(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

var ES5_Function = {
    "prototype": {
        "bind":         Function_bind       // Function#bind(context:that, ...:Any):Function
    }
};

// --- class / interfaces ----------------------------------
// --- implements ------------------------------------------
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

// --- validate / assertions -------------------------------
//{@dev
//function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
//function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
global["Extend"](global["Function"],
                 global["ES_" in global ? "ES_" : "ES"]["5"]["Function"] = ES5_Function);

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@ES5

