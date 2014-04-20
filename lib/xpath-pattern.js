var OPEN_ANGLE_BRACKET = '<';
var CLOSE_ANGLE_BRACKET = '>';
var xpathPattern = {
  parse: function (xpathString, pattern) {
    if (!this.isValidPattern(pattern)) {
      console.log('Not valid');
      //aetetic @todo Продумать механизм возврата ошибки
      return [];
    }
    return this._getParams(xpathString, pattern); //this._parse(xpathString, pattern);
  },

  _getParams: function (xpathString, pattern) {
    var offset = 0;
    var params = [];
    var isFirst = true;
    while (true) {
      var openPosition = pattern.indexOf(OPEN_ANGLE_BRACKET, offset);
      if (openPosition === -1) {
        break;
      }
      var startSymbol = pattern[openPosition - 1];
      var startSymbolPosition = xpathString.indexOf(startSymbol, openPosition) + 1;
      var closePosition = pattern.indexOf(CLOSE_ANGLE_BRACKET, openPosition + 1);
      var endSymbol = pattern[closePosition + 1];

      var endSymbolPosition = xpathString.indexOf(endSymbol, openPosition + offset);
      if (endSymbolPosition === -1) {
        endSymbolPosition = xpathString.length;
      }
      if (endSymbol > xpathString.length) {
        break;
      }

      if (isFirst) {
        startSymbolPosition = openPosition;
        isFirst = false;
      }

      var param = xpathString.slice(startSymbolPosition, endSymbolPosition);
      console.log('openPosition', openPosition + offset,
                  'endSym', endSymbolPosition, 'endSymbol', endSymbol);
      params.push(param);
      offset = closePosition;
    }

    return params;
  },

  isValidPattern: function (pattern) {
    var openPosition = 0,
        nextOpenPosition = 0,
        closePosition = 0,
        nextClosePosition = 0,
        offset = 0;

    while (openPosition > - 1) {

      openPosition = pattern.indexOf(OPEN_ANGLE_BRACKET, offset);
      nextOpenPosition = pattern.indexOf(OPEN_ANGLE_BRACKET, openPosition + 1);
      closePosition = pattern.indexOf(CLOSE_ANGLE_BRACKET, openPosition + 1);
      nextClosePosition = pattern.indexOf(CLOSE_ANGLE_BRACKET, closePosition + 1);

      if (nextOpenPosition < closePosition || nextClosePosition < nextOpenPosition) {
        if (nextOpenPosition === -1 && nextClosePosition === -1) {
          break;
        }
        return false;
      }

      offset  = openPosition + 1;
    }

    return true;
  }
};

console.log('params',
  xpathPattern.parse('/asdf/guarantee/morpork[@name="harroo"]',
    '/asdf/<foo>/<ankh>[@name="<geronimo>"]'));

// console.log('params',
//   xpathPattern.parse('/asdf/guarantee/morpork',
//     '/asdf/<foo>/<ankh>'));
module.exports = xpathPattern;