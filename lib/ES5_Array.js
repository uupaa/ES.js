//{@ES5
(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

var ES5_Array = {
    "isArray":          Array_isArray,      // Array.isArray(obj:Any):Boolean
    "prototype": {
        "indexOf":      Array_indexOf,      // Array#indexOf(obj:Any, index:Integer = 0):Integer
        "lastIndexOf":  Array_lastIndexOf,  // Array#lastIndexOf(obj:Any, index:Integer = 0):Integer
        "forEach":      Array_forEach,      // Array#forEach(fn:Function, that:this):void
        "map":          Array_map,          // Array#map(fn:Function, that:this):Array
        "some":         Array_some,         // Array#some(fn:Function, that:this):Boolean
        "every":        Array_every,        // Array#every(fn:Function, that:this):Boolean
        "filter":       Array_filter,       // Array#filter(fn:Function, that:this):Array
        "reduce":       Array_reduce,       // Array#reduce(fn:Function, initialValue:Any):Any
        "reduceRight":  Array_reduceRight   // Array#reduceRight(fn:Function, initialValue:Any):Any
    }
};

// --- class / interfaces ----------------------------------
// --- implements ------------------------------------------
function Array_isArray(obj) { // @arg Any
                              // @ret Boolean
    return Object.prototype.toString.call(obj) === "[object Array]";
}

function Array_indexOf(obj,     // @arg Any - search element
                       index) { // @arg Integer = 0 - from index
                                // @ret Integer - found index or -1
    var i = index || 0, iz = this.length;

    i = (i < 0) ? i + iz : i;
    for (; i < iz; ++i) {
        if (i in this && this[i] === obj) {
            return i;
        }
    }
    return -1;
}

function Array_lastIndexOf(obj,     // @arg Any - search element
                           index) { // @arg Integer = this.length - from index
                                    // @ret Integer - found index or -1
    var i = index, iz = this.length;

    i = (i < 0) ? i + iz + 1 : iz;
    while (--i >= 0) {
        if (i in this && this[i] === obj) {
            return i;
        }
    }
    return -1;
}

function Array_forEach(fn,     // @arg Function
                       that) { // @arg this = undefined - fn this
    var i = 0, iz = this.length;

    for (; i < iz; ++i) {
        if (i in this) {
            fn.call(that, this[i], i, this);
        }
    }
}

function Array_map(fn,     // @arg Function
                   that) { // @arg this = undefined - fn this
                           // @ret Array [element, ... ]
    var rv = [];
    var i = 0, iz = this.length;

    for (; i < iz; ++i) {
        if (i in this) {
            rv[i] = fn.call(that, this[i], i, this);
        }
    }
    return rv;
}

function Array_some(fn,     // @arg Function
                    that) { // @arg this = undefined - fn this
                            // @ret Boolean
    var i = 0, iz = this.length;

    for (; i < iz; ++i) {
        if (i in this && fn.call(that, this[i], i, this)) {
            return true;
        }
    }
    return false;
}

function Array_every(fn,     // @arg Function
                     that) { // @arg this = undefined - fn this
                             // @ret Boolean
    var i = 0, iz = this.length;

    for (; i < iz; ++i) {
        if (i in this && !fn.call(that, this[i], i, this)) {
            return false;
        }
    }
    return true;
}

function Array_filter(fn,     // @arg Function
                      that) { // @arg this = undefined - fn this
                              // @ret Array [value, ... ]
    var rv = [];
    var value;
    var i = 0, iz = this.length;

    for (; i < iz; ++i) {
        if (i in this) {
            value = this[i];
            if (fn.call(that, value, i, this)) {
                rv.push(value);
            }
        }
    }
    return rv;
}

function Array_reduce(fn,             // @arg Function
                      initialValue) { // @arg Any = undefined - initial value
                                      // @ret Any
//{@dev
    if (!this.length && initialValue === undefined) {
        throw new TypeError("Reduce of empty array with no initial value");
    }
//}@dev

    var rv = initialValue;
    var i  = 0;
    var iz = this.length;

    if (rv === undefined) {
        for (; i < iz; ++i) {
            if (i in this) {
                rv = this[i++];
                break;
            }
        }
    }

    for (; i < iz; ++i) {
        if (i in this) {
            rv = fn(rv, this[i], i, this);
        }
    }
    return rv;
}

function Array_reduceRight(fn,             // @arg Function
                           initialValue) { // @arg Any = undefined - initial value
                                           // @ret Any
//{@dev
    if (!this.length && initialValue === undefined) {
        throw new TypeError("Reduce of empty array with no initial value");
    }
//}@dev

    var rv = initialValue;
    var i  = this.length - 1;

    if (rv === undefined) {
        for (; i >= 0; --i) {
            if (i in this) {
                rv = this[i--];
                break;
            }
        }
    }

    for (; i >= 0; --i) {
        if (i in this) {
            rv = fn(rv, this[i], i, this);
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
global["Extend"](global["Array"],
                 global["ES_" in global ? "ES_" : "ES"]["5"]["Array"] = ES5_Array);

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@ES5

