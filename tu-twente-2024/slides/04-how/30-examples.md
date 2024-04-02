#### 🦥 Smart bail / fail Fast

> Stop the execution of the tests when a mutant is killed. Since there is only a single mutation active per test run. We can savely stop the test when a mutant is killed without los of precission.

---


#### 🏎️ Parallel execution

> This technique executes mutants in parallel processors, reducing the total time needed to perform mutation analysis.

---

#### 🦥 Control-flow analysis

> This technique uses program control flow-related information, focusing on execution characteristics to identify branches and commands that help determine which structures are most relevant to the generation and execution of mutants.

&nbsp;
![Mutant schemata](/img/mutant-schemata-mutation.svg)
![dry run](/img/dryrun.png)

---

#### 🦥 Control-flow analysis - reachability matrix



![dry run](/img/matrix.png)

---

#### 🧐 Higher order mutation

> This technique combines two or more simple mutations to create a single complex mutant.

```js [3]
function calculateInLoop() {
    var value = 0;
    for (i = 0; i != /* 👽 */ 10; i++) { 
        value /* 👽 */ -= 1;
    }
    return value
}
```

```js []
expect(calculateInLoop).to.equal(45); 
```

---
#### 🧐 Simultanious testing

> 


---
#### 🧐 Minimization and prioritization of test sets

> This technique analyzes the test suite to score test cases based on their effectiveness at killing mutants, then either eliminates test cases that are ineffective or runs the most effective test cases before the less effective test cases.

> Possibility for improvement based on reachability matrix and controll flow. Find which tests can reach the most mutations in differente code paths without hurting precision. Allow those mutations the be active at the same time (a form of higher order mutation). Prioritize these tests with the correct higher order mutation active.
