'use strict';

module.exports = sumPairwiseRadix8;

var bitwiseLog2 = require('./bitwise-log2');

var sumPairwiseRadix4 = require('./pairwise-radix-4');

function sumPairwiseRadix8 (x, n, o, s) {
  n = n === undefined ? x.length : n;
  o = o === undefined ? 0 : o;
  s = s === undefined ? 1 : s;

  var i, sum, j;
  var xp = x.o;
  var xp2 = o + s * n;
  var xp2Clipped = xp2 - xp2 % 8;
  var y = new Array(Math.max(bitwiseLog2(n) - 1, 0));
  var tmp;

  var pow = 2;
  for (i = 0, j = 0; o < xp2Clipped; pow = 2, i++, o += s) {
    y[j] = x[o] + x[o += s];
    y[j] += x[o += s] + x[o += s];
    tmp = x[o += s] + x[o += s];
    tmp += x[o += s] + x[o += s];
    y[j++] += tmp;
    while ((i + 1) % pow === 0) {
      j--;
      pow <<= 1;
      y[j - 1] += y[j];
    }
  }

  for (i = 0, sum = 0; i < j; i++) {
    sum += y[i];
  }

  if (xp2 % 8 !== 0) {
    sum += sumPairwiseRadix4(x, n % 8, xp2Clipped, s);
  }

  return sum;
}
