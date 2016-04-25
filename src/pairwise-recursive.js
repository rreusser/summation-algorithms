'use strict';

module.exports = sumPairwiseRecursive;

function recursiveSum (x, o, s, i1, steps) {
  if (steps === 1) {
    return x[o + s * i1];
  }
  var n = steps >> 1;
  var m = steps - n;
  var s1 = recursiveSum(x, o, s, i1, n);
  var s2 = recursiveSum(x, o, s, i1 + n, m);
  return s1 + s2;
}

function sumPairwiseRecursive (x, n, o, s) {
  var n2 = n === undefined ? x.length : n;
  var o2 = o === undefined ? 0 : o;
  var s2 = s === undefined ? 1 : s;

  return recursiveSum(x, o2, s2, 0, n2);
}
