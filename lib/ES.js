(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- class / interfaces ----------------------------------
function ES() {
}

//{@ie - fallback native Function#name properties.
if (!Object.name) {
    global["Extend"](global, {
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
    });
}
//}@ie

//{@dev
ES["repository"] = "https://github.com/uupaa/ES.js";
//}@dev

ES["5"] = {};
ES["6"] = {};

// --- implements ------------------------------------------
// --- validate / assertions -------------------------------
//{@dev
//function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
//function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if ("process" in global) {
    module["exports"] = ES;
}
global["ES" in global ? "ES_" : "ES"] = ES; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

