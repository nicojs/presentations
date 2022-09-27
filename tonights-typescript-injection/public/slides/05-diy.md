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
1. <!-- .element class="fragment" --> <i class="list-style-icon">🎎</i> Correlate tokens to types.
1. <!-- .element class="fragment" --> <i class="list-style-icon">🎁</i> Put it all together in a container.

---

<!-- .slide: data-no-zoom -->

### 👨‍👩‍👦 Introducing the dependencies

<monaco-editor editor-height="700" file-name="dependencies.ts" show-file-name>

```ts
export interface Logger {
  info(message: string): void;
}
export const logger: Logger = console;

export class HttpClient {
  constructor(private log: Logger) {}
  async get<T>(url: string) {
    this.log.info(`HTTP GET "${url}"`);
    const response = await fetch(url);
    return response.json() as Promise<T>;
  }
}
```

</monaco-editor>

Use these in the `PhotoService`

<!-- .element class="fragment" data-fragment-index="1" -->

<monaco-editor class="fragment" data-fragment-index="1" editor-height="300" file-name="first-example.ts">

```ts
import { HttpClient, Logger } from './dependencies';

class PhotoService {
  constructor(public http: HttpClient, public log: Logger) {}
}
```

</monaco-editor>

---

### 📣 Declare dependencies

---

#### Unusable

- <i class="list-style-icon"><img src="/img/inversify.png"></i>`@inject("token")` decorator.
  - <!-- .element class="no-list" --> <span class="list-style-icon">❌</span> No <a href="https://www.npmjs.com/package/reflect-metadata" target="_blank"><code>reflect-metadata</code></a>
- <i class="list-style-icon"><img src="/img/angular.png"></i>TS types
  - <!-- .element class="no-list" --> <span class="list-style-icon">❌</span> No custom compiler.

<!-- .element class="no-list" -->

💡 A static `inject` property?

<!-- .element class="fragment" -->

---

### A static `inject` property

Declare the _tokens_ as strings in an `inject` property.

<monaco-editor editor-height="400">

```ts
import { HttpClient, Logger } from './dependencies';

class PhotoService {
  constructor(private http: HttpClient, private log: Logger) {}
  static inject = ['http', 'logger'];
}

PhotoService.inject;
```

</monaco-editor>

A generic `string[]`, not useful for TypeScript.

<!-- .element class="fragment" -->

---

<!-- .slide: data-no-zoom -->

### Introducing: 🕵️‍ Literal types in a tuple

We can solve this by being explicit.

<monaco-editor reveal-line="3" editor-height="250">

```ts
import { HttpClient, Logger } from './dependencies';

export class PhotoService {
  constructor(private http: HttpClient, private log: Logger) {}
  static inject: ['httpClient', 'logger'] = ['httpClient', 'logger'];
}
PhotoService.inject;
```

</monaco-editor>

- ✅ `as const`
  - ✅ No repetition <!-- .element class="no-list" -->  
  - ✅ Marked as readonly <!-- .element class="no-list" -->  
  
<!-- .element class="no-list fragment" -->

---

### Todo list

1. <i class="list-style-icon">✅</i> Declare dependencies.
1. <i class="list-style-icon">🟦</i> Correlate tokens to types.
1. <i class="list-style-icon">🟦</i> Put it all together in a container.

<!-- .element class="no-list" -->

---

### Static interface

Let's start with defining a type of an `Injectable` class.

<monaco-editor editor-height="650">

```ts
import { HttpClient, Logger } from './dependencies';

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

<monaco-editor file-name="context.ts" show-file-name editor-height="500">

```ts
import { HttpClient, Logger } from './dependencies';

export interface Context {
  httpClient: HttpClient;
  logger: Logger;
}
```

</monaco-editor>

The keys are the _tokens_, the values are _types_.

---

### 🔐 Introducing: `keyof` type operator

We can use `keyof` to improve our `Injectable`.

```ts
let token: 'logger' | 'httpClient';
// 👆👇 Equivalent
let token: keyof Context;
```

Use this in the static interface.

<!-- .element class="fragment" data-fragment-index="1" -->

<monaco-editor reveal-line="5" class="fragment" data-fragment-index="1" editor-height="450">

```ts
import { HttpClient, Logger } from './dependencies';
import { Context } from './context';

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

<monaco-editor reveal-line="4" editor-height="700">

```ts
import { HttpClient } from './dependencies';
import { Context } from './context';

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

<monaco-editor reveal-line="4" editor-height="700">

```ts
import { HttpClient, Logger } from './dependencies';
import { Context } from './context';

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

Each additional parameter needs a new `InjectableN`

---

### Introducing: 🛌 Rest parameters with tuple types

We can declare generic tuple types.

<monaco-editor reveal-line="5" editor-height="550">

```ts
import { Context } from './context';
import { CorrespondingTypes } from './corresponding-types';
import { HttpClient, Logger } from './dependencies';

interface Injectable<Tokens extends (keyof Context)[]> {
  //                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  new (...args: CorrespondingTypes<Tokens>): any;
  inject: Readonly<Tokens>;
}

class PhotoService {
  constructor(http: HttpClient, log: Logger) {}
  static inject = ['httpClient', 'logger'] as const;
}
const PhotoServiceStatic: Injectable<['httpClient', 'logger']> = PhotoService;
```

</monaco-editor>

✅ Valid `Tokens`: `['httpClient', 'logger]`

🤔 What does `CorrespondingTypes` look like

<!-- .element class="fragment" -->

---

### Introducing: 🔀 Conditional mapped tuple types

The `CorrespondingTypes` mapped type.

<monaco-editor reveal-line="4" editor-height="450" file-name="corresponding-types.ts">

```ts
import { HttpClient, Logger } from './dependencies';
import { Context } from './context';

type CorrespondingTypes<Tokens extends readonly (keyof Context)[]> = {
  [I in keyof Tokens]: Tokens[I] extends keyof Context
    ? Context[Tokens[I]]
    : never;
};

let a: CorrespondingTypes<['httpClient', 'logger']>;
// 👆👇 Equivalent
let b: [HttpClient, Logger];
```

</monaco-editor>

It maps _tokens_ to their _type_ counter parts.

---

### Todo list

We're on track!

1. <i class="list-style-icon">✅</i> Declare dependencies.
1. <i class="list-style-icon">✅</i> Correlate to types.
1. <i class="list-style-icon">🟦</i> Put it all together in a container.

<!-- .element class="no-list" -->

---

### The current app

<monaco-editor editor-height="1000" file-name="app.ts" show-file-name>

```ts
export interface Logger {
  info(message: string): void;
}
export const logger: Logger = console;

export class HttpClient {
  constructor(private log: Logger) {}
  static inject = ['logger'] as const;
  async get<T>(url: string) {
    this.log.info(`HTTP GET "${url}"`);
    const response = await fetch(url);
    return response.json() as Promise<T>;
  }
}

export class PhotoService {
  constructor(public http: HttpClient, public log: Logger) {}
  static inject = ['httpClient', 'logger'] as const;
}
```

</monaco-editor>

---

### The container type

Let's call our container 💉 an `Injector`

<monaco-editor reveal-line="4" editor-height="550">

```ts
import { PhotoService } from './app';
import { Context } from './context';

class Injector {
  inject<Tokens extends readonly (keyof Context)[], R>(
    Injectable: Injectable<Tokens, R>
  ): R {
    const args = [] as any;
    // Implementation is out of scope for tonight 🌛
    return new Injectable(...args);
  }
}
const injector = new Injector();
const photoService = injector.inject(PhotoService);

interface Injectable<Tokens extends readonly (keyof Context)[], R> {
  new (...args: CorrespondingTypes<Tokens>): R;
  inject: Tokens;
}
```

</monaco-editor>

We done for the night?

<!-- .element class="fragment" -->

---

### The context

Remember our `Context` mapped type?

```ts
interface Context {
  httpClient: HttpClient;
  logger: Logger;
}
```

What about it?

---

![](/img/memes/bond.webp) <!-- .element class="meme" -->

---

### Making it dynamic

What we really want is an API like this:

```ts
const appInjector = new Injector()
  .provideValue('logger', logger)
  .provideClass('httpClient', HttpClient);
```

Each `provideXXX` call should _expand_ the DI container with a new injectable.

```ts
const photoService = appInjector.inject(PhotoService);
```

<!-- .element class="fragment" data-fragment-index="0" -->

So we can inject our `PhotoService`

<!-- .element class="fragment" data-fragment-index="0" -->

---

### Get rid of `Context`!

Introduce the context as another generic `TContext`

<monaco-editor editor-height="900" file-name="injectable.ts" show-file-name>

```ts
export interface Injectable<
  TContext,
  Tokens extends readonly (keyof TContext)[],
  R
> {
  new (...args: CorrespondingTypes<TContext, Tokens>): R;
  inject: Tokens;
}

export type CorrespondingTypes<
  TContext,
  Tokens extends readonly (keyof TContext)[]
> = {
  [Token in keyof Tokens]: Tokens[Token] extends keyof TContext
    ? TContext[Tokens[Token]]
    : never;
};
```

</monaco-editor>

---

### Using it

And use that in the injector

<monaco-editor editor-height="500">

```ts
import { Injectable } from './injectable';

class Injector<TContext = {}> {
  //           ^^^^^^^^
  inject<Tokens extends readonly (keyof TContext)[], R>(
    injectable: Injectable<TContext, Tokens, R>
  ): R {
    return /* out of scope */;
  }
}
```

</monaco-editor>

🤔 How do we _expand_ `TContext` with `provideValue`?

<!-- .element class="fragment" -->

---

### Introducing: 🚦 Intersection types

Combine types with `&`.

<monaco-editor reveal-line="3" editor-height="50">

```ts
import { HttpClient, Logger } from './dependencies';

type Context = {} & { httpClient: HttpClient } & { logger: Logger };
```

</monaco-editor>

This way we can construct the context along the way.

<!-- .element class="fragment" data-fragment-index="1" -->

<monaco-editor reveal-line="3" editor-height="550" class="fragment" data-fragment-index="1">

```ts
import { HttpClient, logger } from './dependencies';

function provideStuff<TContext, Token extends string, TStuff>(
  context: TContext,
  token: Token,
  stuff: TStuff
): TContext & { [K in Token]: TStuff } {
  return { ...context, [token]: stuff } as any;
}

const ctx = {};
const ctx2 = provideStuff(ctx, 'logger', logger);
const ctx3 = provideStuff(ctx2, 'httpClient', new HttpClient(logger));
```

</monaco-editor>

---

### Putting it all together 🎉

<monaco-editor reveal-line="4" editor-height="1200" file-name="injector.ts" show-file-name>

```ts
import { Injectable } from './injectable';

export class Injector<TContext = {}> {
  provideValue<Token extends string, R>(
    token: Token,
    value: R
  ): Injector<{ [K in Token]: R } & TContext> {
    return /* out of scope */;
  }

  provideClass<
    Token extends string,
    R,
    Tokens extends readonly (keyof TContext)[]
  >(
    token: Token,
    Class: Injectable<TContext, Tokens, R>
  ): Injector<{ [K in Token]: R } & TContext> {
    return; /* out of scope */
  }

  inject<Tokens extends readonly (keyof TContext)[], R>(
    injectable: Injectable<TContext, Tokens, R>
  ): R {
    return /* out of scope */;
  }
}
```

</monaco-editor>

---

### Todo list

1. <i class="list-style-icon">✅</i> Declare dependencies.
1. <i class="list-style-icon">✅</i> Correlate tokens to types.
1. <i class="list-style-icon">✅</i> Put it all together in a container.

---


### The result

<monaco-editor editor-height="900">

```ts
import { Injector } from './injector';
import { HttpClient, Logger } from './app';

class PhotoService {
  constructor(private http: HttpClient, private log: Logger) {}
  static inject = ['http', 'logger'] as const;
}

const injector = new Injector()
  .provideValue('logger', console)
  .provideClass('http', HttpClient);
const photoService = injector.inject(PhotoService);
```

</monaco-editor>

---

![](/img/memes/mind.webp) <!-- .element class="meme" -->

---

### Shameless plug

Its ready to use: [💉 typed-inject](https://github.com/nicojs/typed-inject#typed-inject) <!-- .element target="_blank" -->
