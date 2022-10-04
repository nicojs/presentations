<!-- .slide: class="is-lab" -->

### Lab

Improve the library numbers.js ([https://github.com/numbers/numbers.js](https://github.com/numbers/numbers.js#readme) <!-- .element target="_blank" -->)

---

<!-- .slide: class="is-lab" -->

#### Exercise 1

![exercise-1](/img/exercise-1.png)

Improve mutation score here.

---

<!-- .slide: class="is-lab" -->

#### Exercise 2

![exercise-2](/img/exercise-2.png)

Line 61 here isn't well tested. Can you figure out why? StrykerJS doesn't generate a mutant here. Design a mutator that would generate a mutant that survives here.

---

<!-- .slide: class="is-lab" -->

#### Exercise 3

Implement that mutator in StrykerJS. A empty mutator is prepared for just this occasion.
`stryker-js/packages/instrumenter/src/mutators/uva-mutator.ts`. Be sure to enable TypeScript watch compilation with `F1` and selecting "Tasks: Run build task" (or using `CTL+shift+B`).

You can validate that your mutator works by running: `./run-stryker.sh -m lib/numbers/basic.js:53-70` from the `numbers.js` directory.

---

<!-- .slide: class="is-lab" -->

### Exercise 4

Now kill the mutant by writing a new test.


Notes:

cd ~
mkdir uva
cd uva
git clone git@github.com:stryker-mutator/stryker-js.git
cd stryker-js
npm i
npm run build
cd ..
git clone https://github.com/numbers/numbers.js
cd numbers.js
npm i
touch stryker.conf.json

{
  "$schema": "../stryker-js/packages/core/schema/stryker-schema.json",
  "packageManager": "npm",
  "reporters": [
    "html",
    "clear-text",
    "progress"
  ],
  "mutate": ["lib/numbers/basic.js"],
  "testRunner": "mocha",
  "coverageAnalysis": "perTest",
  "concurrency": 4,
  "timeoutMS": 2000,
  "mochaOptions": {
    "ui": "tdd"
  },
  "plugins": [
    "/home/nicojs/uva/stryker-js/packages/mocha-runner"
  ]
}

touch run-stryker.sh
chmod +x run-stryker.sh
../stryker-js/packages/core/bin/stryker run $@

cd ..
mkdir .vscode
touch .vscode/launch.json

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-node",
            "request": "launch",
            "name": "👽 Run Stryker",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "args": ["run"],
            "cwd": "${workspaceFolder}/numbers.js",
            "program": "${workspaceFolder}/stryker-js/packages/core/bin/stryker",
            "outputCapture": "std"
        },
        {
            "type": "node",
            "request": "launch",
            "name": "☕ Run Unit tests",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "args": ["--ui", "tdd", "test/basic.test.js"],
            "cwd": "${workspaceFolder}/numbers.js",
            "program": "${workspaceFolder}/numbers.js/node_modules/.bin/_mocha",
        },
        {
            "type": "node",
            "request": "launch",
            "name": "🎻 Run Unit tests in the instrumenter",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "cwd": "${workspaceFolder}/stryker-js/packages/instrumenter",
            "program": "${workspaceFolder}/stryker-js/node_modules/.bin/_mocha",
        }
    ]
}
```

touch .vscode/tasks.json

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "label": "tsc-watch",
      "type": "shell",
      "command": "npm start",
      "dependsOn": "generate",
      "problemMatcher": "$tsc-watch",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}/stryker-js"
      },
      "group": {
        "kind": "build",
        "isDefault": true
      }
    },
    {
      "label": "generate",
      "type": "shell",
      "command": "npm run generate",
      "options": {
        "cwd": "${workspaceFolder}/stryker-js"
      },
      "isBackground": true,
      "group": "build"
    }
  ]
}

```

touch .vscode/settings.json

```json
{
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/*.code-search": true,
    "**/*.tsbuildinfo": true,
    "**/.stryker-tmp": true,
    "**/CHANGELOG.md": true,
    "**/dist": true,
    "**/.nyc_output": true,
    "**/reports": true
  },
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true
  },
  "task.autoDetect": "off"
}
```

Change the test a little bit.

```diff
  // basic.substraction
  test('subtraction should return the difference of items in an array', function (done) {
-    assert.equal(basic.subtraction([5, 3, 1, -1]), 2);
+    assert.equal(basic.subtraction([5, 1, -1]), 5);
    done();
  });
```

Create empty mutator

touch stryker-js/packages/instrumenter/src/mutators/uva-mutator.ts

```js
import { NodeMutator } from '.';

export const uvaMutator: NodeMutator = {
  name: 'UvaMutator',

  *mutate(path) {
    // TODO Implement
  },
};
```

Add mutator

open stryker-js/packages/instrumenter/src/mutators/mutate.ts

```diff
import { arithmeticOperatorMutator } from './arithmetic-operator-mutator';
import { NodeMutator } from './node-mutator';
import { blockStatementMutator } from './block-statement-mutator';
import { conditionalExpressionMutator } from './conditional-expression-mutator';
import { stringLiteralMutator } from './string-literal-mutator';
import { arrayDeclarationMutator } from './array-declaration-mutator';
import { arrowFunctionMutator } from './arrow-function-mutator';
import { booleanLiteralMutator } from './boolean-literal-mutator';
import { equalityOperatorMutator } from './equality-operator-mutator';
import { logicalOperatorMutator } from './logical-operator-mutator';
import { objectLiteralMutator } from './object-literal-mutator';
import { unaryOperatorMutator } from './unary-operator-mutator';
import { updateOperatorMutator } from './update-operator-mutator';
import { regexMutator } from './regex-mutator';
import { optionalChainingMutator } from './optional-chaining-mutator';
+import { uvaMutator } from './uva-mutator';

export const allMutators: NodeMutator[] = [
  arithmeticOperatorMutator,
  arrayDeclarationMutator,
  arrowFunctionMutator,
  blockStatementMutator,
  booleanLiteralMutator,
  conditionalExpressionMutator,
  equalityOperatorMutator,
  logicalOperatorMutator,
  objectLiteralMutator,
  stringLiteralMutator,
  unaryOperatorMutator,
  updateOperatorMutator,
  regexMutator,
  optionalChainingMutator,
+  uvaMutator,
];
```