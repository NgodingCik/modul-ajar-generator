import fs from "fs";
import path from "path";
import vm from "vm";
import * as docx from "docx";
import { removeImportRequire } from "../src/utils/utils.js";

const __dirname = import.meta.dirname;
const __filename = import.meta.filename;

const tempCode = fs.readFileSync(path.join(__dirname, "scripts/example-docx.js"), "utf-8");
const cleanedCode = removeImportRequire(tempCode);

const shared = {
  buffer: null,
};

const code = `
${cleanedCode}
`;

const contect = {
  console,
  fs,
  path,
  __dirname,
  __filename,
  shared,
  ...docx,
};

try {
  const result = vm.runInNewContext(code, contect);
  if (result && typeof result.then === "function") {
    result
      .then(() => {
        console.log(
          "Buffer in shared object after VM execution:",
          shared.buffer ? "Buffer exists" : "No buffer",
        );
      })
      .catch((err) => {
        console.error("Error in async code within VM:", err);
      });
  } else {
    console.log("VM code executed synchronously.");
  }
} catch (err) {
  console.error("Error executing VM code:", err);
} finally {
  console.log("Finished executing VM code.");
}
