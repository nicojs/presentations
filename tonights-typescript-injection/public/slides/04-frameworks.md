## 📦 Frameworks

---

### What is a DI framework?

A DI framework _automates_ the _creation_ of your _dependencies_.

<div class="flex">

<!-- prettier-ignore-start -->

```ts
// Without DI container

const photoService = new PhotoService(
  new HttpClient(logger));

photoService.getAll();
```


```ts
// With DI container

const di = new Container();

// ✨ Insert magic here

const photoService = 
  di.create(PhotoService);

photoService.getAll();
```

<!-- .element class="fragment" -->
<!-- prettier-ignore-end -->

</div>

---

### DI Containers in the wild

<div class="flex" style="justify-content: space-around">
<img src="/img/angular.png" style="max-height: 600px; width: unset"> 
<img src="/img/inversify.png" style="max-height: 600px; width: unset">
</div>

---

### ![](/img/angular.png) Angular

```ts [1-500|1,8]
@Injectable()
export class MovieService {
  constructor(private http: HttpClient) {}
}

@Component({ selector: 'my-movies' })
export class MoviesComponent {
  constructor(private movies: MovieService) {}
}
```

- <!-- .element class="fragment" --> <i class="list-style-icon">👍</i>
  Type safety
- <!-- .element class="fragment"  -->
  <i class="list-style-icon">👎</i> Built into Angular itself
- <!-- .element class="fragment" -->
  <i class="list-style-icon">👎</i> Requires the Angular compiler

<!-- .element class="no-list" -->

---

### ![](/img/inversify.png) InversifyJS

```ts [0-500|11-14,1,3]
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
const photoService = context.get(PhotoService);
photoService.getAll();
```

<!-- .element class="xs" -->

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
context.get(PhotoService).getAll();
```

<!-- .element class="xs" -->

```shell
TypeError: this.log.info is not a function
```

<!-- .element class="fragment" -->

---

### What we want

- <i class="list-style-icon">👍</i> No custom compiler
- <i class="list-style-icon">👍</i> No framework requirement
- <i class="list-style-icon">👍</i> No `--experimentalXXX` or `reflect-metadata`
- <i class="list-style-icon">👍</i> Type safe!

<!-- .element class="no-list" -->
