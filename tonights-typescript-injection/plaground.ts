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

class PhotoService {
  constructor(private http: HttpClient, private log: Logger) {}

  static inject = ['http', 'logger'] as const;

  async getAll(): Promise<Photo[]> {
    const photos = await this.http.get<Photo[]>(
      'https://jsonplaceholder.typicode.com/photos'
    );
    this.log.info(`Retrieved ${photos.length} photos`);
    return photos;
  }
}


PhotoService.inject