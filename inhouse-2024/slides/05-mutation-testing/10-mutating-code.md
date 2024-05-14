<!-- .slide: data-auto-animate -->
### Mutating code

```js
function isAllowedToBuyAlcohol(customer) {
    return customer.age >= 18;
}
```

```js
const customer = { name: 'Professor X', age: 96 };
expect(isAllowedToBuyAlcohol(customer)).to.equal(true);
```

---

<!-- .slide: data-auto-animate -->

### Mutating code


```js
function isAllowedToBuyAlcohol(customer) {
    return customer.age >= 18;
    /* 👽 1 */ return customer.age < 18;
    /* 👽 2 */ return customer.age > 18;
    /* 👽 3 */ return false;
    /* 👽 4 */ return true;
}
```

```js
const customer = { name: 'Professor X', age: 96 };
expect(isAllowedToBuyAlcohol(customer)).to.equal(true);
```

---

<!-- .slide: data-auto-animate -->

### Mutating code

```
👽 1 ✅ Killed
👽 2 ❌ Survived
👽 3 ✅ Killed
👽 4 ❌ Survived
```

How can we improve our result

Add more tests!

<!-- .element class="fragment" data-fragment-index="1" -->

- test when `age < 18`
- test when `age === 18`

<!-- .element class="fragment" data-fragment-index="1" -->
