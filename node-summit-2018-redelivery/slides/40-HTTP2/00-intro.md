# NodeJS and HTTP2

---
### Talk by
- James Snell
- Node Summit 2018  
HTTP/2 in Node.JS core
- https://vimeo.com/287730172


---
### What is HTTP/2
Key characteristics

<img style="height:30vh" src="./img/http2.jpg" />

- Binary Protocol
- Multiplexing


- Header Compression
- Server Push  

---
### Hello HTTP/2
```js
 const http2 = require('http2')
 const server = http2.createServer();

  server.on('stream', (stream, headers) => {
	stream.respond({':status': 200})
	stream.write('hello world')
    stream.end()
  })
  server.listen(3000)
```
---
### But....

This does not work

---
### HTTP/2 requires TLS
```js
var fs = require('fs');
var http = require('http2');
const server = http.createSecureServer({
    key:fs.readFileSync('./server.key'),
    cert:fs.readFileSync('./server.cert')
});
server.on('stream', (stream, headers) => {
    // meta headers starts with a colon (:)
    stream.respond({ ':status': 200 });
    // there is also stream.respondWithFile()
    // and stream.pushStream()
    stream.end('Hello World!');
});
server.listen(3000);
```

```
openssl req -new -out server.csr -keyout server.key
```

---
<!-- .slide: data-background="url('/img/demo.jpg')" data-background-size="cover" --> 
<!-- .slide: class="lab" -->
## Demo time!
http2 server

---
### Useable now using 
core apis or frameworks
- Fastify
- Restify
- Hapi
- more..

```
npm install fastify/restify/hapi --save
```

---

### Usage in Fastify
```js
const fs      = require('fs')
const path    = require('path')
const fastify = require('fastify')({
  http2: true, 
    https: {
    key: fs.readFileSync('server.key')
    cert: fs.readFileSync('server.cert')
  }
})	
    
fastify.get('/', function(request, reply){
	reply.code(200, send( { hello:'world' })
})
fastify.listen(3000);
```


---
### Performance
Benchmark http1 vs http2
```js
const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
    fs.createReadStream('./alice.html').pipe(response)
})
server.listen(8889)
```
vs 
```js
const http2 = require('http2')
const server = http2.createServer()
server.on('stream', (stream) => {
    stream.respondWithFile('./alice.html')
})
server.listen(8888);
```

 <small>* respondWithFile does everything at the native layer => significantly faster..</small>

---
### Setup

```
h2load -n 20000 -c 8 -t 8 -m 500 https://...
```

Command-line to perform benchmark to URI https://localhost

* 20000 requests
* 8 concurrent clients 
* 8 native threads 
* 500 max concurrent streams

---
### Results
	
- http1
    - 2700 request per second, 1.47 MB header data, 342ms time to 1st byte, time for request 1.37s, 
- http2
    - 5666 request per second, 196 KB header data, 143ms time to 1st byte, time for request 140ms, 

Caveat: http2 uses more memory because of more buffering with multiplexing...

---
### What about web sockets?  
- No web sockets with http2 (upgrade header does not exists in http2)

but

- We can build support for http/2, http/1 and websockets in a single server

---
### Server with http/2, http/1 and Websockets
```js
const http2 = require('http2')
const fs = require('fs')
const ws = require('ws')

// start compatibility mode
const server = http2.createSecureServer({ key:.., cert:..., allowHTTP1:true })
server.on('request', (req, res) => { res.end('ok') })

const wss = new ws.Server({ server })
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('received: %s', message)
    })
    ws.send('something')
})
server.listen(8443)
```

<!-- .element style="font-size: .4em" -->

<small>* relatively heavy workload for single node server, not a good practise, but surely fun to experiment </small>

---

### Other fun options
- Server sent events
    - open channel from server, push data
    - like long polling in http/1
    - http/2 uses a single stream
- Server pushed streams 
    - works nicely for non browser-clients
- create proxy tunnels using connect
    - use one stream for multiple proxy connections
    
---
### Server sent events
```js
const { createSecureServer } = require('http2')
const pem = require('https-pem')
const { finished } = require('stream')
const server = createSecureServer(pem, (req, res) => {
    if (req.url === "/") {
        res.end(`<html><script>
            new EventSource('/time').addEventListener('message', (result) => {
                document.querySelector('#time').innerHTML += ('<li>' + result.data + '</li>');
            });</script><body>Hello server sent events<ul id="time"></ul></body></html>
        `);
        return 
    } else if (req.url === '/time') {
        res.setHeader('content-type', 'text/event-stream')
        const interval = setInterval(() => { res.write(`event time\ndata:${new Date().toISOString()}\n\n`)}, 1000)
        finished(res, () => { clearInterval(interval)})
        return 
    }
    res.statusCode = 404;
    res.end('not found')
})
server.listen(8083);
```

<!-- .element style="font-size: .33em" -->

---
<!-- .slide: data-background="url('/img/demo.jpg')" data-background-size="cover" --> 
<!-- .slide: class="lab" -->
## Demo time!
http2 server sent events

---
### Server pushed streams
```js
const http2 = require('http2')
const client = http2.connect('https://localhost:8888')
const req = client.request()

client.on('stream', (stream, requestHeaders) => {
    stream.on('push', (responseHeaders) => { /* */}))
    stream.on('data', (chunk)  => { /* */ }))
    stream.on('end', () => { /* */ }))
})
req.resume()
```

---
<!-- .slide: data-background="url('/img/demo.jpg')" data-background-size="cover" --> 
<!-- .slide: class="lab" -->
## Demo time!
server push streams

---
### Debugging 
- tools arent great, yet!
- wireshark can be used
- client nghttp2 -v (verbose)
- server side
    - NODE_DEBUG=http2
    - NODE_DEBUG_NATIVE=http2
- VSCode and Chrome Devtools debuggers
- node trace-event-categories node.async_hooks

---
<!-- .slide: data-background="url('/img/demo.jpg')" data-background-size="cover" --> 
<!-- .slide: class="lab" -->
## Demo time!
Setting environment variables

---
### Call for action
- use it, report your feedback!




