'use strict';

module.exports = sumPairwiseRadix1;

var bitwiseLog2 = require('./bitwise-log2');

function sumPairwiseRadix1 (x, n, o, s) {
  n = n === undefined ? x.length : n;
  o = o === undefined ? 0 : o;
  s = s === undefined ? 1 : s;

  var i, sum, j;
  var y = new Array(bitwiseLog2(n) + 1);

  var pow = 2;
  for (i = 0, j = 0; i < n; pow = 2, i++, o += s) {
    y[j++] = x[o];
    //console.log('y='+y.slice(0, j));
    while ((i + 1) % pow === 0) {
      j--;
      pow <<= 1;
      y[j - 1] += y[j];
      //console.log('y='+y.slice(0, j));
    }
  }

  for (i = 0, sum = 0; i < j; i++) {
    sum += y[i];
  }

  return sum;
}
