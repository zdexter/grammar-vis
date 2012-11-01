var buffer = "";
var code = "";
var stack = new Array();

/* Examine top of stack to determine which symbols
    could be next. */
function getPossibleNextSymbols() {
  var temp = stack.pop();
  stack.push(temp);
}

function recognizeSymbol(symbol) {
  switch (symbol) {
    case SymbolEnum.DEFINITION:
      break;
    case SymbolEnum.CONCATENATION:
      break;
    case SymbolEnum.TERMINATION:
      break;
    case SymbolEnum.ALTERNATION:
      break;
    case SymbolEnum.OPTION[0]:
      break;
    case SymbolEnum.OPTION[1]:
      break;
    case SymbolEnum.REPETITION[0]:
      break;
    case SymbolEnum.REPETITION[1]:
      break;
    case SymbolEnum.GROUPING[0]:
      break;
    case SymbolEnum.GROUPING[1]:
      break;
    case SymbolEnum.TERMINAL_STRING[0]:
      break;
    case SymbolEnum.TERMINAL_STRING[1]:
      break;
    case SymbolEnum.EXCEPTION:
      break;
    case SymbolEnum.SEPARATOR:
      break;
  }
}

/* Return:
    The current symbol.
    If inside a production, the nesting of the current symbol.
    A typeahead buffer with all possible next symbol types. */
function interpretCode(buffer) {
  // Process input after we encounter separator.
  if (buffer[buffer.length-1] == SymbolEnum.SEPARATOR) {
    code += buffer;
    symbolArray = buffer.trim().split(" ");
    recognizeSymbol(symbolArray[symbolArray.length-1]);
    buffer = "";
  }
}
