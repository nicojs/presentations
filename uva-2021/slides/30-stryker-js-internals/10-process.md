## Global process

[![stryker-process.svg](/img/stryker-process.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZ3JhcGggTFJcbiAgICBBKChTdGFydCkpIC0tPiBCKDEuIFByZXBhcmUpXG4gICAgQiAtLT4gQygyLiBDb2RlIGluc3RydW1lbnRhdGlvbilcbiAgICBDIC0tPiBEKDMuIERyeSBydW4pXG4gICAgRCAtLT4gRXtTdWNjZXNzP31cbiAgICBFIC0tPnxZZXN8IEYoNC4gTXV0YXRpb24gdGVzdGluZylcbiAgICBFIC0tPnxOb3wgSCgoZW5kKSlcbiAgICBGIC0tPiBIIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)

---

### 1. Prepare

<div class="row">
<div>

- Read configuration
- General bootstrapping
- Initialize reporters
- Read files to mutate

</div>
<div class="text-sm">

```json
{
  "packageManager": "npm",
  "reporters": ["html", "clear-text", "progress"],
  "mutate": ["lib/**/*.js"],
  "testRunner": "mocha",
  "coverageAnalysis": "perTest",
  "mochaOptions": {
    "ui": "tdd"
  }
}
```

📃 Example `stryker.conf.json`

</div>
</div>

---

### 2. Code instrumentation

<div class="row">
<div>

- Parse files to mutate.
- Walk the AST
  - Generate mutants
  - Place mutants
- Print back to file
- 👀 Closer look later

</div>
<div class="text-sm">

```json
{
  "id": "0",
  "mutatorName": "ArithmeticOperator",
  "fileName": "foo.js",
  "replacement": "foo - bar",
  "location": {
    "end": { "column": 2, "line": 175 },
    "start": { "column": 6, "line": 31 }
  }
}
```

👽 In-memory mutant representation

</div>
</div>

---

### 3. Dry run

<div class="row">
<div>

- Control run
- Discover tests
- Enrich each mutant
    - Measure `coveredBy`
    - Determine `static`
    - Determine `netTime`
    - Determine `hitCount`

</div>
<div class="text-sm">

```json
{
  "id": "0",
  "mutatorName": "ArithmeticOperator",
  "fileName": "foo.js",
  "replacement": "foo - bar",
  "location": {
    "end": { "column": 2, "line": 175 },
    "start": { "column": 6, "line": 31 }
  },
  "estimatedNetTime":710,
  "hitCount":66,
  "static":false,
  "coveredBy":["260","261"]
}
```

👽 In-memory mutant representation

</div>
</div>

---

### 4. Mutation testing

<div class="row">
<div>

- Determine the status of each mutant
    - `Ignored`
    - `NoCoverage`
    - `Survived`
    - `Killed`
    - `RuntimeError`
- Report each mutant to the reporter.

</div>
<div class="text-sm">

[![mutation-testing-process.svg](/img/mutation-testing-process.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZmxvd2NoYXJ0IFREXG4gICAgQShzdGFydCktLT5Ee0lnbm9yZWQ_fVxuICAgIHN1YmdyYXBoIHBlciBtdXRhbnRcbiAgICBELS0gTm8gLS0-IEV7Q292ZXJlZD99XG4gICAgRS0tIFllcyAtLT4gRihFeGVjdXRlIGluIHRlc3QgcnVubmVyKVxuICAgIEYtLSB0aW1lb3V0IGV4cGlyZWQgLS0-RyhSZXN0YXJ0IHRlc3QgcnVubmVyKVxuICAgIEctLSBSZXBvcnQgVGltZW91dCAtLT5ZKFJlcG9ydCBtdXRhbnQpXG4gICAgRi0tIFJlcG9ydCBLaWxsZWQvU3VyaXZlZCAtLT5ZXG4gICAgRS0tIE5vIFxcbiBSZXBvcnQgTm9Db3ZlcmFnZSAtLT4gWVxuICAgIEQtLSBZZXMgXFxuIFJlcG9ydCBJZ25vcmVkIC0tPiBZXG4gICAgZW5kXG4gICAgWS0tPlooKGVuZCkpIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0) <!-- .element target="_blank" -->

</div>
</div>
