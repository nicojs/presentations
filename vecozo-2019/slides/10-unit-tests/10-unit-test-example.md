## Unit test example

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

An example of a unit test in JavaScript