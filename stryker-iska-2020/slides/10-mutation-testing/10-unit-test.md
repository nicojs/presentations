### Unit test

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