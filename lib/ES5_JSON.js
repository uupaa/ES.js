//{@ES5
(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

var ES5_JSON = {
    "parse":     JSON_parse,    // JSON.parse(str:String):Any
    "stringify": JSON_stringify // JSON.stringify(obj:Any):Object
};

// --- class / interfaces ----------------------------------
// --- implements ------------------------------------------
function JSON_parse(jsonString) { // @arg String JSON String
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
        rv.push(_jsonStringify(value[i], depth + 1));
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

// --- validate / assertions -------------------------------
//{@dev
//function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
//function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if ( !("JSON" in global) ) {
    global["Extend"](global["JSON"],
                     global["ES_" in global ? "ES_" : "ES"]["5"]["JSON"] = ES5_JSON);
}

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@ES5

