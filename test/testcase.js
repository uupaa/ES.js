var ModuleTestES = (function(global) {

global["BENCHMARK"] = false;

var test = new Test("ES", {
        disable:    false, // disable all tests.
        browser:    true,  // enable browser test.
        worker:     true,  // enable worker test.
        node:       true,  // enable node test.
        nw:         true,  // enable nw.js test.
        button:     true,  // show button.
        both:       true,  // test the primary and secondary modules.
        ignoreError:false, // ignore error.
        callback:   function() {
        },
        errorback:  function(error) {
        }
    });

var ES5_test = 1;
var ES6_test = 1;
var ES7_test = 1;

if (IN_BROWSER || IN_NW) {
    test.add([
        // browser and node-webkit test
    ]);
} else if (IN_WORKER) {
    test.add([
        // worker test
    ]);
} else if (IN_NODE) {
    test.add([
        // node.js and io.js test
    ]);
}

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
        // --- Set ---
        testSet_size,
        testSet_add,
        testSet_has,
        testSet_values,
        testSet_entries,
        testSet_forEach,
        testSet_delete,
        testSet_clear,
        // --- WeakSet ---
        testWeakSet,
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
    var polyfill1 = WebModule.ES[5].Object.keys(source1); // ["a", "b", "c", "d"]
    var polyfill2 = WebModule.ES[5].Object.keys(source2); // ["0", "1", "2", "3"]
    var native1   =                 Object.keys(source1);
    var native2   =                 Object.keys(source2);

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

    Foo1.prototype = new WebModule.ES[5].Object.create(Foo1, properties1);
    Foo2.prototype =                     Object.create(Foo2, properties2);

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
    var polyfill = WebModule.ES[5].String.prototype.trim.call(" a b \n");
    var native   =                 String.prototype.trim.call(" a b \n");

    if (polyfill === native) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDate_now(test, pass, miss) {
    for (var i = 0; i < 3; ++i) {
        var polyfill = WebModule.ES[5].Date.now();
        var native   =                 Date.now();

        if (polyfill === native) {
            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

function testDate_toJSON(test, pass, miss) {
    var date = new Date();

    var polyfill = WebModule.ES[5].Date.prototype.toJSON.call(date);
    var native   =                 Date.prototype.toJSON.call(date);

    if (polyfill === native) {
        test.done(pass());
        return;
    }
    test.done(miss());
}

function testFunction_bind(test, pass, miss) {
    var data = { value: 1 };
    var method = function(x) { return this.value + x; };

    var polyfill = WebModule.ES[5].Function.prototype.bind.call(method, data, 2);
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

    var polyfill = WebModule.ES[5].JSON.parse.call(null, json);
    var native   =                 JSON.parse.call(null, json);

    if (JSON.stringify(polyfill) === JSON.stringify(native)) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testJSON_stringify(test, pass, miss) {
    var data = { value: 1 };

    var polyfill = WebModule.ES[5].JSON.stringify.call(null, data);
    var native   =                 JSON.stringify.call(null, data);

    if (polyfill === native) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_isArray(test, pass, miss) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = WebModule.ES[5].Array.isArray(source1);
    var native1 =                 Array.isArray(source1);
    var result2 = WebModule.ES[5].Array.isArray(source2);
    var native2 =                 Array.isArray(source2);

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
    var result1 = WebModule.ES[5].Array.prototype.indexOf.call(source1, 2);
    var native1 =                 Array.prototype.indexOf.call(source1, 2);
    var result2 = WebModule.ES[5].Array.prototype.indexOf.call(source2, 2);
    var native2 =                 Array.prototype.indexOf.call(source2, 2);

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
    var result1 = WebModule.ES[5].Array.prototype.lastIndexOf.call(source1, 2);
    var native1 =                 Array.prototype.lastIndexOf.call(source1, 2);
    var result2 = WebModule.ES[5].Array.prototype.lastIndexOf.call(source2, 2);
    var native2 =                 Array.prototype.lastIndexOf.call(source2, 2);

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

    WebModule.ES[5].Array.prototype.forEach.call(source1, function(value, index) {
        result1[value] = index;
    });
    Array.prototype.forEach.call(source1, function(value, index) {
        native1[value] = index;
    });
    WebModule.ES[5].Array.prototype.forEach.call(source2, function(value, index) {
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

    result1 = WebModule.ES[5].Array.prototype.map.call(source1, function(value, index) {
        return value;
    });
    native1 = Array.prototype.map.call(source1, function(value, index) {
        return value;
    });
    result2 = WebModule.ES[5].Array.prototype.map.call(source2, function(value, index) {
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

    result1 = WebModule.ES[5].Array.prototype.some.call(source1, function(value, index) {
        return value < 3;
    });
    native1 = Array.prototype.some.call(source1, function(value, index) {
        return value < 3;
    });
    result2 = WebModule.ES[5].Array.prototype.some.call(source2, function(value, index) {
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

    result1 = WebModule.ES[5].Array.prototype.every.call(source1, function(value, index) {
        return value < 3;
    });
    native1 = Array.prototype.every.call(source1, function(value, index) {
        return value < 3;
    });
    result2 = WebModule.ES[5].Array.prototype.every.call(source2, function(value, index) {
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

    result1 = WebModule.ES[5].Array.prototype.filter.call(source1, function(value, index) {
        return value % 2;
    });
    native1 = Array.prototype.filter.call(source1, function(value, index) {
        return value % 2;
    });
    result2 = WebModule.ES[5].Array.prototype.filter.call(source2, function(value, index) {
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

    result1 = WebModule.ES[5].Array.prototype.reduce.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native1 = Array.prototype.reduce.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    result2 = WebModule.ES[5].Array.prototype.reduce.call(source2, function(prev, curt, index) {
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

    result1 = WebModule.ES[5].Array.prototype.reduceRight.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native1 = Array.prototype.reduceRight.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    result2 = WebModule.ES[5].Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
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

    var result1 = WebModule.ES[5].Array.prototype.indexOf.call(source1, 2);
    var native1 =                 Array.prototype.indexOf.call(source1, 2);
    var result2 = WebModule.ES[5].Array.prototype.indexOf.call(source2, 2);
    var native2 =                 Array.prototype.indexOf.call(source2, 2);

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

    var result1 = WebModule.ES[5].Array.prototype.lastIndexOf.call(source1, 2);
    var native1 =                 Array.prototype.lastIndexOf.call(source1, 2);
    var result2 = WebModule.ES[5].Array.prototype.lastIndexOf.call(source2, 2);
    var native2 =                 Array.prototype.lastIndexOf.call(source2, 2);

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

    WebModule.ES[5].Array.prototype.forEach.call(source1, function(value, index) {
        result1[value] = index;
    });
    Array.prototype.forEach.call(source1, function(value, index) {
        native1[value] = index;
    });
    WebModule.ES[5].Array.prototype.forEach.call(source2, function(value, index) {
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

    result1 = WebModule.ES[5].Array.prototype.map.call(source1, function(value, index) {
        return value;
    });
    native1 = Array.prototype.map.call(source1, function(value, index) {
        return value;
    });
    result2 = WebModule.ES[5].Array.prototype.map.call(source2, function(value, index) {
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

    result1 = WebModule.ES[5].Array.prototype.some.call(source1, function(value, index) {
        return value < 3;
    });
    native1 = Array.prototype.some.call(source1, function(value, index) {
        return value < 3;
    });
    result2 = WebModule.ES[5].Array.prototype.some.call(source2, function(value, index) {
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

    result1 = WebModule.ES[5].Array.prototype.every.call(source1, function(value, index) {
        return value < 3;
    });
    native1 = Array.prototype.every.call(source1, function(value, index) {
        return value < 3;
    });
    result2 = WebModule.ES[5].Array.prototype.every.call(source2, function(value, index) {
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

    result1 = WebModule.ES[5].Array.prototype.filter.call(source1, function(value, index) {
        return value % 2;
    });
    native1 = Array.prototype.filter.call(source1, function(value, index) {
        return value % 2;
    });
    result2 = WebModule.ES[5].Array.prototype.filter.call(source2, function(value, index) {
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

    result1 = WebModule.ES[5].Array.prototype.reduce.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native1 = Array.prototype.reduce.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    result2 = WebModule.ES[5].Array.prototype.reduce.call(source2, function(prev, curt, index) {
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

    result1 = WebModule.ES[5].Array.prototype.reduceRight.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native1 = Array.prototype.reduceRight.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    result2 = WebModule.ES[5].Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
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

    var result1 = WebModule.ES[5].Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    });
    var native1 = Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    });
    var result2 = WebModule.ES[5].Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var native2 = Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var result3 = WebModule.ES[5].Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var native3 = Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    try {
        var result4 = WebModule.ES[5].Array.prototype.reduce.call([], function(prev, curt, index) {
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

    var result1 = WebModule.ES[5].Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    });
    var native1 = Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    });
    var result2 = WebModule.ES[5].Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var native2 = Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var result3 = WebModule.ES[5].Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var native3 = Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    try {
        var result4 = WebModule.ES[5].Array.prototype.reduceRight.call([], function(prev, curt, index) {
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
        clone:  WebModule.ES[6].Object.assign.call(null, {}, { a: 1 }),
        merge:  WebModule.ES[6].Object.assign.call(null, { a: 1 }, { b: 2 }, { c: 3 }),
        obj:    Object.create({ foo:1 }, { bar: { value:2 }, baz: { value:3, enumerable:true }}),
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

    if (Object.is("foo", "foo") === WebModule.ES[6].Object.is("foo", "foo") &&
        Object.is(obj, obj)     === WebModule.ES[6].Object.is(obj, obj) &&
        Object.is([], [])       === WebModule.ES[6].Object.is([], []) &&
        Object.is(null, null)   === WebModule.ES[6].Object.is(null, null) &&
        Object.is(0, -0)        === WebModule.ES[6].Object.is(0, -0) &&
        Object.is(-0, -0)       === WebModule.ES[6].Object.is(-0, -0) &&
        Object.is(NaN, 0/0)     === WebModule.ES[6].Object.is(NaN, 0/0)) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_of(test, pass, miss) {
    if (Array.of(1).join()             === WebModule.ES[6].Array.of(1).join() &&
        Array.of(1, 2, 3).join()       === WebModule.ES[6].Array.of(1, 2, 3).join() &&
        Array.of(undefined).join()     === WebModule.ES[6].Array.of(undefined).join()) {
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
        return WebModule.ES[6].Array.from(arguments);
    }

    //var s = new Set(["foo", window]);
    //Array.from(s); // ["foo", window]

    //var m = new Map([[1, 2], [2, 4], [4, 8]]);
    //Array.from(m); // [[1, 2], [2, 4], [4, 8]]

    var native2   =                 Array.from([1, 2, 3], function(x) { return x + x; }); // [2, 4, 6]
    var polyfill2 = WebModule.ES[6].Array.from([1, 2, 3], function(x) { return x + x; }); // [2, 4, 6]

    var native3   =                 Array.from({length: 5}, function(v, k) { return k; }); // [0, 1, 2, 3, 4]
    var polyfill3 = WebModule.ES[6].Array.from({length: 5}, function(v, k) { return k; }); // [0, 1, 2, 3, 4]

    if (native(1, 2, 3).join()      === polyfill(1, 2, 3).join() &&
        Array.from("foo").join()    === WebModule.ES[6].Array.from("foo").join() &&
        native2.join()              === polyfill2.join() &&
        native3.join()              === polyfill3.join() ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_entries(test, pass, miss) {
    var a = [0, 1, 2, 3].entries();
    var b = WebModule.ES[6].Array.prototype.entries.call([0, 1, 2, 3]);

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
    var b = WebModule.ES[6].Array.prototype.keys.call([0, 1, 2, 3]);

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


    var b1 = WebModule.ES[6].Array.prototype.fill.call([1, 2, 3], 4);             // [4, 4, 4]
    var b2 = WebModule.ES[6].Array.prototype.fill.call([1, 2, 3], 4, 1);          // [1, 4, 4]
    var b3 = WebModule.ES[6].Array.prototype.fill.call([1, 2, 3], 4, 1, 2);       // [1, 4, 3]
    var b4 = WebModule.ES[6].Array.prototype.fill.call([1, 2, 3], 4, 1, 1);       // [1, 2, 3]
    var b5 = WebModule.ES[6].Array.prototype.fill.call([1, 2, 3], 4, -3, -2);     // [4, 2, 3]
    var b6 = WebModule.ES[6].Array.prototype.fill.call([1, 2, 3], 4, NaN, NaN);   // [1, 2, 3]
    var b7 = WebModule.ES[6].Array.prototype.fill.call({ length: 3 }, 4);         // {0: 4, 1: 4, 2: 4, length: 3}

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

    var b1 = WebModule.ES[6].Array.prototype.find.call([4, 6, 8, 12], isPrime); // undefined, not found
    var b2 = WebModule.ES[6].Array.prototype.find.call([4, 5, 8, 12], isPrime); // 5


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

    var b1 = WebModule.ES[6].Array.prototype.findIndex.call([4, 6, 8, 12], isPrime); // -1, not found
    var b2 = WebModule.ES[6].Array.prototype.findIndex.call([4, 5, 8, 12], isPrime); // 25

    if ( JSON.stringify(a1) === JSON.stringify(b1) &&
         JSON.stringify(a2) === JSON.stringify(b2) ) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testArray_values(test, pass, miss) {
    var a = [0, 1, 2, 3].values();
    var b = WebModule.ES[6].Array.prototype.values.call([0, 1, 2, 3]);

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

    var b1 = WebModule.ES[6].Array.prototype.copyWithin.call([1, 2, 3, 4, 5], 0, 3); // [4, 5, 3, 4, 5]
    var b2 = WebModule.ES[6].Array.prototype.copyWithin.call([1, 2, 3, 4, 5], 0, 3, 4); // [4, 2, 3, 4, 5]
    var b3 = WebModule.ES[6].Array.prototype.copyWithin.call([1, 2, 3, 4, 5], 0, -2, -1); // [4, 2, 3, 4, 5]
    var b4 = WebModule.ES[6].Array.prototype.copyWithin.call({length: 5, 3: 1}, 0, 3); // {0: 1, 3: 1, length: 5}

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

    var b1 = WebModule.ES[6].String.fromCodePoint(42);       // "*"
    var b2 = WebModule.ES[6].String.fromCodePoint(65, 90);   // "AZ"
    var b3 = WebModule.ES[6].String.fromCodePoint(0x404);    // "\u0404"
    var b4 = WebModule.ES[6].String.fromCodePoint(0x2F804);  // "\uD87E\uDC04"
    var b5 = WebModule.ES[6].String.fromCodePoint(194564);   // "\uD87E\uDC04"
    var b6 = WebModule.ES[6].String.fromCodePoint(0x1D306, 0x61, 0x1D307) // "\uD834\uDF06a\uD834\uDF07"

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

//  var b1 = WebModule.ES[6].String.prototype.repeat.call('abc', -1);   // RangeError
    var b2 = WebModule.ES[6].String.prototype.repeat.call('abc', 0);    // ''
    var b3 = WebModule.ES[6].String.prototype.repeat.call('abc', 1);    // 'abc'
    var b4 = WebModule.ES[6].String.prototype.repeat.call('abc', 2);    // 'abcabc'
    var b5 = WebModule.ES[6].String.prototype.repeat.call('abc', 3.5);  // 'abcabcabc' (count will be converted to integer)
//  var b6 = WebModule.ES[6].String.prototype.repeat.call('abc', 1/0);  // RangeError

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

    var b1 = WebModule.ES[6].String.prototype.codePointAt.call('ABC', 1);          // 66
    var b2 = WebModule.ES[6].String.prototype.codePointAt.call('\uD800\uDC00', 0); // 65536
    var b3 = WebModule.ES[6].String.prototype.codePointAt.call('XYZ', 42);         // undefined

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

    var b1 = WebModule.ES[6].String.prototype.includes.call(str, 'To be');       // true
    var b2 = WebModule.ES[6].String.prototype.includes.call(str, 'question');    // true
    var b3 = WebModule.ES[6].String.prototype.includes.call(str, 'nonexistent'); // false
    var b4 = WebModule.ES[6].String.prototype.includes.call(str, 'To be', 1);    // false
    var b5 = WebModule.ES[6].String.prototype.includes.call(str, 'TO BE');       // false

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

    var b1 = WebModule.ES[6].String.prototype.startsWith.call(str, 'To be');         // true
    var b2 = WebModule.ES[6].String.prototype.startsWith.call(str, 'not to be');     // false
    var b3 = WebModule.ES[6].String.prototype.startsWith.call(str, 'not to be', 10); // true

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

    var b1 = WebModule.ES[6].String.prototype.endsWith.call(str, 'question.'); // true
    var b2 = WebModule.ES[6].String.prototype.endsWith.call(str, 'to be');     // false
    var b3 = WebModule.ES[6].String.prototype.endsWith.call(str, 'to be', 19); // true

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

    var b1 = WebModule.ES[6].Number.isInteger(0.1);     // false
    var b2 = WebModule.ES[6].Number.isInteger(1);       // true
    var b3 = WebModule.ES[6].Number.isInteger(Math.PI); // false
    var b4 = WebModule.ES[6].Number.isInteger(-100000); // true
    var b5 = WebModule.ES[6].Number.isInteger(NaN);     // false
    var b6 = WebModule.ES[6].Number.isInteger(0);       // true
    var b7 = WebModule.ES[6].Number.isInteger("10");    // false

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

    var b1 = WebModule.ES[6].Number.isSafeInteger(3);                    // true
    var b2 = WebModule.ES[6].Number.isSafeInteger(Math.pow(2, 53));      // false
    var b3 = WebModule.ES[6].Number.isSafeInteger(Math.pow(2, 53) - 1);  // true
    var b4 = WebModule.ES[6].Number.isSafeInteger(NaN);                  // false
    var b5 = WebModule.ES[6].Number.isSafeInteger(Infinity);             // false
    var b6 = WebModule.ES[6].Number.isSafeInteger('3');                  // false
    var b7 = WebModule.ES[6].Number.isSafeInteger(3.1);                  // false
    var b8 = WebModule.ES[6].Number.isSafeInteger(3.0);                  // true

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

    var b01 = WebModule.ES[6].Math.acosh(-1); // NaN
    var b02 = WebModule.ES[6].Math.acosh(0);  // NaN
    var b03 = WebModule.ES[6].Math.acosh(0.5) // NaN
    var b04 = WebModule.ES[6].Math.acosh(1);  // 0
    var b05 = WebModule.ES[6].Math.acosh(2);  // 1.3169578969248166
    var b10 = WebModule.ES[6].Math.asinh(1);  // 0.881373587019543
    var b11 = WebModule.ES[6].Math.asinh(0);  // 0
    var b20 = WebModule.ES[6].Math.atanh(-2);  // NaN
    var b21 = WebModule.ES[6].Math.atanh(-1);  // -Infinity
    var b22 = WebModule.ES[6].Math.atanh(0);   // 0
    var b23 = WebModule.ES[6].Math.atanh(0.5); // 0.5493061443340548
    var b24 = WebModule.ES[6].Math.atanh(1);   // Infinity
    var b25 = WebModule.ES[6].Math.atanh(2);   // NaN
    var b30 = WebModule.ES[6].Math.cbrt(-1); // -1
    var b31 = WebModule.ES[6].Math.cbrt(0);  // 0
    var b32 = WebModule.ES[6].Math.cbrt(1);  // 1
    var b33 = WebModule.ES[6].Math.cbrt(2);  // 1.2599210498948734
    var b40 = WebModule.ES[6].Math.clz32(1);                // 31
    var b41 = WebModule.ES[6].Math.clz32(1000);             // 22
    var b42 = WebModule.ES[6].Math.clz32();                 // 32
    var b43 = WebModule.ES[6].Math.clz32(true);             // 31
    var b44 = WebModule.ES[6].Math.clz32(3.5);              // 30
    var b50 = WebModule.ES[6].Math.cosh(0);  // 1
    var b51 = WebModule.ES[6].Math.cosh(1);  // 1.5430806348152437
    var b52 = WebModule.ES[6].Math.cosh(-1); // 1.5430806348152437
    var b60 = WebModule.ES[6].Math.expm1(-1); // -0.6321205588285577 
    var b61 = WebModule.ES[6].Math.expm1(0);  // 0
    var b62 = WebModule.ES[6].Math.expm1(1);  // 1.718281828459045
    var b70 = WebModule.ES[6].Math.fround(0);     // 0
    var b71 = WebModule.ES[6].Math.fround(1);     // 1
    var b72 = WebModule.ES[6].Math.fround(1.337); // 1.3370000123977661
    var b73 = WebModule.ES[6].Math.fround(1.5);   // 1.5
    var b74 = WebModule.ES[6].Math.fround(NaN);   // NaN
    var b80 = WebModule.ES[6].Math.hypot(3, 4);        // 5
    var b81 = WebModule.ES[6].Math.hypot(3, 4, 5);     // 7.0710678118654755
    var b82 = WebModule.ES[6].Math.hypot();            // 0
    var b83 = WebModule.ES[6].Math.hypot(NaN);         // NaN
    var b84 = WebModule.ES[6].Math.hypot(3, 4, 'foo'); // NaN, +'foo' => NaN
    var b85 = WebModule.ES[6].Math.hypot(3, 4, '5');   // 7.0710678118654755, +'5' => 5
    var b86 = WebModule.ES[6].Math.hypot(-3);          // 3, the same as Math.abs(-3)
    var b90 = WebModule.ES[6].Math.imul(2, 4);          // 8
    var b91 = WebModule.ES[6].Math.imul(-1, 8);         // -8
    var b92 = WebModule.ES[6].Math.imul(-2, -2);        // 4
    var b93 = WebModule.ES[6].Math.imul(0xffffffff, 5); // -5
    var b94 = WebModule.ES[6].Math.imul(0xfffffffe, 5); // -10
    var b100 = WebModule.ES[6].Math.log10(2);      // 0.3010299956639812
    var b101 = WebModule.ES[6].Math.log10(1);      // 0
    var b102 = WebModule.ES[6].Math.log10(0);      // -Infinity
    var b103 = WebModule.ES[6].Math.log10(-2);     // NaN
    var b104 = WebModule.ES[6].Math.log10(100000); // 5
    var b110 = WebModule.ES[6].Math.log1p(1);  // 0.6931471805599453
    var b111 = WebModule.ES[6].Math.log1p(0);  // 0
    var b112 = WebModule.ES[6].Math.log1p(-1); // -Infinity
    var b113 = WebModule.ES[6].Math.log1p(-2); // NaN
    var b120 = WebModule.ES[6].Math.log2(3);    // 1.584962500721156
    var b121 = WebModule.ES[6].Math.log2(2);    // 1
    var b122 = WebModule.ES[6].Math.log2(1);    // 0
    var b123 = WebModule.ES[6].Math.log2(0);    // -Infinity
    var b124 = WebModule.ES[6].Math.log2(-2);   // NaN
    var b125 = WebModule.ES[6].Math.log2(1024); // 10
    var b130 = WebModule.ES[6].Math.sign(3);     //  1
    var b131 = WebModule.ES[6].Math.sign(-3);    // -1
    var b132 = WebModule.ES[6].Math.sign('-3');  // -1
    var b133 = WebModule.ES[6].Math.sign(0);     //  0
    var b134 = WebModule.ES[6].Math.sign(-0);    // -0
    var b135 = WebModule.ES[6].Math.sign(NaN);   // NaN
    var b136 = WebModule.ES[6].Math.sign('foo'); // NaN
    var b137 = WebModule.ES[6].Math.sign();      // NaN
    var b140 = WebModule.ES[6].Math.sinh(0); // 0
    var b141 = WebModule.ES[6].Math.sinh(1); // 1.1752011936438014
    var b150 = WebModule.ES[6].Math.tanh(0);        // 0
    var b151 = WebModule.ES[6].Math.tanh(Infinity); // 1
    var b152 = WebModule.ES[6].Math.tanh(1);        // 0.7615941559557649
    var b160 = WebModule.ES[6].Math.trunc(13.37);    // 13
    var b161 = WebModule.ES[6].Math.trunc(42.84);    // 42
    var b162 = WebModule.ES[6].Math.trunc(0.123);    //  0
    var b163 = WebModule.ES[6].Math.trunc(-0.123);   // -0
    var b164 = WebModule.ES[6].Math.trunc('-1.123'); // -1
    var b165 = WebModule.ES[6].Math.trunc(NaN);      // NaN
    var b166 = WebModule.ES[6].Math.trunc('foo');    // NaN
    var b167 = WebModule.ES[6].Math.trunc();         // NaN

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

// --- Set ------------------------------------------------
function testSet_size(test, pass, miss) {
    var set1 = new Set();
    var set2 = new WebModule.ES[6].Set();

    set1.add(1);
    set1.add(5);
    set1.add("some text")

    set2.add(1);
    set2.add(5);
    set2.add("some text")

    if (set1.size === 3 &&
        set2.size === 3) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSet_add(test, pass, miss) {
    var set1 = new Set();
    var set2 = new WebModule.ES[6].Set();

    set1.add(1);
    set1.add(5).add("some text"); // chainable
    set2.add(1);
    set2.add(5).add("some text"); // chainable

    var iter1 = set1.values();
    var iter2 = set2.values();

    if (iter1.next().value === 1 &&
        iter1.next().value === 5 &&
        iter1.next().value === "some text") {

        if (iter2.next().value === 1 &&
            iter2.next().value === 5 &&
            iter2.next().value === "some text") {

            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

function testSet_has(test, pass, miss) {
    var set1 = new Set();
    var set2 = new WebModule.ES[6].Set();

    set1.add("foo");
    set2.add("foo");

    if (set1.has("foo") === true &&
        set1.has("bar") === false) {

        if (set2.has("foo") === true &&
            set2.has("bar") === false) {

            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

function testSet_values(test, pass, miss) {
    var set1 = new Set();
    var set2 = new WebModule.ES[6].Set();

    set1.add("foo");
    set1.add("bar");
    set1.add("baz");

    set2.add("foo");
    set2.add("bar");
    set2.add("baz");

    var iter1 = set1.values();
    var iter2 = set2.values();

    if (iter1.next().value === "foo" &&
        iter1.next().value === "bar" &&
        iter1.next().value === "baz") {

        if (iter2.next().value === "foo" &&
            iter2.next().value === "bar" &&
            iter2.next().value === "baz") {

            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

function testSet_entries(test, pass, miss) {
    var set1 = new Set();
    var set2 = new WebModule.ES[6].Set();

    set1.add("foobar");
    set1.add(1);
    set1.add("baz");

    set2.add("foobar");
    set2.add(1);
    set2.add("baz");

    var iter1 = set1.entries();
    var iter2 = set2.entries();

    if (iter1.next().value.join() === ["foobar", "foobar"].join() &&
        iter1.next().value.join() === [1, 1].join() &&
        iter1.next().value.join() === ["baz", "baz"].join()) {

        if (iter2.next().value.join() === ["foobar", "foobar"].join() &&
            iter2.next().value.join() === [1, 1].join() &&
            iter2.next().value.join() === ["baz", "baz"].join()) {

            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

function testSet_forEach(test, pass, miss) {
    var result1 = [];
    var result2 = [];
    var set1 = new Set(["foo", "bar", undefined]);
    var set2 = new WebModule.ES[6].Set(["foo", "bar", undefined]);

    set1.forEach(function(value, key, set) {
        result1.push(String(key), String(value));
    });
    set2.forEach(function(value, key, set) {
        result2.push(String(key), String(value));
    });

    if (result1.join() === "foo,foo,bar,bar,undefined,undefined" &&
        result2.join() === "foo,foo,bar,bar,undefined,undefined") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testSet_delete(test, pass, miss) {
    var set1 = new Set();
    var set2 = new WebModule.ES[6].Set();

    set1.add("foo");
    set2.add("foo");

    if (set1.delete("bar") === false &&
        set1.delete("foo") === true &&
        set1.has("foo") === false) {

        if (set2.delete("bar") === false &&
            set2.delete("foo") === true &&
            set2.has("foo") === false) {

            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

function testSet_clear(test, pass, miss) {
    var set1 = new Set();
    var set2 = new WebModule.ES[6].Set();

    set1.add(1);
    set1.add("foo");

    set2.add(1);
    set2.add("foo");

    if (set1.size === 2 &&
        set1.has("foo") === true) {
        set1.clear();
        if (set1.size === 0 &&
            set1.has("bar") === false) {

            if (set2.size === 2 &&
                set2.has("foo") === true) {
                set2.clear();
                if (set2.size === 0 &&
                    set2.has("bar") === false) {

                    test.done(pass());
                    return;
                }
            }
        }
    }
    test.done(miss());
}

// --- WeakMap --------------------------------------------
function testWeakSet(test, pass, miss) {
    var ws1 = new WeakSet();
    var ws2 = new WebModule.ES[6].WeakSet();

    var obj = {};
    var foo = {};

    ws1.add(global);
    ws1.add(obj);

    ws2.add(global);
    ws2.add(obj);

    if (ws1.has(global) === true &&
        ws1.has(foo)    === false) {
        ws1.delete(global);
        if (ws1.has(global) === false) {
            //ws1.clear();

            if (ws2.has(global) === true &&
                ws2.has(foo)    === false) {
                ws2.delete(global);
                if (ws2.has(global) === false) {
                    //ws2.clear();

                    test.done(pass());
                    return;
                }
            }
        }
    }
    test.done(miss());
}

// --- Map ------------------------------------------------
function testMap_size(test, pass, miss) {
    var map1 = new Map();
    var map2 = new WebModule.ES[6].Map();

    map1.set("a", "alpha");
    map1.set("b", "beta");
    map1.set("g", "gamma");

    map2.set("a", "alpha");
    map2.set("b", "beta");
    map2.set("g", "gamma");

    if (map1.size === 3 &&
        map2.size === 3) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testMap_get(test, pass, miss) {
    var map1 = new Map();
    var map2 = new WebModule.ES[6].Map();

    map1.set("bar", "foo");
    map2.set("bar", "foo");

    if (map1.get("bar") === "foo" &&
        map2.get("bar") === "foo") {
        if (map1.get("baz") === undefined &&
            map2.get("baz") === undefined) {

            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

function testMap_set(test, pass, miss) {
    var map1 = new Map();
    var map2 = new WebModule.ES[6].Map();

    map1.set("bar", "foo");
    map1.set(1, "foobar");
    map2.set("bar", "foo");
    map2.set(1, "foobar");

    map1.set("bar", "fuuu");
    map2.set("bar", "fuuu");

    if (map1.get("bar") === "fuuu" &&
        map2.get("bar") === "fuuu") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testMap_has(test, pass, miss) {
    var map1 = new Map();
    var map2 = new WebModule.ES[6].Map();

    map1.set("bar", "foo");
    map2.set("bar", "foo");

    if (map1.has("bar") === true &&
        map2.has("bar") === true) {
        if (map1.has("baz") === false &&
            map2.has("baz") === false) {
            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

function testMap_keys(test, pass, miss) {
    var map1 = new Map();
    var map2 = new WebModule.ES[6].Map();

    map1.set("0", "foo");
    map1.set(1, "bar");
    map1.set({}, "baz");

    map2.set("0", "foo");
    map2.set(1, "bar");
    map2.set({}, "baz");

    var iter1 = map1.keys();
    var iter2 = map2.keys();

    if (iter1.next().value === "0" &&
        iter1.next().value === 1 &&
        iter1.next().value.toString() === "[object Object]") {

        if (iter2.next().value === "0" &&
            iter2.next().value === 1 &&
            iter2.next().value.toString() === "[object Object]") {

            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

function testMap_values(test, pass, miss) {
    var map1 = new Map();
    var map2 = new WebModule.ES[6].Map();

    map1.set("0", "foo");
    map1.set(1, "bar");
    map1.set({}, "baz");

    map2.set("0", "foo");
    map2.set(1, "bar");
    map2.set({}, "baz");

    var iter1 = map1.values();
    var iter2 = map2.values();

    if (iter1.next().value === "foo" &&
        iter1.next().value === "bar" &&
        iter1.next().value === "baz" &&

        iter2.next().value === "foo" &&
        iter2.next().value === "bar" &&
        iter2.next().value === "baz") {

        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testMap_entries(test, pass, miss) {
    var map1 = new Map();
    var map2 = new WebModule.ES[6].Map();

    map1.set("0", "foo");
    map1.set(1, "bar");
    map1.set({}, "baz");

    map2.set("0", "foo");
    map2.set(1, "bar");
    map2.set({}, "baz");

    var iter1 = map1.entries();
    var iter2 = map2.entries();

    if (iter1.next().value.join() === ["0", "foo"].join() &&
        iter1.next().value.join() === [1, "bar"].join() &&
        iter1.next().value.join() === ["[object Object]", "baz"].join() &&

        iter2.next().value.join() === ["0", "foo"].join() &&
        iter2.next().value.join() === [1, "bar"].join() &&
        iter2.next().value.join() === ["[object Object]", "baz"].join()) {

        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testMap_forEach(test, pass, miss) {
    var result1 = [];
    var result2 = [];
    var map1 = new Map([["foo", 3], ["bar", {}], ["baz", undefined]]);
    var map2 = new WebModule.ES[6].Map([["foo", 3], ["bar", {}], ["baz", undefined]]);

    map1.forEach(function(value, key, map) {
        result1.push(String(key), String(value));
    });
    map2.forEach(function(value, key, map) {
        result2.push(String(key), String(value));
    });

    if (result1.join() === "foo,3,bar,[object Object],baz,undefined" &&
        result2.join() === "foo,3,bar,[object Object],baz,undefined") {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testMap_delete(test, pass, miss) {
    var map1 = new Map();
    var map2 = new WebModule.ES[6].Map();

    map1.set("bar", "foo");
    map2.set("bar", "foo");

    if (map1.delete("bar") === true) {
        if (map1.has("bar") === false) {
            if (map1.delete("bar") === false) {

                if (map2.delete("bar") === true) {
                    if (map2.has("bar") === false) {
                        if (map2.delete("bar") === false) {

                            test.done(pass());
                            return;
                        }
                    }
                }
            }
        }
    }
    test.done(miss());
}

function testMap_clear(test, pass, miss) {
    var map1 = new Map();
    var map2 = new WebModule.ES[6].Map();

    map1.set("bar", "baz");
    map1.set(1, "foo");

    map2.set("bar", "baz");
    map2.set(1, "foo");

    if (map1.size === 2) {
        if (map1.has("bar") === true) {
            map1.clear();
            if (map1.size === 0) {
                if (map1.has("bar") === false) {

                    if (map2.size === 2) {
                        if (map2.has("bar") === true) {
                            map2.clear();
                            if (map2.size === 0) {
                                if (map2.has("bar") === false) {

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
    test.done(miss());
}

function testWeakMap(test, pass, miss) {
    var map1 = new WeakMap();
    var map2 = new WeakMap();
    var map3 = new WeakMap();

    var mapA = new WebModule.ES[6].WeakMap();
    var mapB = new WebModule.ES[6].WeakMap();
    var mapC = new WebModule.ES[6].WeakMap();

    var keyObject1 = {};
    var keyObject2 = function(){};
    var keyObject3 = global;

    map1.set(keyObject1, 37);
    map1.set(keyObject2, "azerty");
    map2.set(keyObject1, keyObject2);
    map2.set(keyObject3, undefined);
    map2.set(map1, map2);

    mapA.set(keyObject1, 37);
    mapA.set(keyObject2, "azerty");
    mapB.set(keyObject1, keyObject2);
    mapB.set(keyObject3, undefined);
    mapB.set(mapA, mapB);

    var result1 = map1.get(keyObject2); // -> "azerty"
    var result2 = map2.get(keyObject2); // -> undefined - map2 には keyObject2 に関連付けられた値が無い為、undefined が返ってきます
    var result3 = map2.get(keyObject3); // -> undefined - 値が undefined と関連付けられている為、undefined が返ってきます
    var result4 = map1.has(keyObject2); // -> true
    var result5 = map2.has(keyObject2); // -> false
    var result6 = map2.has(keyObject3); // -> true (値が関連付けられているならば、たとえ値が 'undefined' であっても true となります)
                  map3.set(keyObject1, 37);
    var result7 = map3.get(keyObject1); // -> 37
    var result8 = undefined;
    var result9 = map1.has(keyObject1); // -> true
                  map1.delete(keyObject1);
    var result10 = map1.has(keyObject1); // -> false

    var result101 = mapA.get(keyObject2); // -> "azerty"
    var result102 = mapB.get(keyObject2); // -> undefined - map2 には keyObject2 に関連付けられた値が無い為、undefined が返ってきます
    var result103 = mapB.get(keyObject3); // -> undefined - 値が undefined と関連付けられている為、undefined が返ってきます
    var result104 = mapA.has(keyObject2); // -> true
    var result105 = mapB.has(keyObject2); // -> false
    var result106 = mapB.has(keyObject3); // -> true (値が関連付けられているならば、たとえ値が 'undefined' であっても true となります)
                    mapC.set(keyObject1, 37);
    var result107 = mapC.get(keyObject1); // -> 37
    var result108 = undefined;
    var result109 = mapA.has(keyObject1); // -> true
                    mapA.delete(keyObject1);
    var result110 = mapA.has(keyObject1); // -> false

    if (result1 === "azerty" &&
        result2 === undefined &&
        result3 === undefined &&
        result4 === true &&
        result5 === false &&
        result6 === true &&
        result7 === 37 &&
        result8 === undefined &&
        result9 === true &&
        result10 === false) {

        if (result1 === "azerty" &&
            result2 === undefined &&
            result3 === undefined &&
            result4 === true &&
            result5 === false &&
            result6 === true &&
            result7 === 37 &&
            result8 === undefined &&
            result9 === true &&
            result10 === false) {

            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

return test.run();

})(GLOBAL);

