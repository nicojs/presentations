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
