// @name: ES.js
// @require: Extend.js
// @cutoff: @node @ie

(function(global) {
"use strict";

// --- variable --------------------------------------------
var Extend = global["Extend"] || require("uupaa.extend.js");

var _inNode = "process" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function ES(version) { // @arg Number(= 5.0): polyfill version number.
    switch (version || 5.0) {
    case 6.0:
        Extend(global, ES["6"]);
        Extend(global, ES["5"]);
        break;
    case 5.1:
    case 5.0:
        Extend(global, ES["5"]);
        break;
    }

//{@ie
    if (!Object.name) {
        Extend(global, ES["ClassName"]);
    }
    _bugFix();
//}@ie
}

ES["repository"] = "https://github.com/uupaa/ES.js";
ES["5"] = {
    "Object": {
        "keys":             Object_keys,        // Object.keys(obj:Any):Array
        "freeze":           function() { }      // Object.freeze(obj:Object):void
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
    },
    "String": {
        "prototype": {
            "trim":         String_trim         // String#trim():String
        }
    },
    "Function": {
        "prototype": {
            "bind":         Function_bind       // Function#bind(context:that, ...:Any):Function
        }
    },
    "Date": {
        "now":              Date_now,           // Date.now():Integer
        "prototype": {
            "toJSON":       Date_toJSON         // Date#toJSON():JSONObject
        }
    },
    "JSON": {
        "parse":            JSON_parse,         // JSON.parse(str:String):Any
        "stringify":        JSON_stringify      // JSON.stringify(obj:Any):Object
    }
};

ES["6"] = {
    "Array": {
        "of":               Array_of,           // Array.of(...:Any):Array
        "from":             Array_from,         // Array.from(fakeArray:FakeArray):Array
        "prototype": {
            "entries":      Array_entries       // Array#entries()
//          "find":         Array_find,         // Array#find(callback:Function, thisArg:this):Any
//          "findIndex":    Array_findIndex,    // Array#findIndex(callback:Function, thisArg:this):Integer
        }
    },
    "String": {
        "prototype": {
            "repeat":       String_repeat,      // String#repeat(count:Integer):String
            "reverse":      String_reverse      // String#reverse():String
        }
    },
    "Number": {
        "isNaN":            Number_isNaN,       // Number.isNaN(any:Any):Boolean
        "isFinite":         Number_isFinite,    // Number.isFinite(any:Any):Boolean
        "isInteger":        Number_isInteger,   // Number.isInteger(any:Any):Boolean
        "toInteger":        Number_toInteger    // Number.toInteger(any:Any):Integer
    }
};

//{@ie Fallback Native Class name properties.
ES["ClassName"] = {
    "Object":       { "name": "Object"      },
    "Array":        { "name": "Array"       },
    "String":       { "name": "String"      },
    "Function":     { "name": "Function"    },
    "Date":         { "name": "Date"        },
    "JSON":         { "name": "JSON"        },
    "Error":        { "name": "Error"       },
    "Number":       { "name": "Number"      },
    "RegExp":       { "name": "RegExp"      },
    "Boolean":      { "name": "Boolean"     },
    "TypeError":    { "name": "TypeError"   },
    "SyntaxError":  { "name": "SyntaxError" }
};
//}@ie

function ArrayIterator(array) {
    this._data = array;
    this._index = -1;
}
ArrayIterator.prototype["next"] = ArrayIterator_next;

// --- implement -------------------------------------------
//{@ie
function _bugFix() {
// [IE8] force override Date#toJSON implement
// (new Date()).toJSON() -> "2012-09-16T21:53:39Z"
//                       -> "2012-09-16T21:53:39.000Z" (supply Milliseconds)
    if (Date.prototype["toJSON"] && new Date()["toJSON"]().length < 24) {
        Date.prototype["toJSON"] = Date_toJSON;
    }
}
//}@ie

// --- Object ----------------------------------------------
function Object_keys(obj) { // @arg Object/Function/Array:
                            // @ret KeyStringArray: [key, ... ]
                            // @help: Object.keys
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

// --- Array -----------------------------------------------
function Array_isArray(obj) { // @arg Any:
                              // @ret Boolean:
                              // @help: Array.isArray
    return Object.prototype.toString.call(obj) === "[object Array]";
}

function Array_of(/* ... */) { // @var_args Any: values
                               // @ret AnyArray:
                               // @desc: Array.of(1, 2, 3) -> [1, 2, 3]
                               // @help: Array.of
    return Array.prototype.slice.call(arguments);
}

function Array_from(fakeArray) { // @arg FakeArray: Arguments or NodeList
                                 // @ret Array/NodeArray:
                                 // @help: Array.from
//{@assert
    if (arguments.length !== 1) {
        throw new Error("This version Array.from did not support the 2nd and 3rd arguments.");
    }
//}@assert

    var rv = [], i = 0, iz = fakeArray.length;

    for (; i < iz; ++i) {
        rv.push(fakeArray[i]);
    }
    return rv;
}

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

/*
function Array_find(callback,  // @arg Function: callback(value, index, array):Boolean
                    thisArg) { // @arg this(= null):
                               // @ret Any:
                               // @help: Array#find
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
function Array_findIndex(callback,  // @arg Function: callback(value, index, array):Boolean
                         thisArg) { // @arg this(= null):
                                    // @ret Integer:
                                    // @help: Array#find
    for (var i = 0, iz = this.length; i < iz; ++i) {
        var result = callback.call(thisArg, this[i], i, this);

        if (result !== undefined) {
            return i;
        }
    }
    return -1; // not found
}
 */

function Array_indexOf(obj,     // @arg Any: search element
                       index) { // @arg Integer(= 0): from index
                                // @ret Integer: found index or -1
                                // @help: Array#indexOf
    var i = index || 0, iz = this.length;

    i = (i < 0) ? i + iz : i;
    for (; i < iz; ++i) {
        if (i in this && this[i] === obj) {
            return i;
        }
    }
    return -1;
}

function Array_lastIndexOf(obj,     // @arg Any: search element
                           index) { // @arg Integer(= this.length): from index
                                    // @ret Integer: found index or -1
                                    // @help: Array#lastIndexOf
    var i = index, iz = this.length;

    i = (i < 0) ? i + iz + 1 : iz;
    while (--i >= 0) {
        if (i in this && this[i] === obj) {
            return i;
        }
    }
    return -1;
}

function Array_forEach(fn,     // @arg Function:
                       that) { // @arg this(= undefined): fn this
                               // @help: Array#forEach
    var i = 0, iz = this.length;

    for (; i < iz; ++i) {
        if (i in this) {
            fn.call(that, this[i], i, this);
        }
    }
}

function Array_map(fn,     // @arg Function:
                   that) { // @arg this(= undefined): fn this
                           // @ret Array: [element, ... ]
                           // @help: Array#map
    var rv = [];
    var i = 0, iz = this.length;

    for (; i < iz; ++i) {
        if (i in this) {
            rv[i] = fn.call(that, this[i], i, this);
        }
    }
    return rv;
}

function Array_some(fn,     // @arg Function:
                    that) { // @arg this(= undefined): fn this
                            // @ret Boolean:
                            // @help: Array#some
    var i = 0, iz = this.length;

    for (; i < iz; ++i) {
        if (i in this && fn.call(that, this[i], i, this)) {
            return true;
        }
    }
    return false;
}

function Array_every(fn,     // @arg Function:
                     that) { // @arg this(= undefined): fn this
                             // @ret Boolean:
                             // @help: Array#every
    var i = 0, iz = this.length;

    for (; i < iz; ++i) {
        if (i in this && !fn.call(that, this[i], i, this)) {
            return false;
        }
    }
    return true;
}

function Array_filter(fn,     // @arg Function:
                      that) { // @arg this(= undefined): fn this
                              // @ret Array: [value, ... ]
                              // @help: Array#filter
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

function Array_reduce(fn,             // @arg Function:
                      initialValue) { // @arg Any(= undefined): initial value
                                      // @ret Any:
                                      // @help: Array#reduce
//{@assert
    if (!this.length && initialValue === undefined) {
        throw new TypeError("Reduce of empty array with no initial value");
    }
//}@assert

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

function Array_reduceRight(fn,             // @arg Function:
                           initialValue) { // @arg Any(= undefined): initial value
                                           // @ret Any:
                                           // @help: Array#reduceRight
//{@assert
    if (!this.length && initialValue === undefined) {
        throw new TypeError("Reduce of empty array with no initial value");
    }
//}@assert

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

// --- String ----------------------------------------------
function String_trim() { // @ret String:
                         // @help: String#trim
    return this.replace(/^\s+/, "").replace(/\s+$/, "");
}

function String_repeat(count) { // @arg Integer: repeat count. negative is 0
                                // @ret String: repeated string
                                // @desc: repeat strings
                                // @help: String#repeat
    count = count | 0;
    return (this.length && count > 0) ? new Array(count + 1).join(this) : "";
}

function String_reverse() { // @ret String:
                            // @desc: reverse characters
                            // @help: String#reverse
    return this.split("").reverse().join("");
}

// --- Number ----------------------------------------------
function Number_isNaN(any) { // @arg Any:
                             // @ret Boolean:
                             // @help: Number.isNaN
    return typeof any === "number" && global.isNaN(any);
}

function Number_isFinite(any) { // @arg Any:
                                // @ret Boolean:
                                // @help: Number.isFinite
    return typeof any === "number" && global.isFinite(any);
}

function Number_isInteger(any) { // @arg Any:
                                 // @ret Boolean:
                                 // @desc: is integer
                                 // @help: Number.isInteger
    return typeof any === "number" && global.isFinite(any) &&
                  any > -0x20000000000000 &&
                  any <  0x20000000000000 &&
                  Math.floor(any) === any;
}

function Number_toInteger(any) { // @arg Any:
                                 // @ret Integer:
                                 // @desc: to integer
                                 // @help: Number.toInteger
    var num = +any;

    if (num !== num) { // isNaN(num)
        return +0;
    }
    if (num === 0 || !global.isFinite(num)) {
        return num;
    }
    return (num < 0 ? -1 : 1) * Math.floor(Math.abs(num));
}

// --- Function --------------------------------------------
function Function_bind(context      // @arg that: context
                       /* ... */) { // @var_args Any: arguments
                                    // @ret Function:
                                    // @help: Function#bind
    var that = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var VoidClass = function() {};

    var rv = function(/* ... */) { // @var_args Any: bound arguments
                return that.apply(this instanceof VoidClass ? this : context,
                            Array.prototype.concat.call(
                                    args,
                                    Array.prototype.slice.call(arguments)));
            };

    VoidClass.prototype = that.prototype;

    rv.prototype = new VoidClass();
    return rv;
}

// --- Date ------------------------------------------------
function Date_now() { // @ret Integer: milli seconds
                      // @help: Date.now
    return +new Date();
}

function Date_toJSON() { // @ret String: "2000-01-01T00:00:00.000Z"
                         // @help: Date#toJSON
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

// --- JSON ------------------------------------------------
function JSON_parse(jsonString) { // @arg String: JSON String
                                  // @ret Any:
                                  // @throw: SyntaxError("Unexpected token: ...")
                                  // @help: JSON.parse
    var unescaped = jsonString.trim().replace(/"(\\.|[^"\\])*"/g, "");

    if (/[^,:{}\[\]0-9\.\-+Eaeflnr-u \n\r\t]/.test(unescaped)) {
        throw new SyntaxError("Unexpected token:" + jsonString);
    }
    return (new Function("return " + jsonString))(); // raise error
}

function JSON_stringify(obj) { // @arg Any:
                               // @ret JSONString:
                               // @see: http://developer.mozilla.org/En/Using_native_JSON
                               // @throw: TypeError("Converting circular structure to JSON")
                               // @help: JSON.stringify
    return _recursiveJSONStringify(obj, 0);
}

function _recursiveJSONStringify(any,           // @arg Any: value
                                 nestedCount) { // @arg Number: nested count.
                                                // @ret String:
    var rv = [];

    if (nestedCount >= 100) {
        throw new TypeError("Converting circular structure to JSON");
    }

    if (any === null || any === undefined) {
        return any + ""; // "null" or "undefined"
    }
    if (any["toJSON"]) {    // has toJSON method. eg: Date#toJSON
        return any["toJSON"]();
    }

    var type = typeof any;

    if (type === "boolean" || type === "number") {
        return "" + any;
    }
    if (type === "string") {
        return '"' + _toJSONEscapedString(any) + '"';
    }
    if (any["nodeType"]) { // Node
        return "{}";
    }
    if (any["exec"] && any["test"]) { // RegExp
        // https://twitter.com/uupaa/status/433881712758509568
        return "{}";
    }

    var bracket = null;
    var i = 0, iz = 0;

    if (Array.isArray(any)) {
        bracket = { left: "[", right: "]" };
        for (i = 0, iz = any.length; i < iz; ++i) {
            rv.push(_recursiveJSONStringify(any[i], nestedCount + 1));
        }
    } else { // isHash or other type
        bracket = { left: "{", right: "}" };
        var ary = Object.keys(any);

        for (i = 0, iz = ary.length; i < iz; ++i) { // uupaa-looper
            var key = ary[i];

            rv.push('"' + _toJSONEscapedString(key) + '":' +
                          _recursiveJSONStringify(any[key], nestedCount + 1));
        }
    }
    return bracket.left + rv.join(",") + bracket.right; // "{...}" or "[...]"
}

function _toJSONEscapedString(str) { // @arg String:
                                     // @ret String:
                                     // @desc: to JSON escaped string
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

// --- export ----------------------------------------------
//{@node
if (_inNode) {
    module["exports"] = ES;
}
//}@node
if (global["ES"]) {
    global["ES_"] = ES; // secondary
} else {
    global["ES"]  = ES; // primary
}

})((this || 0).self || global);

