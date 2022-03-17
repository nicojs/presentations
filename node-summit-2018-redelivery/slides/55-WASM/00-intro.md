# NodeJS and WASM

---
### Talk by
- Jay Phelps, ThisDOT
- Node Summit 2018  
Webassembly demistified: What it means for Node.JS 
- https://vimeo.com/287730898

---
### What is WASM
- efficient low level bytecode (for the web)
- fast to send over the internet, fast to compile and parse 

<img src="./img/wasmstream.gif"/>
<p style="font-size:8px">source:https://hacks.mozilla.org/2018/01/making-webassembly-even-faster-firefoxs-new-streaming-and-tiering-compiler</p>

---
### Efficient
- efficient, low level bytecode
- instructions are bytes, binary thing
- mostly a compile target

<img style="height:30vh" src="./img/wasmbytes.png"/>

---
### Compile to WASM
- Language compilers 
    - C, C++, GO etc..
- S-Expressions
    - wabt (wat2wasm/wasm2wat)

---
<!-- .slide: data-background="url('/img/demo.jpg')" data-background-size="cover" --> 
<!-- .slide: class="lab" -->
## Demo time!
Hello WASM

---
### Is it going to kill JavaScript?
nope, gives you option
- javascript is a terrible compile target

<img style="height:20vh;border:1px solid black;" src="./img/array.jpg" />

---
### Will we compile JS to WASM?
- JS is extremely dynamic (prototypes ed)
- JS to WASM would actually be slower
- v1 MVP is best suited for c/c++ and Rust
- other languages are already supported
- more coming soon
    - Go, .Net, Java, OCaml etc

---
### When should you do it?
- Heavily CPU bound number computations

---
### You might use it already
- example (sourcemap) mozilla used by Babel, Less, Firefox DevTools
    - 10x speed improvement.
- alternative to writing Native/NAPI addons 
- KwonOJ -> ibsass-asm
    - compile upon installment
    - not portable to browser, WASM is.
- lots of other libs that use WASM
	
---
### NodeJS and WASM
- U can use Node as a portable, sandboxed VM to run WASM code 		
    - secure, no buffer overflow exploits 

---
### Step back to wasm binary code
- can be intimidating
- tooling eventually make it a non issue
- can be in a textual representation

---
### learn WASM
- stack machine language
    - push / pop
    - instructions are evaluated on a stack	
        -example 1 + 2  (0x6a) -> i32.add
- alternatively s-expressions (AST)

---
### Whats missing?
- WASM has no system call access, only call into javascript
- give WASM imports from JavaScript
    - fileaccess, websockets.. etc
- EMSCRIPTEN adds stdlib to WASM (compiles to WASM)
- Garbage collection necessary for better interop
    - you cant pass a JS object to WASM, 
    - we need to have access to the V8 GC
- Multi Threading
    - Workers for now
    - No messages passing but sharedarraybuffers
        - browsers have it disabled
        - maybe pthreads later, actual threads under the hood...
- advancing very quickly

---
### Does WASM replace N-API? 
- Nope to early what the effects are...
		
---
### How do you get started?
- webassembly.org
- awesome WASM
- supported in NodeJS starting v8.0.0 (older versions behing a flag)
- Supported in all modern browsers...

Revolution just beginning..
