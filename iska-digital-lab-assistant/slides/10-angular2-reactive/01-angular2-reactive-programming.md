
# Reactive programming

---

## What are Reactive Extensions (Rx)

> An API for asynchronous programming with observable streams

---

### The problem it solves

![observables](img/observables.PNG)

---

### What is RxJS?
A JavaScript library that implements ReactiveX api

There a more implementations
http://reactivex.io/languages.html

Written in TypeScript

---

### Our first `Rx.Observable`

```typescript
var myObservable = new Rx.Observable(observer => {
    console.log('observing');
    observer.next('data');
});
```

![tumbleweed](/img/tumbleweed.gif)

<!-- .element class="fragment" data-fragment-index="0" -->

Lazy until subscribed to

<!-- .element class="fragment" data-fragment-index="1" -->

```typescript
myObservable.subscribe(val => console.log(val));
```

<!-- .element class="fragment" data-fragment-index="1" -->

---

### Observables ~ Promises

Help with asynchronous processing.

```typescript
 var p = new Promise(resolve => {
  setTimeout(_ => resolve('data'), 1000);
 });
  p.then(data => console.log(data));
```

```typescript
var Rx = require('rxjs');
var myObservable = new Rx.Observable(observer => {
  setTimeout(_ => observer.next('data'), 1000);
});
myObservable.subscribe(x => console.log(x));
```

---

### Observables != Promises

But...

<pre><code class="lang-typescript hljs" data-trim data-noescape>
 var p = new Promise(resolve => {
   <mark>setInterval</mark>(_ => resolve('data'), 1000);
 });
 p.then(data => console.log(data));
</code></pre>

<pre><code class="lang-typescript hljs" data-trim data-noescape>
var myObservable = new Rx.Observable(observer => {
  <mark>setInterval</mark>(_ => observer.next('data'), 1000);
});
myObservable.subscribe(x => console.log(x));
</code></pre>

---

### Observable operators

Observables can be
- filtered
- mapped
- concatenated
- merged
- retried
- many many more....

These are the operators
<a href="http://xgrommx.github.io/rx-book/content/which_operator_do_i_use/creation_operators.html">Creation Operators</a>
<a href="http://xgrommx.github.io/rx-book/content/which_operator_do_i_use/instance_operators.html">Instance Operators</a>

---

### ReactiveX in Angular

- Core logic like `EventEmitter`
- Additional modules
    - Forms Module
    ```typescript
    form.valueChanges.subscribe(data => {
        console.log('Form changes', data)
    });
    ```
    - HTTP module
    ```typescript
    http.get(this.commentsUrl)
        .subscribe(comments => this.comments = comments);
    ```
  
<!-- .element class="stretch"-->