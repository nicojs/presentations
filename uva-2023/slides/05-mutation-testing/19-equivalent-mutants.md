<!-- .element: class="fragments-no-display"-->
### Equivalent mutants

<pre><code data-noescape data-trim class="lang-ts hljs typescript">
// Production code
function calculateInLoop() {
    var value = 0;
    for (i = 0; i <span class="fragment fade-out" data-fragment-index="0"><</span><span class="fragment current-visible" data-fragment-index="0">!=</span> 10; i++) {
        value += 1;
    }
    return value
    <span class="fragment current-visible" data-fragment-index="0">// test passes, Mutant SURVIVED</span>
}
</code></pre>

<pre><code class="lang-js hljs javascript">// Test
expect(calculateInLoop).to.equal(45);
</code></pre>
