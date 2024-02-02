### Code coverage example

```js []
function isAdult(customer) {
  return customer.age >= 18;
}
```

```js []
const customer = { name: 'Professor X', age: 96 };
expect(isAdult(customer)).to.equal(true);
```

<!-- .element class="fragment" data-fragment-index="0" -->

What is the code coverage here? 🧦

<!-- .element class="fragment" data-fragment-index="0" -->

😞 100% 😞 <!-- .element class="fragment" data-fragment-index="1" -->