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

function getProductions(grammarString) {
  /* Return a map of the productions in grammarString.
    Productions are delimited by lines, and identified by key in
      strings like "key: value".
  */
  var linesPattern = /[^\r\n]+/g; // Global match on non-CR or non-newline
  var lines = grammarString.match(linesPattern);
  
  var productions = {};
  for (line in lines) {
    var production = lines[line].split(SymbolEnum.DEFINITION);

    if (production.length == 1) {
      throw("All productions must consist of a name" +
         SymbolEnum.DEFINITION + "production pair.");
    }

    productions[production[0]
      .replace(SymbolEnum.TERMINATION,"").trim()] = production[1]
      .replace(SymbolEnum.TERMINATION,"").trim();
  }
  return productions;
}

function getValidSymbols(productions) {
  /* Return a map of valid symbols in productions.
  */
  var SYMBOL_DELIMITER = ",";
}

function buildGrammar(grammarString) {
  // Productions -> statements -> symbols -> nonterminals & terminals.
  var errorBox = document.getElementById("grammar_errors");
  var codeInput = document.getElementById("code");

  errorBox.innerHTML = "";

  try {
    productions = getProductions(grammarString);
    validSymbols = getValidSymbols(productions);
    codeInput.disabled = false;
  } catch (err) {
    err = 'Error: ' + err;
    errorBox.innerHTML = err;
    codeInput.disabled = true;
  }
}
