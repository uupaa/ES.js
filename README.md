# ES.js [![Build Status](https://travis-ci.org/uupaa/ES.js.png)](http://travis-ci.org/uupaa/ES.js)

[![npm](https://nodei.co/npm/uupaa.es.js.png?downloads=true&stars=true)](https://nodei.co/npm/uupaa.es.js/)

ECMA-262 Script version 5/6/7 polyfill, fallback, shims and documents.

## Document

- [ES.js wiki](https://github.com/uupaa/ES.js/wiki/ES)
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))

## How to use

### Browser

```js
<script src="lib/ES.js">
<script>
ES[5].Object.keys({ a: 1, b: 2, c: 3, d: 4 });
</script>
```

### WebWorkers

```js
importScripts("lib/ES.js");

ES[5].Object.keys({ a: 1, b: 2, c: 3, d: 4 });
```

### Node.js

```js
var ES = require("lib/ES.js");

ES[5].Object.keys({ a: 1, b: 2, c: 3, d: 4 });
```

