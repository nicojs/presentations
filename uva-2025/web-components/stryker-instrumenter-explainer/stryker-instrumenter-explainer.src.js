// @ts-check
import hljsCss from "./hljs.css.js";
import css from "./stryker-instrumenter-explainer.css.js";
import { parseSync, traverse } from "@babel/core";
import generate from "@babel/generator";
import * as prettier from "prettier";
import * as estree from "prettier/plugins/estree.js";
import * as babel from "prettier/plugins/babel.js";
const plugins = [estree, babel];

const template = document.createElement("template");
template.innerHTML = `
<style>
  ${hljsCss}
  ${css}
</style>
<div class="container">
  <div class="row">
    <div class="text-xs">
      <div class="buttons">
        <button href="#" class="previous round">&#8249;</a>
        <button href="#" class="next round">&#8250;</a>
      </div>
      <pre ><code class="input js hljs javascript" data-noescape>
      </code></pre>
      <table>
        <tbody>
          <tr>
            <th>Step:</th>
            <td class="monospace stepExplanation"></td>
          </tr>
          <tr>
            <td colspan="2" class="monospace mutantExplanation"></td>
          </tr>
          <tr>
            <td colspan="2" class="monospace placementExplanation"></td>
          </tr>
        </tbody>
      </table>
      <pre><code class="output js hljs javascript" data-noescape>
      </code></pre>
    </div>
    <pre><code class="text-xxs ast json hljs"></code></pre>
    
  </div>
</div>
`;
document.body.appendChild(template);

/** @type {any} */
const revealHighlightJS = Reveal.getPlugin("highlight");

/**
 * @typedef StepData
 * @prop {'enter'|'exit'} action
 * @prop {string} type
 * @prop {number} start
 * @prop {number} end
 * @prop {object | undefined} [placement]
 * @prop {string} code
 * @prop {Array} [mutants]
 */

class Step {
  /**
   * @type {Step}
   */
  #head;
  /**
   * @type {Step | undefined}
   */
  previous;
  /**
   * @type {Step | undefined}
   */
  next;

  /**
   * @type {StepData}
   */
  data;

  /**
   *
   * @param {StepData} data
   * @param {Step} [previous]
   */
  constructor(data, previous) {
    this.previous = previous;
    this.data = data;
    if (this.previous) {
      this.previous.next = this;
      this.#head = previous.head;
    } else {
      this.#head = this;
    }
  }

  get head() {
    return this.#head;
  }
}

customElements.define(
  "stryker-instrumenter-explainer",
  class extends HTMLElement {
    /**
     * @type {Step | undefined}
     */
    currentStep;
    /**
     * @type {Object[]}
     */
    currentMutants;
    /**
     * @type {Object[]}
     */
    currentPlacements;

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      // Get references to stuff in the shadow DOM
      /**
       * @type {HTMLButtonElement}
       */
      this.nextButton = this.shadowRoot.querySelector("button.next");
      /**
       * @type {HTMLButtonElement}
       */
      this.previousButton = this.shadowRoot.querySelector("button.previous");
      this.jsCodeNode = this.shadowRoot.querySelector("pre code.input.js");
      this.jsCodeOutputNode =
        this.shadowRoot.querySelector("pre code.output.js");
      this.astCodeNode = this.shadowRoot.querySelector("pre code.ast");
      this.stepExplanation = this.shadowRoot.querySelector(".stepExplanation");
      this.mutantExplanation =
        this.shadowRoot.querySelector(".mutantExplanation");
      this.placementExplanation = this.shadowRoot.querySelector(
        ".placementExplanation"
      );

      // Add event listeners
      this.nextButton.addEventListener("click", this.nextStep.bind(this));
      this.previousButton.addEventListener(
        "click",
        this.previousStep.bind(this)
      );
    }

    connectedCallback() {
      // Initialize component
      this.currentMutants = [];
      this.currentPlacements = [];

      // Retrieve code, mutants and placement actions from light DOM
      this.allPlacementActions = JSON.parse(
        this.querySelector(".placementActions").innerText
      );
      this.allMutants = JSON.parse(this.querySelector(".mutants").innerText);
      this.code = this.querySelector(".code").innerText.trim();

      // Parse code and match mutants/placement actions
      const codeAst = parseSync(this.code);
      const self = this;
      traverse(codeAst, {
        enter(path) {
          const { loc, start, end, type } = path.node;
          self.currentStep = new Step(
            {
              action: "enter",
              type,
              start,
              end,
              mutants: self.allMutants.filter((mutant) =>
                matchesLocation(mutant.location, loc)
              ),
              code: generate(codeAst).code,
            },
            self.currentStep
          );
        },
        exit(path) {
          const { loc, start, end, type } = path.node;
          const placement = self.allPlacementActions.find(
            (placementAction) =>
              matchesLocation(placementAction.location, loc) &&
              placementAction.type === type
          );
          if (placement?.replacement) {
            path.replaceWith(placement.replacement);
            path.skip();
          }

          self.currentStep = new Step(
            {
              action: "exit",
              type,
              start,
              end,
              placement,
              code: generate(codeAst).code,
            },
            self.currentStep
          );
        },
      });

      // Reset currentStep to the start
      this.currentStep = this.currentStep.head;

      // Render the thing initially
      this.render();

      function matchesLocation(from, to) {
        return (
          from.start.line === to.start.line &&
          from.start.column === to.start.column &&
          from.end.line === to.end.line &&
          from.end.column === to.end.column
        );
      }
    }

    nextStep(ev) {
      ev.preventDefault();
      this.currentStep = this.currentStep.next;
      this.nextButton.disabled = !this.currentStep.next;

      if (this.currentStep?.data.mutants) {
        this.currentMutants.push(...this.currentStep.data.mutants);
      }
      if (this.currentStep?.data.placement) {
        this.currentPlacements.push(this.currentStep.data.placement);
      }
      this.render();
    }

    previousStep(ev) {
      ev.preventDefault();
      this.currentMutants = this.currentMutants.filter(
        (mutant) => !this.currentStep?.data.mutants?.includes(mutant)
      );
      this.currentPlacements = this.currentPlacements.filter(
        (placement) => this.currentStep?.data.placement !== placement
      );
      this.currentStep = this.currentStep.previous;

      this.render();
    }

    render() {
      let markedCode = this.code;
      if (this.currentStep.data) {
        
        const { action, type, start, end } = this.currentStep.data;
        markedCode = `${this.code.substr(
          0,
          start
        )}<span class="mark">${this.code.substring(
          start,
          end
        )}</span>${this.code.substr(end)}`;
        this.stepExplanation.innerHTML = `${action} ${type}`;
        prettier
          .format(this.currentStep.data.code, {
            parser: "babel",
            printWidth: 40,
            plugins,
          })
          .then((formatted) => {
            this.jsCodeOutputNode.innerHTML = formatted;
          });
      } else {
        this.jsCodeOutputNode.innerHTML = this.code;
        this.stepExplanation.innerHTML = "<em>none</em>";
      }
      this.jsCodeNode.innerHTML = markedCode;
      this.mutantExplanation.innerHTML = `<ul>${this.currentMutants
        .map(
          ({ id, mutatorName, replacement }) =>
            `<li>${id} ${mutatorName} (<code>${replacement}</code>)</li>`
        )
        .join("")}</ul>`;
      this.placementExplanation.innerHTML = `<ul>${this.currentPlacements
        .map(
          ({ placer, location }) =>
            `<li>${placer} ${location.start.line}:${location.start.column}</li>`
        )
        .join("")}</ul>`;

      prettier
        .format(
          JSON.stringify(
            pruneAst(parseSync(this.currentStep?.data.code ?? this.code))
          ),
          { parser: "json", printWidth: 70, plugins }
        )
        .then((formatted) => {
          this.astCodeNode.innerHTML = formatted;

          // Highlight
          revealHighlightJS.highlightBlock(this.jsCodeOutputNode);
          revealHighlightJS.highlightBlock(this.astCodeNode);

          // Buttons
          this.previousButton.disabled = !this.currentStep.previous;
          this.nextButton.disabled = !this.currentStep.next;
        });
    }
  }
);

function pruneAst(ast) {
  return prune(ast, [
    "program",
    "type",
    "body",
    "params",
    "id",
    "name",
    "argument",
    "left",
    "right",
    "operator",
    "test",
    "callee",
    "arguments",
    "consequent",
    "alternate",
    "expressions",
    "expression",
  ]);
}

function prune(obj, whitelist) {
  if (Array.isArray(obj)) {
    return obj.map((node) => prune(node, whitelist));
  }
  if (typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, val]) => {
      if (whitelist.includes(key)) {
        acc[key] = prune(val, whitelist);
      }
      return acc;
    }, {});
  }
  // Primitive...
  return obj;
}
