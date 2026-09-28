

<div class="kc-columns kc-gap2" style="align-items: center;">

<div>

#### Which editor?

- IntelliJ
- VS Code
- NeoVim
- ...

</div>

<div>

##### Mutation server protocol (MSP)

</div>

<div>

#### Which framework?

- Stryker.NET?
- StrykerJS?
- PITest?
- ...

</div>

</div>

notes:

To solve this, we created the Mutation Server Protocol

---

[![](../../img/slides/20-protocol_image.png)](https://github.com/stryker-mutator/editor-plugins/tree/main/packages/mutation-server-protocol) <!-- .element target="_blank" -->

notes:

The Mutation Server Protocol (MSP) is inspired by the Language Server Protocol (LSP), and uses JSON-RPC 2.0.

Using this protocol, *any* mutation testing library can use our Editor Plugin!