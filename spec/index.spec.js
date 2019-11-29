const { expect } = require('chai');
const { alternatingCase } = require('..');

describe('alternatingCase', () => {
  it('should return one letter as a capital...', done => {
    alternatingCase('B').then(actual => {
      const expected = 'B';
      expect(actual).to.equal(expected);
      done();
    });
  });
  it('...even if it goes in lowercase', done => {
    alternatingCase('b').then(actual => {
      const expected = 'B';
      expect(actual).to.equal(expected);
      done();
    });
  });
  it('should alternate cases through a word', done => {
    alternatingCase('alternate').then(actual => {
      const expected = 'AlTeRnAtE';
      expect(actual).to.equal(expected);
      done();
    });
  });
  it('should work for additional words', done => {
    alternatingCase('alt case').then(actual => {
      const expected = 'AlT cAsE';
      expect(actual).to.equal(expected);
      done();
    });
  });
  it('should work for additional words of all lengths', done => {
    alternatingCase('alty case').then(actual => {
      const expected = 'AlTy CaSe';
      expect(actual).to.equal(expected);
      done();
    });
  });
});
