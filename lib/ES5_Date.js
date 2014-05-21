//{@ES5
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
//{@ie
// [IE8] force override Date#toJSON implement
// (new Date()).toJSON() -> "2012-09-16T21:53:39Z"
//                       -> "2012-09-16T21:53:39.000Z" (supply Milliseconds)
if (Date.prototype["toJSON"] && new Date()["toJSON"]().length < 24) {
    Date.prototype["toJSON"] = Date_toJSON;
}
//}@ie

// --- implement -------------------------------------------
function Date_now() { // @ret Integer milli seconds
    return +new Date();
}

function Date_toJSON() { // @ret String "2000-01-01T00:00:00.000Z"
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

// --- export ----------------------------------------------
Extend(global["Date"], global["ES_" in global ? "ES_" : "ES"]["Date"] = {
    "now":              Date_now,           // Date.now():Integer
    "prototype": {
        "toJSON":       Date_toJSON         // Date#toJSON():JSONObject
    }
});

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
//}@ES5

