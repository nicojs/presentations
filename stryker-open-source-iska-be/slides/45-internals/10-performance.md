## Performance

> T<sub>total</sub> <span class="fragment" data-fragment-index="0">!</span>= T<sub>test</sub> * N

* Run in parallel
* Coverage Analysis (Stryker)
* Mutation switching (Stryker.NET & Stryker4s)

<!-- .element class="fragment" data-fragment-index="1" -->

---

### Parallel runs

![run-test-sd.png](/img/run-test-sd.png)

---

### Coverage Analysis

> Only run the tests that cover a mutant

1. <!-- .element class="fragment" -->Transpile code (source maps)
2. <!-- .element class="fragment" -->Instrument the code for code coverage
3. <!-- .element class="fragment" -->Run tests, hook into 'after each'
4. <!-- .element class="fragment" -->Correlate mutants with code coverage using source maps


---

### Coverage analysis support

1. TypeScript transpiler (or no transpiler)
2. Karma/Mocha/Jasmine test runners (no Jest / WCT)

---

### Mutation switching

> Demo