### Mutant states

- <!-- .element: class="fragment semi-fade-out" data-fragment-index="1" -->
  ✅ Killed
- <!-- .element: class="fragment semi-fade-out" data-fragment-index="1" -->
  👽 Survived
- <!-- .element: class="fragment" data-fragment-index="1" -->
  <span class="fragment semi-fade-out" data-fragment-index="3">
  🙈 No coverage
  <em class="fragment" data-fragment-index="2">&mdash; no tests are reaching the code</em>
  </span>
- <!-- .element: class="fragment" data-fragment-index="1" -->
  <span class="fragment semi-fade-out" data-fragment-index="3">
  ⏳ Timeout
  <em class="fragment" data-fragment-index="2">&mdash; mutation caused an infinite loop</em>
  </span>
- <!-- .element: class="fragment" data-fragment-index="1" -->
  <span class="fragment semi-fade-out" data-fragment-index="3">
  💥 Runtime
  <em class="fragment" data-fragment-index="2">&mdash; mutation caused an exception</em>
  </span>
- <!-- .element: class="fragment" data-fragment-index="1" -->
  <span class="fragment semi-fade-out" data-fragment-index="3">
  💥 Compile
  <em class="fragment" data-fragment-index="2">&mdash; mutation resulted in invalid code</em>
  </span>
- <!-- .element: class="fragment" data-fragment-index="3" -->
  🤥 Ignored

---

<!-- .slide: data-auto-animate -->

### Mutation score

Is the code tested adequately?

`$$
\begin{align*}
M &= \text{ set of mutants } \{m_1, ..., m_n\} \\
mutationScore(M) &= { M_✅ + M_⏳ \over M_✅ + M_⏳ + M_👽 + M_🙈 } \times 100\%
\end{align*}
$$`

---

<!-- .slide: data-auto-animate -->

### Mutation score

Is the code _that is tested_ being tested adequately?

&nbsp;

`$$
\begin{align*}
M &= \text{ set of mutants } \{m_1, ..., m_n\} \\
coveredMutationScore(M) &= { M_✅ + M_⏳ \over M_✅ + M_⏳ + M_👽 } \times 100\%
\end{align*}
$$`

---

<!-- .slide: data-corporate-style="fancy2" -->

### Not all mutants can be killed

While it is easy to _reach_ all your code, it is not possible to write a test case for every possible internal change of your program
