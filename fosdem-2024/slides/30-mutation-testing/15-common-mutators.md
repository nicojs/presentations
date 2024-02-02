## Common mutations

| Original                    | Mutated                         |
| --------------------------- | :------------------------------ |
| `a + b`                     | `a - b`                         |
| `a / b`                     | `a * b`                         |
| `a < b`                     | `a > b`                         |
| `a === b`                   | `a !== b`                       |
| `a && b`                    | <code>a &#124;&#124; b</code>   |
| `a ?? b`                    | `a && b`                        |
| `const drink = "Cola"`      | `const drink = ""`              |
| `const list = [1, 2, 3, 4]` | `const list = []`               |
| `if (a > b) { ... }`        | `if (true) { ... }`             |
| `function fn() { ...}`      | `function fn() { /* EMPTY */ }` |

<!-- .element class="sm" -->
