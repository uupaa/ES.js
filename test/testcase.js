var ModuleTestES = (function(global) {

var _inNode    = "process"        in global;
var _inWorker  = "WorkerLocation" in global;
var _inBrowser = "document"       in global;

var test = new Test("ES", {
        disable:    false,
        browser:    true,
        worker:     true,
        node:       true,
        button:     true,
        both:       true,
    }).add([
        testSetup,
        testObject_keys,
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
        // --- WeakMap ---
        testWeakMap_basic,
    ]);

    if (Array.prototype.entries) {
        test.add([
            // --- ES6 ---
            testArray_Iterator,
        ]);
    }
    test.run().clone();


function testSetup(next) {
    //ES(6.0);

    next && next.pass();
}

function testObject_keys(next) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = ES[5].Object.keys(source1);
    var native1 = Object.keys(source1);
    var result2 = ES[5].Object.keys(source2);
    var native2 = Object.keys(source2);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_isArray(next) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = ES[5].Array.isArray(source1);
    var native1 = Array.isArray(source1);
    var result2 = ES[5].Array.isArray(source2);
    var native2 = Array.isArray(source2);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_indexOf(next) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = ES[5].Array.prototype.indexOf.call(source1, 2);
    var native1 = Array.prototype.indexOf.call(source1, 2);
    var result2 = ES[5].Array.prototype.indexOf.call(source2, 2);
    var native2 = Array.prototype.indexOf.call(source2, 2);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_lastIndexOf(next) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = ES[5].Array.prototype.lastIndexOf.call(source1, 2);
    var native1 = Array.prototype.lastIndexOf.call(source1, 2);
    var result2 = ES[5].Array.prototype.lastIndexOf.call(source2, 2);
    var native2 = Array.prototype.lastIndexOf.call(source2, 2);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_forEach(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_map(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_some(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_every(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_filter(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_reduce(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_reduceRight(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_sparse_indexOf(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_sparse_lastIndexOf(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_sparse_forEach(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_sparse_map(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_sparse_some(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_sparse_every(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_sparse_filter(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_sparse_reduce(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_sparse_reduceRight(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_reduce_complex(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_reduceRight_complex(next) {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testArray_Iterator(next) {
    var a = [0,1,2,3].entries();

    var result1 = a.next();
    var result2 = a.next();
    var result3 = a.next();
    var result4 = a.next();
    var result5 = a.next();

    if ( JSON.stringify(result1) === JSON.stringify({ value: [0, 0], done: false }) &&
         JSON.stringify(result2) === JSON.stringify({ value: [1, 1], done: false }) &&
         JSON.stringify(result3) === JSON.stringify({ value: [2, 2], done: false }) &&
         JSON.stringify(result4) === JSON.stringify({ value: [3, 3], done: false }) &&
         JSON.stringify(result5) === JSON.stringify({ value: undefined, done: true })) {

        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testWeakMap_basic(next) {
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

                  weakmap2.set(keyObject1, keyObject2); // 値は（オブジェクトまたは関数を含む）何であってもかまいません
                  weakmap2.set(keyObject3, undefined);
                  weakmap2.set(weakmap1,   weakmap2); // キーも値もどんなオブジェクトでもかまいません。WeakMap であってもよいのです！

    var result1 = weakmap1.get(keyObject2); // -> "azerty"
    var result2 = weakmap2.get(keyObject2); // -> undefined - weakmap2 には keyObject2 に関連付けられた値が無い為、undefined が返ってきます
    var result3 = weakmap2.get(keyObject3); // -> undefined - 値が undefined と関連付けられている為、undefined が返ってきます

    var result4 = weakmap1.has(keyObject2); // -> true
    var result5 = weakmap2.has(keyObject2); // -> false
    var result6 = weakmap2.has(keyObject3); // -> true (値が関連付けられているならば、たとえ値が 'undefined' であっても true となります)

                  weakmap3.set(keyObject1, 37);
    var result7 = weakmap3.get(keyObject1); // -> 37

    var result8 = undefined;

    try {
                      weakmap3.clear();
        var result8 = weakmap3.get(keyObject1); // -> undefined - weakmap3 は clear されたため keyObject1 に関連する値は持っていません
    } catch(o_o) {
        // node v0.10.26 WeakMap#clear not impl.
        //throw o_o;
    }

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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

})((this || 0).self || global);
