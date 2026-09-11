// @ts-check
const marginLeft = 20;
const marginRight = 10;
const template = document.createElement("template");
template.innerHTML = `
<style>
  :host {
      text-align: left;
  }
  :host(.sm) {
      font-size: .7em;
  }
  .the-list > li {
    list-style: none;
  }
  .the-list > li:before {
    font-family: 'Consolas';
  }
  .the-list {
    display: inline-block;
  }
</style>
<style class="list-style">
</style>
<ul class="the-list">
</ul>
`;

customElements.define(
  "emoji-list",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      /**
       * @type {HTMLUListElement}
       */
      this.list = this.shadowRoot.querySelector("ul");
    }

    displayed = () => {
      if (this.closest("section.present")) {
        console.log('rerender', this.items);
        // This emoji list is displayed, or about to be.
        // Call render again, because the width of the emojis can now be calculated
        this.render();
      }
    };

    connectedCallback() {
      Reveal.on("slidechanged", this.displayed);

      // Select list items from light DOM
      const lightUL = [...this.childNodes].find(
        (childNode) => childNode.nodeName.toLocaleLowerCase() === "ul"
      );
      if (!lightUL) {
        console.warn("No <ul> found in <emoji-list>'s child nodes");
        return;
      }
      const lis = [...lightUL.childNodes].filter(
        (childNode) => childNode.nodeType === Node.ELEMENT_NODE
      );

      // Extract emoji's and build the css and list items
      this.items = lis.map((li) => {
        const textContent = li.innerText.trim();
        const emojiEndIndex = textContent.indexOf(" ");
        const emoji = textContent.substring(0, emojiEndIndex);
        const html = li.innerHTML.trim().substr(emojiEndIndex).trim();
        return {
          emoji,
          html,
        };
      });
      this.render();
    }

    disconnectedCallback() {
      Reveal.off("slidechanged", this.displayed);
    }

    render() {
      const items = this.items.map(({ emoji, html }) => ({
        emojiWidth: this.calculateWidth(emoji),
        emoji,
        html,
      }))
      const maxEmojiWidth = items.reduce(
        (currentMaxWidth, { emojiWidth }) =>
          currentMaxWidth > emojiWidth ? currentMaxWidth : emojiWidth,
        0
      );
      const itemsHTMLAndStyle = items.map(
        ({ emojiWidth, emoji, html }, index) => {
          const additionalMargin = (maxEmojiWidth - emojiWidth) / 2;
          const cssClass = `item${index}`;
          return [
            `<li class="${cssClass}">${html}</li>`,
            `li.${cssClass}:before { content: '${emoji}'; margin-left: -${
              marginLeft - additionalMargin
            }px; margin-right: ${marginRight + additionalMargin}px; }`,
          ];
        }
      );

      // Append style
      const style = this.shadowRoot.querySelector("style.list-style");
      style.innerHTML = itemsHTMLAndStyle.map(([, css]) => css).join("\n");

      // Fill list
      const ul = this.shadowRoot.querySelector("ul.the-list");
      ul.innerHTML = itemsHTMLAndStyle.map(([html]) => html).join("\n");
    }

    calculateWidth(emoji) {
      const span = document.createElement("span");
      span.innerText = emoji;
      this.shadowRoot.appendChild(span);
      const width = span.offsetWidth;
      span.remove();
      return width;
    }
  }
);
