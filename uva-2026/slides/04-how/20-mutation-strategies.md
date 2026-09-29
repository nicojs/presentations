### Mutation strategies

Placing mutations into source code

---

<div class="r-hstack items-start items-gap">

<div class="fragment semi-fade-out" data-fragment-index="1">

#### Source code mutation

![Source code mutation](/img/source-code-mutation.svg)

- ✅ Precise
- ✅ Easy
- ❌ Slow

</div>
<div class="fragment custom semi-fade-in" data-fragment-index="1">

#### Byte code mutation

![Byte code mutation](/img/byte-code-mutation.svg)

- ✅ Fast...ish
- ❌ False positives
- ❌ Complicated

</div>

</div>

Note: How can we do better? 🧦

---

#### Mutant schemata 🏎

Generate mutants based on source code, but compile once

![Mutant schemata](/img/mutant-schemata-mutation.svg)

* ✅ Precise
* ✅ Fast
* 🟡 Complicated (but manageable)

Untch, R. H., Offutt, A. J., & Harrold, M. J. (1993, July). Mutation analysis using mutant schemata. In Proceedings of the 1993 ACM SIGSOFT international symposium on Software testing and analysis (pp. 139-148).
<!-- .element: class="attribution" -->

Note: Relatively new!
