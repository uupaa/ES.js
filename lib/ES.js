(function(global) {
"use strict";

// --- dependency module -----------------------------------
var Extend = global["Extend"] || require("uupaa.extend.js");

// --- local variable --------------------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function ES() {
}

//{@ie - fallback native class name properties.
if (!Object.name) {
    Extend(global, {
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

ES["repository"] = "https://github.com/uupaa/ES.js";
ES["5"] = {};
ES["6"] = {};

// --- implement -------------------------------------------
// --- export ----------------------------------------------
if ("process" in global) {
    module["exports"] = ES;
}
global["ES" in global ? "ES_" : "ES"] = ES; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

