## ES Modules

Node ES Modules - something almost, but not quite entirely unlike CommonJS  
Gil Tayar

* **ES Modules**: `import`/`export`  
* **CommonJS**: `require`/`module.exports`

---

> ES Modules are finally coming to NodeJS!

* `node --experimental-modules main.mjs`

*Maybe in Node 12?*

<!-- .element class="fragment" -->

---

<!-- .slide class="flex" -->

### Very similar

```js
// CommonJS

// kettle.js
module.exports.spout = 'the spout'
module.exports.handle = 'the handle'
module.exports.tea = 'hot tea'

// use-kettle.js
const {handle, spout, tea} = require('./kettle')
```

```js
// ES Modules

// kettle.mjs
export const spout = 'the spout'
export const handle = 'the handle'
export const tea = 'hot tea'

// use-kettle.mjs
import {handle, spout, tea} from'./kettle'
```

---

![similar](/img/similar.png)

---

### Sync vs async

```js
// Synchronous!
const {handle, spout, tea} = require('./kettle')

// Asynchronous!
import {handle, spout, tea} from'./kettle'
```

Node can load multiple files simultaneously!

<!-- .element class="fragment" data-fragment-index="0" -->

---

### Rules of ES Modules

* A module is an ESM ONLY if extension is ".mjs"
* A module is a CJS ONLY if extension is ".js"
* Only ESM is allowed to use export/import
* Only CJS is allowed to use require

https://medium.com/the-node-js-collection/an-update-on-es6-modules-in-node-js-42c958b890c

---

### Default exports

```js
// kettle.js
module.exports = scalding => {
  return { tea: scalding ? 'scalding tea' : 'hot tea' }
}

// use-kettle.js
const kettleMaker = require('./kettle')

const kettle = kettleMaker(false)
console.log(kettle.scalding) // 'hot tea'
```

```js
// kettle.mjs
export default scalding => {
  return { tea: scalding ? 'scalding tea' : 'hot tea' }
}

// use-kettle.mjs
import kettleMaker from './03-kettle'

const kettle = kettleMaker(false)
console.log(kettle.handle) // 'hot tea'
```

---

### File resolution

File resolution works the same, but with ".mjs".

```js
import './kettle';

// 1. Look for kettle.mjs
// 2. Look for "main" file in kettle/package.json 
// 3. Look for kettle/index.js

import 'kettle';

// 1. Look for node_modules/kettle.mjs
// 2. Look for "main" file in node_modules/kettle/package.json 
// 3. Look for node_modules/kettle/index.js
```

---

### Dynamic imports

```js
// use-kettle.js
function main() {
  const {tea} = require('./10-kettle.js')

  console.log(tea)
}
```

```js
// use-kettle.mjs
async function main() {
  const {default: kettle, tea} = await import('./kettle.mjs')

  console.log(kettle, tea)
}
```

Difference might seem small, but has huge implications

<!-- .element class="fragment" data-fragment-index="0" -->


---

### Interoperability

![separate worlds](/img/separate-worlds.png) <!-- .element style="width: 500px"-->

This would be too massive of a change.

---

### Interop rules

* MJS can import JS
    * BUT only default import
* JS can import MJS
    * But only using dynamic import

---


![bridges](/img/bridges.png)

---

### CJS in ESM

```js
// kettle.js
module.exports.kettle = 'shout and stout (js)'
```

```js
// use-kettle.mjs
import kettleModule from './kettle' // default import

console.log(kettleModule.kettle)
```

Only default exports because of ESM static binding

<!-- .element class="fragment" -->

---

### ESM in CJS

```js
// kettle.mjs
export const kettle = 'shout and stout (js)'
```

```js
// use-kettle.js
const kettleModule = require('./kettle') // ERROR!

async function main() {
  const {kettle} = await import('./kettle') // OK!
  console.log(kettle)
}
main()
```

Only async because you cannot go from async to sync in JavaScript

<!-- .element class="fragment" -->


---

### Migration hell coming!

* Rename all js to mjs
* Change `require`s to imports
    * if CJS, then default imports
* Change dynamic `require`s to await import
    * Big problem!
* Library developers need to support both!
    * TypeScript/Babel might help