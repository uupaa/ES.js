new Test().add([
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
    ]).run().worker(function(err, test) {
        if (!err) {
            var undo = Test.swap(ES5, ES5_);

            new Test(test).run(function(err, test) {
                undo = Test.undo(undo);
            });
        }
    });

function testSetup(next) {
    ES5();

    console.log("testSetup ok");
    next && next.pass();
}

function testObject_keys(next) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = ES5.Object.keys(source1);
    var native1 = Object.keys(source1);
    var result2 = ES5.Object.keys(source2);
    var native2 = Object.keys(source2);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testObjectKeys ok");
        next && next.pass();
    } else {
        console.log("testObjectKeys ng");
        next && next.miss();
    }
}

function testArray_isArray(next) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = ES5.Array.isArray(source1);
    var native1 = Array.isArray(source1);
    var result2 = ES5.Array.isArray(source2);
    var native2 = Array.isArray(source2);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_isArray ok");
        next && next.pass();
    } else {
        console.log("testArray_isArray ng");
        next && next.miss();
    }
}

function testArray_indexOf(next) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = ES5.Array.prototype.indexOf.call(source1, 2);
    var native1 = Array.prototype.indexOf.call(source1, 2);
    var result2 = ES5.Array.prototype.indexOf.call(source2, 2);
    var native2 = Array.prototype.indexOf.call(source2, 2);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_indexOf ok");
        next && next.pass();
    } else {
        console.log("testArray_indexOf ng");
        next && next.miss();
    }
}

function testArray_lastIndexOf(next) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];
    var result1 = ES5.Array.prototype.lastIndexOf.call(source1, 2);
    var native1 = Array.prototype.lastIndexOf.call(source1, 2);
    var result2 = ES5.Array.prototype.lastIndexOf.call(source2, 2);
    var native2 = Array.prototype.lastIndexOf.call(source2, 2);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_lastIndexOf ok");
        next && next.pass();
    } else {
        console.log("testArray_lastIndexOf ng");
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

    ES5.Array.prototype.forEach.call(source1, function(value, index) {
        result1[value] = index;
    });
    Array.prototype.forEach.call(source1, function(value, index) {
        native1[value] = index;
    });
    ES5.Array.prototype.forEach.call(source2, function(value, index) {
        result2[value] = index;
    });
    Array.prototype.forEach.call(source2, function(value, index) {
        native2[value] = index;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_forEach ok");
        next && next.pass();
    } else {
        console.log("testArray_forEach ng");
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

    result1 = ES5.Array.prototype.map.call(source1, function(value, index) {
        return value;
    });
    native1 = Array.prototype.map.call(source1, function(value, index) {
        return value;
    });
    result2 = ES5.Array.prototype.map.call(source2, function(value, index) {
        return value;
    });
    native2 = Array.prototype.map.call(source2, function(value, index) {
        return value;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_map ok");
        next && next.pass();
    } else {
        console.log("testArray_map ng");
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

    result1 = ES5.Array.prototype.some.call(source1, function(value, index) {
        return value < 3;
    });
    native1 = Array.prototype.some.call(source1, function(value, index) {
        return value < 3;
    });
    result2 = ES5.Array.prototype.some.call(source2, function(value, index) {
        return value < 3;
    });
    native2 = Array.prototype.some.call(source2, function(value, index) {
        return value < 3;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_some ok");
        next && next.pass();
    } else {
        console.log("testArray_some ng");
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

    result1 = ES5.Array.prototype.every.call(source1, function(value, index) {
        return value < 3;
    });
    native1 = Array.prototype.every.call(source1, function(value, index) {
        return value < 3;
    });
    result2 = ES5.Array.prototype.every.call(source2, function(value, index) {
        return value < 3;
    });
    native2 = Array.prototype.every.call(source2, function(value, index) {
        return value < 3;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_every ok");
        next && next.pass();
    } else {
        console.log("testArray_every ng");
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

    result1 = ES5.Array.prototype.filter.call(source1, function(value, index) {
        return value % 2;
    });
    native1 = Array.prototype.filter.call(source1, function(value, index) {
        return value % 2;
    });
    result2 = ES5.Array.prototype.filter.call(source2, function(value, index) {
        return value % 2;
    });
    native2 = Array.prototype.filter.call(source2, function(value, index) {
        return value % 2;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_filter ok");
        next && next.pass();
    } else {
        console.log("testArray_filter ng");
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

    result1 = ES5.Array.prototype.reduce.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native1 = Array.prototype.reduce.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    result2 = ES5.Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native2 = Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_reduce ok");
        next && next.pass();
    } else {
        console.log("testArray_reduce ng");
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

    result1 = ES5.Array.prototype.reduceRight.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native1 = Array.prototype.reduceRight.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    result2 = ES5.Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native2 = Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_reduceRight ok");
        next && next.pass();
    } else {
        console.log("testArray_reduceRight ng");
        next && next.miss();
    }
}

function testArray_sparse_indexOf(next) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];

    delete source1["b"];
    delete source2[1];

    var result1 = ES5.Array.prototype.indexOf.call(source1, 2);
    var native1 = Array.prototype.indexOf.call(source1, 2);
    var result2 = ES5.Array.prototype.indexOf.call(source2, 2);
    var native2 = Array.prototype.indexOf.call(source2, 2);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_sparse_indexOf ok");
        next && next.pass();
    } else {
        console.log("testArray_sparse_indexOf ng");
        next && next.miss();
    }
}

function testArray_sparse_lastIndexOf(next) {
    var source1 = { a: 1, b: 2, c: 3, d: 4 };
    var source2 = [ 1, 2, 3, 4 ];

    delete source1["b"];
    delete source2[1];

    var result1 = ES5.Array.prototype.lastIndexOf.call(source1, 2);
    var native1 = Array.prototype.lastIndexOf.call(source1, 2);
    var result2 = ES5.Array.prototype.lastIndexOf.call(source2, 2);
    var native2 = Array.prototype.lastIndexOf.call(source2, 2);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_sparse_lastIndexOf ok");
        next && next.pass();
    } else {
        console.log("testArray_sparse_lastIndexOf ng");
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

    ES5.Array.prototype.forEach.call(source1, function(value, index) {
        result1[value] = index;
    });
    Array.prototype.forEach.call(source1, function(value, index) {
        native1[value] = index;
    });
    ES5.Array.prototype.forEach.call(source2, function(value, index) {
        result2[value] = index;
    });
    Array.prototype.forEach.call(source2, function(value, index) {
        native2[value] = index;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_sparse_forEach ok");
        next && next.pass();
    } else {
        console.log("testArray_sparse_forEach ng");
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

    result1 = ES5.Array.prototype.map.call(source1, function(value, index) {
        return value;
    });
    native1 = Array.prototype.map.call(source1, function(value, index) {
        return value;
    });
    result2 = ES5.Array.prototype.map.call(source2, function(value, index) {
        return value;
    });
    native2 = Array.prototype.map.call(source2, function(value, index) {
        return value;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_sparse_map ok");
        next && next.pass();
    } else {
        console.log("testArray_sparse_map ng");
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

    result1 = ES5.Array.prototype.some.call(source1, function(value, index) {
        return value < 3;
    });
    native1 = Array.prototype.some.call(source1, function(value, index) {
        return value < 3;
    });
    result2 = ES5.Array.prototype.some.call(source2, function(value, index) {
        return value < 3;
    });
    native2 = Array.prototype.some.call(source2, function(value, index) {
        return value < 3;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_sparse_some ok");
        next && next.pass();
    } else {
        console.log("testArray_sparse_some ng");
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

    result1 = ES5.Array.prototype.every.call(source1, function(value, index) {
        return value < 3;
    });
    native1 = Array.prototype.every.call(source1, function(value, index) {
        return value < 3;
    });
    result2 = ES5.Array.prototype.every.call(source2, function(value, index) {
        return value < 3;
    });
    native2 = Array.prototype.every.call(source2, function(value, index) {
        return value < 3;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_sparse_every ok");
        next && next.pass();
    } else {
        console.log("testArray_sparse_every ng");
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

    result1 = ES5.Array.prototype.filter.call(source1, function(value, index) {
        return value % 2;
    });
    native1 = Array.prototype.filter.call(source1, function(value, index) {
        return value % 2;
    });
    result2 = ES5.Array.prototype.filter.call(source2, function(value, index) {
        return value % 2;
    });
    native2 = Array.prototype.filter.call(source2, function(value, index) {
        return value % 2;
    });

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_sparse_filter ok");
        next && next.pass();
    } else {
        console.log("testArray_sparse_filter ng");
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

    result1 = ES5.Array.prototype.reduce.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native1 = Array.prototype.reduce.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    result2 = ES5.Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native2 = Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_sparse_reduce ok");
        next && next.pass();
    } else {
        console.log("testArray_sparse_reduce ng");
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

    result1 = ES5.Array.prototype.reduceRight.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native1 = Array.prototype.reduceRight.call(source1, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    result2 = ES5.Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);
    native2 = Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 3);

    if ( JSON.stringify(result1) === JSON.stringify(native1) &&
         JSON.stringify(result2) === JSON.stringify(native2) ) {
        console.log("testArray_sparse_reduceRight ok");
        next && next.pass();
    } else {
        console.log("testArray_sparse_reduceRight ng");
        next && next.miss();
    }
}

function testArray_reduce_complex(next) {
    var source2 = [ 1, 2, 3, 4 ];

    delete source2[1];

    var result1 = ES5.Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    });
    var native1 = Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    });
    var result2 = ES5.Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var native2 = Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var result3 = ES5.Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var native3 = Array.prototype.reduce.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    try {
        var result4 = ES5.Array.prototype.reduce.call([], function(prev, curt, index) {
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
        console.log("testArray_reduce_complex ok");
        next && next.pass();
    } else {
        console.log("testArray_reduce_complex ng");
        next && next.miss();
    }
}

function testArray_reduceRight_complex(next) {
    var source2 = [ 1, 2, 3, 4 ];

    delete source2[1];

    var result1 = ES5.Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    });
    var native1 = Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    });
    var result2 = ES5.Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var native2 = Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var result3 = ES5.Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    var native3 = Array.prototype.reduceRight.call(source2, function(prev, curt, index) {
        return prev * curt + index;
    }, 0);
    try {
        var result4 = ES5.Array.prototype.reduceRight.call([], function(prev, curt, index) {
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
        console.log("testArray_reduceRight_complex ok");
        next && next.pass();
    } else {
        console.log("testArray_reduceRight_complex ng");
        next && next.miss();
    }
}
