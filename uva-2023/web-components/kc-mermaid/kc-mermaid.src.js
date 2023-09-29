// @ts-check
import mermaid from "mermaid";
import { toBase64 } from "js-base64";

const template = document.createElement("template");
template.innerHTML = `
<style>
  svg {
    max-height: 500px;
    line-height: 1;
  }
</style>
<a id="anchor" target="_blank">
    <div id="graph">
    
    </div>
</a>
`;

mermaid.initialize({ startOnLoad: false });

customElements.define(
  "kc-mermaid",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.graph = this.shadowRoot.querySelector("#graph");
      /**
       * @type {HTMLAnchorElement}
       */
      this.anchor = this.shadowRoot.querySelector("#anchor");
    }

    connectedCallback() {
      const diagramMarkdown = this.getDiagramMarkdown();
      this.anchor.href = mermaidEditorLink(diagramMarkdown);
      mermaid.render("graph", diagramMarkdown, (svg) => {
        this.graph.innerHTML = svg;
      });
    }

    getDiagramMarkdown() {
      const script = this.querySelector("script");
      if (script) {
        return script.innerHTML.trim();
      } else {
        const code = this.querySelector("pre>code");
        if (code) {
          return code.innerText.trim();
        }
        return this.innerText.trim();
      }
    }
  }
);

function mermaidEditorLink(graphText) {
  const mermaidState = {
    code: graphText,
    mermaid: '{\n  "theme": "default"\n}',
    updateEditor: true,
    autoSync: true,
    updateDiagram: true,
  };
  return `https://mermaid-js.github.io/mermaid-live-editor/edit/#${toBase64(
    JSON.stringify(mermaidState),
    true
  )}`;
}
