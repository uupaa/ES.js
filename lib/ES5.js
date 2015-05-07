//{@ES5
(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _isNodeOrNodeWebKit = !!global.global;
//var _runOnNodeWebKit =  _isNodeOrNodeWebKit &&  /native/.test(setTimeout);
//var _runOnNode       =  _isNodeOrNodeWebKit && !/native/.test(setTimeout);
//var _runOnWorker     = !_isNodeOrNodeWebKit && "WorkerLocation" in global;
//var _runOnBrowser    = !_isNodeOrNodeWebKit && "document" in global;

// --- class / interfaces ----------------------------------
var ES5 = {
    "Object": {
        "keys":             Object_keys,        // Object.keys(obj:Any):Array
        "create":           Object_create,      // Object.create(proto:Object, properties:Object):Object
        "seal":             function(o) { return o; },      // Object.seal(obj:Object):Object
        "freeze":           function(o) { return o; },      // Object.freeze(obj:Object):Object
        "isFrozen":         function(o) { return false; },  // Object.isFrozen(obj:Object):Boolean
        "isSealed":         function(o) { return false; },  // Object.isSealed(obj:Object):Boolean
        "isExtensible":     function(o) { return true; },   // Object.isExtensible(obj:Object):Boolean
        "preventExtensions":function(o) { return o; },      // Object.preventExtensions(obj:Object):Object
    },
    "String": {
        "prototype": {
            "trim":         String_trim,        // String#trim():String
        }
    },
    "Date": {
        "now":              Date_now,           // Date.now():Integer
        "prototype": {
            "toJSON":       Date_toJSON,        // Date#toJSON():JSONObject
        }
    },
    "Function": {
        "prototype": {
            "bind":         Function_bind,      // Function#bind(context:that, ...:Any):Function
        }
    },
    "JSON": {
        "parse":            JSON_parse,         // JSON.parse(str:String):Any
        "stringify":        JSON_stringify,     // JSON.stringify(obj:Any):Object
    },
    "Array": {
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
    }
};

// --- implements ------------------------------------------
// === Object ==============================================
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

function Object_create(obj,          // @arg Object
                       properties) { // @arg Object = null;
                                     // @ret Object - new Object
    function VoidClass() {}
    VoidClass.prototype = obj;

    var result = new VoidClass();

    if (properties) {
        Object.defineProperties(result, properties);
    }
    return result;
}

// === String ==============================================
function String_trim() { // @ret String
    return this.replace(/^\s+/, "").replace(/\s+$/, "");
}

// === Date ================================================
function Date_now() { // @ret Integer - milli seconds
    return +new Date();
}

function Date_toJSON() { // @ret String - "2000-01-01T00:00:00.000Z"
    var dy = this["getUTCFullYear"]();         // 1970 -
    var dm = this["getUTCMonth"]() + 1;        //    1 - 12
    var dd = this["getUTCDate"]();             //    1 - 31
    var th = this["getUTCHours"]();            //    0 - 23
    var tm = this["getUTCMinutes"]();          //    0 - 59
    var ts = this["getUTCSeconds"]();          //    0 - 59
    var tms = this["getUTCMilliseconds"]();    //    0 - 999

    return dy + "-" + (dm < 10 ? "0" : "") + dm + "-" +
                      (dd < 10 ? "0" : "") + dd + "T" +
                      (th < 10 ? "0" : "") + th + ":" +
                      (tm < 10 ? "0" : "") + tm + ":" +
                      (ts < 10 ? "0" : "") + ts + "." +
                      ("00" + tms).slice(-3) + "Z";
}

// === Function ============================================
function Function_bind(context      // @arg that - context
                       /* ... */) { // @var_args Any - arguments
                                    // @ret Function
    var that = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var VoidClass = function() {};

    var rv = function(/* ... */) { // @var_args Any - bound arguments
                return that.apply(this instanceof VoidClass ? this : context,
                            Array.prototype.concat.call(
                                    args,
                                    Array.prototype.slice.call(arguments)));
            };

    VoidClass.prototype = that.prototype;

    rv.prototype = new VoidClass();
    return rv;
}

// === JSON ================================================
function JSON_parse(jsonString) { // @arg String - JSON String
                                  // @ret Any
                                  // @throw SyntaxError("Unexpected token: ...")
    var unescaped = jsonString.trim().replace(/"(\\.|[^"\\])*"/g, "");

    if (/[^,:{}\[\]0-9\.\-+Eaeflnr-u \n\r\t]/.test(unescaped)) {
        throw new SyntaxError("Unexpected token:" + jsonString);
    }
    return (new Function("return " + jsonString))(); // raise error
}

function JSON_stringify(obj) { // @arg Any
                               // @ret JSONString
                               // @see http://developer.mozilla.org/En/Using_native_JSON
                               // @throw TypeError("Converting circular structure to JSON")
    return _jsonStringify(obj, 0);
}

function _jsonStringify(value,   // @arg Any
                        depth) { // @arg Number
                                 // @ret String
                                 // @recursive
    if (depth >= 100) {
        throw new TypeError("Converting circular structure to JSON");
    }
    switch ( Object.prototype.toString.call(value) ) {
    case "[object Null]":   return "null";
    case "[object Boolean]":
    case "[object Number]": return "" + value;
    case "[object Date]":   return value["toJSON"]();
    case "[object String]": return '"' + _jsonString(value) + '"';
    case "[object Array]":  return "[" + _jsonArray(value, depth).join(",") + "]";
    case "[object Object]": return "{" + _jsonObject(value, depth).join(",") + "}";
    }
    return "";
}

function _jsonArray(value, depth) {
    var rv = [];

    for (var i = 0, iz = value.length; i < iz; ++i) {
        rv.push( _jsonStringify(value[i], depth + 1) );
    }
    return rv;
}

function _jsonObject(value, depth) {
    var rv = [];
    var ary = Object.keys(value);

    for (var i = 0, iz = ary.length; i < iz; ++i) { // uupaa-looper
        rv.push('"' + _jsonString( ary[i] ) + '":' +
                      _jsonStringify(value[ ary[i] ], depth + 1));
    }
    return rv;
}

function _jsonString(str) {
    var JSON_ESCAPE = {
            '\b': '\\b',    // backspace       U+0008
            '\t': '\\t',    // tab             U+0009
            '\n': '\\n',    // line feed       U+000A
            '\f': '\\f',    // form feed       U+000C
            '\r': '\\r',    // carriage return U+000D
            '"':  '\\"',    // quotation mark  U+0022
            '\\': '\\\\'    // reverse solidus U+005C
        };

    return str.replace(/(?:[\b\t\n\f\r\"]|\\)/g, function(_) {
                return JSON_ESCAPE[_];
            }).replace(/(?:[\x00-\x1f])/g, function(_) {
                return "\\u00" + ("0" + _.charCodeAt(0).toString(16)).slice(-2);
            });
}

// === Array ===============================================
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
    if (!global["BENCHMARK"]) {
        if (!this.length && initialValue === undefined) {
            throw new TypeError("Reduce of empty array with no initial value");
        }
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
    if (!global["BENCHMARK"]) {
        if (!this.length && initialValue === undefined) {
            throw new TypeError("Reduce of empty array with no initial value");
        }
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
global["JSON"] = global["JSON"] || {};

global["ES_" in global ? "ES_" : "ES"]["5"] = ES5;
global["ES_" in global ? "ES_" : "ES"]["extend"](global, ES5);

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@ES5

