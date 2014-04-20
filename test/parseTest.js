var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var xpathPattern = require('../lib/xpath-pattern');
describe('XPathParser', function () {
  describe('#.isValidPattern', function () {
    it('double <<', function () {

      xpathPattern.isValidPattern('/asdf/sd/<sdfjdfk<fkdjf>>')
        .should.be.false;
    });
    it('double >>', function () {
      xpathPattern.isValidPattern('/asdfkjasdf/<sdfkjf>fdskjf>')
        .should.be.false;
    });
    it('unclosed <', function () {
      xpathPattern.isValidPattern('/fksdjfasdfkjsdf<')
        .should.be.false;
    });
    it('close without open angle', function () {
      xpathPattern.isValidPattern('/asdfkajsf<fskdfjf>aksdfkjsdf>')
        .should.be.false;
    });
    it('valid expression', function () {
      xpathPattern.isValidPattern('/adfkasdfj<sdfksdfjsdf>ssdfksdfj<ssdkfj><sdlfkjsdf><ksdjf>')
        .should.be.true;
    });
    it('another valid expression', function () {
      xpathPattern.isValidPattern('/a/<foo>/dkfj/<mooochaha>/<mio>')
        .should.be.true;
    });
  });
});