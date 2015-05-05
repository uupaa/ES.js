//{@ES6
(function(global) {
"use strict";

// - implement ES6 final draft
//  - http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts#final_draft
//  - http://people.mozilla.org/~jorendorff/es6-draft.html

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _isNodeOrNodeWebKit = !!global.global;
//var _runOnNodeWebKit =  _isNodeOrNodeWebKit &&  /native/.test(setTimeout);
//var _runOnNode       =  _isNodeOrNodeWebKit && !/native/.test(setTimeout);
//var _runOnWorker     = !_isNodeOrNodeWebKit && "WorkerLocation" in global;
//var _runOnBrowser    = !_isNodeOrNodeWebKit && "document" in global;

// --- class / interfaces ----------------------------------
var ES6 = {
    "Object": {
        "assign":           Object_assign,          // Object.assign(target:Object, sources ...):Object
        "is":               Object_is,              // Object.is(value1:Any, value2:Any):Boolean
    },
    "Array": {
        "of":               Array_of,               // Array.of(values ...):Array
        "from":             Array_from,             // Array.from(items:Arguments|NodeList|ArrayLike, mapFn:Function = null, thisArg = null):Array
        "prototype": {
            "entries":      Array_entries,          // Array#entries():ArrayIterator
            "keys":         Array_keys,             // Array#keys():ArrayIterator
            "fill":         Array_fill,             // Array#fill(value:Any, start:Integer = 0, end:Integer = this.length):this
            "find":         Array_find,             // Array#find(predicate:Function, thisArg:Object = null):Any
            "findIndex":    Array_findIndex,        // Array#findIndex(predicate:Function, thisArg:Object = null):Any
            "values":       Array_values,           // Array#values():ArrayIterator
            "copyWithin":   Array_copyWithin,       // Array#copyWithin(target:Integer, start:Integer, end:Integer = this.length):this
        }
    },
    "String": {
      //"raw":              String_raw              // String.raw(template, substitutions...)
        "fromCodePoint":    String_fromCodePoint,   // String.fromCodePoint(codePoints ...):String
        "prototype": {
            "repeat":       String_repeat,          // String#repeat(count:Integer):String
            "codePointAt":  String_codePointAt,     // String#codePointAt(pos:Integer = 0):Integer
            "has":          String_includes,        // String#has(searchString:String, position:Integer = 0):Boolean
            "includes":     String_includes,        // String#includes(searchString:String, position:Integer = 0):Boolean
          //"normalize":    String_normalize,       // String#normalize(form:String):String
            "startsWith":   String_startsWith,      // String#startsWith(searchString:String, position:Integer = 0):Boolean
            "endsWith":     String_endsWith,        // String#endWith(searchString:String, endPosition:Integer = 0):Boolean
        }
    },
    "Number": {
        "isNaN":            Number_isNaN,           // Number.isNaN(number:Any):Boolean
        "isFinite":         Number_isFinite,        // Number.isFinite(number:Any):Boolean
        "isInteger":        Number_isInteger,       // Number.isInteger(number:Any):Boolean
        "isSafeInteger":    Number_isSafeInteger,   // Number.isSafeInteger(number:Any):Boolean
        "parseInt":         global.parseInt,        // Number.parseInt(string:String, radix:Integer):Integer
        "parseFloat":       global.parseFloat,      // Number.parseFloat(string:String):Number
        "NaN":              global.NaN,
        "EPSILON":          2.2204460492503130808472633361816E-16,
        "MAX_VALUE":        1.7976931348623157E+308,
        "MIN_VALUE":        5E-324,
        "MAX_SAFE_INTEGER": 9007199254740991,
        "MIN_SAFE_INTEGER": -9007199254740991,
        "POSITIVE_INFINITY":Infinity,
        "NEGATIVE_INFINITY":-Infinity,
    },
    "Math": {
        "acosh":            function(x) { return                       Math.log(x + Math.sqrt(x * x - 1)); },
        "asinh":            function(x) { return x === -Infinity ? x : Math.log(x + Math.sqrt(x * x + 1)); },
        "atanh":            function(x) { return Math.log( (1 + x) / (1 - x) ) / 2; },
        "cbrt":             function(x) { var y = Math.pow( Math.abs(x), 1 / 3 ); return x < 0 ? -y : y; },
        "clz32":            Math_clz32,
        "cosh":             function(x) { var y = Math.exp(x); return (y + 1 / y) / 2; },
        "expm1":            function(x) { return Math.exp(x) - 1; },
        "fround":           Math_fround,
        "hypot":            Math_hypot,
        "imul":             Math_imul,
        "log10":            function(x) { return Math.log(x) / Math.LN10; },
        "log1p":            function(x) { return Math.log(1 + x); },
        "log2":             function(x) { return Math.log(x) / Math.LN2; },
        "sign":             function(x) { var y = Number(x); return (y === 0 || isNaN(y)) ? y : (y > 0 ? 1 : -1); },
        "sinh":             function(x) { var y = Math.exp(x); return (y - 1 / y) / 2; },
        "tanh":             Math_tanh,
        "trunc":            function(x) { return x < 0 ? Math.ceil(x) : Math.floor(x); },
        "LOG2E":            1.442,
        "LOG10E":           0.4342944819032518,
    },
    "Set":                  Set,
    "WeakSet":              WeakSet,
    "Map":                  Map,
    "WeakMap":              WeakMap,
};


function Set(iterable) { // @arg Array|Iterator = null
    this._value = [];

    var that = this;

    if (Array.isArray(iterable)) {
        iterable.forEach(function(value) {
            that["add"](value);
        })
    } else if (iterable && iterable["next"]) {
        var result = null;

        while (result = iterable["next"]()) {
            if (result["done"]) {
                break;
            }
            this["add"](result["value"]);
        }
    }
}
Set["prototype"] = Object.create(Set, {
    "constructor":  { "value": Set          }, // new Set(iterable:Iterator = null):this
    "size":         { "get":   Set_size     }, // Set#size:Integer
    "add":          { "value": Set_add      }, // Set#add(value:Any):this
    "has":          { "value": Set_has      }, // Set#has(value:Any):Boolean
    "values":       { "value": Set_values   }, // Set#values():ValueIterator
    "entries":      { "value": Set_entries  }, // Set#entries():KeyValueIterator
    "forEach":      { "value": Set_forEach  }, // Set#forEach(callbackFn:Function, thisArg:Object):void
    "delete":       { "value": Set_delete   }, // Set#delete(value:Any):Boolean
    "clear":        { "value": Set_clear    }, // Set#clear():undefined
    "@@iterator":   { "value": Set_entries  }, // Set#@@iterator():KeyValueIterator
});


function WeakSet(iterable) { // @arg Array|Iterator = null
    this._value = [];

    var that = this;

    if (Array.isArray(iterable)) {
        iterable.forEach(function(value) {
            that["add"](value);
        })
    } else if (iterable && iterable["next"]) {
        var result = null;

        while (result = iterable["next"]()) {
            if (result["done"]) {
                break;
            }
            this["add"](result["value"]);
        }
    }
}
WeakSet["prototype"] = Object.create(Set, {
    "constructor":  { "value": WeakSet          }, // new WeakSet(iterable:Iterator = null):this
    "add":          { "value": WeakSet_add      }, // WeakSet#add(value:Any):this
    "has":          { "value": WeakSet_has      }, // WeakSet#has(value:Any):Boolean
    "delete":       { "value": WeakSet_delete   }, // WeakSet#delete(value:Any):Boolean
});


function Map(iterable) { // @arg Array|Iterator = null
    this._index = [];
    this._value = [];

    var that = this;

    if (Array.isArray(iterable)) {
        iterable.forEach(function(value) {
            that["set"](value[0], value[1]);
        })
    } else if (iterable && iterable["next"]) {
        var result = null;

        while (result = iterable["next"]()) {
            if (result["done"]) {
                break;
            }
            this["set"](result["value"][0], result["value"][1]);
        }
    }
}
Map["prototype"] = Object.create(Map, {
    "constructor":  { "value": Map          }, // new Map(iterable:Iterator = null):this
    "size":         { "get":   Map_size     }, // Map#size:Integer
    "get":          { "value": Map_get      }, // Map#get(key:Object):Any|undefined
    "set":          { "value": Map_set      }, // Map#set(key:Object, value:Any):void
    "has":          { "value": Map_has      }, // Map#has(key:Object):Boolean
    "keys":         { "value": Map_keys     }, // Map#keys():KeyIterator
    "values":       { "value": Map_values   }, // Map#values():ValueIterator
    "entries":      { "value": Map_entries  }, // Map#entries():KeyValueIterator
    "forEach":      { "value": Map_forEach  }, // Map#forEach(callbackFn:Function, thisArg:Object):void
    "delete":       { "value": Map_delete   }, // Map#delete(key:Object):Boolean
    "clear":        { "value": Map_clear    }, // Map#clear():undefined
    "@@iterator":   { "value": Map_entries  }, // Map#@@iterator():KeyValueIterator
});


function WeakMap(iterable) { // @arg Array|Iterator = null
    this._index = [];
    this._value = [];

    var that = this;

    if (Array.isArray(iterable)) {
        iterable.forEach(function(value) {
            that["set"](value[0], value[1]);
        })
    } else if (iterable && iterable["next"]) {
        var result = null;

        while (result = iterable["next"]()) {
            if (result["done"]) {
                break;
            }
            this["set"](result["value"][0], result["value"][1]);
        }
    }
}
WeakMap["prototype"] = Object.create(WeakMap, {
    "constructor":  { "value": WeakMap          }, // new WeakMap(iterable:Iterator = null):this
    "get":          { "value": WeakMap_get      }, // WeakMap#get(key:Object, defaultValue:Any):Any
    "set":          { "value": WeakMap_set      }, // WeakMap#set(key:Object, value:Any):undefined
    "has":          { "value": WeakMap_has      }, // WeakMap#has(key:Object):Boolean
    "delete":       { "value": WeakMap_delete   }, // WeakMap#delete(key:Object):Boolean
});

// --- implements ------------------------------------------
if (!Function.prototype.name) {
    Object.defineProperty(Function.prototype, "name", {
        "configurable": true, // false is immutable
        "enumerable": false,  // false is invisible(for in loop)
        "get": function() {
            // function MyClass() {}
            //          ~~~~~~~
            return this.toString().split(" ")[1].split(/[^\w$]/)[0];
        }
    });
}
if (RegExp.prototype.flags === undefined) {
    Object.defineProperty(RegExp.prototype, "flags", {
        "configurable": true, // false is immutable
        "enumerable": false,  // false is invisible(for in loop)
        "get": function() {
            return this.toString().match(/[gimuy]*$/)[0];
        }
    });
}

// === Object ==============================================
function Object_assign(target               // @arg Object
                       /* sources ... */) { // @var_args Object - sources objects
                                            // @ret Object - return target
                                            // @desc mixin
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

    var args = arguments;

    for (var i = 1, iz = args.length; i < iz; ++i) {
        var source = args[i];

        if (source) {
            var keys = Object.keys(source);

            for (var k = 0, kz = keys.length; k < kz; ++k) {
                var key  = keys[k];
                var desc = Object.getOwnPropertyDescriptor(source, key);

                if (desc && desc["enumerable"]) {
                    target[key] = source[key];
                }
            }
        }
    }
    return target;
}

function Object_is(value1,   // @arg Any
                   value2) { // @arg Any
                             // @ret Boolean
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.is
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is

    if (typeof value1 !== typeof value2) {
        return false;
    }
    if (isNaN(value1)) {
        return isNaN(value2);
    }
    if (value1 === 0 && value2 === 0) {
        return (1 / value1) === (1 / value2); // Object.is(-0, +0) -> false
    }
    return value1 === value2;
}

// === Array ===============================================
function Array_of(/* values ... */) { // @var_args Any - values
                                      // @ret Array
                                      // @desc Array.of(1, 2, 3) -> [1, 2, 3]
    return Array.prototype.slice.call(arguments);
}

function Array_from(items,     // @arg Arguments|NodeList|ArrayLike
                    mapFn,     // @arg Function = null - Array#map like function
                    thisArg) { // @arg Object = null - mapFn this
                               // @ret Array
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    if (!mapFn) {
        return [].slice.call(items);
    }
    var that = thisArg || null;
    var result = [];
    for (var i = 0, iz = items.length; i < iz; ++i) {
        result.push( mapFn.call(that, items[i]) );
    }
    return result;
}

function ArrayIterator(data, nextFn) {
    this._data = data;
    this._cursor = -1;
    this["next"] = nextFn;
}
function ArrayIterator_keys() {
    var index = ++this._cursor;
    var done  = index >= this._data.length;

    return done ? { "value": undefined, "done": true  }
                : { "value": index,     "done": false };
}
function ArrayIterator_values() {
    var index = ++this._cursor;
    var done  = index >= this._data.length;

    return done ? { "value": undefined,         "done": true  }
                : { "value": this._data[index], "done": false };
}
function ArrayIterator_keyAndValues() {
    var index = ++this._cursor;
    var done  = index >= this._data.length;

    return done ? { "value": undefined,                    "done": true  }
                : { "value": [ index, this._data[index] ], "done": false };
}

function Array_entries() { // @ret KeyValueIterator
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.entries
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries
    return new ArrayIterator(this, ArrayIterator_keyAndValues);
}

function Array_keys() { // @ret KeyIterator
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.keys
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys
    return new ArrayIterator(this, ArrayIterator_keys);
}

function Array_fill(value, // @arg Any
                    start, // @arg Integer = 0
                    end) { // @arg Integer = this.length
                           // @ret this
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.fill
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill

    start = start >> 0;
    end   = end === undefined ? this.length : end >> 0;

    var iz    = this.length;
    var i     = start < 0 ? Math.max(start + iz, 0) : Math.min(start, iz);
    var final = end   < 0 ? Math.max(end   + iz, 0) : Math.min(end,   iz);

    for (; i < final; ++i) {
        this[i] = value;
    }
    return this;
}

function Array_find(predicate, // @arg Function predicate(value:Any, index:Integer, array:Object):Boolean
                    thisArg) { // @arg Object = null
                               // @ret Any
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.find
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    var result = this["findIndex"](predicate, thisArg);

    return result === -1 ? undefined : this[result];
}

function Array_findIndex(predicate, // @arg Function predicate(value:Any, index:Integer, array:Object):Boolean
                         thisArg) { // @arg Object = null
                                    // @ret Integer
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.findindex
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    for (var i = 0, iz = this.length; i < iz; ++i) {
        var result = predicate.call(thisArg, this[i], i, this);

        if (result) {
            return i;
        }
    }
    return -1; // not found
}

function Array_values() { // @ret ValueIterator
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.values
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values
    return new ArrayIterator(this, ArrayIterator_values);
}

function Array_copyWithin(target, // @arg Integer
                          start,  // @arg Integer
                          end) {  // @arg Integer = this.length
                                  // @ret this
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.copywithin
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin

    target = target >> 0;
    start  = start  >> 0;
    end    = end === undefined ? this.length : end >> 0;

    var iz    = this.length;
    var to    = target < 0 ? Math.max(target + iz, 0) : Math.min(target, iz);
    var from  = start  < 0 ? Math.max(start  + iz, 0) : Math.min(start,  iz);
    var final = end    < 0 ? Math.max(end    + iz, 0) : Math.min(end,    iz);
    var count = Math.min(final - from, iz - to);

    if (from < to && to < (from + count)) {
        // reverse direction
        for (; count > 0; --from, --to, --count) {
            if (from in this) {
                this[to] = this[from];
            } else {
                delete this[to];
            }
        }
    } else {
        // forward direction
        for (; count > 0; ++from, ++to, --count) {
            if (from in this) {
                this[to] = this[from];
            } else {
                delete this[to];
            }
        }
    }
    return this;
}

// === String ==============================================
function String_fromCodePoint(/* codePoints ... */) { // @arg var_args Integer - [UNICODECodePoint, ...]
                                                      // @ret String
    var args = arguments;
    var result = [];

    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.fromcodepoint
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
    // https://github.com/uupaa/UTF8.js/wiki/UTF8-convert-table
    for (var i = 0, az = args.length; i < az; ++i) {
        var codePoint = args[i];

        if (codePoint < 0x10000) {
            result.push(codePoint);
        } else {
            var offset = codePoint - 0x10000;

            result.push(0xD800 + (offset >> 10),
                        0xDC00 + (offset & 0x3FF));
        }
    }
    return String.fromCharCode.apply(null, result);
}

function String_repeat(count) { // @arg Integer repeat count. negative is 0
                                // @ret String repeated string
                                // @desc repeat strings
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.repeat
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
    count = count | 0;
    return (this.length && count > 0) ? new Array(count + 1).join(this) : "";
}

function String_codePointAt(pos) { // @arg Integer = 0
                                   // @ret Integer|undefined
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.codepointat
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
    pos = pos || 0;

    var iz = this.length;
    var first = this.charCodeAt(pos); // Integer or NaN

    if ( isNaN(first) ) {
        return undefined;
    }
    if (first < 0xD800 || first > 0xDBFF || pos + 1 >= iz) {
        return first;
    }
    var second = this.charCodeAt(pos + 1);
    if (second < 0xDC00 || second > 0xDFFF) {
        return first;
    }
    return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
}

function String_includes(searchString, // @arg String
                         position) {   // @arg Integer = 0
                                       // @ret Boolean
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.includes
    return this.indexOf(searchString, position) >= 0;
}

function String_startsWith(searchString, // @arg String
                           position) {   // @arg Integer = 0
                                         // @ret Boolean
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.startswith
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
    position = position || 0;
    return this.lastIndexOf(searchString, position) === position;
}

function String_endsWith(searchString,  // @arg String
                         endPosition) { // @arg Integer = this.length
                                        // @ret Boolean
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.endswith
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
    var position = (endPosition || this.length) - searchString.length;
    var lastIndex = this.lastIndexOf(searchString);

    return lastIndex !== -1 && lastIndex === position;
}

// === Number ==============================================
function Number_isNaN(number) { // @arg Any
                                // @ret Boolean
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isnan
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
    return typeof number === "number" && number !== number;
}

function Number_isFinite(number) { // @arg Any
                                   // @ret Boolean
    return typeof number === "number" && isFinite(number);
}

function Number_isInteger(number) { // @arg Any
                                    // @ret Boolean
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isinteger
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
    return typeof number === "number" && isFinite(number) &&
           Math.floor(number) === number;
}

function Number_isSafeInteger(number) { // @arg Any
                                        // @ret Boolean
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.issafeinteger
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger
    return typeof number === "number" && isFinite(number) &&
           Math.floor(number) === number &&
           number <= Number["MAX_SAFE_INTEGER"] &&
           number >= Number["MIN_SAFE_INTEGER"];
}

// === Math ================================================
function Math_clz32(x) { // @arg Number
                         // @ret Number
                         // @desc count leading zero
    // (0xffffffff).toString(2) -> 0b11111111111111111111111111111111
    // (0x00001234).toString(2) -> 0b00000000000000000001001000110100
    // Math.clz32(0x1234) = 19       ~~~~~~~~~~~~~~~~~~~
    var u32 = Number(x) >>> 0;
    return u32 ? 32 - u32.toString(2).length : 32;
}

function Math_fround(x) { // @arg Number|Float64|Float32
                          // @ret Float32 - (Single-precision floating-point format. binary32)
    // http://jsperf.com/math-fround-with-float32array -> is not real (probably not correct)
    // http://en.wikipedia.org/wiki/Single-precision_floating-point_format
    return new Float32Array([x])[0]; // 64bit double to 32bit float format (cpu optimization)
}

function Math_hypot(/* values ... */) { // @arg Number
    // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-math.hypot
    var args = arguments;
    var y    = 0;

    if (args.length === 0) { return 0; }

    for (var i = 0, iz = args.length; i < iz; ++i) {
        var value = args[i];

        if (value === Infinity || value === -Infinity) {
            return Infinity;
        }
        if ( isNaN(value) ) {
            return NaN;
        }
        y += value * value;
    }
    return Math.sqrt(y);
}

function Math_imul(a,   // @arg Uint32|Uint64 - value a
                   b) { // @arg Uint32|Uint64 - value b
                        // @ret Uint32 - the C-like 32-bit multiplication of the two parameters.
    var a_high = (a >>> 16) & 0xffff;
    var a_low  =  a         & 0xffff;
    var b_high = (b >>> 16) & 0xffff;
    var b_low  =  b         & 0xffff;

    return ((a_low * b_low) + (((a_high * b_low + a_low * b_high) << 16) >>> 0) | 0);
}

function Math_tanh(x) { // @arg Number
    if (x === Infinity) {
        return 1;
    } else if (x === -Infinity) {
        return -1;
    }
    var y = Math.exp(2 * x);

    return (y - 1) / (y + 1);
}

// === CollectionIterator ==================================
function CollectionIterator(keys, values, nextFn) {
    this._keys   = keys;
    this._values = values;
    this["next"] = nextFn;
    this._cursor = -1;
}
function CollectionIterator_keys() {
    var cursor = ++this._cursor;
    var done   = cursor >= this._keys.length;

    return done ? { "value": undefined,          "done": true  }
                : { "value": this._keys[cursor], "done": false };
}
function CollectionIterator_values() {
    var cursor = ++this._cursor;
    var done   = cursor >= this._keys.length;

    return done ? { "value": undefined,            "done": true  }
                : { "value": this._values[cursor], "done": false };
}
function CollectionIterator_keyAndValues() {
    var cursor = ++this._cursor;
    var done   = cursor >= this._keys.length;

    return done ? { "value": undefined,              "done": true  }
                : { "value": [this._keys[cursor],
                              this._values[cursor]], "done": false };
}

// === Set =================================================
function Set_size() { // @ret Integer
    return this._value.length;
}

function Set_add(value) { // @arg Any
                          // @ret this
    this._value.push(value);
    return this;
}

function Set_has(value) { // @arg Object
                          // @ret Boolean
    return this._value.indexOf(value) >= 0;
}

function Set_values() { // @ret ValueIterator
    return new CollectionIterator(this._value, this._value, CollectionIterator_values);
}

function Set_entries() { // @ret KeyValueIterator
    return new CollectionIterator(this._value, this._value, CollectionIterator_keyAndValues);
}

function Set_forEach(callbackFn, // @arg Function
                     thisArg) {  // @arg Object = null

    thisArg = thisArg || null;
    for (var i = 0, iz = this.size; i < iz; ++i) {
        callbackFn.call(thisArg, this._value[i], this._value[i], this);
    }
}

function Set_delete(value) { // @arg Any
                             // @ret Boolean
    var index = this._value.indexOf(value);

    if (index < 0) {
        return false;
    }
    this._value.splice(index, 1);
    return true;
}

function Set_clear() {
    this._value = [];
}

// === WeakSet ============================================
function WeakSet_add(value) { // @arg Any
                              // @ret this
    this._value.push(value);
    return this;
}

function WeakSet_has(value) { // @arg Object
                              // @ret Boolean
    return this._value.indexOf(value) >= 0;
}

function WeakSet_delete(value) { // @arg Any
                                 // @ret Boolean
    var index = this._value.indexOf(value);

    if (index < 0) {
        return false;
    }
    this._value.splice(index, 1);
    return true;
}

// === Map =================================================
function Map_size() { // @ret Integer
    return this._index.length;
}

function Map_get(key) { // @arg Object
                        // @ret Any|undefined
    var index = this._index.indexOf(key);

    if (index < 0) {
        return undefined;
    }
    return this._value[index];
}

function Map_set(key,     // @arg Object
                 value) { // @arg Any
    var index = this._index.indexOf(key);

    if (index < 0) {
        this._index.push(key);
        this._value.push(value);
    } else {
        this._value[index] = value;
    }
}

function Map_has(key) { // @arg Object
                        // @ret Boolean
    return this._index.indexOf(key) >= 0;
}

function Map_keys() { // @ret KeyIterator
    return new CollectionIterator(this._index, this._value, CollectionIterator_keys);
}

function Map_values() { // @ret ValueIterator
    return new CollectionIterator(this._index, this._value, CollectionIterator_values);
}

function Map_forEach(callbackFn, // @arg Function
                     thisArg) {  // @arg Object = null

    thisArg = thisArg || null;
    for (var i = 0, iz = this.size; i < iz; ++i) {
        callbackFn.call(thisArg, this._value[i], this._index[i], this);
    }
}

function Map_entries() { // @ret KeyValueIterator
    return new CollectionIterator(this._index, this._value, CollectionIterator_keyAndValues);
}

function Map_delete(key) { // @arg Object
                           // @ret Boolean
    var index = this._index.indexOf(key);

    if (index < 0) {
        return false;
    }
    this._index.splice(index, 1);
    this._value.splice(index, 1);
    return true;
}

function Map_clear() {
    this._index = [];
    this._value = [];
}

// === WeakMap =============================================
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
        this._index.push(key);
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
        return false;
    }
    this._index.splice(index, 1);
    this._value.splice(index, 1);
    return true;
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
global["ES_" in global ? "ES_" : "ES"]["6"] = ES6;
global["ES_" in global ? "ES_" : "ES"]["extend"](global, ES6);

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@ES6

