// Past elements are symbols used.
// Top element on stack contains list of possible next symbols.
var displayStack = new Array();

function displayAllSymbols() {
  displayStack.push(Object.keys(SymbolEnum));
  render();
}

/* Pop the top of displayStack
    and add that item to the visualization. */
function renderTop() {
  var $myList = $('<ul>');
  var itemToAdd = displayStack.pop();
  for (symbolType in itemToAdd) {
    $myList.append($('<li>'+itemToAdd[symbolType]+'</li>'));
  }
  $myList.insertBefore('#vis-clear'); 
}
