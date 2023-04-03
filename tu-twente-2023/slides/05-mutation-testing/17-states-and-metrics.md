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

**Question**: what different conclusions can we derive from the 2 scores?

<!-- .element class="fragment" data-fragment-index="2" -->
