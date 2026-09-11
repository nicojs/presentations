<!-- .slide: data-auto-animate -->

### Mutating code

```js []
function isAdult(customer) {
    return customer.age >= 18;
}
```

```js []
const customer = { name: 'Professor X', age: 96 };
expect(isAdult(customer)).to.equal(true);
```

---

<!-- .slide: data-auto-animate -->

### Mutating code

```js [3-6]
function isAdult(customer) {
    return customer.age >= 18;
    /* 👽 1 */ return customer.age < 18;
    /* 👽 2 */ return customer.age > 18;
    /* 👽 3 */ return false;
    /* 👽 4 */ return true;
}
```

```js []
const customer = { name: 'Professor X', age: 96 };
expect(isAdult(customer)).to.equal(true);
```

---

<!-- .slide: data-auto-animate -->

### Mutating code

```js [3-6]
function isAdult(customer) {
    return customer.age >= 18;
    /* 👽 1 */ return customer.age < 18; /* ✅ Killed */
    /* 👽 2 */ return customer.age > 18; /* ❌ Survived */
    /* 👽 3 */ return false; /* ✅ Killed */
    /* 👽 4 */ return true; /* ❌ Survived */
}
```

```js []
const customer = { name: 'Professor X', age: 96 };
expect(isAdult(customer)).to.equal(true);
```

---

<!-- .slide: data-auto-animate -->

### Mutating code

```js [3,5]
function isAdult(customer) {
    return customer.age >= 18;
    /* 👽 1 */ return customer.age < 18; /* ✅ Killed */
    /* 👽 2 */ return customer.age > 18; /* ✅ Killed */
    /* 👽 3 */ return false; /* ✅ Killed */
    /* 👽 4 */ return true; /* ✅ Killed */
}
```

```js [2-3]
const customer = { name: 'Professor X', age: 96 };
expect(isAdult({ age: 18 })).to.equal(true);
expect(isAdult({ age: 16 })).to.equal(false);
expect(isAdult(customer)).to.equal(true);
```
