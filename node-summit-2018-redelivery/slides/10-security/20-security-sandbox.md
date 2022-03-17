##### The VM Module: Why it's not a Security Sandbox

By Bryan English

![bryan-english](/img/bryan-english.jpg) <!-- .element style="border-radius: 50%; width: 200px"-->

```js
const vm = require('vm');
```

... but not **_that_** interesting.

<!-- .element class="fragment" data-fragment-index="0" -->

What was interesting is the product of their company.

<!-- .element class="fragment" data-fragment-index="1" -->

---

## Intrinsic

Drop in replacement for NodeJS with static security policies

* Fine-grained security policies
* Deny by default

---

![intrinsic-policies.png](/img/intrinsic-policies.png)

---

## Deno

Worth mentioning Deno

> A secure TypeScript runtime built on V8

<!-- .element class="fragment" data-fragment-index="0" -->

* Read-only fs access and no network access
* Access between V8 and Runtime is only done via serialized messages

<!-- .element class="fragment" data-fragment-index="1" -->
