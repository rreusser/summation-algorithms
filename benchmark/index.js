'use strict';

var Benchmark = require('benchmark');
var ndarray = require('ndarray');
var sums = require('../');

function randomVector (n, scale) {
  var v = new Array(n);
  for (var i = 0; i < n; i++) {
    var logMag = i / (n - 1) * scale;
    v[i] = Math.pow(10, logMag) * 2 * (Math.random() - 0.5);
  }
  v = v.sort(function (a, b) {
    return Math.abs(a) > Math.abs(b);
  });
  v = new Float64Array(v);
  return ndarray(v, [n]);
}
var n = 1000000;
var A = randomVector(n, 20);

function onComplete () {
  var serialSum = sums.serial(A.data);
  var pairSum = sums.pairwiseRecursive(A.data);
  var block1PairwiseSum = sums.block1Pairwise(A.data);
  var block2PairwiseSum = sums.block2Pairwise(A.data);
  var block4PairwiseSum = sums.block4Pairwise(A.data);
  var block8PairwiseSum = sums.block8Pairwise(A.data);
  var kahanSum = sums.kahan(A.data);
  var trueSum = kahanSum;
  console.log('True value: ' + trueSum);
  console.log('Serial error: ' + Math.abs(trueSum - serialSum));
  console.log('Pairwise error: ' + Math.abs(trueSum - pairSum));
  console.log('Non-recursive pairwise blocksize=1 error: ' + Math.abs(trueSum - block1PairwiseSum));
  console.log('Non-recursive pairwise blocksize=2 error: ' + Math.abs(trueSum - block2PairwiseSum));
  console.log('Non-recursive pairwise blocksize=4 error: ' + Math.abs(trueSum - block4PairwiseSum));
  console.log('Non-recursive pairwise blocksize=8 error: ' + Math.abs(trueSum - block8PairwiseSum));
  console.log('Kahan error: ' + Math.abs(trueSum - kahanSum));
}

var suite = new Benchmark.Suite('Vector Summation');
suite.add('Pairwise summation', function () {
  sums.pairwiseRecursive(A.data);
})
.add('Non-recursive pairwise summation (blocksize = 1)', function () {
  sums.block1Pairwise(A.data);
})
.add('Non-recursive pairwise summation (blocksize = 2)', function () {
  sums.block2Pairwise(A.data);
})
.add('Non-recursive pairwise summation (blocksize = 4)', function () {
  sums.block4Pairwise(A.data);
})
.add('Non-recursive pairwise summation (blocksize = 8)', function () {
  sums.block8Pairwise(A.data);
})
.add('Kahan summation', function () {
  sums.kahan(A.data);
})
.add('Naive summation', function () {
  sums.serial(A.data);
})
.on('cycle', function (event) {
  console.log(String(event.target));
})
.on('complete', function () {
  console.log(' ');
  console.log('Fastest function is ' + this.filter('fastest').map('name') + '.');
  console.log(' ');
  onComplete();
})
.run({
  'async': false
});
