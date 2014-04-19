var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var xpathPattern = require('../lib/xpath-pattern');
describe('XPathParser', function () {
  describe('#.isValidPattern', function () {
    it('double <<', function () {
      xpathPattern.isValidPattern('/asdf/sd/<sdfjdfk<fkdjf>>')
        .should.be.eql.false;
    });
    it('double >>', function () {
      xpathPattern.isValidPattern('/asdfkjasdf/<sdfkjf>fdskjf>')
        .should.be.eql.false;
    });
    it('unclosed <', function () {
      xpathPattern.isValidPattern('/fksdjfasdfkjsdf<')
        .should.be.eql.false;
    });
    it('close without open angle', function () {
      xpathPattern.isValidPattern('/asdfkajsf<fskdfjf>aksdfkjsdf>')
        .should.be.eql.false;
    });
    it('valid expression', function () {
      xpathPattern.isValidPattern('/adfkasdfj<sdfksdfjsdf>ssdfksdfj<ssdkfj><sdlfkjsdf><ksdjf>')
        .should.be.eql.true;
    });
  });
});