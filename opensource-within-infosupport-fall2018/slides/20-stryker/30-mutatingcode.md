<!-- .element: class="fragments-no-display"-->
### Mutating code

<pre><code data-noescape data-trim class="lang-ts hljs typescript">
// Production code
function isAllowedToBuyAlcohol(customer) {
    return <span class="fragment fade-out" data-fragment-index="2">customer.age <span class="fragment fade-out" data-fragment-index="0">>=</span><span class="fragment current-visible" data-fragment-index="0"><</span><span class="fragment fade-in" data-fragment-index="1">></span> 18</span><span class="fragment fade-in" data-fragment-index="2">true</span>;
    <span class="fragment current-visible" data-fragment-index="0">// mutated code, test FAILS</span><span class="fragment current-visible" data-fragment-index="1">// mutated code, test SUCCEEDS</span><span class="fragment current-visible" data-fragment-index="2">// mutated code, test SUCCEEDS</span>
}
</code></pre>

<pre><code class="lang-js hljs javascript">// Test
var customer = { name: 'Mark', age: 24 };
expect(isAllowedToBuyAlcohol(customer)).to.equal(true);
</code></pre>
