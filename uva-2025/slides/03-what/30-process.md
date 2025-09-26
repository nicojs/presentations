### Mutation testing process

😀
<span class="fragment" data-fragment-index="1"> → 👽</span>
<span class="fragment" data-fragment-index="2"> → ✅ ❌</span>
<span class="fragment" data-fragment-index="3"> → 📊</span>

<!-- .element: style="font-size: 2em" -->

1. Source code
2. <!-- .element class="fragment" data-fragment-index="1" -->Mutant
3. <!-- .element class="fragment" data-fragment-index="2" -->Killed / survived
4. <!-- .element class="fragment" data-fragment-index="3" -->Report

---

### Generic Process of Mutation Analysis

![](/img/mutation-flow.png)


---

### Computationally expensive

> Annecdotal evidence suggests that on average between 0.5 to 2 mutants are generated per line of code. In extreme cases have seen projects that have 5 mutants per line of code.

> For one of our sample projects around 7000 mutants are generated. Even if running all the tests would only take 1 second we would still have to wait for 2 hours for the results.


---

### "Recent" popularity

![Theoretical publications vs. practical publications](/img/early-history.png)

Y. Jia and M. Harman, "An Analysis and Survey of the Development of Mutation Testing," in IEEE Transactions on Software Engineering, vol. 37, no. 5, pp. 649-678, Sept.-Oct. 2011, DOI: 10.1109/TSE.2010.62.
<!-- .element: class="attribution" -->

Note: Mainly theoretical until the 90s, large peak from the second half of the 00s

