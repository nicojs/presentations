### Code coverage

![alt text](/img/sonarqube-coverage.png)

---

### False sense of security

![alt text](/img/unit-tests-pass.jpg)

**Question:** 🤔 How to _actually_ verify your tests? <span class="fragment"> ☝️ Mutation Testing!</span>

<!-- .element class="fragment" -->

---

### Mutation testing process

😀
<span class="fragment" data-fragment-index="1"> → 👽</span>
<span class="fragment" data-fragment-index="2"> → ✅ ❌</span>
<span class="fragment" data-fragment-index="3"> → 📊</span>

<!-- .element: style="font-size: 2em" -->

1. Program
2. <!-- .element class="fragment" data-fragment-index="1" -->Mutant
   - Introduce a bug (or _mutant_) in the program code
3. <!-- .element class="fragment" data-fragment-index="2" -->Test run
   - ✅ Tests fail -> mutant killed (good!)
   - ❌ Tests succeed -> mutant survived (bad!)
4. <!-- .element class="fragment" data-fragment-index="3" -->Report results
   - Mutation score = (killed mutants / total mutants) * 100%

Mutation testing actually verify that your tests can catch bugs!

<!-- .element class="fragment" -->