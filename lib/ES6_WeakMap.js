//{@ES6
(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- class / interfaces ----------------------------------
function WeakMap() {
    this._index = [];
    this._value = [];
}

WeakMap["prototype"] = {
    "constructor":  WeakMap,        // new WeakMap():this
    "get":          WeakMap_get,    // WeakMap#get(key:Object, defaultValue:Any):Any
    "set":          WeakMap_set,    // WeakMap#set(key:Object, value:Any):undefined
    "has":          WeakMap_has,    // WeakMap#has(key:Object):Boolean
    "delete":       WeakMap_delete, // WeakMap#delete(key:Object):Boolean
    "clear":        WeakMap_clear   // WeakMap#clear():undefined
};

// --- implements ------------------------------------------
function WeakMap_get(key,            // @arg Object
                     defaultValue) { // @arg Any
    var index = this._index.indexOf(key);

    if (index < 0) {
        return defaultValue;
    }
    return this._value[index];
}

function WeakMap_set(key,     // @arg Object
                     value) { // @arg Any
                              // @ret undefined
    var index = this._index.indexOf(key);

    if (index < 0) {
        index = this._index.push(key);
                this._value.push(value);
    } else {
        this._value[index] = value;
    }
}

function WeakMap_has(key) { // @arg Object
                            // @ret Boolean
    return this._index.indexOf(key) >= 0;
}

function WeakMap_delete(key) { // @arg Object
                               // @ret Boolean
    var index = this._index.indexOf(key);

    if (index < 0) {
        return true;
    } else {
        this._index.splice(index, 1);
        this._value.splice(index, 1);
    }
}

function WeakMap_clear() {
    this._index = [];
    this._value = [];
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
global["WeakMap" in global ? "WeakMap_" : "WeakMap"] = WeakMap; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom ( http://git.io/WebModule )
//}@ES6

