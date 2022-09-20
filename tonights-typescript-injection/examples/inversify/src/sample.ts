import 'reflect-metadata';
import fetch from 'node-fetch';
import { Container, injectable, inject } from 'inversify';

interface Photo {
  title: string;
  url: string;
}

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
