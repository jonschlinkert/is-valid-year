/*!
 * is-valid-year <https://github.com/jonschlinkert/is-valid-year>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isNumber = require('is-number');
var toRange = require('to-regex-range');
var cache = {};

module.exports = function isValidYear(year, ranges, list) {
  if (!isNumber(year)) return false;

  if (typeof ranges === 'undefined') {
    throw new Error('a year or range of years must be passed as the second argument.');
  }

  // if only two args are defined, look for a fast escape
  if (typeof list === 'undefined' && year === ranges) {
    return true;
  }

  var args = [].slice.call(arguments, 1);
  var key = args + '';

  if (cache.hasOwnProperty(key)) {
    return cache[key].test(year);
  }

  // normalize
  var years = args.join(',').split(/[|,]/);
  var len = years.length, i = -1;
  var res = [];

  while (++i < len) {
    var range = years[i].split('-');
    var str = toRange.apply(null, range);
    res.push(str);
  }

  var yearRange = res.join('|');
  var re = new RegExp('^(?:' + yearRange + ')$');
  return (cache[key] = re).test(year);
};


