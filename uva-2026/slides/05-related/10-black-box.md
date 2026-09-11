### Black box testing alternatives

Instead of the program, change the inputs

- Property-based testing
- Model-based testing
- Fuzzing

---

### Property-based testing

<div class="fragment custom semi-fade-out" data-fragment-index="2">

Describe the input space to the tool

- Test edge cases of the inputs
- Test random input values

</div>

When all inputs are tested, the program must be correct!
<!-- .element: class="fragment custom fade-in-then-semi-out" data-fragment-index="1" -->

- <!-- .element: class="fragment custom fade-in-then-semi-out" data-fragment-index="2" -->
  Test inputs separately, or all possible combinations?
- <!-- .element: class="fragment" data-fragment-index="3" -->
  What is the input space of a DNS server?

Note: Exhaustive property-based testing is infeasible due to the wild number of variables.

---
<!-- .slide: data-auto-animate -->

### Property-based testing

```js [|3]
test('should sort numeric elements from the smallest to the largest one', () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (data) => {
      const sortedData = sortNumbersAscending(data);
      for (let i = 1; i < data.length; ++i) {
        expect(sortedData[i - 1]).toBeLessThanOrEqual(sortedData[i]);
      }
    }),
  );
});
```

Note: Which test cases are likely to be generated? 🧦

---

### Model-based testing

<div class="fragment custom semi-fade-out" data-fragment-index="2">

Model the system's expected behaviour and derive tests

- Focuses on combinations of possible inputs
- Takes state into account

</div>
<div class="fragment custom fade-in-then-semi-out" data-fragment-index="1">

Don't just think unit tests!

- State machine validation
- Theorem proving

</div>

How well does the model represent the running program?
<!-- .element: class="fragment" data-fragment-index="2" -->

---

### Fuzzing

Testing random input

- Programs that are expected to deal with bad inputs
  - User input
  - Specific requirements

Effective when inputs are _valid enough_ to hit relevant logic
<!-- .element: class="fragment" -->
