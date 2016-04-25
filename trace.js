'use strict';

var optimized = require('optimized');
var pairwiseSum = require('./src/pairwise-recursive');
var blockSum = require('./src/block-1-pairwise');

var n = 10;
var data = new Float64Array(n);
for (var i = 0; i < n; i++) {
  data[i] = Math.random() * n;
}

console.log(optimized(blockSum, [data, n, 0, 1]))
console.log(optimized(pairwiseSum, [data, n, 0, 1]))
