function getProductions(grammarString) {
  /* Return a map of the productions in grammarString.
    Productions are delimited by lines, and identified by key in
      strings like "key: value".
  */
  var PRODUCTION_DELIMITER = "=";
  
  var linesPattern = /[^\r\n]+/g; // Global match on non-CR or non-newline
  var lines = grammarString.match(linesPattern);
  
  var productions = {}; 
  for (line in lines) {
    var production = lines[line].split(PRODUCTION_DELIMITER);
    productions[production[0].trim()] = production[1].trim();
  }
  return productions;
}
