### Mutation levels 🦥

Selective mutation approach by Info Support's Jan Smits

- User choice depending on requirements
  - Type of project / domain
  - Pull request / nightly build

Mutation score not necessarily comparable!
<!-- .element: class="fragment" -->

Note: **Before fragment**: What could be a downside? 🧦

---

### Mutation levels: Callisto

<div class="r-hstack items-gap items-equal r-stretch">
<div>

- Full run of mutation testing as input
- Finds balance between accuracy and number of test executions

</div>

![Mutation levels](/img/mutation-levels.png)

</div>

Smits, J. P. G. (2022). Callisto: Selecting Effective Mutation Operators for Mutation Testing (Master's thesis). University of Twente, Enschede.
[Summary @ research.infosupport.com](https://research.infosupport.com/publications/callisto-selecting-effective-mutation-operators-for-mutation-testing/),
[Thesis @ utwente.nl](https://purl.utwente.nl/essays/89294).
<!-- .element: class="attribution" -->

Note: Only executing block statement mutations results in 86% less executions with an effectiveness of 63%

---

### Simultaneous testing 🧐

Reduction of test runs by Info Support's Mart de Roos

- Applying multiple mutants per test run
- Benefits languages/tools with relatively high test startup time
- Retained quality (> 99.9%)
- High overhead in StrykerJS due to live communication

Roos, M.C. de (2024). Faster Mutation Testing through Simultaneous Mutation Testing (Master's thesis). University of Twente, Enschede.
[Summary @ research.infosupport.com](https://research.infosupport.com/publications/faster-mutation-testing-through-simultaneous-mutation-testing/)
[Thesis @ utwente.nl]( https://purl.utwente.nl/essays/98905).
<!-- .element: class="attribution" -->
