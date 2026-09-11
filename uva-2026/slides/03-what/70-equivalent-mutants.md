<!-- .slide: data-auto-animate -->

### Equivalent mutants

```js [|3]
function calculateInLoop() {
    var value = 0;
    for (i = 0; i < 10; i++) {
        value += 1;
    }
    return value
}
```

```js []
expect(calculateInLoop).to.equal(45); /* ✅ Passes */
```

---

<!-- .slide: data-auto-animate -->

### Equivalent mutants

```js [3]
function calculateInLoop() {
    var value = 0;
    for (i = 0; i != /* 👽 */ 10; i++) { /* ❌ Survived */
        value += 1;
    }
    return value
}
```

```js []
expect(calculateInLoop).to.equal(45); /* ✅ Passes */
```

---

### Equivalent mutants

> The detection of equivalent mutants is in general impossible as determining whether two programs are the equivalent is undecidable.

Offutt, A.J. and Pan, J. (1997), Automatically detecting equivalent mutants and infeasible paths. Softw. Test. Verif. Reliab., 7: 165-192.
<!-- .element: class="attribution" -->

> The proportion of equivalent mutants is hard to determine but is estimate to be around 8,6% of generated mutants on average. This is close to the 9,1% reported by A.J. Offut & J. Pan.

D. Schuler and A. Zeller, "(Un-)Covering Equivalent Mutants," 2010 Third International Conference on Software Testing, Verification and Validation, Paris, France, 2010, pp. 45-54.
<!-- .element: class="attribution" -->

---

### Redundant mutants

_Semantically_ equivalent, _syntactically_ different

```js [3-6]
function isAdult(customer) {
    return customer.age >= 18;
    /* 👽 1 */ return customer.age < 18;
    /* 👽 2 */ return customer.age <= 18;

}
```

```js []
const customer = { name: 'Professor X', age: 96 };
expect(isAdult(customer)).to.equal(true);
```

---
<!-- .slide: class="is-fancy2" -->

### Equivalent and redundant mutants

What is the impact on the mutation score?

$$
\begin{align*}
mutationScore(M) &= { M_✅ + M_⏳ \over M_✅ + M_⏳ + M_👽 + M_🙈 } \times 100\%
\end{align*}
$$

<!-- .element: class="small" -->
