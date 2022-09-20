## 📦 Frameworks

---

### What is a DI framework?

A DI framework _automates_ the _creation_ of your _dependencies_.

<div class="flex">

<!-- prettier-ignore-start -->

```ts
// Without DI container

const movies = new MovieService(
  new HttpClient(logger));
movies.getAll();
```

<!-- prettier-ignore-end -->

```ts
// With DI container

const di = new Container();

// ✨ Insert magic here

const movies = di.create(MovieService);
movies.getAll();
```

<!-- .element class="fragment" -->

</div>

---

### DI Containers in the wild

- <img class="list-style-icon" src="/img/angular.svg"> Angular
- <span class="list-style-icon"><img src="/img/inversify.png"></span> InversifyJS

<!-- .element class="no-list" -->

---

### ![](/img/angular.svg) Angular

```ts
@Injectable()
export class MovieService {
  constructor(private http: HttpClient) {}
}

@Component({ selector: 'my-movies' })
export class MoviesComponent {
  constructor(private movies: MovieService) {}
}
```


- <!-- .element class="fragment" data-fragment-index="0" --> <i class="list-style-icon">👍</i>
  Type safety
- <!-- .element class="fragment" data-fragment-index="1" -->
  <i class="list-style-icon">👎</i> Build into Angular itself
- <!-- .element class="fragment" data-fragment-index="1" -->
  <i class="list-style-icon">👎</i> Requires the Angular compiler

<!-- .element class="no-list" -->

---

### ![](/img/inversify.png) InversifyJS

```ts
interface Logger {
  info(message: string): void;
}
const logger: Logger = {
  info(message: string) {
    console.log(message);
  },
};

@injectable()
class PhotoService {
  constructor(@inject('logger') private log: Logger) {}
  async getAll(): Promise<Photo[]> {
    this.log.info(`HTTP Get /photos`);
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    return response.json() as Promise<Photo[]>;
  }
}

const context = new Container();
context.bind('logger').toConstantValue(logger);
context.bind(PhotoService).toSelf();
context
  .get(PhotoService)
  .getAll()
  .then((photos) => console.log(`${photos.length} photos`));
```

<!-- .element class="xxs" -->

---

### ![](/img/inversify.png) The good and the bad

- <!-- .element class="fragment" data-fragment-index="0" -->
  <i class="list-style-icon">👍</i> No custom compiler
- <!-- .element class="fragment" data-fragment-index="0" -->
  <i class="list-style-icon">👍</i> No framework requirement
- <!-- .element class="fragment" data-fragment-index="1" -->
  <i class="list-style-icon">👎</i> Requires:
  - `--experimentalDecorators`
  - `--emitDecoratorMetadata`
  - and [`reflect-metadata`](emitDecoratorMetadata) <!-- .element target="_blank" -->
- <!-- .element class="fragment" data-fragment-index="2" -->
  <i class="list-style-icon">👎</i> Is _not type-safe_

<!-- .element class="no-list" -->

---

### Not type-safe

Can you spot the bug?

```ts [0-50|12,5]
@injectable()
class PhotoService {
  constructor(@inject('logger') private log: Logger) {}
  async getAll(): Promise<Photo[]> {
    this.log.info(`HTTP Get /photos`);
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    return response.json() as Promise<Photo[]>;
  }
}

const context = new Container();
context.bind('logger').toConstantValue('logger');
context.bind(PhotoService).toSelf();
context
  .get(PhotoService)
  .getAll()
  .then((photos) => console.log(`${photos.length} photos`));
```

<!-- .element class="xs" -->

```shell
TypeError: this.log.info is not a function
```

<!-- .element class="fragment" -->