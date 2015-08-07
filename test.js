'use strict';

/* deps: mocha */
var assert = require('assert');
var isValidYear = require('./');

describe('isValidYear', function () {
  it('should support strings:', function () {
    assert.equal(isValidYear('1992', '1992'), true);
    assert.equal(isValidYear('1992', '1993'), false);
    assert.equal(isValidYear('1992', '1991'), false);
  });

  it('should support numbers:', function () {
    assert.equal(isValidYear(1992, 1992), true);
    assert.equal(isValidYear(1992, 1993), false);
    assert.equal(isValidYear(1992, 1991), false);
  });

  it('should validate against a range of years:', function () {
    assert.equal(isValidYear('1992', '1991-1993'), true);
    assert.equal(isValidYear('1995', '1991|1993|1995-1997'), true);
    assert.equal(isValidYear('1996', '1991|1993|1995-1997'), true);
    assert.equal(isValidYear('1997', '1991|1993|1995-1997'), true);
    assert.equal(isValidYear('1992', '1992-1993'), true);
    assert.equal(isValidYear('1992', '1980-2015'), true);
    assert.equal(isValidYear('1992', '1991|1993|1995-1997'), false);
    assert.equal(isValidYear('1992', '1991|1993|1995-1997'), false);
    assert.equal(isValidYear('1992', '1993-1994'), false);
  });

  it('should validate against a list of years:', function () {
    assert.equal(isValidYear('1992', '1991', '1992', '1993'), true);
    assert.equal(isValidYear('1992', '1992', '1993'), true);
    assert.equal(isValidYear('1992', '1980', '2015'), false);
    assert.equal(isValidYear('1992', '1993', '1994'), false);
    assert.equal(isValidYear('1992', '1773', '1991'), false);
  });

  it('should validate against an array of year-ranges with gaps:', function () {
    assert.equal(isValidYear('1992', ['1991-1993', '1995']), true);
    assert.equal(isValidYear('1992', ['1992-1993', '1995']), true);
    assert.equal(isValidYear('1992', ['1980-2015', '1975']), true);
    assert.equal(isValidYear('1975', ['1980-2015', '1975']), true);
    assert.equal(isValidYear('2015', ['1980-2015', '1975']), true);
    assert.equal(isValidYear('1980', ['1980-2015', '1975']), true);
    assert.equal(isValidYear('1992', ['1993-1994', '1992']), true);
    assert.equal(isValidYear(2009, ['2009', '2010-2015']), true);
  });

  it('should validate against a list of years with gaps:', function () {
    assert.equal(isValidYear(2009, '2009,2010-2015'), true);
    assert.equal(isValidYear(2009, '2009', '2010-2015'), true);
    assert.equal(isValidYear('1992', '1992-1993'), true);
    assert.equal(isValidYear('2015', '1980-2015'), true);
    assert.equal(isValidYear('1992', '1991-1993', '2015'), true);

    assert.equal(isValidYear('1990', '1991-1993', '2015'), false);
    assert.equal(isValidYear('2010', '1991-1993', '2015'), false);
    assert.equal(isValidYear('2010', '1991-1993', '2015'), false);
    assert.equal(isValidYear('1992', '1993-1994'), false);
  });
});
