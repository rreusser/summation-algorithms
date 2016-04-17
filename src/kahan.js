'use strict';

module.exports = sumKahan;

function sumKahan (x, n, o, s) {
  n = n === undefined ? x.length : n;
  o = o === undefined ? 0 : o;
  s = s === undefined ? 1 : s;

  var sum = 0;
  var c = 0;
  var y = 0;
  var t = 0;
  while (n--) {
    y = x[o] - c;
    t = sum + y;
    c = (t - sum) - y;
    sum = t;
    o += s;
  }
  return sum;
}
