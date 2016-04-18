'use strict';

module.exports = sumPairwiseBlock1;

var bitwiseLog2 = require('./bitwise-log2');

function sumPairwiseBlock1 (x, n, o, s) {
  n = n === undefined ? x.length : n;
  o = o === undefined ? 0 : o;
  s = s === undefined ? 1 : s;

  var i, sum, j;
  var y = new Array(bitwiseLog2(n) + 1);

  var pow = 2;
  for (i = 1, j = 0; i <= n; pow = 2, i++, o += s) {
    y[j++] = x[o];
    // console.log('y='+y.slice(0, j));
    while (i % pow === 0) {
      j--;
      pow <<= 1;
      // console.log('add',y[j-1], y[j]);
      y[j - 1] += y[j];
      // console.log('y='+y.slice(0, j));
    }
  }

  // In the event that the size is not exactly a power of two,
  // we end up with leftover partial sums that haven't been
  // fully reduced. We can simply add these togther.
  for (i = 1, sum = y[0]; i < j; i++) {
    sum += y[i];
  }

  return sum;
}
