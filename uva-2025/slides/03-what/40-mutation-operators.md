### Mutation operators

Transform operations in source code to one or more mutated versions of that source code

---

![](/img/popular-operators.png)

Papadakis, M; Kintis, M; Zhang, J; Jia, Y; Traon, YL; Harman, M; (2018) Mutation Testing Advances: An Analysis and Survey. Advances in Computers 112 (2019), 75-378.\
\[34\] A. Jefferson Offutt, Ammei Lee, Gregg Rothermel, Roland H. Untch, and Christian Zapf. 1996. An experimental determination of sufficient mutant operators. ACM Trans. Softw. Eng. Methodol. 5, 2 (April 1996), 99–118.
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
