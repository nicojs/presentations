### Code coverage example

```javascript
// Production code
function isAllowedToBuyAlcohol(customer) {
  return customer.age >= 18;
}
```

```javascript
// Test
var customer = { name: 'Professor X', age: 96 };
expect(isAllowedToBuyAlcohol(customer)).to.equal(true);
```

What is the code coverage here?

100% :( <!-- .element class="fragment" data-fragment-index="0" -->