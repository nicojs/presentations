<!-- .slide: class="is-fancy2" -->

## Improving performance

---

### Performance baseline

> T<sub>total</sub> <span class="fragment" data-fragment-index="0">!</span>= T<sub>test</sub> &times; N<sub>mutants</sub>

<!-- .element class="text-xl" -->

* 🏎️ Do **faster**: ~ 30 papers
* 🦥 Do **fewer**:~ 65 papers
* 🧐 Do **smarter**: ~ 15 papers

<!-- .element class="no-list fragment" data-fragment-index="0" -->

A. Pizzoleto, F. Ferrari, J. Offutt, L. Fernandes, and M. Ribeiro, “A systematic literature
review of techniques and metrics to reduce the cost of mutation testing,” Journal of Systems
and Software, vol. 157, Jul. 2019. DOI: 10.1016/j.jss.2019.07.100 (cit. on pp. 15, 18).

<!-- .element class="citation fragment" data-fragment-index="1" -->

---

![](/img/cost-reduction-timeline.png)

---

#### 🦥 Selective mutation

> This technique tries to avoid the application of mutation operators that are responsible for the most mutants or to select mutation operators that result in mutants that are killed by tests that also kill lots of mutants created by other operators. 
> The idea is that if a test set, T<sub>op</sub>, that is adequate for a subset of mutation operators <sub>op</sub>, also kills a very high percentage of all mutants, then we can select only the operators.

---

![](/img/jan-smits.png)
