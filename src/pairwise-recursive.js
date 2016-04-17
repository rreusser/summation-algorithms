'use strict';

module.exports = sumPairwiseRecursive;

function recursiveSum (x, o, s, i1, steps) {
  if (steps === 1) {
    return x[o + s * i1];
  }
  var n = steps >> 1;
  var m = steps - n;
  return recursiveSum(x, o, s, i1, n) +
         recursiveSum(x, o, s, i1 + n, m);
}

function sumPairwiseRecursive (x, n, o, s) {
  n = n === undefined ? x.length : n;
  o = o === undefined ? 0 : o;
  s = s === undefined ? 1 : s;

  return recursiveSum(x, o, s, 0, n);
}
