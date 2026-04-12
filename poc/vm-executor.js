/**
 * This is a proof of concept (POC) for executing code in a virtual machine (VM) context using Node.js's `vm` module.
 * The code defines a simple script that declares two variables, logs a message, and calculates the sum of the two variables.
 */
import vm from "vm";
import consola from "consola";


const shared = { c: 3 };

const code = `
  const a = 1;
  const b = 2;
  consola.log('Hello from VM!');
  consola.log('a + b =', a + b);
  const sum = a + b + shared.c;
  consola.log('The sum of a, b, and c is:', sum);
  shared.c = sum;
`;

const context = {
  console,
  consola,
  shared,
};

try {
  vm.runInNewContext(code, context);
} catch (err) {
  consola.error("Error executing VM code:", err);
} finally {
  consola.log("Finished executing VM code.");
  consola.log("Value of c after VM execution:", shared.c);
}
