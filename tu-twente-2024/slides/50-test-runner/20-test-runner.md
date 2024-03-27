### Test runner plugins

* StrykerJS uses a plugin system.
* Test runner plugins supported:
    * `@stryker-mutator/karma-runner` 
    * `@stryker-mutator/jasmine-runner`
    * `@stryker-mutator/mocha-runner`
    * `@stryker-mutator/jest-runner`
    * `@stryker-mutator/cucumber-runner`

---

### Test runner API

StrykerJS defines a uniform test runner API

```ts [1-1000|3,4]
interface TestRunner {
  init?(): Promise<void>;
  dryRun(options: DryRunOptions): Promise<DryRunResult>;
  mutantRun(options: MutantRunOptions): Promise<MutantRunResult>;
  dispose?(): Promise<void>;
}
```

---

### Generic test runner functionality

Some functionality is shared between test runners

<emoji-list class="sm">

* 🧱 Process isolation
* 🚮 Max test runner reuse
* 🔂 Retry functionality
* ⏳ Timeout restart

</emoji-list>

**Question**: What design patterns would fit here?

<!-- .element class="fragment" -->