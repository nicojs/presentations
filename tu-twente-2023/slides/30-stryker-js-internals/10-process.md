## Global process

[![stryker-process.svg](/img/stryker-process.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZ3JhcGggTFJcbiAgICBBKChTdGFydCkpIC0tPiBCKDEuIFByZXBhcmUpXG4gICAgQiAtLT4gQygyLiBDb2RlIGluc3RydW1lbnRhdGlvbilcbiAgICBDIC0tPiBEKDMuIERyeSBydW4pXG4gICAgRCAtLT4gRXtTdWNjZXNzP31cbiAgICBFIC0tPnxZZXN8IEYoNC4gTXV0YXRpb24gdGVzdGluZylcbiAgICBFIC0tPnxOb3wgSCgoZW5kKSlcbiAgICBGIC0tPiBIIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0) <!-- .element target="_blank" -->

---

### 1. Prepare

[![mutation-testing-process-focus-1.svg](/img/mutation-testing-process-focus-1.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZ3JhcGggTFJcbiAgICBBKChTdGFydCkpIC0tPiBCKDEuIFByZXBhcmUpXG4gICAgQiAtLT4gQygyLiBDb2RlIGluc3RydW1lbnRhdGlvbilcbiAgICBDIC0tPiBEKDMuIERyeSBydW4pXG4gICAgRCAtLT4gRXtTdWNjZXNzP31cbiAgICBFIC0tPnxZZXN8IEYoNC4gTXV0YXRpb24gdGVzdGluZylcbiAgICBFIC0tPnxOb3wgSCgoZW5kKSlcbiAgICBGIC0tPiBIXG5cbiAgICBzdHlsZSBCIGZpbGw6I0ZGMCIsIm1lcm1haWQiOiJ7XG4gIFwidGhlbWVcIjogXCJkZWZhdWx0XCJcbn0iLCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9) <!-- .element target="_blank" -->

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

[![mutation-testing-process-focus-2.svg](/img/mutation-testing-process-focus-2.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZ3JhcGggTFJcbiAgICBBKChTdGFydCkpIC0tPiBCKDEuIFByZXBhcmUpXG4gICAgQiAtLT4gQygyLiBDb2RlIGluc3RydW1lbnRhdGlvbilcbiAgICBDIC0tPiBEKDMuIERyeSBydW4pXG4gICAgRCAtLT4gRXtTdWNjZXNzP31cbiAgICBFIC0tPnxZZXN8IEYoNC4gTXV0YXRpb24gdGVzdGluZylcbiAgICBFIC0tPnxOb3wgSCgoZW5kKSlcbiAgICBGIC0tPiBIXG5cbiAgICBzdHlsZSBDIGZpbGw6I0ZGMCIsIm1lcm1haWQiOiJ7XG4gIFwidGhlbWVcIjogXCJkZWZhdWx0XCJcbn0iLCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9) <!-- .element target="_blank" -->

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

[![mutation-testing-process-focus-3.svg](/img/mutation-testing-process-focus-3.svg)<!-- .element style="height: 50px" -->](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZ3JhcGggTFJcbiAgICBBKChTdGFydCkpIC0tPiBCKDEuIFByZXBhcmUpXG4gICAgQiAtLT4gQygyLiBDb2RlIGluc3RydW1lbnRhdGlvbilcbiAgICBDIC0tPiBEKDMuIERyeSBydW4pXG4gICAgRCAtLT4gRXtTdWNjZXNzP31cbiAgICBFIC0tPnxZZXN8IEYoNC4gTXV0YXRpb24gdGVzdGluZylcbiAgICBFIC0tPnxOb3wgSCgoZW5kKSlcbiAgICBGIC0tPiBIXG5cbiAgICBzdHlsZSBEIGZpbGw6I0ZGMCIsIm1lcm1haWQiOiJ7XG4gIFwidGhlbWVcIjogXCJkZWZhdWx0XCJcbn0iLCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9) <!-- .element target="_blank" -->

<div class="row">
<div>

- Control run
- Discover tests
- Enrich each mutant
  - Determine `estimatedNetTime`
  - Determine `hitCount`
  - Determine `static`
  - Measure `coveredBy`

</div>
<div class="text-sm">

```json [0-500|10-13]
{
  "id": "0",
  "mutatorName": "ArithmeticOperator",
  "fileName": "foo.js",
  "replacement": "foo - bar",
  "location": {
    "end": { "column": 2, "line": 175 },
    "start": { "column": 6, "line": 31 }
  },
  "estimatedNetTime": 710,
  "hitCount": 66,
  "static": false,
  "coveredBy": ["260", "261"]
}
```

👽 In-memory mutant representation

</div>
</div>

---

### 4. Mutation testing

[![mutation-testing-process-focus-4.svg](/img/mutation-testing-process-focus-4.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZ3JhcGggTFJcbiAgICBBKChTdGFydCkpIC0tPiBCKDEuIFByZXBhcmUpXG4gICAgQiAtLT4gQygyLiBDb2RlIGluc3RydW1lbnRhdGlvbilcbiAgICBDIC0tPiBEKDMuIERyeSBydW4pXG4gICAgRCAtLT4gRXtTdWNjZXNzP31cbiAgICBFIC0tPnxZZXN8IEYoNC4gTXV0YXRpb24gdGVzdGluZylcbiAgICBFIC0tPnxOb3wgSCgoZW5kKSlcbiAgICBGIC0tPiBIXG5cbiAgICBzdHlsZSBGIGZpbGw6I0ZGMCIsIm1lcm1haWQiOiJ7XG4gIFwidGhlbWVcIjogXCJkZWZhdWx0XCJcbn0iLCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9)

<div class="row">
<div>

- Run in test runner
- Determine the status
  - `Ignored`
  - `NoCoverage`
  - `Survived`
  - `Killed`
  - `RuntimeError`
- Determin `statusReason`/`killedBy`
- Report each mutant to the reporter.

</div>
<div class="text-sm">

```json [0-500|11-12]
{
  "id": "0",
  "mutatorName": "ArithmeticOperator",
  "fileName": "foo.js",
  "replacement": "foo - bar",
  "location": { ... },
  "estimatedNetTime":710,
  "hitCount":66,
  "static":false,
  "coveredBy":["260","261"],
  "status": "Killed",
  "killedBy": ["260"]
}
```

</div>
</div>

---

### 4. Mutation testing

Process diagram

[![](/img/stryker-mutation-testing-process.svg)](https://mermaid.live/edit#pako:eNptkTFvgzAQhf-K5QkkUHeGVlUhUVQ1Q9KFiMXFB1gCG5lzmgrx33tg0jCUyXfve_Y9buSlkcATXrXmu2yERfaZFprR9xoMSHUYx8_peKi1sSBfJq8N7qu2om9YD5Z1DoVGL6RxzI6GkYdl45u5wsaUkZbDsIi7ILtB6RCY0gxhQGad1mBDj-4IRdWBccjg1iu6ZbbtgxMsQ_1j2ZPlBL2ZE6xOcuTB2vNDbq5f---qbUE-nZ1VV_9I_piWkhRUrejRLIFEDUuE_JF4TrUB15-1pUBLf8ipeQkCqsOQR7wD2wklaQHjrBccG-ig4AkdJVTCtVjwWZkIdr0UCJlUaCxPKtEOEHHh0Jx_dMkTtA7uUKoELaj7o2AxffhdLyuPeC_0xZg7M_0CcQOmRg)

<!-- .element target="_blank" -->

---

### HTML report

To finish up, the HTML report is generated.

![](https://raw.githubusercontent.com/stryker-mutator/mutation-testing-elements/master/packages/elements/docs/directory-result-example.png) <!-- .element style="height: 300px" -->

- Single page application using native web components
- Using [mutation testing elements](https://github.com/stryker-mutator/mutation-testing-elements/tree/master/packages/elements#mutation-testing-elements) <!-- .element target="_blank" -->
  (by the Stryker team)

---

## Conclusion

- StrykerJS's global process consists of 4 steps.
- Each step enriches the internal structure that represents a mutant
- After the final step, the report is written and StrykerJS is done.
