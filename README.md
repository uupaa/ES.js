=========
ES.js
=========

![](https://travis-ci.org/uupaa/ES.js.png)

ECMA-262 Script version 5 polyfill, fallback and shims.

# Document

- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [ES.js wiki](https://github.com/uupaa/ES.js/wiki/ES)


# How to use

```js
<script src="lib/ES.js">
<script>
// for Browser

ES[5].Object.keys({ a: 1, b: 2, c: 3, d: 4 });
</script>
```

```js
// for WebWorkers
importScripts("lib/ES.js");

ES[5].Object.keys({ a: 1, b: 2, c: 3, d: 4 });
```

```js
// for Node.js
var ES = require("lib/ES.js");

ES[5].Object.keys({ a: 1, b: 2, c: 3, d: 4 });
```

