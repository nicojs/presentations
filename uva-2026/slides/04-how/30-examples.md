### Coverage analysis 🧐

**Test coverage**: which code is hit by which tests

- Only run tests that cover a mutation instead of the whole test suite

---

### Incremental analysis 🦥

Re-use results from a previous run

- Only analyze changes from previous run

---

### Smart bail / fail fast 🦥

Stop when a mutant is killed

- One failing test is sufficient to detect the fault

---

### Parallel execution 🏎

Activate multiple mutants in a single test run

- Reduces number of test suite executions
- Are mutants independent?

Note: Not always, complicated to determine.

---

### Control flow analysis 🧐

<div class="r-hstack items-gap">
<div>

Analyze runtime behaviour

- Remove equivalent mutants

</div>

$$
\begin{bmatrix}
    & t_0 & t_1 & t_2 & \cdots & t_i \\\\
m_0 & 1 & 0 & 1 && 1 \\\\
m_1 & 0 & 1 & 0 && 0 \\\\
m_2 & 1 & 0 & 0 && 0 \\\\
\vdots \\\\
m_j & 0 & 1 & 0 && 1
\end{bmatrix}
$$

</div>

Note: Matrix shows a perfect example where all mutants can be combined in a single run. This is not realistic!

---

### Higher order mutation 🧐

Combine multiple simple mutants into a single complex one

```js []
function calculateInLoop() {
    var value = 0;
    for (i = 0; i != /* 👽 */ 10; i++) { 
        value /* 👽 */ -= 1;
    }
    return value
}
```

Note: Amount of possibilities high, difficult to determine what is valuable
