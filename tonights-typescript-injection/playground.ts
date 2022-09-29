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
  static inject = ['logger'] as const;
}

const options = { port: 4200 };

class PhotoService {
  constructor(
    private http: HttpClient,
    private log: Logger,
    private port: number
  ) {}

  static inject = ['http', 'logger', 'options.port'] as const;

  async getAll(): Promise<Photo[]> {
    const photos = await this.http.get<Photo[]>(
      'https://jsonplaceholder.typicode.com/photos'
    );
    this.log.info(`Retrieved ${photos.length} photos`);
    return photos;
  }
}

export interface Injectable<
  TContext,
  Tokens extends readonly string[],
  R
> {
  new (...args: CorrespondingTypes<TContext, Tokens>): R;
  inject: Tokens;
}

export type CorrespondingTypes<TContext, Tokens extends readonly string[]> = {
  [Token in keyof Tokens]: CorrespondingType<TContext, Tokens[Token]>;
};

export type CorrespondingType<
  TContext,
  Token extends string
> = Token extends keyof TContext
  ? TContext[Token]
  : Head<Token> extends keyof TContext
  ? CorrespondingType<TContext[Head<Token>], Tail<Token>>
  : never;

type Head<Token extends string> = Token extends `${infer H}.${string}`
  ? H
  : Token;
type Tail<Token extends string> = Token extends `${string}.${infer T}`
  ? T
  : Token;

export class Injector<TContext = {}> {
  provideValue<Token extends string, R>(
    token: Token,
    value: R
  ): Injector<{ [K in Token]: R } & TContext> {
    return '' as any /* out of scope */;
  }

  provideClass<
    Token extends string,
    R,
    Tokens extends readonly (keyof TContext & string)[]
  >(
    token: Token,
    Class: Injectable<TContext, Tokens, R>
  ): Injector<{ [K in Token]: R } & TContext> {
    return '' as any; /* out of scope */
  }

  inject<Tokens extends readonly string[], R>(
    injectable: Injectable<TContext, Tokens, R>
  ): R {
    return '' as any;
  }
}

const injector = new Injector()
  .provideValue('logger', console)
  .provideClass('http', HttpClient)
  .provideValue('options', { port: 4200 });
const photoService = injector.inject(PhotoService);
