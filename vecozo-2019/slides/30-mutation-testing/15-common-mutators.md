## Common mutations
Original            | Mutated   
------------------|:-------
`a + b` | `a - b`
`a / b` | `a * b`   
`a < b` | `a > b`
`a == b` | `a != b`
`a && b` | <code>a &#124;&#124; b</code>
`var drink = "Cola"` | `var drink = ""`
`var list = [1, 2, 3, 4]` | `var list = []`
`if (a > b) { ... }` | `if (true) { ... }`
`function fn() { ...}` | `function fn() { /* EMPTY */ }`