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

### Unusable

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

<monaco-editor editor-height="255">

```ts
export class PhotoService {
  constructor(private http: HttpClient, private log: Logger) {}
  static inject: ['http', 'logger'] = ['http', 'logger'];
}
PhotoService.inject;

import { HttpClient, Logger } from './dependencies';
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
  static inject = ['http', 'logger'] as const;
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
  http: HttpClient;
  logger: Logger;
}
```

</monaco-editor>

The keys are the _tokens_, the values are _types_.

---

### 🔐 Introducing: `keyof` type operator

We can use `keyof` to improve our `Injectable`.

```ts
let token: 'logger' | 'http';
// 👆👇 Equivalent
let token: keyof Context;
```

Use this in the static interface.

<!-- .element class="fragment" data-fragment-index="1" -->

<monaco-editor class="fragment" data-fragment-index="1" editor-height="450">

```ts
interface Injectable {
  new (...arg: Context[keyof Context][]): any;
  inject: readonly (keyof Context)[];
}
class PhotoService {
  constructor(http: HttpClient, log: Logger) {}
  static inject = ['http', 'logger'] as const;
}
const PhotoServiceStatic: Injectable = PhotoService;

import { HttpClient, Logger } from './dependencies';
import { Context } from './context';
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
  static inject = ['http'] as const;
}

const PhotoServiceStatic: Injectable<'http'> = PhotoService;

import { HttpClient } from './dependencies';
import { Context } from './context';
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
  static inject = ['http', 'logger'] as const;
}

const PhotoServiceStatic: Injectable2<'http', 'logger'> = PhotoService;

import { HttpClient, Logger } from './dependencies';
import { Context } from './context';
```

</monaco-editor>

Each additional parameter needs a new `InjectableN`

---

### Introducing: 🛌 Rest parameters with tuple types

We can declare generic tuple types.

<monaco-editor editor-height="550">

```ts
interface Injectable<Tokens extends (keyof Context)[]> {
  //                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  new (...args: CorrespondingTypes<Tokens>): any;
  inject: Readonly<Tokens>;
}

class PhotoService {
  constructor(http: HttpClient, log: Logger) {}
  static inject = ['http', 'logger'] as const;
}
const PhotoServiceStatic: Injectable<['http', 'logger']> = PhotoService;

import { Context } from './context';
import { CorrespondingTypes } from './corresponding-types';
import { HttpClient, Logger } from './dependencies';
```

</monaco-editor>

✅ Valid `Tokens`: `['http', 'logger]`

🤔 What does `CorrespondingTypes` look like

<!-- .element class="fragment" -->

---

### Introducing: 🔀 Conditional mapped tuple types

The `CorrespondingTypes` mapped type.

<monaco-editor editor-height="450" file-name="corresponding-types.ts">

```ts
export type CorrespondingTypes<Tokens extends readonly (keyof Context)[]> = {
  [I in keyof Tokens]: Tokens[I] extends keyof Context
    ? Context[Tokens[I]]
    : never;
};

let a: CorrespondingTypes<['http', 'logger']>;
// 👆👇 Equivalent
let b: [HttpClient, Logger];

import { HttpClient, Logger } from './dependencies';
import { Context } from './context';
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
  static inject = ['http', 'logger'] as const;
}
```

</monaco-editor>

---

### The container type

Let's call our container 💉 an `Injector`

<monaco-editor editor-height="600">

```ts
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

import { PhotoService } from './app';
import { Context } from './context';
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
  .provideClass('http', HttpClient);
```

Each `provideXXX` _expands_ the DI container.

```ts
const photoService = appInjector.inject(PhotoService);
```

So we can inject our `PhotoService`

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

<monaco-editor editor-height="400">

```ts
class Injector<TContext = {}> {
  //           ^^^^^^^^
  inject<Tokens extends readonly (keyof TContext)[], R>(
    injectable: Injectable<TContext, Tokens, R>
  ): R {
    return /* out of scope */;
  }
}

import { Injectable } from './injectable';
```

</monaco-editor>

🤔 How do we _expand_ `TContext` with `provideValue`?

<!-- .element class="fragment" -->

---

### Introducing: 🚦 Intersection types

Combine types with `&`.

<monaco-editor editor-height="50">

```ts
type Context = {} & { httpClient: HttpClient } & { logger: Logger };

import { HttpClient, Logger } from './dependencies';
```

</monaco-editor>

This way we can construct the context along the way.

<!-- .element class="fragment" data-fragment-index="1" -->

<monaco-editor editor-height="550" class="fragment" data-fragment-index="1">

```ts
function provideStuff<TContext, Token extends string, TStuff>(
  context: TContext,
  token: Token,
  stuff: TStuff
): TContext & { [K in Token]: TStuff } {
  return { ...context, [token]: stuff } as any;
}

const ctx = {};
const ctx2 = provideStuff(ctx, 'logger', logger);
const ctx3 = provideStuff(ctx2, 'http', new HttpClient(logger));

import { HttpClient, logger } from './dependencies';
```

</monaco-editor>

---

### Putting it all together 🎉

<monaco-editor editor-height="1200" file-name="injector.ts" show-file-name>

```ts
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

import { Injectable } from './injectable';
```

</monaco-editor>

---

### Todo list

1. <i class="list-style-icon">✅</i> Declare dependencies.
1. <i class="list-style-icon">✅</i> Correlate tokens to types.
1. <i class="list-style-icon">✅</i> Put it all together in a container.

<!-- .element class="no-list" -->

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

It's ready to use: [💉 typed-inject](https://github.com/nicojs/typed-inject#typed-inject) <!-- .element target="_blank" -->
