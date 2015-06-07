# ES.js [![Build Status](https://travis-ci.org/uupaa/ES.js.svg)](https://travis-ci.org/uupaa/ES.js)

[![npm](https://nodei.co/npm/uupaa.es.js.svg?downloads=true&stars=true)](https://nodei.co/npm/uupaa.es.js/)

ECMA-262 Script version 5/6/7 polyfill, fallback, shims and documents.

## Document

- ES.js made of [WebModule](https://github.com/uupaa/WebModule).
- [Spec](https://github.com/uupaa/ES.js/wiki/ES)

## Browser and NW.js(node-webkit)

```js
<script src="<module-dir>/lib/WebModule.js"></script>
<script src="<module-dir>/lib/ES.js"></script>
<script>

Object.keys({ a: 1, b: 2, c: 3, d: 4 });       // ["a", "b", "c", "d"]
Object.Assign({}, { a: 1, b: 2, c: 3, d: 4 }); // { a: 1, b: 2, c: 3, d: 4 }
[1,2,3].includes(3);                           // true

// raw interface
WebModule.ES[5].Object.keys({ a: 1, b: 2, c: 3, d: 4 });       // ["a", "b", "c", "d"]
WebModule.ES[6].Object.Assign({}, { a: 1, b: 2, c: 3, d: 4 }); // { a: 1, b: 2, c: 3, d: 4 }
WebModule.ES[7].Array.prototype.includes.call([1,2,3], 3);     // true

</script>
```

## WebWorkers

```js
importScripts("<module-dir>lib/WebModule.js");
importScripts("<module-dir>lib/ES.js");

```

## Node.js

```js
require("<module-dir>lib/WebModule.js");
require("<module-dir>lib/ES.js");

```

