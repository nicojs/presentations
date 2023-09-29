### Why mutant schemata for JS?

Let's zoom in on how to run mutants.

[![](img/mutation-testing-process-focus-4.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZ3JhcGggTFJcbiAgICBBKChTdGFydCkpIC0tPiBCKDEuIFByZXBhcmUpXG4gICAgQiAtLT4gQygyLiBDb2RlIGluc3RydW1lbnRhdGlvbilcbiAgICBDIC0tPiBEKDMuIERyeSBydW4pXG4gICAgRCAtLT4gRXtTdWNjZXNzP31cbiAgICBFIC0tPnxZZXN8IEYoNC4gTXV0YXRpb24gdGVzdGluZylcbiAgICBFIC0tPnxOb3wgSCgoZW5kKSlcbiAgICBGIC0tPiBIXG4gICAgc3R5bGUgRiBmaWxsOiNmZjBcblxuIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0) <!-- .element target="_blank" -->

---

[![](img/run-mutants-process-focus-execute.svg) <!--element style="max-height: 650px" -->](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZmxvd2NoYXJ0IFREXG4gICAgQShzdGFydCktLT5Ee0lnbm9yZWQ_fVxuICAgIHN1YmdyYXBoIHBlciBtdXRhbnRcbiAgICBELS0gTm8gLS0-IEV7Q292ZXJlZD99XG4gICAgRS0tIFllcyAtLT4gRihFeGVjdXRlIGluIHRlc3QgcnVubmVyKVxuICAgIEYtLSB0aW1lb3V0IGV4cGlyZWQgLS0-RyhSZXN0YXJ0IHRlc3QgcnVubmVyKVxuICAgIEctLSBSZXBvcnQgVGltZW91dCAtLT5ZKFJlcG9ydCBtdXRhbnQpXG4gICAgRi0tIFJlcG9ydCBLaWxsZWQvU3VyaXZlZCAtLT5ZXG4gICAgRS0tIE5vIFxcbiBSZXBvcnQgTm9Db3ZlcmFnZSAtLT4gWVxuICAgIEQtLSBZZXMgXFxuIFJlcG9ydCBJZ25vcmVkIC0tPiBZXG4gICAgZW5kXG4gICAgWS0tPlooKGVuZCkpXG5cbiAgICBzdHlsZSBGIGZpbGw6I0ZGMCIsIm1lcm1haWQiOiJ7XG4gIFwidGhlbWVcIjogXCJkZWZhdWx0XCJcbn0iLCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9) <!-- .element target="_blank" -->

---

<!-- .slide: data-auto-animate -->
### Why mutant schemata for JS?

<div class="row">
<div>

Without mutant schemata

[![](img/without-mutant-schemata.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZmxvd2NoYXJ0IFREXG4gICAgXG4gICAgc3ViZ3JhcGggbXV0YW50cyBbRm9yIGVhY2ggbXV0YW50XVxuXG4gICAgQihQbGFjZSlcbiAgICBCIC0tPiBEKFJ1biB0ZXN0cylcbiAgICBEIC0tS2lsbGVkL1N1cnZpdmVkLS0-IEUoUmVwb3J0IG11dGFudClcblxuICAgIGVuZFxuXG4gICAgQSgoc3RhcnQpKSAtLT4gbXV0YW50c1xuICAgIG11dGFudHMgLS0-IFooKGVuZCkpIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0) <!-- .element target="_blank" -->

</div>
<div>

But with a build step

<!-- .element class="fragment" data-fragment-index="0" -->

[![](img/without-mutant-schemata-2.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZmxvd2NoYXJ0IFREXG4gICAgXG4gICAgc3ViZ3JhcGggbXV0YW50cyBbRm9yIGVhY2ggbXV0YW50XVxuXG4gICAgQihQbGFjZSlcbiAgICBCIC0tPiBDKEJ1aWxkKVxuICAgIEMgLS0-IEQoUnVuIHRlc3RzKVxuICAgIEQgLS1LaWxsZWQvU3Vydml2ZWQtLT4gRShSZXBvcnQgbXV0YW50KVxuXG4gICAgZW5kXG5cbiAgICBBKChzdGFydCkpIC0tPiBtdXRhbnRzXG4gICAgbXV0YW50cyAtLT4gWigoZW5kKSlcblxuICAgIHN0eWxlIEMgZmlsbDojRkYwIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0) <!-- .element target="_blank" -->

<!-- .element class="fragment" data-fragment-index="0" -->

</div>
</div>

---

### JavaScript build tools

![TypeScript](/img/ts.svg) <!-- .element class="img-width-15" title="TypeScript" -->
![babeljs](/img/babel.png) <!-- .element class="img-width-15" title="babeljs" -->
![esbuild](/img/esbuild.png) <!-- .element class="img-width-15" title="esbuild" -->
![rome](/img/rome.png) <!-- .element class="img-width-15" title="rome" -->
![webpack](/img/webpack.png) <!-- .element class="img-width-15" title="webpack" -->
![parcel](/img/parcel.png) <!-- .element class="img-width-15" title="parcel" -->
![browserify](/img/browserify.png) <!-- .element class="img-width-15" title="browserify" -->
![Plain npm scripts](/img/npm.png) <!-- .element class="img-width-15" title="Plain npm scripts" -->
![rollup.js](/img/rollup.png) <!-- .element class="img-width-15" title="rollup.js" -->
![spdy web compiler](/img/swr.png) <!-- .element class="img-width-15" title="spdy web compiler" -->
![grunt](/img/grunt.png) <!-- .element class="img-width-15" title="grunt" -->
![gulp](/img/gulp.png) <!-- .element class="img-width-15" title="gulp" -->


* Combinations possible <!-- .element class="fragment" -->
* Even more than these <!-- .element class="fragment" -->
* High turnover rate <!-- .element class="fragment" -->
* A StrykerJS plugin per build tool for performance <!-- .element class="fragment" -->

---

![rubiks-cube](/img/rubiks-cube.png)

_(rough estimate of a JS project)_

---

### Mutant schemata to the rescue

![cheater](/img/strykerjs-cheater.jpg)

