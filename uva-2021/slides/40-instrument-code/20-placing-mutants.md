## Placing mutants

![placing-mutants.jpg](/img/placing-mutants.jpg)

---

### Process

Let's zoom in on the instrumentation itself.

[![mutation-testing-process-focus-2.svg](img/mutation-testing-process-focus-2.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZ3JhcGggTFJcbiAgICBBKChTdGFydCkpIC0tPiBCKDEuIFByZXBhcmUpXG4gICAgQiAtLT4gQygyLiBDb2RlIGluc3RydW1lbnRhdGlvbilcbiAgICBDIC0tPiBEKDMuIERyeSBydW4pXG4gICAgRCAtLT4gRXtTdWNjZXNzP31cbiAgICBFIC0tPnxZZXN8IEYoNC4gTXV0YXRpb24gdGVzdGluZylcbiAgICBFIC0tPnxOb3wgSCgoZW5kKSlcbiAgICBGIC0tPiBIXG4gICAgc3R5bGUgRiBmaWxsOiNmZjBcblxuIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0) <!-- .element target="_blank" -->

---

### A simple example

Given this code

```js
function add(a, b) {
  return a + b;
}
```

It generates 2 mutants

<!-- .element class="fragment" data-fragment-index="0" -->

<div>
<div class="row text-sm">

```json
{
  "id": "0",
  "location": {
    "start": { "column": 19, "line": 0 },
    "end": { "column": 1, "line": 2 }
  },
  "mutatorName": "BlockStatement",
  "replacement": "{}"
}
```

```json
{
  "id": "1",
  "location": {
    "start": { "column": 9, "line": 1 },
    "end": { "column": 14, "line": 1 }
  },
  "mutatorName": "ArithmeticOperator",
  "replacement": "a - b"
}
```

</div>
</div>

<!-- .element class="fragment" data-fragment-index="0" -->

---

### A simple example (2)

```js [0-300|2-6|7-8|9]
function add(a, b) {
  if (stryMutAct_9fa48("0")) {
    {
    }
  } else {
    stryCov_9fa48("0");
    return stryMutAct_9fa48("1") ? 
        a - b : (stryCov_9fa48("1"), 
          a + b
        );
  }
}
```

---

### Helper functions (simplified)

<div class="text-sm">

```js
function stryMutAct_9fa48(id) {
  return global.__stryker__.activeMutant === id;
}
```

```js
function stryCov_9fa48(mutant) {
  var cov = global.__stryker__.mutantCoverage;
  var currentTestId = global.__stryker__.currentTestId;

  if (!cov) {
    cov = global.__stryker__.mutantCoverage = {
      static: {},
      perTest: {},
    };
  }

  var c = cov.static;
  if (currentTestId) {
    c = cov.perTest[currentTestId] = cov.perTest[currentTestId] || {};
  }

  if (!c[mutant]) c[mutant] = 0;
  c[mutant]++;
}
```

</div>

---

### The placing algorithm

[![placing-algorithm](/img/placing-algorithm.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZmxvd2NoYXJ0IFRCXG4gICAgXG4gICAgc3ViZ3JhcGggZmlsZXMgW0ZvciBlYWNoIGZpbGVdXG4gICAgZGlyZWN0aW9uIExSXG5cbiAgICBBKChzdGFydCkpLS0-QihQYXJzZSlcbiAgICBCIC0tIEFTVCBOb2RlIC0tPiBUcmFuc2Zvcm1cbiAgICBUcmFuc2Zvcm0gLS0-IEQoUHJpbnQgdG8gZmlsZSlcblxuICAgICAgICBzdWJncmFwaCBUcmFuc2Zvcm0gW0ZvciBlYWNoIEFTVCBub2RlXVxuXG4gICAgICAgIEMxKE5vZGUpIC0tIEdlbmVyYXRlIG11dGFudHMgLS0-IEMyKE11dGFudHMpXG4gICAgICAgIEMyIC0tRmluZCBwbGFjZW1lbnQgbm9kZSAtLT4gQzMoUGxhY2VtZW50IG5vZGUpXG4gICAgICAgIEMzIC0tQXBwbHkgbXV0YW50cy0tPkM0KEFwcGxpZWQgbXV0YW50cylcbiAgICAgICAgQzQgLS1QbGFjZSBtdXRhbnRzLS0-QzUoTXV0YXRlZCBub2RlKVxuXG4gICAgICAgIGVuZFxuXG4gICAgZW5kXG5cbiAgICBZKChzdGFydCkpIC0tIEZpbGVzIC0tPiBmaWxlc1xuICAgIGZpbGVzIC0tIEZpbGVzIC0tPiBaKChlbmQpKSIsIm1lcm1haWQiOiJ7XG4gIFwidGhlbWVcIjogXCJkZWZhdWx0XCJcbn0iLCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9)

<!-- .element target="_blank" -->

---

### Algorithm simple example

```js
function add (a, b) {
  return a + b
}
```

---

### Algorithm simple example

<!-- .slide: data-auto-animate data-auto-animate-duration="0" -->

```js
function add(a, b) {
  return stryMutAct_9fa48("1") ? 
      a - b : (stryCov_9fa48("1"), 
        a + b
      );
}
```

---

<!-- .slide: class="is-lab" -->

### Let's take a look

👀

---

### Abstractions

```ts
interface NodeMutator {
  mutate(path: NodePath): Iterable<types.Node>;
  readonly name: string;
}

interface MutantPlacer<TNode extends types.Node = types.Node> {
  name: string;
  canPlace(path: NodePath): boolean;
  place(path: NodePath<TNode>, appliedMutants: Map<Mutant, TNode>): void;
}
```

- `NodeMutator`s don't know anything mutant placing
- `MutantPlacer`s don't know anything about mutating

<!-- .element class="fragment" -->

---

### Remarks on placing algorithm

- 🐠 The Babel AST is a _mutatable_ AST
- 🧳 Visitor design pattern
  - `OnEnter`
  - `OnLeave`
- 👇 Immutable on the way down (OnEnter)
- 👆 Replace nodes on way up (OnLeave)

<!-- .element class="no-list" -->
