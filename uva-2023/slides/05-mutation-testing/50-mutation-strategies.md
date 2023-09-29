## Mutation strategies

How to place the mutations into the code

---

### Source code mutation

Generate mutants based on source code

[![](/img/source-code-mutation.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZmxvd2NoYXJ0IExSXG4gICAgbXV0YW50KFwi8J-RvVwiKSAtLT4gY29kZShTb3VyY2UgY29kZSlcbiAgICBjb2RlIC0tPiBjb21waWxlKENvbXBpbGUpXG4gICAgY29tcGlsZSAtLT4gbWFjaGluZShNYWNoaW5lIGNvZGUpXG4gICAgbWFjaGluZSAtLT4gdGVzdChSdW4gdGVzdHMpIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)

<emoji-list>

* ✅ Precise
* ✅ Easy
* ❌ Slow

</emoji-list>

<!-- .element class="fragment" -->

---

### Byte code mutation

Generate mutants based on compiled code

[![](/img/byte-code-mutation.svg)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoiZmxvd2NoYXJ0IExSXG4gICAgbXV0YW50KFwi8J-RvVwiKSAtLT4gY29kZShTb3VyY2UgY29kZSlcbiAgICBjb2RlIC0tPiBjb21waWxlKENvbXBpbGUpXG4gICAgY29tcGlsZSAtLT4gbWFjaGluZShNYWNoaW5lIGNvZGUpXG4gICAgbWFjaGluZSAtLT4gdGVzdChSdW4gdGVzdHMpIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)

<emoji-list>

* ✅ Fast...ish
* ❌ False positives
* ❌ Complicated

</emoji-list>

<!-- .element class="fragment" -->

---

### Mutant schemata

![](/img/mutant-schemata.png)

New kid on the block (1996)

---

### Mutant schemata process

Generate mutants based on source code, but compile once

![](/img/mutant-schemata-mutation.svg)


<emoji-list>

* ✅ Precise
* ✅ Fast
* 🟡 Complicated (but manageable)

</emoji-list>