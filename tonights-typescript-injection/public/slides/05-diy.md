## 🦸 Do it yourself!

![](/img/memes/diy.webp) <!-- .element style="width: 50%" -->

---

### 🥅 The goal

Create a DI container that is...

- ✅ Type safe
  - Get a compile error whenever you do something wrong
- ✅ Self contained
  - No reliance on `--experimentalXyz`

<!-- .element class="no-list" -->

---

### 🛸 The challenges

How to make it type safe?

1. <!-- .element class="fragment" --> <i class="list-style-icon">📣</i> Declare dependencies.
1. <!-- .element class="fragment" --> <i class="list-style-icon">🎎</i> Correlate those types to parameters.
1. <!-- .element class="fragment" --> <i class="list-style-icon">🎁</i> Put it all together in a container.

---

<!-- .slide: data-no-zoom -->

### 👨‍👩‍👦 Introducing the dependencies

<monaco-editor type="script">

```ts
interface Photo {
  title: string;
  url: string;
}

class Logger {
  info(message: string) {
    console.log(message);
  }
}

class HttpClient {
  constructor(private log: Logger) {}
  async get<T>(url: string) {
    this.log.info(`HTTP GET "${url}"`);
    const response = await fetch(url);
    return response.json() as Promise<T>;
  }
}
```

</monaco-editor>

---

### 📣 Declare dependencies

- InversifyJS uses `@inject("token")` decorator.
  - <!-- .element class="no-list" --> <span class="list-style-icon"><img src="/img/mirror.png"></span> It relies on <a href="https://www.npmjs.com/package/reflect-metadata" target="_blank"><code>reflect-metadata</code></a>
- Angular uses the TypeScript types
  - <!-- .element class="no-list" --> <span class="list-style-icon">🙈</span> Erased at runtime.

<!-- .element class="no-list" -->

We can't use these methods for our solution

<!-- .element class="fragment" -->

---

### A static `inject` property

Declare the _tokens_ as strings in an `inject` property.

<monaco-editor editor-height="400">

```ts
class PhotoService {
  constructor(private http: HttpClient, private log: Logger) {}
  static inject = ['http', 'logger'];
}

PhotoService.inject;
```

</monaco-editor>

`inject` here is a generic `string[]`

<!-- .element class="fragment" -->

---

<!-- .slide: data-no-zoom -->

### Introducing: 🕵️‍ Literal types in a tuple

We can solve this by being explicit.

<monaco-editor editor-height="300">

```ts
export class PhotoService {
  constructor(private http: HttpClient, private log: Logger) {}
  public static inject: ['httpClient', 'logger'] = ['httpClient', 'logger'];
}
PhotoService.inject;
```

</monaco-editor>

Even better is a `as const` assertion.

<!-- .element class="fragment" data-fragment-index="1" -->

<monaco-editor editor-height="300">

```ts
export class PhotoService {
  constructor(private http: HttpClient, private log: Logger) {}
  public static inject = ['httpClient', 'logger'] as const;
}
PhotoService.inject;
```

</monaco-editor>

<!-- .element class="fragment" data-fragment-index="1" -->

`as const` means: "Take whatever this is literally"

<!-- .element class="fragment" data-fragment-index="2" -->

---

### Todo list

1. <i class="list-style-icon">✅</i> Declare dependencies.
1. <i class="list-style-icon">🟦</i> Correlate those types to parameters.
1. <i class="list-style-icon">🟦</i> Put it all together in a container.

<!-- .element class="no-list" -->

---

### Static interface

Let's start with defining the _static interface_ of a class.

<monaco-editor editor-height="600">

```ts
interface Injectable {
  new (...args: any): any;
  inject: readonly string[];
}

class PhotoService {
  constructor(http: HttpClient, log: Logger) {}
  static inject = ['httpClient', 'logger'] as const;
}

const PhotoServiceStatic: Injectable = PhotoService;
```

</monaco-editor>

🤔 We want to correlate _tokens_ and _types_, somehow.

<!-- .element class="fragment" -->

---

### Introducing: 🗃️ A lookup type

A _lookup type_ that represents the dependencies.

<monaco-editor type="script" editor-height="200">

```ts
interface Context {
  httpClient: HttpClient;
  logger: Logger;
}
```

</monaco-editor>

The keys are the _tokens_, the values are _types_.

<!-- .element class="fragment" data-fragment-index="0" -->

```ts
let log: Logger;
// 👆👇 Equivalent
let log: Context['logger'];
```

<!-- .element class="fragment" data-fragment-index="0" -->

---

### 🔐 Introducing: `keyof` type operator

We can use `keyof` to improve our static interface.

```ts
let token: 'logger' | 'httpClient';
// 👆👇 Equivalent
let token: keyof Context;
```

Use this in the static interface.

<!-- .element class="fragment" data-fragment-index="1" -->

<monaco-editor class="fragment" data-fragment-index="1" editor-height="500">

```ts
interface Injectable {
  new (...arg: Context[keyof Context][]): any;
  inject: readonly (keyof Context)[];
}
class PhotoService {
  constructor(http: HttpClient, log: Logger) {}
  static inject = ['httpClient', 'logger'] as const;
}
const PhotoServiceStatic: Injectable = PhotoService;
```

</monaco-editor>

🤔 Now for the actual correlation...

<!-- .element class="fragment" -->

---

### Introducing: 🛠️ Generic types

Correlation can be accomplished using a generic type.

<monaco-editor editor-height="700">

```ts
interface Injectable<Token extends keyof Context> {
  //                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~
  new (arg: Context[Token]): any;
  //                ~~~~~
  inject: readonly [Token];
  //                ~~~~~
}

class PhotoService {
  constructor(http: HttpClient) {}
  static inject = ['httpClient'] as const;
}

const PhotoServiceStatic: Injectable<'httpClient'> = PhotoService;
```

</monaco-editor>

`Token` here is like a _variable, but in TypeScript_

<!-- .element class="fragment" -->

---

### A second param

🤔 What about additional parameters...

<monaco-editor editor-height="700">

```ts
interface Injectable2<
  Token extends keyof Context,
  Token2 extends keyof Context
> {
  new (arg: Context[Token], arg2: Context[Token2]): any;
  inject: readonly [Token, Token2];
}
class PhotoService {
  constructor(http: HttpClient, log: Logger) {}
  static inject = ['httpClient', 'logger'] as const;
}

const PhotoServiceStatic: Injectable2<'httpClient', 'logger'> = PhotoService;
```

</monaco-editor>

---

### Introducing: 🛌 Rest parameters with tuple types

Using `extends (keyof Context)[]`, we declare our type variable to be a _tuple type_

```ts [1-500]
interface Injectable<Tokens extends (keyof Context)[], R> {
  //                        ~~~~~~~~~~~~~~~~~~~~~~~
  new (...args: CorrespondingTypes<Tokens>): R;
  //   ~~~
  inject: Tokens;
  //      ~~~~~~
}
```

🤔 What does `CorrespondingTypes` look like

<!-- .element class="fragment" -->

---

### Introducing: 🔀 Conditional mapped tuple types

<monaco-editor editor-height="300">

```ts
type CorrespondingTypes<Tokens extends (keyof Context)[]> = {
  [I in keyof Tokens]: Tokens[I] extends keyof Context
    ? Context[Tokens[I]]
    : never;
};
```

</monaco-editor>
