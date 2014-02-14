// @name: ES5.js

(function(global) {

// --- variable --------------------------------------------
var _inNode = "process" in global;

// --- define ----------------------------------------------
var POLYFILL = {
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
                "bind":         Function_bind       // Function#bind(context:that, var_args:Any):Function
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

//{@ie
// Fallback Native Class name properties.
var FALLBACK = {
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

var EXTENDS = {
        "Object": {
            "mixin":            Object_mixin,       // Object.mixin(base:Object/Function, extend:Object, override:Boolean = false):base
            "polyfill":         Object_polyfill,    // Object.polyfill(base:Object/Function, extend:Object, override:Boolean = false):base
            "fallback":         Object_polyfill     // Object.fallback(base:Object/Function, extend:Object, override:Boolean = false):base
        }
    };

// --- interface -------------------------------------------
function ES5() {
    _polyfill(POLYFILL);
//{@ie
    if (!Object.name) {
        _polyfill(FALLBACK);
    }
//}@ie
    _polyfill(EXTENDS);
    _bugFix();
}

ES5["name"] = "ES5";
ES5["repository"] = "https://github.com/uupaa/ES5.js";

// --- implement -------------------------------------------
function _polyfill(obj) {
    for (var nativeClassName in obj) { // "Object", "Array", "String", ...
        nativeClassName in ES5 || (ES5[nativeClassName] = {});

        for (var propertyName in obj[nativeClassName]) { // "isArray", "prototype", ...
            if (propertyName === "prototype") {
                propertyName in ES5[nativeClassName] || (ES5[nativeClassName][propertyName] = {});
                var prototype = obj[nativeClassName]["prototype"];

                for (var methodName in prototype) { // "indexOf", ...
                    _extends(global[nativeClassName]["prototype"], methodName, prototype[methodName]);
                    _extends(ES5[nativeClassName]["prototype"], methodName, prototype[methodName]);
                }

            } else {
                var value = obj[nativeClassName][propertyName];

                _extends(global[nativeClassName], propertyName, value);
                _extends(ES5[nativeClassName], propertyName, value);
            }
        }
    }
}

function _extends(baseObject, // @arg Object/Function:
                  key,        // @arg String:
                  value,      // @arg Any:
                  override) { // @arg Boolean(= false):

    override = override || false;

    var defineProperty = Object["defineProperty"] || polyfill_defineProperty;

    if ( override || !(key in baseObject) ) {
        defineProperty(baseObject, key, {
            "configurable": true, // false is immutable
            "enumerable": false,  // false is invisible(for in loop)
            "writable": true,     // false is read-only
            "value": value
        });
    }
}

function _bugFix() {
//{@ie
// [IE8] force override Date#toJSON implement
// (new Date()).toJSON() -> "2012-09-16T21:53:39Z"
//                       -> "2012-09-16T21:53:39.000Z" (supply Milliseconds)
    if (Date.prototype["toJSON"] && new Date()["toJSON"]().length < 24) {
        Date.prototype["toJSON"] = Date_toJSON;
    }
//}@ie
}

// --- Object ----------------------------------------------
function Object_polyfill(base,       // @arg Object/Function: base Object
                         extend,     // @arg Object: extend object
                         override) { // @arg Boolean(= false):
                                     // @ret Object/Function:
                                     // @help: Object.polyfill
                                     // @desc: prototype extend without enumerability,
                                     //        do not look prototype chain.
    for (var key in extend) {
        _extends(base, key, extend[key], override || false);
    }
    return base;
}

function Object_mixin(base,       // @arg Object/Function: base object
                      extend,     // @arg Object: Object
                      override) { // @arg Boolean(= false):
                                  // @help: Object.mixin
                                  // @desc: object mixin
    for (var key in extend) {
        if (override || !(key in base)) {
            base[key] = extend[key];
        }
    }
    return base;
}

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
            obj["hasOwnProperty"](key) && (rv[i++] = key);
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
        i in this && fn.call(that, this[i], i, this);
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

// --- Function --------------------------------------------
function Function_bind(context,    // @arg that: context
                       var_args) { // @var_args Any: arguments
                                   // @ret Function:
                                   // @help: Function#bind
    var that = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var voidClass = function() {};

    var rv = function(var_args) { // @var_args Any: bound arguments
                return that.apply(this instanceof voidClass ? this : context,
                            Array.prototype.concat.call(
                                    args,
                                    Array.prototype.slice.call(arguments)));
            };

    voidClass.prototype = that.prototype;

    rv.prototype = new voidClass();
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

    if (any == null) {   //  null  or  undefined
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

//{@ie [IE8]
function polyfill_defineProperty(object,       // @arg Object:
                                 prop,         // @arg String: property name
                                 descriptor) { // @arg Hash: { writable, get, set, value, enumerable, configurable }
                                               // @ret Object:
                                               // @help: Object.defineProperty
    if (object["nodeType"]) {
        if (Object["defineProperty"] && !Object["defineProperties"]) { // [IE8]
            return Object["defineProperty"](object, prop, descriptor); // call native api
        }
    }

    // data descriptor.
    if ("value" in descriptor) {
        object[prop] = descriptor["value"];
    }

    // accessor descriptor.
    if (descriptor["get"] && object["__defineGetter__"]) {
        object["__defineGetter__"](prop, descriptor["get"]);
    }
    if (descriptor["set"] && object["__defineSetter__"]) {
        object["__defineSetter__"](prop, descriptor["set"]);
    }
    return object;
}
//}@ie

// --- export ----------------------------------------------
//{@node
if (_inNode) {
    module["exports"] = ES5;
}
//}@node
global["ES5"] ? (global["ES5_"] = ES5) // already exsists
              : (global["ES5"]  = ES5);

})(this.self || global);

