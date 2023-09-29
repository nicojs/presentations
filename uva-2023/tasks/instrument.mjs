// @ts-check
import { dirname } from "path";
import { fileURLToPath } from "url";
import instrumenter from "@stryker-mutator/instrumenter";
import { File } from "@stryker-mutator/api/core.js";
import fs from "fs";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const resolveExample = path.resolve.bind(path, __dirname, "..", "example");

console.log(__dirname);
console.log(resolveExample("example.js"));

const f = new File(
  "example.js",
  await fs.promises.readFile(resolveExample("example.js"))
);

const trueIdentity = () => true;
const instr = new instrumenter.Instrumenter({
  ...console,
  fatal: console.error,
  isDebugEnabled: trueIdentity,
  isTraceEnabled: trueIdentity,
  isWarnEnabled: trueIdentity,
  isInfoEnabled: trueIdentity,
  isFatalEnabled: trueIdentity,
  isErrorEnabled: trueIdentity,
});
const { files, mutants } = await instr.instrument([f], {
  excludedMutations: [],
  mutationRanges: [],
  plugins: [],
});
await fs.promises.writeFile(
  resolveExample("example.instrumented.js"),
  files[0].content
);
await fs.promises.writeFile(
  resolveExample("example.mutants.json"),
  JSON.stringify(mutants, null, 2)
);
