'use strict';

module.exports = bitwiseLog2;

function bitwiseLog2 (u) {
  var s, t;

  t = (u > 0xffff) << 4;
  u >>= t;
  s = (u > 0xff) << 3;
  u >>= s;
  t |= s;
  s = (u > 0xf) << 2;
  u >>= s;
  t |= s;
  s = (u > 0x3) << 1;
  u >>= s;
  t |= s;

  return (t | (u >> 1));
}
