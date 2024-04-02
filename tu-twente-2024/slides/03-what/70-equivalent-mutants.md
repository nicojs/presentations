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

> The detection of equivalent mutants is in general impossible as determining whether two programs are the equivilent is undicidable. 

Automatically detecting equivalent mutants and infeasible paths. A.J Offut & J. Pan. 1997

> The proportion of equivalent mutants is hard to determine but is estimate to be around 8,6% of generated mutants on average. This is close to the 9,1% reported by A.J. Offut & J. Pan. 

(un-)covering equivalent mutants. D. Schuler & A. Zeller. 2010

---

### Redundant mutants

Redundant mutants are semantically equivalent to other mutants, but not the orignal program. If two mutants are considered to be redundant with respect to each other, then it is sufficient to only kill one of them.

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

### Mutants that time out

```js []
function calculateInLoop() {
    var value = 0;
    for (i = 0; i < 10; i-- /* 👽 */) { 
        value += 1;
    }
    return value
}
```

```js []
expect(calculateInLoop).to.equal(45); /* ⏳ Timeout */
```

---

<!-- .slide: data-auto-animate -->

### Mutation score

Comming back to the mutation score, what is the impact of equivalent mutants and the other challenges?

![mutation score](/img/mutationscore.png)