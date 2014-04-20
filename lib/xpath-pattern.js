var OPEN_ANGLE_BRACKET = '<';
var CLOSE_ANGLE_BRACKET = '>';
var xpathPattern = {
  parse: function (xpathString, pattern) {
    if (!this.isValidPattern(pattern)) {
      console.log('Not valid');
      //aetetic @todo Продумать механизм возврата ошибки
      return [];
    }
    return this._getParams(pattern); //this._parse(xpathString, pattern);
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
    var closePosition = pattern.indexOf(CLOSE_ANGLE_BRACKET, openPosition + 1);

    var paramName = pattern.substr(openPosition + 1, closePosition - openPosition - 1);
    return {
      name: paramName,
      startPos: openPosition,
      endSymbol: pattern[closePosition + 1],
      endPos: closePosition
    };
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
        console.log('res false', openPosition,
          'nextOpen', nextOpenPosition, 'close', closePosition,
          'nextClose', nextClosePosition);
        return false;
      }

      offset  = openPosition + 1;
    }

    console.log('res true');
    return true;
  }
};

module.exports = xpathPattern;