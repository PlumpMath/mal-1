const readline = require("readline");
const pegjs = require("pegjs");

// http://pegjs.org/documentation
// ? 0, 1
// + 1, 2, 3...
// * 0, 1, 2, 3...
var parser = pegjs.generate(`
  start = expression
  expression = e:(number / string / list / symbol) whitespace { return e }
  
  list = '(' content:expression* ')' { return { list:content } }
  
  whitespace = [ \\n]*
  
  number = before:integer after:('.' integer)?
  {
    if(after==null) {
      return before
    } else {
      return parseFloat(before + after.join(''))
    }
  }
  integer = num:[0-9]+ { return parseInt(num.join('')) }
  
  symbol = s:[^\(\) ]+ { return { symbol:s.join('') } }
  
  string = double_quoted_string / single_quoted_string
  double_quoted_string = '"' c:[^"]* '"'     { return c.join('') }
  single_quoted_string = '\\'' c:[^']* '\\'' { return c.join('') }
`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'mal> '
});

rl.prompt();

// produces an abstract syntax tree ast
function read(code) {
  return parser.parse(code);
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
