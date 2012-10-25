SymbolEnum = {
  DEFINITION: "=",
  CONCATENATION: ",",
  TERMINATION: ";",
  ALTERNATION: "|",
  OPTION: ["[", "]"],
  REPETITION: ["{", "}"],
  GROUPING: ["(", ")"],
  TERMINAL_STRING: ['"', "'"],
  EXCEPTION: "-"
}

terminals = {}
nonterminals = {}


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
  console.log(grammarString);
  return productions;
}

function is_defined(obj) {
  return typeof(obj) != "undefined";
}

/* Add obj to hash if obj isn't already a key in hash. */
function addIfNotPresent(hash, obj) {
  if (!is_defined(hash[obj])) {
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

/* Return a hash of hashes of valid symbols in productions. */
function getValidSymbols(productions) {
  var symbolObj = {};
  symbolObj.terminals = {};
  symbolObj.nonterminals = {};

  for (production in productions) {
    var symbolsInProduction = productions[production].split(' ');
    for (symbol in symbolsInProduction) {
      symbol = symbolsInProduction[symbol];
      if (isTerminal(symbol)) {
        addIfNotPresent(symbolObj.terminals, symbol);
      } else {
        addIfNotPresent(symbolObj.nonterminals, symbol);
      }
    }
  }
  return symbolObj;
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
    console.log(terminals);
    console.log(nonterminals);
  } catch (err) {
    console.log(err);
    err = 'Error: ' + err;
    errorBox.innerHTML = err;
    codeInput.disabled = true;
  }
}
