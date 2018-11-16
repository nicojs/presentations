<!-- .element: class="fragments-no-display"-->
### Mutating code

<pre><code data-noescape data-trim class="lang-ts hljs typescript">
// Production code
function isAllowedToBuyAlcohol(customer) {
    return <span class="fragment fade-out" data-fragment-index="2">customer.age <span class="fragment fade-out" data-fragment-index="0">>=</span><span class="fragment current-visible" data-fragment-index="0"><</span><span class="fragment fade-in" data-fragment-index="1">></span> 18</span><span class="fragment fade-in" data-fragment-index="2">true</span>;
    <span class="fragment current-visible" data-fragment-index="0">// test fails, Mutant KILLED</span><span class="fragment current-visible" data-fragment-index="1">// test passes, Mutant SURVIVED</span><span class="fragment current-visible" data-fragment-index="2">// test passes, Mutant SURVIVED</span>
}
</code></pre>

<pre><code class="lang-js hljs javascript">// Test
var customer = { name: 'Professor X', age: 96 };
expect(isAllowedToBuyAlcohol(customer)).to.equal(true);
</code></pre>
