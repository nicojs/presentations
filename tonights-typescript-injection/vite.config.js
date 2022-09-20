// @ts-check
import monacoEditorPluginDefault from 'vite-plugin-monaco-editor';
import { fileURLToPath } from 'url';

/**
 * @type {typeof monacoEditorPluginDefault}
 */
// @ts-ignore
const monacoEditorPlugin = monacoEditorPluginDefault.default;

const publicDir = fileURLToPath(new URL('./public/slides', import.meta.url));
debugger;
/** @type {import('vite').UserConfig} */
export default {
  plugins: [
    monacoEditorPlugin({
      languageWorkers:  ['editorWorkerService', 'css', 'html', 'json', 'typescript']
    }),
    {
      name: 'watch-md',
      handleHotUpdate({ file, server }) {
        if (file.startsWith(publicDir) && file.endsWith('.md')) {
          console.log(`  ➜  📝 ${file.substring(publicDir.length)}`);
          server.ws.send({
            type: 'full-reload',
            path: '*',
          });
        }
      },
    },
  ],
};
