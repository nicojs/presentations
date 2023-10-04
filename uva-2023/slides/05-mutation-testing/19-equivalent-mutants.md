<!-- .slide: data-auto-animate -->

### Equivalent mutants

```js
// Production code
function calculateInLoop() {
    var value = 0;
    for (i = 0; i < 10; i++) {
        value += 1;
    }
    return value
}
```

```js
// Test
expect(calculateInLoop).to.equal(45);
```

---

<!-- .slide: data-auto-animate -->

### Equivalent mutants

```js
// Production code
function calculateInLoop() {
    var value = 0;
    for (i = 0; i != 10; i++) { // 👽
        value += 1;
    }
    return value
}
```

```js
// Test
expect(calculateInLoop).to.equal(45);
```

Test passes!
