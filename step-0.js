const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'mal> '
});

rl.prompt();

// produces an abstract syntax tree ast
function read(code) {
  return code;
}

// produces a value
function evaluate(ast, environment) {
  return ast;
}

// produces a string
function print(value) {
  return value;
}

rl.on('line', function(code) {
  var ast = read(code);
  var value = evaluate(ast, {});
  var output = print(value);
  console.log(output);
  rl.prompt();
});
