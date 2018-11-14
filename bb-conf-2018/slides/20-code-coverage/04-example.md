### Code coverage example

```javascript
// Production code
function isAllowedToBuyAlcohol(customer) {
  return customer.age >= 18;
}
```

```javascript
// Test
var customer = { name: 'Mark', age: 24 };
expect(isAllowedToBuyAlcohol(customer)).to.equal(true);
```

What is the code coverage here?

100% :( <!-- .element class="fragment" data-fragment-index="0" -->