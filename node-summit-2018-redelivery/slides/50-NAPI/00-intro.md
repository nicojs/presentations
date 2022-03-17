# NodeJS and N-API

---
### Talk by
- Michael Dawson, IBM
- Node Summit 2018  
Building next generation add-on modules for Node.JS using N-Api
- https://vimeo.com/287707522


---
### What is N-API
Write c/c++ code to extend NodeJS
- problem! recompile upon each NodeJS version

---
### N-API is
- next generation addon modules for Node JS
- a stable Node API Layer for native modules
- compile once run every NodeJS 

---
<!-- .slide: data-background="url('/img/demo.jpg')" data-background-size="cover" --> 
<!-- .slide: class="lab" -->
## Demo time!
The problem and the solution

---
### Current Status
- exited experimental March 14, 2018
- back ported to 6.x and 8.x

---
### How do I use N-API
- C based API built in NodeJS
```
#include <node_api.h>
```

<p style="font-size:16px">
Examples: https://github.com/nodejs/node/tree/master/test/addons-napi</p>

---
<!-- .slide: data-background="url('/img/demo.jpg')" data-background-size="cover" --> 
<!-- .slide: class="lab" -->
## Demo time!
N-API Hello World

---
### What about NAN?
- NAN is a C++ add on technology
- NAN still uses underlying v8 types
- node-addon-api is successor 
    
---
### What is node-addon-api?
- Header only wrapper as npm module
- Provides C++ object model
- Easy transition from NAN
- Install addon node-addon-api

```
#include <napi.h>
```
<p style="font-size:16px">
Examples:https://github.com/nodejs/node-addon-examples </p>

---
<!-- .slide: data-background="url('/img/demo.jpg')" data-background-size="cover" --> 
<!-- .slide: class="lab" -->
## Demo time!
Node-addon-api Hello World

---
### Advanced concepts
Object Wrap ties JS object lifetime to C++ object instance 

Steps
- extend ObjectWrap
- define class
- return constructor
- create an instance/use from JS

<p style="font-size:16px">
Example:  https://github.com/nodejs/node-addon-examples/tree/master/6_object_wrap/node-addon-api</p>


---
### Advanced concepts
AsyncWorker creates background threaded worker  

Steps 
- create instance, call Queue()
- execute work in background thread
    - no N-api code in execute
    - set state on this
- OnOk() and OnError() on main thread
    - return value from here

<p style="font-size:16px">
Example: 
https://github.com/nodejs/node-addon-examples/blob/4dc85d816e6a1ef641be416b5397e1813960b403/async_pi_estimate/node-addon-api/async.cc</p>

---
### Conversion NAN to node-addon-api
- install node-addon-api
- tools folder has conversion.js
- 80% complete...
- changes code in place, so backup


---
### Call for action
- Get involved
    - documentation
    - testing
    - issue triage
    - porting modules




