### Arithmetic operator

| Original | Mutated |
| -------- | :------ |
| `a + b`  | `a - b` |
| `a - b`  | `a + b` |
| `a * b`  | `a / b` |
| `a / b`  | `a * b` |
| `a % b`  | `a * b` |

<!-- .element class="text-sm" -->

---

### String literal

| Original       | Mutated              |
| -------------- | :------------------- |
| `'foo'`        | `''`                 |
| `''`           | `'Stryker was here'` |
| `Hi ${person}` | <code>``</code>      |

<!-- .element class="text-sm" -->

---

### Boolean literal

| Original | Mutated |
| -------- | :------ |
| `true`   | `false` |
| `false`  | `true`  |
| `!foo`   | `foo`   |

<!-- .element class="text-sm" -->

---

### Conditional expression

| Original                           | Mutated                           |
| ---------------------------------- | --------------------------------- |
| `for (var i = 0; i < 10; i++) { }` | `for (var i = 0; false; i++) { }` |
| `while (a > b) { }`                | `while (false) { }`               |
| `do { } while (a > b);`            | `do { } while (false);`           |
| `if (a > b) { }`                   | `if (true) { }`                   |
| `if (a > b) { }`                   | `if (false) { }`                  |
| `case foo: ... break;`             | ` `                               |
| `var x = a > b ? 1 : 2;`           | `var x = true ? 1 : 2;`           |
| `var x = a > b ? 1 : 2;`           | `var x = false ? 1 : 2;`          |

<!-- .element class="text-sm" -->

---

### Object literal

| Original         | Mutated |
| ---------------- | ------- |
| `{ foo: 'bar' }` | `{ }`   |

<!-- .element class="text-sm" -->

---

### Optional chaining

| Original   | Mutated   |
| ---------- | --------- |
| `foo?.bar` | `foo.bar` |
| `foo?.[1]` | `foo[1]`  |
| `foo?.()`  | `foo()`   |

<!-- .element class="text-sm" -->

---

### Array declaration

| Original          | Mutated                         |
| ----------------- | :------------------------------ |
| `[]`              | `['Stryker was here']`          |
| `[1, 2]`          | `[]`                            |
| `new Array()`     | `new Array('Stryker was here')` |
| `new Array(1, 2)` | `new Array()`                   |

<!-- .element class="text-sm" -->

---

### Regex

JavaScript has both a regex literal expression and a `RegExp` class.

```js
const re = /ab+c/;
const re2 = new RegExp("ab+c");
```

StrykerJS will mutate RegExps separately.

---

#### Weapon regex

Regular expressions are mutated using the awesome [Weapon rege⚔](https://stryker-mutator.io/weapon-regex/)<!-- .element target="_blank" -->

[![WeaponRegeX_logo.svg](/img/WeaponRegeX_logo.svg)<!-- .element class="img-width-20"  -->](https://stryker-mutator.io/weapon-regex/) <!-- .element target="_blank" -->

| Original                      | Mutated  |
| ----------------------------- | -------- |
| `^abc`                        | `abc`    |
| `abc$`                        | `abc`    |
| `[abc]`                       | `[^abc]` |
| `\d`                          | `\D`     |
| `\s`                          | `\S`     |
| `\w`                          | `\W`     |
| `a?` / `a*` / `a+` / `a{1,3}` | `a`      |

<!-- .element class="text-sm" -->
