import Reveal from 'reveal.js/dist/reveal.esm.js';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import { defineMonacoEditor } from './monaco-editor';
import 'reveal.js/dist/reveal.css';

import 'reveal.js/dist/theme/moon.css';
import 'highlight.js/styles/github-dark.css';
import './css/style.css';
import './css/bootstrap-icons.css';

const scaleFactor = 2;

defineMonacoEditor(scaleFactor);

const style = getComputedStyle(document.body);
style.getPropertyValue('--r-main-font-size');
['--r-main-font-size', '--r-block-margin', '--r-heading-margin'].forEach(
  (customProperty) => {
    const expression = style.getPropertyValue(customProperty);
    const newExpression = parseComputedPx(expression)
      .map(
        (pxExpression) =>
          `${parsePx(pxExpression) * scaleFactor}${
            pxExpression === '0' ? '' : 'px'
          }`
      )
      .join(' ');
    document.body.style.setProperty(customProperty, newExpression);
  }
);

function parsePx(pxExpression: string) {
  const [, px] = /^\s*(\d*)\s*(?:px)?$/.exec(pxExpression)!;
  return parseInt(px);
}

function parseComputedPx(computedExpression: string) {
  const [, ...expressions] = /^\s*(\S+)\s*(\S+)?\s*(\S+)?\s*(\S+)?$/.exec(
    computedExpression
  )!;
  return expressions.filter(Boolean);
}


const deck = new Reveal();
deck.initialize({
  controls: false,
  progress: true,
  history: true,
  center: true,
  transition: 'default',

  // Correct for the scale factor
  maxScale: 2.0 / scaleFactor, // this comes out to be maxScale: 1, which is what we want. The monaco-editor doesn't like zoom > 1.
  width: 960 * scaleFactor,
  height: 700 * scaleFactor,

  // disableLayout: true,
  plugins: [RevealMarkdown, RevealHighlight],
});
