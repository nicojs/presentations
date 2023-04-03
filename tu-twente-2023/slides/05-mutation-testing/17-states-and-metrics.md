## Mutant states

- ✅ Killed
- 👽 Survived
- 🙈 No coverage
- ⏳ &nbsp;Timeout
- 💥 Runtime <!-- .element class="fragment" data-fragment-index="0" --> Error
- 💥 Compile <!-- .element class="fragment" data-fragment-index="0" --> Error
- 🤥 Ignored <!-- .element class="fragment" data-fragment-index="1" -->

<!-- .element class="no-list" -->

---

### Mutant metrics

<div class="kc-grid">

<div>

- **Detected** \
  `killed + timeout`
- **Undetected** \
  `survived + no coverage`
- **Covered** \
  `detected + survived`
- <!-- .element class="fragment" data-fragment-index="0" -->
  **Valid** \
  `detected + undetected`
- <!-- .element class="fragment" data-fragment-index="0" -->
  **Invalid** \
  `Runtime Error + Compile Error`

</div>


- **Mutation score** \
  `detected / valid * 100`
- **Mutation score based on covered code** \
  `detected / covered * 100`

<!-- .element class="fragment" data-fragment-index="1" -->

</div>

---

### Stryker report

![](https://raw.githubusercontent.com/stryker-mutator/mutation-testing-elements/master/packages/elements/docs/directory-result-example.png) <!-- .element style="height: 300px" -->


---

![](/img/stryker-sonarqube.webp)

**Question**: Which challenge remains with regards to the presented mutation operators?

<!-- .element class="fragment" data-fragment-index="2" -->
