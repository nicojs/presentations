## Mutant states

- ✅ Killed
- 👽 Survived
- 🙈 No coverage
- ⏳ Timeout <!-- .element class="fragment" data-fragment-index="0" --> 
- 💥 Runtime <!-- .element class="fragment" data-fragment-index="1" --> Error
- 💥 Compile <!-- .element class="fragment" data-fragment-index="1" --> Error
- 🤥 Ignored <!-- .element class="fragment" data-fragment-index="2" -->

<!-- .element class="no-list" -->

---

### Mutant metrics

- **Detected** = `killed + timeout`
- **Undetected** = `survived + no coverage`
- **Covered** = `detected + survived`
- <!-- .element class="fragment" data-fragment-index="0" -->
  **Valid** = `detected + undetected`
- <!-- .element class="fragment" data-fragment-index="0" -->
  **Invalid** = `runtime error + compile error`

---

#### Mutation score

**Mutation score** = `detected / valid * 100`

**Mutation score based on covered code** = `detected / covered * 100`

&nbsp;

**Question**: what different conclusions can we derive from the 2 scores?
<!-- .element class="fragment" data-fragment-index="0" -->

&nbsp;

**Question**: Which challenge remains with regards to the presented mutation operators?
<!-- .element class="fragment" data-fragment-index="1" -->
