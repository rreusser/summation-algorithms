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
  console.log('add', s1, s2);
  return s1 + s2;
}

function sumPairwiseRecursive (x, n, o, s) {
  n = n === undefined ? x.length : n;
  o = o === undefined ? 0 : o;
  s = s === undefined ? 1 : s;

  return recursiveSum(x, o, s, 0, n);
}
