### Code quality

How can we _objectively_ define the quality of code?

Note: What do you consider important? 🧦

---

#### Coupling effect

> Complex faults are the result of relatively simple faults.
> Consequently, the detection of complex faults is often assured by the detection of simple faults.

Budd, T. A., DeMillo, R. A., Lipton, R. J., & Sayward, F. G. (1980, January). Theoretical and empirical studies on using program mutation to test the functional correctness of programs. In Proceedings of the 7th ACM SIGPLAN-SIGACT symposium on Principles of programming languages (pp. 220-233).
<!-- .element: class="attribution" -->

---

#### Competent programmer hypothesis

> Programmers write code that is close to correct, indicating that many bugs are caused by trivial or syntactic mistakes.

DeMillo, R. A., Lipton, R. J., & Sayward, F. G. (1978). Hints on test data selection: Help for the practicing programmer. Computer, 11(4), 34-41.
<!-- .element: class="attribution" -->

Note: The coupling effect is supported by the idea of the competent programmer.

---

### Implications on testing

In many cases, complex faults _are_ the result of simple faults

- Testing a small class of faults leads to detection of more complicated faults

Offutt, A. (1989). The coupling effect: fact or fiction. ACM SIGSOFT Software Engineering Notes, 14(8), 131-140.
<!-- .element: class="attribution" -->

Note: Empirically validated
