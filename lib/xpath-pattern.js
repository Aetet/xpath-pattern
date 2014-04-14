var OPEN_ANGLE_BRACKET = '<';
var CLOSE_ANGLE_BRACKET = '>';
var xpathPattern = {
  parse: function (xpathString, pattern) {
    this.params = [];
    return this._getParams(pattern); //this._parse(xpathString, pattern);
  },
  _parse: function (xpathString, pattern) {
    var paramObject = this._getParamObject(pattern);
    var startPos = paramObject.startPos;
    var endPos = xpathString.indexOf(paramObject.endSymbol, startPos);
    paramObject.value = xpathString.substr(startPos, endPos - startPos);
    this.params.push(paramObject);
    return this.params;
  },

  _getParams: function (pattern) {
    var params = [];
    var paramObject = this._getParamObject(pattern);
    params.push(paramObject);
    while(paramObject) {
      var endPos = paramObject.endPos;
      paramObject = this._getParamObject(pattern, endPos);
      params.push(paramObject);
    }

    return params;

  },

  _getParamObject: function (pattern, offset) {
    offset = offset || 0;
    if (!pattern) {
      return ;
    }
    var openPosition = pattern.indexOf(OPEN_ANGLE_BRACKET, offset);
    var nextOpenPosition = pattern.indexOf(OPEN_ANGLE_BRACKET, openPosition + 1);
    if (openPosition === -1) {
      return ;
    }

    var closePosition = pattern.indexOf(CLOSE_ANGLE_BRACKET, openPosition + 1);
    var hasMatchBracket = closePosition !== -1;
    if (!hasMatchBracket || (nextOpenPosition < closePosition) && (nextOpenPosition !== -1)) {
      return null;
    }

    var paramName = pattern.substr(openPosition + 1, closePosition - openPosition - 1);
    return {
      name: paramName,
      startPos: openPosition,
      endSymbol: pattern[closePosition + 1],
      endPos: closePosition
    };
  }
};

console.log('parse', xpathPattern.parse('/a/dfklsdfjruigtjr/dkfj[@name="foo"]', '/a/<foo>/dkfj/<mooochaha>/<mio>'));
module.exports = xpathPattern;