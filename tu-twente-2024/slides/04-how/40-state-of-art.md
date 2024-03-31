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

Smits, J. P. G. (2022). Callisto-Selecting Effective Mutation Operators for Mutation Testing (Master's thesis, University of Twente).
[Summary @ research.infosupport.com](https://research.infosupport.com/publications/callisto-selecting-effective-mutation-operators-for-mutation-testing/),
[Thesis @ utwente.nl](https://essay.utwente.nl/89294/).
<!-- .element: class="attribution" -->

Note: Only executing block statement mutations results in 86% less executions with an effectiveness of 63%

---

### Mutation levels: project Xavier

Mutation levels implementation in Stryker JS

- **Hot off the press**: implementation done, [pull request #4686](https://github.com/stryker-mutator/stryker-js/pull/4686) open

Implemented by a project group of CS master students from the University of Twente
<!-- .element: class="fragment" -->

- Documentation to follow...
<!-- .element: class="fragment" -->

---

### Further reducing test runs 🧐

Analyze multiple mutants per test run

- Minimal number of test runs
- Combine mutants that do not influence each other
- No negative effects on accuracy

Current graduation project of CS master student at Info Support
<!-- .element: class="fragment" -->
