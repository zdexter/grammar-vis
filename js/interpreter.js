var buffer = "";
var code = "";

function getCurrentSymbol(input) {
}

function getNesting() {
}

function getPossibleNextSymbols() {
}

function recognizeSymbol(symbol) {

}

/* Return:
    The current symbol.
    If inside a production, the nesting of the current symbol.
    A typeahead buffer with all possible next symbol types. */
function interpretCode(code) {
  if (buffer[buffer.length-1] == SymbolEnum.SEPARATOR) {
    code += buffer;
    recognizeSymbol(buffer.trim());
    buffer = "";
  }
}

function updateDisplay(currentSymbol) {
  currentSymbolType = getCurrentSymbolType(currentSymbol);
  // nesting = getNesting(input);
  // possibleNextSymbols = getPossibleNextSymbols(nesting, symbol); // Do I need both? Not sure

  // render(currentSymbol, nesting, possibleNextSymbols);
}

/* Display:
  The current symbol, highlighted.
  Nesting, if applicable.
  All possible next symbols, if any. */
function render(currentSymbol, nesting, possibleNextSymbols) {
  var currentSymbol = document.getElementById("#currentSymbol");
  var nestRoot = document.getElementById("#nest");
  var nextSymbolList = document.getElementById("#nextSymbolList");
}
