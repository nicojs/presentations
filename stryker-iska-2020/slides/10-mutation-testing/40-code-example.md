<!-- .element: class="fragments-no-display"-->
### Mutation testing 101

<pre><code data-noescape data-trim class="lang-ts hljs typescript">
// Production code
function isAllowedToBuyAlcohol(customer) {
  return customer.age <span class="fragment fade-out" data-fragment-index="0">>=</span><span class="fragment current-visible" data-fragment-index="0"><</span><span class="fragment fade-in" data-fragment-index="1">></span> 18;
  <span class="fragment current-visible" data-fragment-index="0">// mutated code, test FAILS</span><span class="fragment current-visible" data-fragment-index="1">// mutated code, test SUCCEEDS</span>
}

</code></pre>

<pre><code class="lang-ts hljs typescript">
// Test
var customer = { name: 'Mark', age: 24 };
expect(isAllowedToBuyAlcohol(customer)).to.equal(true);
</code></pre>

Only one mutation is active at any one time

<!-- .element class="fragment" data-fragment-index="2" -->
