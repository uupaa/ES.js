# ES.js [![Build Status](https://travis-ci.org/uupaa/ES.js.png)](http://travis-ci.org/uupaa/ES.js)

[![npm](https://nodei.co/npm/uupaa.es.js.png?downloads=true&stars=true)](https://nodei.co/npm/uupaa.es.js/)

ECMA-262 Script version 5/6/7 polyfill, fallback, shims and documents.

## Document

- [ES.js wiki](https://github.com/uupaa/ES.js/wiki/ES)
- [WebModule](https://github.com/uupaa/WebModule)
    - [Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html)
    - [Development](https://github.com/uupaa/WebModule/wiki/Development)


## How to use

### Browser and node-webkit

```js
<script src="lib/ES.js">
<script>

Object.keys({ a: 1, b: 2, c: 3, d: 4 });       // ["a", "b", "c", "d"]
Object.Assign({}, { a: 1, b: 2, c: 3, d: 4 }); // { a: 1, b: 2, c: 3, d: 4 }
[1,2,3].includes(3);                           // true

// raw interface
ES[5].Object.keys({ a: 1, b: 2, c: 3, d: 4 });       // ["a", "b", "c", "d"]
ES[6].Object.Assign({}, { a: 1, b: 2, c: 3, d: 4 }); // { a: 1, b: 2, c: 3, d: 4 }
ES[7].Array.prototype.includes.call([1,2,3], 3);     // true

</script>
```

### WebWorkers

```js
importScripts("lib/ES.js");

```

### Node.js

```js
require("lib/ES.js");

```

