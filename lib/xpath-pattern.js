var OPEN_ANGLE_BRACKET = '<';
var CLOSE_ANGLE_BRACKET = '>';
var xpathPattern = {
  parse: function (xpathString, pattern) {
    this.params = [];
    return this._parse(xpathString, pattern);
  },
  _parse: function (xpathString, pattern) {
    var paramObject = this._getParamObject(pattern);
    var startPos = paramObject.startPos;
    var endPos = xpathString.indexOf(paramObject.endSymbol, startPos);
    console.log('endPos', endPos);
    paramObject.value = xpathString.substr(startPos, endPos - startPos);
    this.params.push(paramObject);
    return this.params;
  },

  _getParamObject: function (pattern) {

    if (!pattern) {
      return ;
    }
    var openPosition = pattern.indexOf(OPEN_ANGLE_BRACKET);
    var isDoubleOpenBracket = pattern.indexOf(OPEN_ANGLE_BRACKET, openPosition + 1) === -1;
    if (!isDoubleOpenBracket) {
      return null;
    }

    var closePosition = pattern.indexOf(CLOSE_ANGLE_BRACKET, openPosition + 1);
    var hasMatchBracket = closePosition !== -1;
    if (!hasMatchBracket) {
      return null;
    }

    var paramName = pattern.substr(openPosition + 1, closePosition - openPosition - 1);
    return {
      name: paramName,
      startPos: openPosition,
      endSymbol: pattern[closePosition + 1]
    };
  }
};

console.log('parse', xpathPattern.parse('/a/dfklsdfjruigtjr/dkfj[@name="foo"]', '/a/<foo>/dkfj'));
module.exports = xpathPattern;