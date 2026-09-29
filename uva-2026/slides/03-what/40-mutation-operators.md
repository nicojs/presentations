### Mutation operators

Transform operations in source code to one or more mutated versions of that source code

---

![](/img/popular-operators.png)

Papadakis, M., Kintis, M., Zhang, J., Jia, Y., Le Traon, Y., & Harman, M. (2019). Mutation testing advances: an analysis and survey. In Advances in computers (Vol. 112, pp. 275-378). Elsevier.
<!-- .element: class="attribution" -->

\[34\] Offutt, A. J., Lee, A., Rothermel, G., Untch, R. H., & Zapf, C. (1996). An experimental determination of sufficient mutant operators. ACM Transactions on Software Engineering and Methodology (TOSEM), 5(2), 99-118.
<!-- .element: class="attribution" -->

---

#### Common mutations

| Original       | Mutated                       | Category |
|----------------|-------------------------------|----------|
| `a + b`        | `a - b`                       | AOR      |
| `a / b`        | `a * b`                       | AOR      |
| `a < b`        | `a > b`                       | ROR      |
| `a == b`       | `a != b`                      | ROR      |
| `a && b`       | <code>a &#124;&#124; b</code> | LCR      |
| `"Cola"`       | `""`                          | ABS      |
| `[1, 2, 3, 4]` | `[]`                          | ABS      |
| `a > b`        | `true`                        | LCR      |
| `{ ... }`      | `{}`                          | ABS      |
| `a`            | `a++`                         | UOI      |

<!-- .element class="small" -->
