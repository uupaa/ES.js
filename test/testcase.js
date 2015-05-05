var ModuleTestES = (function(global) {

var _isNodeOrNodeWebKit = !!global.global;
var _runOnNodeWebKit =  _isNodeOrNodeWebKit &&  /native/.test(setTimeout);
var _runOnNode       =  _isNodeOrNodeWebKit && !/native/.test(setTimeout);
var _runOnWorker     = !_isNodeOrNodeWebKit && "WorkerLocation" in global;
var _runOnBrowser    = !_isNodeOrNodeWebKit && "document" in global;

global["BENCHMARK"] = false;

if (console) {
    if (!console.table) {
        console.table = console.dir;
    }
}

var test = new Test("ES", {
        disable:    false, // disable all tests.
        browser:    true,  // enable browser test.
        worker:     true,  // enable worker test.
        node:       true,  // enable node test.
        nw:         true,  // enable nw.js test.
        button:     true,  // show button.
        both:       false, // test the primary and secondary modules.
        ignoreError:false, // ignore error.
    });

var ES5_test = 1;
var ES6_test = 1;
var ES7_test = 1;

if (ES5_test) {
    test.add([
        // --- Object ---
        testObject_keys,
        testObject_create,
        testObject_freeze,
        // --- String ---
        testString_trim,
        // --- Date ---
        testDate_now,
        testDate_toJSON,
        // --- Function ---
        testFunction_bind,
        // --- JSON ---
        testJSON_parse,
        testJSON_stringify,
        // --- Array ---
        testArray_isArray,
        // --- dense array ---
        testArray_indexOf,
        testArray_lastIndexOf,
        testArray_forEach,
        testArray_map,
        testArray_some,
        testArray_every,
        testArray_filter,
        testArray_reduce,
        testArray_reduceRight,
        // --- sparse array ---
        testArray_sparse_indexOf,
        testArray_sparse_lastIndexOf,
        testArray_sparse_forEach,
        testArray_sparse_map,
        testArray_sparse_some,
        testArray_sparse_every,
        testArray_sparse_filter,
        testArray_sparse_reduce,
        testArray_sparse_reduceRight,
        // --- reduce complex ---
        testArray_reduce_complex,
        testArray_reduceRight_complex,
    ]);
}
if (ES6_test) {
    test.add([
        // --- Object ---
        testObject_name,
        testObject_assign,
        testObject_is,
        // --- Array ---
        testArray_of,
        testArray_from,
        testArray_entries,
        testArray_keys,
        testArray_fill,
        testArray_find,
        testArray_findIndex,
        testArray_values,
        testArray_copyWithin,
        // --- String ---
        testString_fromCodePoint,
        testString_repeat,
        testString_codePointAt,
        testString_includes,
        testString_startsWith,
        testString_endWith,
        // --- Number ---
        testNumber_isInteger,
        testNumber_isSafeInteger,
        // --- Math ---
        testMath,
        // --- Map ---
        testMap_size,
        testMap_get,
        testMap_set,
        testMap_has,
        testMap_keys,
        testMap_values,
        testMap_entries,
        testMap_forEach,
        testMap_delete,
        testMap_clear,
        // --- WeakMap ---
        testWeakMap,
    ]);
}
if (ES7_test) {
    test.add([
    ]);
}

if (_runOnBrowser || _runOnNodeWebKit) {
    //test.add([]);
} else if (_runOnWorker) {
    //test.add([]);
} else if (_runOnNode) {
    //test.add([]);
}

// --- test cases ------------------------------------------
function testSetup(test, pass, miss) {
    //ES(6.0);

    var f1 = new Float32Array([0,1,2,3,4,5,6,7,8,9]);
    var f2 = new Float32Array([0,1,2,3,4,5,6,7,8,9]);
    var noise = new Float32Array([Math.random()])[0];

    function doBench1(f32) {
      for (var i = 0, iz = f32.length; i < iz; ++i) {
        f32[i] = f32[i] + noise + 1;
      }
    }
    function doBench2(f32) {
      for (var i = 0, iz = f32.length; i < iz; ++i) {
        f32[i] = Math.fround(f32[i] + noise) + 1;
      }
    }
    var p1 = performance.now();
    doBench1(f1);
    var p2 = performance.now();
    doBench2(f2);
    var p3 = performance.now();

    console.log(p2 - p1);
    console.log(p3 - p2);

    test.done(pass());
}

function testObject_keys(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var polyfill1 = ES[5].Object.keys(source1); // ["a", "b", "c", "d"]
    var polyfill2 = ES[5].Object.keys(source2); // ["0", "1", "2", "3"]
    var native1   =       Object.keys(source1);
    var native2   =       Object.keys(source2);

    if ( JSON.stringify(polyfill1) === JSON.stringify(native1) &&
         JSON.stringify(polyfill2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testObject_create(test, pass, miss) {
    function Foo1(value) { this._value = value }
    function Foo2(value) { this._value = value }

    var properties1 = {
        "constructor":  { "value": Foo1 },
        "getValue":     { "value": function() { return this._value; } },
    };
    var properties2 = {
        "constructor":  { "value": Foo2 },
        "getValue":     { "value": function() { return this._value; } },
    };

    Foo1.prototype = new ES[5].Object.create(Foo1, properties1);
    Foo2.prototype =           Object.create(Foo2, properties2);

    var foo1 = new Foo1(1);
    var foo2 = new Foo2(1);

    if ( foo1.getValue() === foo2.getValue() &&
         foo1.prototype.constructor && foo1.prototype.constructor === Foo1 &&
         foo2.prototype.constructor && foo2.prototype.constructor === Foo2) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testObject_freeze(test, pass, miss) {
    test.done(pass());
}

function testString_trim(test, pass, miss) {
    var polyfill = ES[5].String.prototype.trim.call(" a b \n");
    var native   =       String.prototype.trim.call(" a b \n");

    if (polyfill === native) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDate_now(test, pass, miss) {
    for (var i = 0; i < 3; ++i) {
        var polyfill = ES[5].Date.now();
        var native   =       Date.now();

        if (polyfill === native) {
            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

function testDate_toJSON(test, pass, miss) {
    var date = new Date();

    var polyfill = ES[5].Date.prototype.toJSON.call(date);
    var native   =       Date.prototype.toJSON.call(date);

    if (polyfill === native) {
        test.done(pass());
        return;
    }
    test.done(miss());
}

function testFunction_bind(test, pass, miss) {
    var data = { value: 1 };
    var method = function(x) { return this.value + x; };

    var polyfill = ES[5].Function.prototype.bind.call(method, data, 2);
    var native   = method.bind(data, 2);

    if (polyfill() === native()) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testJSON_parse(test, pass, miss) {
    var data = { value: 1 };
    var json = JSON.stringify(data);

    var polyfill = ES[5].JSON.parse.call(null, json);
    var native   =       JSON.parse.call(null, json);

    if (JSON.stringify(polyfill) === JSON.stringify(native)) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testJSON_stringify(test, pass, miss) {
    var data = { value: 1 };

    var polyfill = ES[5].JSON.stringify.call(null, data);
    var native   =       JSON.stringify.call(null, data);

    if (polyfill === native) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_isArray(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = ES[5].Array.isArray(source1);
    var native1 = Array.isArray(source1);
    var result2 = ES[5].Array.isArray(source2);
    var native2 = Array.isArray(source2);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_indexOf(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = ES[5].Array.prototype.indexOf.call(source1, 2);
    var native1 = Array.prototype.indexOf.call(source1, 2);
    var result2 = ES[5].Array.prototype.indexOf.call(source2, 2);
    var native2 = Array.prototype.indexOf.call(source2, 2);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_lastIndexOf(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = ES[5].Array.prototype.lastIndexOf.call(source1, 2);
    var native1 = Array.prototype.lastIndexOf.call(source1, 2);
    var result2 = ES[5].Array.prototype.lastIndexOf.call(source2, 2);
    var native2 = Array.prototype.lastIndexOf.call(source2, 2);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_forEach(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = {};
    var native1 = {};
    var result2 = [];
    var native2 = [];

    ES[5].Array.prototype.forEach.call(source1, function(value, index) {
        result1[value] = index;
    });
    Array.prototype.forEach.call(source1, function(value, index) {
        native1[value] = index;
    });
    ES[5].Array.prototype.forEach.call(source2, function(value, index) {
        result2[value] = index;
    });
    Array.prototype.forEach.call(source2, function(value, index) {
        native2[value] = index;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_map(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = {};
    var native1 = {};
    var result2 = [];
    var native2 = [];

    result1 = ES[5].Array.prototype.map.call(source1, function(value, index) {
        return value;
    });
    native1 = Array.prototype.map.call(source1, function(value, index) {
        return value;
    });
    result2 = ES[5].Array.prototype.map.call(source2, function(value, index) {
        return value;
    });
    native2 = Array.prototype.map.call(source2, function(value, index) {
        return value;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_some(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = {};
    var native1 = {};
    var result2 = [];
    var native2 = [];

    result1 = ES[5].Array.prototype.some.call(source1, function(value, index) {
        return value < 3;
    });
    native1 = Array.prototype.some.call(source1, function(value, index) {
        return value < 3;
    });
    result2 = ES[5].Array.prototype.some.call(source2, function(value, index) {
        return value < 3;
    });
    native2 = Array.prototype.some.call(source2, function(value, index) {
        return value < 3;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_every(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = {};
    var native1 = {};
    var result2 = [];
    var native2 = [];

    result1 = ES[5].Array.prototype.every.call(source1, function(value, index) {
        return value < 3;
    });
    native1 = Array.prototype.every.call(source1, function(value, index) {
        return value < 3;
    });
    result2 = ES[5].Array.prototype.every.call(source2, function(value, index) {
        return value < 3;
    });
    native2 = Array.prototype.every.call(source2, function(value, index) {
        return value < 3;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_filter(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = {};
    var native1 = {};
    var result2 = [];
    var native2 = [];

    result1 = ES[5].Array.prototype.filter.call(source1, function(value, index) {
        return value % 2;
    });
    native1 = Array.prototype.filter.call(source1, function(value, index) {
        return value % 2;
    });
    result2 = ES[5].Array.prototype.filter.call(source2, function(value, index) {
        return value % 2;
    });
    native2 = Array.prototype.filter.call(source2, function(value, index) {
        return value % 2;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_reduce(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = {};
    var native1 = {};
    var result2 = [];
    var native2 = [];

    result1 = ES[5].Array.prototype.reduce.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native1 = Array.prototype.reduce.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    result2 = ES[5].Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native2 = Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_reduceRight(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = {};
    var native1 = {};
    var result2 = [];
    var native2 = [];

    result1 = ES[5].Array.prototype.reduceRight.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native1 = Array.prototype.reduceRight.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    result2 = ES[5].Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native2 = Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_sparse_indexOf(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];

    delete source1["b"];
    delete source2[1];

    var result1 = ES[5].Array.prototype.indexOf.call(source1, 2);
    var native1 = Array.prototype.indexOf.call(source1, 2);
    var result2 = ES[5].Array.prototype.indexOf.call(source2, 2);
    var native2 = Array.prototype.indexOf.call(source2, 2);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_sparse_lastIndexOf(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];

    delete source1["b"];
    delete source2[1];

    var result1 = ES[5].Array.prototype.lastIndexOf.call(source1, 2);
    var native1 = Array.prototype.lastIndexOf.call(source1, 2);
    var result2 = ES[5].Array.prototype.lastIndexOf.call(source2, 2);
    var native2 = Array.prototype.lastIndexOf.call(source2, 2);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_sparse_forEach(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];

    delete source1["b"];
    delete source2[1];

    var result1 = {};
    var native1 = {};
    var result2 = [];
    var native2 = [];

    ES[5].Array.prototype.forEach.call(source1, function(value, index) {
        result1[value] = index;
    });
    Array.prototype.forEach.call(source1, function(value, index) {
        native1[value] = index;
    });
    ES[5].Array.prototype.forEach.call(source2, function(value, index) {
        result2[value] = index;
    });
    Array.prototype.forEach.call(source2, function(value, index) {
        native2[value] = index;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_sparse_map(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];

    delete source1["b"];
    delete source2[1];

    var result1 = {};
    var native1 = {};
    var result2 = [];
    var native2 = [];

    result1 = ES[5].Array.prototype.map.call(source1, function(value, index) {
        return value;
    });
    native1 = Array.prototype.map.call(source1, function(value, index) {
        return value;
    });
    result2 = ES[5].Array.prototype.map.call(source2, function(value, index) {
        return value;
    });
    native2 = Array.prototype.map.call(source2, function(value, index) {
        return value;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_sparse_some(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];

    delete source1["b"];
    delete source2[1];

    var result1 = {};
    var native1 = {};
    var result2 = [];
    var native2 = [];

    result1 = ES[5].Array.prototype.some.call(source1, function(value, index) {
        return value < 3;
    });
    native1 = Array.prototype.some.call(source1, function(value, index) {
        return value < 3;
    });
    result2 = ES[5].Array.prototype.some.call(source2, function(value, index) {
        return value < 3;
    });
    native2 = Array.prototype.some.call(source2, function(value, index) {
        return value < 3;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_sparse_every(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];

    delete source1["b"];
    delete source2[1];

    var result1 = {};
    var native1 = {};
    var result2 = [];
    var native2 = [];

    result1 = ES[5].Array.prototype.every.call(source1, function(value, index) {
        return value < 3;
    });
    native1 = Array.prototype.every.call(source1, function(value, index) {
        return value < 3;
    });
    result2 = ES[5].Array.prototype.every.call(source2, function(value, index) {
        return value < 3;
    });
    native2 = Array.prototype.every.call(source2, function(value, index) {
        return value < 3;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_sparse_filter(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];

    delete source1["b"];
    delete source2[1];

    var result1 = {};
    var native1 = {};
    var result2 = [];
    var native2 = [];

    result1 = ES[5].Array.prototype.filter.call(source1, function(value, index) {
        return value % 2;
    });
    native1 = Array.prototype.filter.call(source1, function(value, index) {
        return value % 2;
    });
    result2 = ES[5].Array.prototype.filter.call(source2, function(value, index) {
        return value % 2;
    });
    native2 = Array.prototype.filter.call(source2, function(value, index) {
        return value % 2;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_sparse_reduce(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];

    delete source1["b"];
    delete source2[1];

    var result1 = {};
    var native1 = {};
    var result2 = [];
    var native2 = [];

    result1 = ES[5].Array.prototype.reduce.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native1 = Array.prototype.reduce.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    result2 = ES[5].Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native2 = Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_sparse_reduceRight(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];

    delete source1["b"];
    delete source2[1];

    var result1 = {};
    var native1 = {};
    var result2 = [];
    var native2 = [];

    result1 = ES[5].Array.prototype.reduceRight.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native1 = Array.prototype.reduceRight.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    result2 = ES[5].Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native2 = Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_reduce_complex(test, pass, miss) {
    var source2 = [ 1, 2, 3, 4 ];

    delete source2[1];

    var result1 = ES[5].Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    });
    var native1 = Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    });
    var result2 = ES[5].Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var native2 = Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var result3 = ES[5].Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var native3 = Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    try {
        var result4 = ES[5].Array.prototype.reduce.call([], function(prev, curt, index) {
            return prev * curt + index;
        });
    } catch(err) { result = "ok"; }
    try {
        var native4 = Array.prototype.reduce.call([], function(prev, curt, index) {
            return prev * curt + index;
        });
    } catch(err) { result = "ok"; }

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) &&
         JSON.stringify(result3) === JSON.stringify(native3) &&
         JSON.stringify(result4) === JSON.stringify(native4) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_reduceRight_complex(test, pass, miss) {
    var source2 = [ 1, 2, 3, 4 ];

    delete source2[1];

    var result1 = ES[5].Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    });
    var native1 = Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    });
    var result2 = ES[5].Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var native2 = Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var result3 = ES[5].Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var native3 = Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    try {
        var result4 = ES[5].Array.prototype.reduceRight.call([], function(prev, curt, index) {
            return prev * curt + index;
        });
    } catch(err) { result = "ok"; }
    try {
        var native4 = Array.prototype.reduceRight.call([], function(prev, curt, index) {
            return prev * curt + index;
        });
    } catch(err) { result = "ok"; }

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) &&
         JSON.stringify(result3) === JSON.stringify(native3) &&
         JSON.stringify(result4) === JSON.stringify(native4) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testObject_name(test, pass, miss) {
    function ClassA() {};
    function ClassB() {};

    var a = new ClassA();
    var b = new ClassB();

    if (ClassA.name === "ClassA" &&
        ClassB.name === "ClassB" &&
        a.constructor.name === "ClassA" &&
        b.constructor.name === "ClassB") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testObject_assign(test, pass, miss) {
    var polyfill = {
        clone:  ES[6].Object.assign.call(null, {}, { a: 1 }),
        merge:  ES[6].Object.assign.call(null, { a: 1 }, { b: 2 }, { c: 3 }),
        obj:          Object.create({ foo:1 }, { bar: { value:2 }, baz: { value:3, enumerable:true }}),
    };
    var native = {
        clone:  Object.assign({}, { a: 1 }),
        merge:  Object.assign({ a: 1 }, { b: 2 }, { c: 3 }),
        obj:    Object.create({ foo:1 }, { bar: { value:2 }, baz: { value:3, enumerable:true }}),
    };
    if ( JSON.stringify(polyfill.clone) === JSON.stringify(native.clone) &&
         JSON.stringify(polyfill.merge) === JSON.stringify(native.merge) &&
         JSON.stringify(polyfill.obj)   === JSON.stringify(native.obj) &&

         JSON.stringify(polyfill.clone) === JSON.stringify({ a: 1 }) &&
         JSON.stringify(polyfill.merge) === JSON.stringify({ a: 1, b: 2, c: 3 }) &&
         JSON.stringify(polyfill.obj)   === JSON.stringify({ baz: 3 }) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testObject_is(test, pass, miss) {
    var obj = { a: 1 };

    if (Object.is("foo", "foo") === ES[6].Object.is("foo", "foo") &&
        Object.is(obj, obj)     === ES[6].Object.is(obj, obj) &&
        Object.is([], [])       === ES[6].Object.is([], []) &&
        Object.is(null, null)   === ES[6].Object.is(null, null) &&
        Object.is(0, -0)        === ES[6].Object.is(0, -0) &&
        Object.is(-0, -0)       === ES[6].Object.is(-0, -0) &&
        Object.is(NaN, 0/0)     === ES[6].Object.is(NaN, 0/0)) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_of(test, pass, miss) {
    if (Array.of(1).join()             === ES[6].Array.of(1).join() &&
        Array.of(1, 2, 3).join()       === ES[6].Array.of(1, 2, 3).join() &&
        Array.of(undefined).join()     === ES[6].Array.of(undefined).join()) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_from(test, pass, miss) {
    function native() {
        return Array.from(arguments);
    }
    function polyfill() {
        return ES[6].Array.from(arguments);
    }

    //var s = new Set(["foo", window]);
    //Array.from(s); // ["foo", window]

    //var m = new Map([[1, 2], [2, 4], [4, 8]]);
    //Array.from(m); // [[1, 2], [2, 4], [4, 8]]

    var native2   =       Array.from([1, 2, 3], function(x) { return x + x; }); // [2, 4, 6]
    var polyfill2 = ES[6].Array.from([1, 2, 3], function(x) { return x + x; }); // [2, 4, 6]

    var native3   =       Array.from({length: 5}, function(v, k) { return k; }); // [0, 1, 2, 3, 4]
    var polyfill3 = ES[6].Array.from({length: 5}, function(v, k) { return k; }); // [0, 1, 2, 3, 4]

    if (native(1, 2, 3).join()      === polyfill(1, 2, 3).join() &&
        Array.from("foo").join()    === ES[6].Array.from("foo").join() &&
        native2.join()              === polyfill2.join() &&
        native3.join()              === polyfill3.join() ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_entries(test, pass, miss) {
    var a = [0, 1, 2, 3].entries();
    var b = ES[6].Array.prototype.entries.call([0, 1, 2, 3]);

    var a1 = a.next();
    var a2 = a.next();
    var a3 = a.next();
    var a4 = a.next();
    var a5 = a.next();

    var b1 = b.next();
    var b2 = b.next();
    var b3 = b.next();
    var b4 = b.next();
    var b5 = b.next();

    if ( JSON.stringify(a1) === JSON.stringify({ value: [0, 0], done: false }) &&
         JSON.stringify(a2) === JSON.stringify({ value: [1, 1], done: false }) &&
         JSON.stringify(a3) === JSON.stringify({ value: [2, 2], done: false }) &&
         JSON.stringify(a4) === JSON.stringify({ value: [3, 3], done: false }) &&
         JSON.stringify(a5) === JSON.stringify({ value: undefined, done: true })) {

        if ( JSON.stringify(b1) === JSON.stringify({ value: [0, 0], done: false }) &&
             JSON.stringify(b2) === JSON.stringify({ value: [1, 1], done: false }) &&
             JSON.stringify(b3) === JSON.stringify({ value: [2, 2], done: false }) &&
             JSON.stringify(b4) === JSON.stringify({ value: [3, 3], done: false }) &&
             JSON.stringify(b5) === JSON.stringify({ value: undefined, done: true })) {
            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

function testArray_keys(test, pass, miss) {
    var a = [0, 1, 2, 3].keys();
    var b = ES[6].Array.prototype.keys.call([0, 1, 2, 3]);

    var a1 = a.next();
    var a2 = a.next();
    var a3 = a.next();
    var a4 = a.next();
    var a5 = a.next();

    var b1 = b.next();
    var b2 = b.next();
    var b3 = b.next();
    var b4 = b.next();
    var b5 = b.next();

    if ( JSON.stringify(a1) === JSON.stringify(b1) &&
         JSON.stringify(a2) === JSON.stringify(b2) &&
         JSON.stringify(a3) === JSON.stringify(b3) &&
         JSON.stringify(a4) === JSON.stringify(b4) &&
         JSON.stringify(a5) === JSON.stringify(b5) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_fill(test, pass, miss) {
    var a1 = [1, 2, 3].fill(4);              // [4, 4, 4]
    var a2 = [1, 2, 3].fill(4, 1);           // [1, 4, 4]
    var a3 = [1, 2, 3].fill(4, 1, 2);        // [1, 4, 3]
    var a4 = [1, 2, 3].fill(4, 1, 1);        // [1, 2, 3]
    var a5 = [1, 2, 3].fill(4, -3, -2);      // [4, 2, 3]
    var a6 = [1, 2, 3].fill(4, NaN, NaN);    // [1, 2, 3]
    var a7 = [].fill.call({ length: 3 }, 4); // {0: 4, 1: 4, 2: 4, length: 3}


    var b1 = ES[6].Array.prototype.fill.call([1, 2, 3], 4);             // [4, 4, 4]
    var b2 = ES[6].Array.prototype.fill.call([1, 2, 3], 4, 1);          // [1, 4, 4]
    var b3 = ES[6].Array.prototype.fill.call([1, 2, 3], 4, 1, 2);       // [1, 4, 3]
    var b4 = ES[6].Array.prototype.fill.call([1, 2, 3], 4, 1, 1);       // [1, 2, 3]
    var b5 = ES[6].Array.prototype.fill.call([1, 2, 3], 4, -3, -2);     // [4, 2, 3]
    var b6 = ES[6].Array.prototype.fill.call([1, 2, 3], 4, NaN, NaN);   // [1, 2, 3]
    var b7 = ES[6].Array.prototype.fill.call({ length: 3 }, 4);         // {0: 4, 1: 4, 2: 4, length: 3}

    if ( JSON.stringify(a1) === JSON.stringify(b1) &&
         JSON.stringify(a2) === JSON.stringify(b2) &&
         JSON.stringify(a3) === JSON.stringify(b3) &&
         JSON.stringify(a4) === JSON.stringify(b4) &&
         JSON.stringify(a5) === JSON.stringify(b5) &&
         JSON.stringify(a6) === JSON.stringify(b6) &&
         JSON.stringify(a7) === JSON.stringify(b7) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_find(test, pass, miss) {
    function isPrime(element, index, array) {
        var start = 2;
        while (start <= Math.sqrt(element)) {
            if (element % start++ < 1) {
                return false;
            }
        }
        return element > 1;
    }

    var a1 = [4, 6, 8, 12].find(isPrime); // undefined, not found
    var a2 = [4, 5, 8, 12].find(isPrime); // 5

    var b1 = ES[6].Array.prototype.find.call([4, 6, 8, 12], isPrime); // undefined, not found
    var b2 = ES[6].Array.prototype.find.call([4, 5, 8, 12], isPrime); // 5


    if ( JSON.stringify(a1) === JSON.stringify(b1) &&
         JSON.stringify(a2) === JSON.stringify(b2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_findIndex(test, pass, miss) {
    function isPrime(element, index, array) {
        var start = 2;
        while (start <= Math.sqrt(element)) {
            if (element % start++ < 1) {
                return false;
            }
        }
        return element > 1;
    }

    var a1 = [4, 6, 8, 12].findIndex(isPrime); // -1, not found
    var a2 = [4, 5, 8, 12].findIndex(isPrime); // 25

    var b1 = ES[6].Array.prototype.findIndex.call([4, 6, 8, 12], isPrime); // -1, not found
    var b2 = ES[6].Array.prototype.findIndex.call([4, 5, 8, 12], isPrime); // 25

    if ( JSON.stringify(a1) === JSON.stringify(b1) &&
         JSON.stringify(a2) === JSON.stringify(b2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_values(test, pass, miss) {
    var a = [0, 1, 2, 3].values();
    var b = ES[6].Array.prototype.values.call([0, 1, 2, 3]);

    var a1 = a.next();
    var a2 = a.next();
    var a3 = a.next();
    var a4 = a.next();
    var a5 = a.next();

    var b1 = b.next();
    var b2 = b.next();
    var b3 = b.next();
    var b4 = b.next();
    var b5 = b.next();

    if ( JSON.stringify(a1) === JSON.stringify(b1) &&
         JSON.stringify(a2) === JSON.stringify(b2) &&
         JSON.stringify(a3) === JSON.stringify(b3) &&
         JSON.stringify(a4) === JSON.stringify(b4) &&
         JSON.stringify(a5) === JSON.stringify(b5) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_copyWithin(test, pass, miss) {
    var a1 = [1, 2, 3, 4, 5].copyWithin(0, 3); // [4, 5, 3, 4, 5]
    var a2 = [1, 2, 3, 4, 5].copyWithin(0, 3, 4); // [4, 2, 3, 4, 5]
    var a3 = [1, 2, 3, 4, 5].copyWithin(0, -2, -1); // [4, 2, 3, 4, 5]
    var a4 = [].copyWithin.call({length: 5, 3: 1}, 0, 3); // {0: 1, 3: 1, length: 5}

    var b1 = ES[6].Array.prototype.copyWithin.call([1, 2, 3, 4, 5], 0, 3); // [4, 5, 3, 4, 5]
    var b2 = ES[6].Array.prototype.copyWithin.call([1, 2, 3, 4, 5], 0, 3, 4); // [4, 2, 3, 4, 5]
    var b3 = ES[6].Array.prototype.copyWithin.call([1, 2, 3, 4, 5], 0, -2, -1); // [4, 2, 3, 4, 5]
    var b4 = ES[6].Array.prototype.copyWithin.call({length: 5, 3: 1}, 0, 3); // {0: 1, 3: 1, length: 5}

    if ( JSON.stringify(a1) === JSON.stringify(b1) &&
         JSON.stringify(a2) === JSON.stringify(b2) &&
         JSON.stringify(a3) === JSON.stringify(b3) &&
         JSON.stringify(a4) === JSON.stringify(b4) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testString_fromCodePoint(test, pass, miss) {
    var a1 = String.fromCodePoint(42);       // "*"
    var a2 = String.fromCodePoint(65, 90);   // "AZ"
    var a3 = String.fromCodePoint(0x404);    // "\u0404"
    var a4 = String.fromCodePoint(0x2F804);  // "\uD87E\uDC04"
    var a5 = String.fromCodePoint(194564);   // "\uD87E\uDC04"
    var a6 = String.fromCodePoint(0x1D306, 0x61, 0x1D307) // "\uD834\uDF06a\uD834\uDF07"

    var b1 = ES[6].String.fromCodePoint(42);       // "*"
    var b2 = ES[6].String.fromCodePoint(65, 90);   // "AZ"
    var b3 = ES[6].String.fromCodePoint(0x404);    // "\u0404"
    var b4 = ES[6].String.fromCodePoint(0x2F804);  // "\uD87E\uDC04"
    var b5 = ES[6].String.fromCodePoint(194564);   // "\uD87E\uDC04"
    var b6 = ES[6].String.fromCodePoint(0x1D306, 0x61, 0x1D307) // "\uD834\uDF06a\uD834\uDF07"

    if ( JSON.stringify(a1) === JSON.stringify(b1) &&
         JSON.stringify(a2) === JSON.stringify(b2) &&
         JSON.stringify(a3) === JSON.stringify(b3) &&
         JSON.stringify(a4) === JSON.stringify(b4) &&
         JSON.stringify(a5) === JSON.stringify(b5) &&
         JSON.stringify(a6) === JSON.stringify(b6) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testString_repeat(test, pass, miss) {
//  var a1 = 'abc'.repeat(-1);   // RangeError
    var a2 = 'abc'.repeat(0);    // ''
    var a3 = 'abc'.repeat(1);    // 'abc'
    var a4 = 'abc'.repeat(2);    // 'abcabc'
    var a5 = 'abc'.repeat(3.5);  // 'abcabcabc' (count will be converted to integer)
//  var a6 = 'abc'.repeat(1/0);  // RangeError

//  var b1 = ES[6].String.prototype.repeat.call('abc', -1);   // RangeError
    var b2 = ES[6].String.prototype.repeat.call('abc', 0);    // ''
    var b3 = ES[6].String.prototype.repeat.call('abc', 1);    // 'abc'
    var b4 = ES[6].String.prototype.repeat.call('abc', 2);    // 'abcabc'
    var b5 = ES[6].String.prototype.repeat.call('abc', 3.5);  // 'abcabcabc' (count will be converted to integer)
//  var b6 = ES[6].String.prototype.repeat.call('abc', 1/0);  // RangeError

    if (
         JSON.stringify(a2) === JSON.stringify(b2) &&
         JSON.stringify(a3) === JSON.stringify(b3) &&
         JSON.stringify(a4) === JSON.stringify(b4) &&
         JSON.stringify(a5) === JSON.stringify(b5) ) {
        
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testString_codePointAt(test, pass, miss) {
    var a1 = 'ABC'.codePointAt(1);          // 66
    var a2 = '\uD800\uDC00'.codePointAt(0); // 65536
    var a3 = 'XYZ'.codePointAt(42);         // undefined

    var b1 = ES[6].String.prototype.codePointAt.call('ABC', 1);          // 66
    var b2 = ES[6].String.prototype.codePointAt.call('\uD800\uDC00', 0); // 65536
    var b3 = ES[6].String.prototype.codePointAt.call('XYZ', 42);         // undefined

    if ( JSON.stringify(a1) === JSON.stringify(b1) &&
         JSON.stringify(a2) === JSON.stringify(b2) &&
         JSON.stringify(a3) === JSON.stringify(b3) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testString_includes(test, pass, miss) {
    var str = 'To be, or not to be, that is the question.';

    var a1 = str.includes('To be');       // true
    var a2 = str.includes('question');    // true
    var a3 = str.includes('nonexistent'); // false
    var a4 = str.includes('To be', 1);    // false
    var a5 = str.includes('TO BE');       // false

    var b1 = ES[6].String.prototype.includes.call(str, 'To be');       // true
    var b2 = ES[6].String.prototype.includes.call(str, 'question');    // true
    var b3 = ES[6].String.prototype.includes.call(str, 'nonexistent'); // false
    var b4 = ES[6].String.prototype.includes.call(str, 'To be', 1);    // false
    var b5 = ES[6].String.prototype.includes.call(str, 'TO BE');       // false

    if ( JSON.stringify(a1) === JSON.stringify(b1) &&
         JSON.stringify(a2) === JSON.stringify(b2) &&
         JSON.stringify(a3) === JSON.stringify(b3) &&
         JSON.stringify(a4) === JSON.stringify(b4) &&
         JSON.stringify(a5) === JSON.stringify(b5) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testString_startsWith(test, pass, miss) {
    var str = 'To be, or not to be, that is the question.';

    var a1 = str.startsWith('To be');         // true
    var a2 = str.startsWith('not to be');     // false
    var a3 = str.startsWith('not to be', 10); // true

    var b1 = ES[6].String.prototype.startsWith.call(str, 'To be');         // true
    var b2 = ES[6].String.prototype.startsWith.call(str, 'not to be');     // false
    var b3 = ES[6].String.prototype.startsWith.call(str, 'not to be', 10); // true

    if ( JSON.stringify(a1) === JSON.stringify(b1) &&
         JSON.stringify(a2) === JSON.stringify(b2) &&
         JSON.stringify(a3) === JSON.stringify(b3) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testString_endWith(test, pass, miss) {
    var str = 'To be, or not to be, that is the question.';

    var a1 = str.endsWith('question.'); // true
    var a2 = str.endsWith('to be');     // false
    var a3 = str.endsWith('to be', 19); // true

    var b1 = ES[6].String.prototype.endsWith.call(str, 'question.'); // true
    var b2 = ES[6].String.prototype.endsWith.call(str, 'to be');     // false
    var b3 = ES[6].String.prototype.endsWith.call(str, 'to be', 19); // true

    if ( JSON.stringify(a1) === JSON.stringify(b1) &&
         JSON.stringify(a2) === JSON.stringify(b2) &&
         JSON.stringify(a3) === JSON.stringify(b3) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testNumber_isInteger(test, pass, miss) {
    var a1 = Number.isInteger(0.1);     // false
    var a2 = Number.isInteger(1);       // true
    var a3 = Number.isInteger(Math.PI); // false
    var a4 = Number.isInteger(-100000); // true
    var a5 = Number.isInteger(NaN);     // false
    var a6 = Number.isInteger(0);       // true
    var a7 = Number.isInteger("10");    // false

    var b1 = ES[6].Number.isInteger(0.1);     // false
    var b2 = ES[6].Number.isInteger(1);       // true
    var b3 = ES[6].Number.isInteger(Math.PI); // false
    var b4 = ES[6].Number.isInteger(-100000); // true
    var b5 = ES[6].Number.isInteger(NaN);     // false
    var b6 = ES[6].Number.isInteger(0);       // true
    var b7 = ES[6].Number.isInteger("10");    // false

    if ( JSON.stringify(a1) === JSON.stringify(b1) &&
         JSON.stringify(a2) === JSON.stringify(b2) &&
         JSON.stringify(a3) === JSON.stringify(b3) &&
         JSON.stringify(a4) === JSON.stringify(b4) &&
         JSON.stringify(a5) === JSON.stringify(b5) &&
         JSON.stringify(a6) === JSON.stringify(b6) &&
         JSON.stringify(a7) === JSON.stringify(b7) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testNumber_isSafeInteger(test, pass, miss) {
    var a1 = Number.isSafeInteger(3);                    // true
    var a2 = Number.isSafeInteger(Math.pow(2, 53));      // false
    var a3 = Number.isSafeInteger(Math.pow(2, 53) - 1);  // true
    var a4 = Number.isSafeInteger(NaN);                  // false
    var a5 = Number.isSafeInteger(Infinity);             // false
    var a6 = Number.isSafeInteger('3');                  // false
    var a7 = Number.isSafeInteger(3.1);                  // false
    var a8 = Number.isSafeInteger(3.0);                  // true

    var b1 = ES[6].Number.isSafeInteger(3);                    // true
    var b2 = ES[6].Number.isSafeInteger(Math.pow(2, 53));      // false
    var b3 = ES[6].Number.isSafeInteger(Math.pow(2, 53) - 1);  // true
    var b4 = ES[6].Number.isSafeInteger(NaN);                  // false
    var b5 = ES[6].Number.isSafeInteger(Infinity);             // false
    var b6 = ES[6].Number.isSafeInteger('3');                  // false
    var b7 = ES[6].Number.isSafeInteger(3.1);                  // false
    var b8 = ES[6].Number.isSafeInteger(3.0);                  // true

    if ( JSON.stringify(a1) === JSON.stringify(b1) &&
         JSON.stringify(a2) === JSON.stringify(b2) &&
         JSON.stringify(a3) === JSON.stringify(b3) &&
         JSON.stringify(a4) === JSON.stringify(b4) &&
         JSON.stringify(a5) === JSON.stringify(b5) &&
         JSON.stringify(a6) === JSON.stringify(b6) &&
         JSON.stringify(a7) === JSON.stringify(b7) &&
         JSON.stringify(a8) === JSON.stringify(b8) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testMath(test, pass, miss) {
    var a01 = Math.acosh(-1); // NaN
    var a02 = Math.acosh(0);  // NaN
    var a03 = Math.acosh(0.5) // NaN
    var a04 = Math.acosh(1);  // 0
    var a05 = Math.acosh(2);  // 1.3169578969248166
    var a10 = Math.asinh(1);  // 0.881373587019543
    var a11 = Math.asinh(0);  // 0
    var a20 = Math.atanh(-2);  // NaN
    var a21 = Math.atanh(-1);  // -Infinity
    var a22 = Math.atanh(0);   // 0
    var a23 = Math.atanh(0.5); // 0.5493061443340548
    var a24 = Math.atanh(1);   // Infinity
    var a25 = Math.atanh(2);   // NaN
    var a30 = Math.cbrt(-1); // -1
    var a31 = Math.cbrt(0);  // 0
    var a32 = Math.cbrt(1);  // 1
    var a33 = Math.cbrt(2);  // 1.2599210498948734
    var a40 = Math.clz32(1);                // 31
    var a41 = Math.clz32(1000);             // 22
    var a42 = Math.clz32();                 // 32
    var a43 = Math.clz32(true);             // 31
    var a44 = Math.clz32(3.5);              // 30
    var a50 = Math.cosh(0);  // 1
    var a51 = Math.cosh(1);  // 1.5430806348152437
    var a52 = Math.cosh(-1); // 1.5430806348152437
    var a60 = Math.expm1(-1); // -0.6321205588285577 
    var a61 = Math.expm1(0);  // 0
    var a62 = Math.expm1(1);  // 1.718281828459045
    var a70 = Math.fround(0);     // 0
    var a71 = Math.fround(1);     // 1
    var a72 = Math.fround(1.337); // 1.3370000123977661
    var a73 = Math.fround(1.5);   // 1.5
    var a74 = Math.fround(NaN);   // NaN
    var a80 = Math.hypot(3, 4);        // 5
    var a81 = Math.hypot(3, 4, 5);     // 7.0710678118654755
    var a82 = Math.hypot();            // 0
    var a83 = Math.hypot(NaN);         // NaN
    var a84 = Math.hypot(3, 4, 'foo'); // NaN, +'foo' => NaN
    var a85 = Math.hypot(3, 4, '5');   // 7.0710678118654755, +'5' => 5
    var a86 = Math.hypot(-3);          // 3, the same as Math.abs(-3)
    var a90 = Math.imul(2, 4);          // 8
    var a91 = Math.imul(-1, 8);         // -8
    var a92 = Math.imul(-2, -2);        // 4
    var a93 = Math.imul(0xffffffff, 5); // -5
    var a94 = Math.imul(0xfffffffe, 5); // -10
    var a100 = Math.log10(2);      // 0.3010299956639812
    var a101 = Math.log10(1);      // 0
    var a102 = Math.log10(0);      // -Infinity
    var a103 = Math.log10(-2);     // NaN
    var a104 = Math.log10(100000); // 5
    var a110 = Math.log1p(1);  // 0.6931471805599453
    var a111 = Math.log1p(0);  // 0
    var a112 = Math.log1p(-1); // -Infinity
    var a113 = Math.log1p(-2); // NaN
    var a120 = Math.log2(3);    // 1.584962500721156
    var a121 = Math.log2(2);    // 1
    var a122 = Math.log2(1);    // 0
    var a123 = Math.log2(0);    // -Infinity
    var a124 = Math.log2(-2);   // NaN
    var a125 = Math.log2(1024); // 10
    var a130 = Math.sign(3);     //  1
    var a131 = Math.sign(-3);    // -1
    var a132 = Math.sign('-3');  // -1
    var a133 = Math.sign(0);     //  0
    var a134 = Math.sign(-0);    // -0
    var a135 = Math.sign(NaN);   // NaN
    var a136 = Math.sign('foo'); // NaN
    var a137 = Math.sign();      // NaN
    var a140 = Math.sinh(0); // 0
    var a141 = Math.sinh(1); // 1.1752011936438014
    var a150 = Math.tanh(0);        // 0
    var a151 = Math.tanh(Infinity); // 1
    var a152 = Math.tanh(1);        // 0.7615941559557649
    var a160 = Math.trunc(13.37);    // 13
    var a161 = Math.trunc(42.84);    // 42
    var a162 = Math.trunc(0.123);    //  0
    var a163 = Math.trunc(-0.123);   // -0
    var a164 = Math.trunc('-1.123'); // -1
    var a165 = Math.trunc(NaN);      // NaN
    var a166 = Math.trunc('foo');    // NaN
    var a167 = Math.trunc();         // NaN

    var b01 = ES[6].Math.acosh(-1); // NaN
    var b02 = ES[6].Math.acosh(0);  // NaN
    var b03 = ES[6].Math.acosh(0.5) // NaN
    var b04 = ES[6].Math.acosh(1);  // 0
    var b05 = ES[6].Math.acosh(2);  // 1.3169578969248166
    var b10 = ES[6].Math.asinh(1);  // 0.881373587019543
    var b11 = ES[6].Math.asinh(0);  // 0
    var b20 = ES[6].Math.atanh(-2);  // NaN
    var b21 = ES[6].Math.atanh(-1);  // -Infinity
    var b22 = ES[6].Math.atanh(0);   // 0
    var b23 = ES[6].Math.atanh(0.5); // 0.5493061443340548
    var b24 = ES[6].Math.atanh(1);   // Infinity
    var b25 = ES[6].Math.atanh(2);   // NaN
    var b30 = ES[6].Math.cbrt(-1); // -1
    var b31 = ES[6].Math.cbrt(0);  // 0
    var b32 = ES[6].Math.cbrt(1);  // 1
    var b33 = ES[6].Math.cbrt(2);  // 1.2599210498948734
    var b40 = ES[6].Math.clz32(1);                // 31
    var b41 = ES[6].Math.clz32(1000);             // 22
    var b42 = ES[6].Math.clz32();                 // 32
    var b43 = ES[6].Math.clz32(true);             // 31
    var b44 = ES[6].Math.clz32(3.5);              // 30
    var b50 = ES[6].Math.cosh(0);  // 1
    var b51 = ES[6].Math.cosh(1);  // 1.5430806348152437
    var b52 = ES[6].Math.cosh(-1); // 1.5430806348152437
    var b60 = ES[6].Math.expm1(-1); // -0.6321205588285577 
    var b61 = ES[6].Math.expm1(0);  // 0
    var b62 = ES[6].Math.expm1(1);  // 1.718281828459045
    var b70 = ES[6].Math.fround(0);     // 0
    var b71 = ES[6].Math.fround(1);     // 1
    var b72 = ES[6].Math.fround(1.337); // 1.3370000123977661
    var b73 = ES[6].Math.fround(1.5);   // 1.5
    var b74 = ES[6].Math.fround(NaN);   // NaN
    var b80 = ES[6].Math.hypot(3, 4);        // 5
    var b81 = ES[6].Math.hypot(3, 4, 5);     // 7.0710678118654755
    var b82 = ES[6].Math.hypot();            // 0
    var b83 = ES[6].Math.hypot(NaN);         // NaN
    var b84 = ES[6].Math.hypot(3, 4, 'foo'); // NaN, +'foo' => NaN
    var b85 = ES[6].Math.hypot(3, 4, '5');   // 7.0710678118654755, +'5' => 5
    var b86 = ES[6].Math.hypot(-3);          // 3, the same as Math.abs(-3)
    var b90 = ES[6].Math.imul(2, 4);          // 8
    var b91 = ES[6].Math.imul(-1, 8);         // -8
    var b92 = ES[6].Math.imul(-2, -2);        // 4
    var b93 = ES[6].Math.imul(0xffffffff, 5); // -5
    var b94 = ES[6].Math.imul(0xfffffffe, 5); // -10
    var b100 = ES[6].Math.log10(2);      // 0.3010299956639812
    var b101 = ES[6].Math.log10(1);      // 0
    var b102 = ES[6].Math.log10(0);      // -Infinity
    var b103 = ES[6].Math.log10(-2);     // NaN
    var b104 = ES[6].Math.log10(100000); // 5
    var b110 = ES[6].Math.log1p(1);  // 0.6931471805599453
    var b111 = ES[6].Math.log1p(0);  // 0
    var b112 = ES[6].Math.log1p(-1); // -Infinity
    var b113 = ES[6].Math.log1p(-2); // NaN
    var b120 = ES[6].Math.log2(3);    // 1.584962500721156
    var b121 = ES[6].Math.log2(2);    // 1
    var b122 = ES[6].Math.log2(1);    // 0
    var b123 = ES[6].Math.log2(0);    // -Infinity
    var b124 = ES[6].Math.log2(-2);   // NaN
    var b125 = ES[6].Math.log2(1024); // 10
    var b130 = ES[6].Math.sign(3);     //  1
    var b131 = ES[6].Math.sign(-3);    // -1
    var b132 = ES[6].Math.sign('-3');  // -1
    var b133 = ES[6].Math.sign(0);     //  0
    var b134 = ES[6].Math.sign(-0);    // -0
    var b135 = ES[6].Math.sign(NaN);   // NaN
    var b136 = ES[6].Math.sign('foo'); // NaN
    var b137 = ES[6].Math.sign();      // NaN
    var b140 = ES[6].Math.sinh(0); // 0
    var b141 = ES[6].Math.sinh(1); // 1.1752011936438014
    var b150 = ES[6].Math.tanh(0);        // 0
    var b151 = ES[6].Math.tanh(Infinity); // 1
    var b152 = ES[6].Math.tanh(1);        // 0.7615941559557649
    var b160 = ES[6].Math.trunc(13.37);    // 13
    var b161 = ES[6].Math.trunc(42.84);    // 42
    var b162 = ES[6].Math.trunc(0.123);    //  0
    var b163 = ES[6].Math.trunc(-0.123);   // -0
    var b164 = ES[6].Math.trunc('-1.123'); // -1
    var b165 = ES[6].Math.trunc(NaN);      // NaN
    var b166 = ES[6].Math.trunc('foo');    // NaN
    var b167 = ES[6].Math.trunc();         // NaN

    if (JSON.stringify(a01 ) === JSON.stringify(b01 ) &&
        JSON.stringify(a02 ) === JSON.stringify(b02 ) &&
        JSON.stringify(a03 ) === JSON.stringify(b03 ) &&
        JSON.stringify(a04 ) === JSON.stringify(b04 ) &&
        JSON.stringify(a05 ) === JSON.stringify(b05 )) {
        if (JSON.stringify(a10 ) === JSON.stringify(b10 ) &&
            JSON.stringify(a11 ) === JSON.stringify(b11 )) {
            if (JSON.stringify(a20 ) === JSON.stringify(b20 ) &&
                JSON.stringify(a21 ) === JSON.stringify(b21 ) &&
                JSON.stringify(a22 ) === JSON.stringify(b22 ) &&
                JSON.stringify(a23 ) === JSON.stringify(b23 ) &&
                JSON.stringify(a24 ) === JSON.stringify(b24 ) &&
                JSON.stringify(a25 ) === JSON.stringify(b25 )) {
                if (JSON.stringify(a30 ) === JSON.stringify(b30 ) &&
                    JSON.stringify(a31 ) === JSON.stringify(b31 ) &&
                    JSON.stringify(a32 ) === JSON.stringify(b32 ) &&
                    JSON.stringify(a33.toFixed(10) ) === JSON.stringify(b33.toFixed(10) )) {
                    if (JSON.stringify(a40 ) === JSON.stringify(b40 ) &&
                        JSON.stringify(a41 ) === JSON.stringify(b41 ) &&
                        JSON.stringify(a42 ) === JSON.stringify(b42 ) &&
                        JSON.stringify(a43 ) === JSON.stringify(b43 ) &&
                        JSON.stringify(a44 ) === JSON.stringify(b44 )) {
                        if (JSON.stringify(a50 ) === JSON.stringify(b50 ) &&
                            JSON.stringify(a51 ) === JSON.stringify(b51 ) &&
                            JSON.stringify(a52.toFixed(10) ) === JSON.stringify(b52.toFixed(10) )) {
                            if (JSON.stringify(a60 ) === JSON.stringify(b60 ) &&
                                JSON.stringify(a61 ) === JSON.stringify(b61 ) &&
                                JSON.stringify(a62 ) === JSON.stringify(b62 )) {
                                if (JSON.stringify(a70 ) === JSON.stringify(b70 ) &&
                                    JSON.stringify(a71 ) === JSON.stringify(b71 ) &&
                                    JSON.stringify(a72 ) === JSON.stringify(b72 ) &&
                                    JSON.stringify(a73 ) === JSON.stringify(b73 ) &&
                                    JSON.stringify(a74 ) === JSON.stringify(b74 )) {
                                    if (JSON.stringify(a80 ) === JSON.stringify(b80 ) &&
                                        JSON.stringify(a81 ) === JSON.stringify(b81 ) &&
                                        JSON.stringify(a82 ) === JSON.stringify(b82 ) &&
                                        JSON.stringify(a83 ) === JSON.stringify(b83 ) &&
                                        JSON.stringify(a84 ) === JSON.stringify(b84 ) &&
                                        JSON.stringify(a85 ) === JSON.stringify(b85 ) &&
                                        JSON.stringify(a86 ) === JSON.stringify(b86 )) {
                                        if (JSON.stringify(a90 ) === JSON.stringify(b90 ) &&
                                            JSON.stringify(a91 ) === JSON.stringify(b91 ) &&
                                            JSON.stringify(a92 ) === JSON.stringify(b92 ) &&
                                            JSON.stringify(a93 ) === JSON.stringify(b93 ) &&
                                            JSON.stringify(a94 ) === JSON.stringify(b94 )) {
                                            if (JSON.stringify(a100.toFixed(10) ) === JSON.stringify(b100.toFixed(10) ) &&
                                                JSON.stringify(a101) === JSON.stringify(b101) &&
                                                JSON.stringify(a102) === JSON.stringify(b102) &&
                                                JSON.stringify(a103) === JSON.stringify(b103) &&
                                                JSON.stringify(a104) === JSON.stringify(b104)) {
                                                if (JSON.stringify(a110) === JSON.stringify(b110) &&
                                                    JSON.stringify(a111) === JSON.stringify(b111) &&
                                                    JSON.stringify(a112) === JSON.stringify(b112) &&
                                                    JSON.stringify(a113) === JSON.stringify(b113)) {
                                                    if (JSON.stringify(a120.toFixed(10)) === JSON.stringify(b120.toFixed(10)) &&
                                                        JSON.stringify(a121) === JSON.stringify(b121) &&
                                                        JSON.stringify(a122) === JSON.stringify(b122) &&
                                                        JSON.stringify(a123) === JSON.stringify(b123) &&
                                                        JSON.stringify(a124) === JSON.stringify(b124) &&
                                                        JSON.stringify(a125) === JSON.stringify(b125)) {
                                                        if (JSON.stringify(a130) === JSON.stringify(b130) &&
                                                            JSON.stringify(a131) === JSON.stringify(b131) &&
                                                            JSON.stringify(a132) === JSON.stringify(b132) &&
                                                            JSON.stringify(a133) === JSON.stringify(b133) &&
                                                            JSON.stringify(a134) === JSON.stringify(b134) &&
                                                            JSON.stringify(a135) === JSON.stringify(b135) &&
                                                            JSON.stringify(a136) === JSON.stringify(b136) &&
                                                            JSON.stringify(a137) === JSON.stringify(b137)) {
                                                            if (JSON.stringify(a140) === JSON.stringify(b140) &&
                                                                JSON.stringify(a141) === JSON.stringify(b141)) {
                                                                if (JSON.stringify(a150) === JSON.stringify(b150) &&
                                                                    JSON.stringify(a151) === JSON.stringify(b151) &&
                                                                    JSON.stringify(a152.toFixed(10)) === JSON.stringify(b152.toFixed(10))) {
                                                                    if (JSON.stringify(a160) === JSON.stringify(b160) &&
                                                                        JSON.stringify(a161) === JSON.stringify(b161) &&
                                                                        JSON.stringify(a162) === JSON.stringify(b162) &&
                                                                        JSON.stringify(a163) === JSON.stringify(b163) &&
                                                                        JSON.stringify(a164) === JSON.stringify(b164) &&
                                                                        JSON.stringify(a165) === JSON.stringify(b165) &&
                                                                        JSON.stringify(a166) === JSON.stringify(b166) &&
                                                                        JSON.stringify(a167) === JSON.stringify(b167)) {

                                                                        test.done(pass());
                                                                        return;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    test.done(miss());
}

function testMap_size(test, pass, miss) {
    var map = new Map();

    map.set("a", "alpha");
    map.set("b", "beta");
    map.set("g", "gamma");

    if (map.size === 3) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testMap_get(test, pass, miss) {
    var map = new Map();

    map.set("bar", "foo");

    if (map.get("bar") === "foo") {
        if (map.get("baz") === undefined) {
            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

function testMap_set(test, pass, miss) {
    var map = new Map();

    map.set("bar", "foo");
    map.set(1, "foobar");

    map.set("bar", "fuuu");

    if (map.get("bar") === "fuuu") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testMap_has(test, pass, miss) {
    var map = new Map();

    map.set("bar", "foo");

    if (map.has("bar") === true) {
        if (map.has("baz") === false) {
            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

function testMap_keys(test, pass, miss) {
    var map = new Map();

    map.set("0", "foo");
    map.set(1, "bar");
    map.set({}, "baz");

    var iter = map.keys();

    if (iter.next().value === "0" &&
        iter.next().value === 1 &&
        iter.next().value.toString() === "[object Object]") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testMap_values(test, pass, miss) {
    var map = new Map();

    map.set("0", "foo");
    map.set(1, "bar");
    map.set({}, "baz");

    var iter = map.values();

    if (iter.next().value === "foo" &&
        iter.next().value === "bar" &&
        iter.next().value === "baz") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testMap_entries(test, pass, miss) {
    var map = new Map();

    map.set("0", "foo");
    map.set(1, "bar");
    map.set({}, "baz");

    var iter = map.entries();

    if (iter.next().value.join() === ["0", "foo"].join() &&
        iter.next().value.join() === [1, "bar"].join() &&
        iter.next().value.join() === ["[object Object]", "baz"].join()) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testMap_forEach(test, pass, miss) {
    var result = [];
    var map = new Map([["foo", 3], ["bar", {}], ["baz", undefined]]);

    map.forEach(function(value, key, map) {
        result.push(String(key), String(value));
    });

    if (result.join() === "foo,3,bar,[object Object],baz,undefined") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testMap_delete(test, pass, miss) {
    var map = new Map();

    map.set("bar", "foo");

    if (map.delete("bar") === true) {
        if (map.has("bar") === false) {
            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

function testMap_clear(test, pass, miss) {
    var map = new Map();

    map.set("bar", "baz");
    map.set(1, "foo");
    if (map.size === 2) {
        if (map.has("bar") === true) {
            map.clear();

            if (map.size === 0) {
                if (map.has("bar") === false) {
                    test.done(pass());
                    return;
                }
            }
        }
    }
    test.done(miss());
}

function testWeakMap(test, pass, miss) {
    // test code from
    //      https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
    var weakmap1 = new WeakMap();
    var weakmap2 = new WeakMap();
    var weakmap3 = new WeakMap();

    var keyObject1 = {};
    var keyObject2 = function(){};
    var keyObject3 = global;

    weakmap1.set(keyObject1, 37);
    weakmap1.set(keyObject2, "azerty");

    weakmap2.set(keyObject1, keyObject2);
    weakmap2.set(keyObject3, undefined);
    weakmap2.set(weakmap1,   weakmap2);

    var result1 = weakmap1.get(keyObject2); // -> "azerty"
    var result2 = weakmap2.get(keyObject2); // -> undefined - weakmap2 には keyObject2 に関連付けられた値が無い為、undefined が返ってきます
    var result3 = weakmap2.get(keyObject3); // -> undefined - 値が undefined と関連付けられている為、undefined が返ってきます

    var result4 = weakmap1.has(keyObject2); // -> true
    var result5 = weakmap2.has(keyObject2); // -> false
    var result6 = weakmap2.has(keyObject3); // -> true (値が関連付けられているならば、たとえ値が 'undefined' であっても true となります)

                  weakmap3.set(keyObject1, 37);
    var result7 = weakmap3.get(keyObject1); // -> 37

    var result8 = undefined;

/*
    try {
                      weakmap3.clear();
        var result8 = weakmap3.get(keyObject1); // -> undefined - weakmap3 は clear されたため keyObject1 に関連する値は持っていません
    } catch(o_o) {
        // node v0.10.26 WeakMap#clear not impl.
        //throw o_o;
    }
 */

    var result9 = weakmap1.has(keyObject1); // -> true
                  weakmap1.delete(keyObject1);
    var resultA = weakmap1.has(keyObject1); // -> false

    if (result1 === "azerty" &&
        result2 === undefined &&
        result3 === undefined &&
        result4 === true &&
        result5 === false &&
        result6 === true &&
        result7 === 37 &&
        result8 === undefined &&
        result9 === true &&
        resultA === false) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

return test.run().clone();

})((this || 0).self || global);

