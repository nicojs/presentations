## How to mutate code?

1. Source code
    * 👍 Reliable reporting <!-- .element class="no-list" -->
    * 👎 Slow (a copy per mutant) <!-- .element class="no-list" -->
    * 👎 Slow (every mutant needs to compile) <!-- .element class="no-list" -->

![stryker](/img/source-code-mutation.png)

---

1. Byte code / IL code
    * 👍 Faster <!-- .element class="no-list" -->
    * 👎 Unreliable reporting <!-- .element class="no-list"-->
    * 👎 Slow (a copy per mutant) <!-- .element class="no-list" -->

![stryker](/img/byte-code-mutation.png)


---

## Mutation switching

Mutation switching is a new way of mutating code.

* 👍 Reliable reporting<!-- .element class="no-list"  -->
* 👍 Compile once<!-- .element class="no-list"  -->
* 👍 No sandbox copies of project<!-- .element class="no-list"  -->

![stryker](/img/mutation-switching.png)

Stryker.NET / Stryker4s pioneered  _mutation switching_.

<!-- .element class="fragment" data-fragment-index="3" -->

---

### Mutation switching - example

```js
// Production code
function isAllowedToBuyAlcohol(customer) {
  return customer.age > 18;
}
```

```js
// Mutation switch example
function isAllowedToBuyAlcohol(customer) {
return  global.ACTIVE_MUTATION === 0? customer.age < 18 : 
        global.ACTIVE_MUTATION === 1? customer.age >= 18 :
        customer.age > 18;
} 
```

<!-- .element class="fragment" data-fragment-index="0" -->




