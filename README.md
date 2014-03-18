ES.js
=========

ECMA-262 Script version 5 polyfill, fallback and shims.

# Document

https://github.com/uupaa/ES.js/wiki/ES

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

# for Developers

1. Install development dependency tools

    ```sh
    $ brew install closure-compiler
    $ brew install node
    $ npm install -g plato
    ```

2. Clone Repository and Install

    ```sh
    $ git clone git@github.com:uupaa/ES.js.git
    $ cd ES.js
    $ npm install
    ```

3. Build and Minify

    `$ npm run build`

4. Test

    `$ npm run test`

5. Lint

    `$ npm run lint`


