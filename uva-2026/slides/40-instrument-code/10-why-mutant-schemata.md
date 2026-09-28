### Why mutant schemata for JS?

<div class="row">
<div>

Source code mutation

[![](img/without-mutant-schemata.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZmxvd2NoYXJ0IFREXG4gICAgXG4gICAgc3ViZ3JhcGggbXV0YW50cyBbRm9yIGVhY2ggbXV0YW50XVxuXG4gICAgQihQbGFjZSlcbiAgICBCIC0tPiBEKFJ1biB0ZXN0cylcbiAgICBEIC0tS2lsbGVkL1N1cnZpdmVkLS0-IEUoUmVwb3J0IG11dGFudClcblxuICAgIGVuZFxuXG4gICAgQSgoc3RhcnQpKSAtLT4gbXV0YW50c1xuICAgIG11dGFudHMgLS0-IFooKGVuZCkpIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0) <!-- .element target="_blank" -->

</div>
<div>

But with a build step

<!-- .element class="fragment" data-fragment-index="0" -->

[![](img/without-mutant-schemata-2.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZmxvd2NoYXJ0IFREXG4gICAgXG4gICAgc3ViZ3JhcGggbXV0YW50cyBbRm9yIGVhY2ggbXV0YW50XVxuXG4gICAgQihQbGFjZSlcbiAgICBCIC0tPiBDKEJ1aWxkKVxuICAgIEMgLS0-IEQoUnVuIHRlc3RzKVxuICAgIEQgLS1LaWxsZWQvU3Vydml2ZWQtLT4gRShSZXBvcnQgbXV0YW50KVxuXG4gICAgZW5kXG5cbiAgICBBKChzdGFydCkpIC0tPiBtdXRhbnRzXG4gICAgbXV0YW50cyAtLT4gWigoZW5kKSlcblxuICAgIHN0eWxlIEMgZmlsbDojRkYwIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0) <!-- .element target="_blank" -->

<!-- .element class="fragment" data-fragment-index="0" -->

</div>
</div>

notes:

Since JS is an interpreted language, we could use source code mutations.

However:
- Most JS projects nowadays have build steps, the most well-known one being tsc transpiling TS to JS.

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

- Combinations possible <!-- .element class="fragment" -->
- Even more than these <!-- .element class="fragment" -->

notes:

Small list of some well-known JS build tools

- You can combine build tools
- There's a lot more build-tools

---

![rubiks-cube](/img/rubiks-cube.png)

_(rough estimate of a JS project)_

---

### Mutant schemata to the rescue

![cheater](/img/strykerjs-cheater.jpg)

notes:

Thankfully, we can use mutant schemata to solve this!

Stryker.NET & Stryker4S already used mutant schemata,
so we asked them if we could copy their homework,
and they said it was fine if we just changed it a bit so it
doesn't look obvious that we copied, so we changed it to TS.