// Past elements are symbols used.
// Top element on stack contains list of possible next symbols.
var displayStack = new Array();

function displayAllSymbols() {
  displayStack.push(Object.keys(SymbolEnum));
  render();
}

/* Display:
  The current symbol, highlighted.
  Nesting, if applicable.
  All possible next symbols, if any. */
function render() {
  var $myList = $('<ul>');
  for (symbolList in displayStack) {
    for (symbolType in displayStack[symbolList]) {
      var itemList = $('<li>'+displayStack[symbolList][symbolType]+'</li>');
      $myList.append(itemList);
    }
  $myList.insertBefore('#vis-clear');
  }
}
