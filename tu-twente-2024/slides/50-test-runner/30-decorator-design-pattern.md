### Decorator pattern

> Decorator pattern allows a user to add new functionality to an existing object without altering its structure.

---

#### Decorators

<emoji-list class="sm">

* 🎁 `RetryRejectedDecorator`
* 🎁 `MaxTestRunnerReuseDecorator`
* 🎁 `TimeoutDecorator`
* 🎁 `ChildProcessTestRunnerProxy`

</emoji-list>

---


#### Decorator Process

<kc-mermaid>

```language-plaintext
sequenceDiagram
    actor process as MutationTestingExecutor
    participant retry as RetryRejectedDecorator
    participant max as MaxTestRunnerReuseDecorator
    participant timeout as TimeoutDecorator
    participant proxy as ChildProcessTestRunnerProxy
    participant worker as ChildProcessTestRunnerWorker
    participant mocha as MochaTestRunner
    process ->>+ retry: mutantRun(options)
    retry ->>+ max: mutantRun(options)
    max ->>+ timeout: mutantRun(options)
    timeout ->>+ proxy: mutantRun(options)
    Note right of proxy: Process boundry
    proxy ->>+ worker: mutantRun(options)
    worker ->>+ mocha: mutantRun(options)
    mocha -->- worker: result
    worker -->- proxy: result
    proxy -->- timeout: result
    timeout -->- max: result
    max -->- retry: result
    retry -->- process: result
```

</kc-mermaid>


---

<!-- .slide: class="is-lab" -->

### Let's take a look

👀
