const http2 = require('http2')
var fs = require('fs');

const client = http2.connect('http://localhost:8888')
const req = client.request()
console.log('connecting...');
client.on('stream', (stream, requestHeaders) => {
    stream.on('push', (responseHeaders) => { console.log("responseHeaders", responseHeaders) })
    stream.on('data', (chunk)  => { console.log("chunk", chunk) })
    stream.on('end', () => { console.log("end") })
})
req.resume()

const client2 = http2.connect('http://localhost:8888')
const req2 = client2.request()
console.log('connecting...');
client2.on('stream', (stream, requestHeaders) => {
    stream.on('push', (responseHeaders) => { console.log("responseHeaders", responseHeaders) })
    stream.on('data', (chunk)  => { console.log("chunk", chunk) })
    stream.on('end', () => { console.log("end") })
})
req2.resume()

