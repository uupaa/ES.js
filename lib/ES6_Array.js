//{@ES6
(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

var ES6_Array = {
    "of":               Array_of,           // Array.of(...:Any):Array
    "from":             Array_from,         // Array.from(fakeArray:FakeArray):Array
    "prototype": {
        "entries":      Array_entries       // Array#entries()
//      "find":         Array_find,         // Array#find(callback:Function, thisArg:this):Any
//      "findIndex":    Array_findIndex,    // Array#findIndex(callback:Function, thisArg:this):Integer
    }
};

// --- class / interfaces ----------------------------------
// --- implements ------------------------------------------
function ArrayIterator(array) {
    this._data = array;
    this._index = -1;
}

ArrayIterator.prototype["next"] = ArrayIterator_next;


function Array_entries() { // @ret ArrayIterator
    return new ArrayIterator(this);
}

function ArrayIterator_next() {
    var index = ++this._index;

    if (index >= this._data.length) {
        return {
            value: undefined,
            done:  true
        };
    }
    return {
        value: [ index, this._data[index] ],
        done:  false
    };
}

function Array_of(/* ... */) { // @var_args Any values
                               // @ret AnyArray
                               // @desc Array.of(1, 2, 3) -> [1, 2, 3]
    return Array.prototype.slice.call(arguments);
}

function Array_from(fakeArray) { // @arg FakeArray Arguments or NodeList
                                 // @ret Array|NodeArray
//{@dev
    if (arguments.length !== 1) {
        throw new Error("This version Array.from did not support the 2nd and 3rd arguments.");
    }
//}@dev

    var rv = [], i = 0, iz = fakeArray.length;

    for (; i < iz; ++i) {
        rv.push(fakeArray[i]);
    }
    return rv;
}

/*
function Array_find(callback,  // @arg Function callback(value, index, array):Boolean
                    thisArg) { // @arg this = null
                               // @ret Any
    for (var i = 0, iz = this.length; i < iz; ++i) {
        var result = callback.call(thisArg, this[i], i, this);

        if (result !== undefined) {
            return result;
        }
    }
    return undefined; // not found
}
 */

/*
function Array_findIndex(callback,  // @arg Function callback(value, index, array):Boolean
                         thisArg) { // @arg this = null
                                    // @ret Integer
    for (var i = 0, iz = this.length; i < iz; ++i) {
        var result = callback.call(thisArg, this[i], i, this);

        if (result !== undefined) {
            return i;
        }
    }
    return -1; // not found
}
 */

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
                 global["ES_" in global ? "ES_" : "ES"]["6"]["Array"] = ES6_Array);

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@ES6

