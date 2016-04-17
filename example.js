var ndarray = require('ndarray');
var sums = require('./numeric-sums');

for (var n = 16; n < 17; n++) {
  var x = new Array(n);

  for (var i = 0; i < n; i++) {
    x[i] = i + 1;
  }

  var sum = n * (n + 1) / 2;

  var computed = sums.asumFlatPairRadix8(ndarray(x));
  console.log(sum, computed);

  if (sum !== computed) {
    throw new Error('whoopsie', n, sum, computed);
  }
}
