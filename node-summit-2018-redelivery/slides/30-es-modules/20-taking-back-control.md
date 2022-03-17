## Taking back control...

### of your project

---

![js-popular.png](/img/js-popular.png)

---
 
![npm-popular.png](/img/npm-popular.png) <!--.element style="width: 600px" -->

**11000%** growth is 4 years

---

### Modularity is growing

> 600 downloads / user / week

*up from 50 downloads / user / week*

85% write front end web applications 

---

### NPM has changed

* Lock by default (package.lock.json)
* Save by default
* `npm ci` vs `npm i`

---

### Node security

* `npm i` automatically quick audit
  ```
  $ npm i
  audited 3137 packages in 5.014s
  found 6 vulnerabilities (4 high, 2 critical)
    run `npm audit fix` to fix them, or `npm audit` for details
  ``` 
  <!-- .element style="width: 100%" -->
* Use `npm audit` to see a detailed report
* Use `npm audit fix` - semver safe security fix
    * No silver bullet
* NPM has 2 FA

---

## Taking back control...

### of JavaScript

---

* Modular code is a human solution to a human problem
    * Problem of tiny brain.
* Modular code is always less efficient for a computer to run
    * But nobody cares

---

### History of NodeJS and NPM

In 2009:

* Server side JavaScript
    * 6+ platforms
* Package managers
    * 5+ package managers

It was a mess.

---

### Choosing the winners

People just tried stuff out

Today, node and npm are the clear winners 

<!-- .element class="fragment" data-fragment-index="0" -->

---

### Today

* Webpack is taking over the web
* Babel/TypeScript is taking over JavaScript

---

### New problem

* Bundling is difficult
* Bundles are slow to get running
* Code splitting is hard
    * Automatic code splitting is hard
        * And `require` makes it *impossible*

---

### Solution: ES6 modules

* Static analysis for code splitting is *slightly* possible
* You can use them today
  ```html
  <script type="module"></script>
  ```
* But they suck!
  ```js
  import './lib'
  // vs
  import 'lib' // ERROR!
  ```
    * No support for module ID

---

### Problem:

Without module ID, you still need a transpiler! Why even switch to a new solution?

![new-vs-old](/img/new-vs-old.png) <!-- .element  --->

---

### Solution

NPM will evolve. It's time for new solutions! 

Standards don't work! Remember XHTML 2.0, XSLT?

It's time to build things and see what sucks the least.