SymbolEnum = {
  DEFINITION: "=",
  CONCATENATION: ",",
  TERMINATION: ";",
  ALTERNATION: "|",
  OPTION: ["[", "]"],
  REPETITION: ["{", "}"],
  GROUPING: ["(", ")"],
  TERMINAL_STRING: ['"', "'"],
  EXCEPTION: "-",
  SEPARATOR: " "
}

terminals = {}
nonterminals = {}

function displayNonterminals() {
  console.log(terminals);
  console.log(nonterminals);
}

/* Return a map of the productions in grammarString.
  Productions are delimited by lines, and identified by key in
    strings like "key: value". */
function getProductions(grammarString) {
  var linesPattern = /[^\r\n]+/g; // Global match on non-CR or non-newline
  var lines = grammarString.match(linesPattern);
  
  var productions = {};
  for (line in lines) {
    var production = lines[line].split(SymbolEnum.DEFINITION);

    if (production.length == 1) {
      throw("All productions must consist of a name" +
         SymbolEnum.DEFINITION + "production pair.");
    }
    var key = production[0].replace(SymbolEnum.TERMINATION,"").trim();
    var value = production[1].replace(SymbolEnum.TERMINATION,"").trim();

    productions[key] = value;
  }
  return productions;
}

function isDefined(obj) {
  return typeof(obj) != "undefined";
}

/* Add obj to hash if obj isn't already a key in hash. */
function addIfNotPresent(hash, obj) {
  if (!isDefined(hash[obj])) {
    hash[obj] = true;
  }
}

function isTerminal(symbol) {
  for (char in SymbolEnum.TERMINAL_STRING) {
    if (SymbolEnum.TERMINAL_STRING[char] == symbol[0]) {
      return true;
    }
  } 
  return false;
}

function isNonterminal(symbol) {
  for (grammarSymbol in SymbolEnum) {
    var arrayToCheck;
    if (typeof(SymbolEnum[grammarSymbol]) == "string") {
      arrayToCheck = [SymbolEnum[grammarSymbol]];
    } else {
      arrayToCheck = SymbolEnum[grammarSymbol];
    }
    for (i in arrayToCheck) {
      if (arrayToCheck[i] == symbol) {
        return false;
      }
    }
  }
  return true;
}

/* Return a hash of hashes of valid symbols in productions. */
function getValidSymbols(productions) {
  var symbolObj = {};
  symbolObj.terminals = {};
  symbolObj.nonterminals = {};

  for (production in productions) {
    var symbolsInProduction = productions[production].split(SymbolEnum.SEPARATOR);
    for (symbol in symbolsInProduction) {
      symbol = symbolsInProduction[symbol];
      if (isTerminal(symbol)) {
        addIfNotPresent(symbolObj.terminals, symbol);
      } else if (isNonterminal(symbol)) {
        addIfNotPresent(symbolObj.nonterminals, symbol);
      }
    }
  }
  return symbolObj;
}

function buildListFromKeys(obj) {
  var keys = Object.keys(obj);
  var $myList = $('<ul>');
  for (key in keys) {
    $myList.append('<li>'+keys[key]+'</li>');
  }
  return $myList;
}

function buildGrammar(grammarString) {
  // Productions -> statements -> symbols -> nonterminals & terminals.
  grammarString = grammarString.trim();
  var errorBox = document.getElementById("grammar_errors");
  var codeInput = document.getElementById("code");

  errorBox.innerHTML = "";

  try {
    var productions = getProductions(grammarString);
    var validSymbols = getValidSymbols(productions);
    var terminals = validSymbols.terminals;
    var nonterminals = validSymbols.nonterminals;

    // Grammar built. Allow interpretation.
    codeInput.disabled = false;
  } catch (err) {
    console.log(err);
    err = 'Error: ' + err;
    errorBox.innerHTML = err;
    codeInput.disabled = true;
  }

  buildListFromKeys(nonterminals).insertAfter('#nonterminals > p');
  buildListFromKeys(terminals).insertAfter('#terminals > p');

}
