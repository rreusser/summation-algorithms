'use strict';

var bitwiseLog2 = require('./bitwise-log2');

module.exports = sumPairwiseRadix2;

function sumPairwiseRadix2 (x, n, o, s) {
  n = n === undefined ? x.length : n;
  o = o === undefined ? 0 : o;
  s = s === undefined ? 1 : s;

  var i, sum, j;
  var xp2 = o + s * n;
  var xp2Clipped = xp2 - xp2 % 2;
  var y = new Array(bitwiseLog2(n));

  var pow = 2;
  for (i = 0, j = 0; o < xp2Clipped; pow = 2, i++, o += s) {
    y[j++] = x[o] + x[o += s];
    while ((i + 1) % pow === 0) {
      j--;
      pow <<= 1;
      y[j - 1] += y[j];
    }
  }

  for (i = 0, sum = 0; i < j; i++) {
    sum += y[i];
  }

  if (xp2 %2 !== 0) {
    sum += x[xp2Clipped];
  }

  return sum;
}
