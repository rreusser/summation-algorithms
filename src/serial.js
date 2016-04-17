'use strict';

module.exports = sumSerial;

function sumSerial (x, n, o, s) {
  n = n === undefined ? x.length : n;
  o = o === undefined ? 0 : o;
  s = s === undefined ? 1 : s;

  var sum = 0;
  while (n--) {
    sum += x[o];
    o += s;
  }
  return sum;
}
