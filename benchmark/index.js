'use strict';

var Benchmark = require('benchmark');
var ndarray = require('ndarray');
var sums = require('../');

function randomVector (n, scale) {
  var v = new Array(n);
  var i = 0;
  for (var i = 0; i < n; i++) {
    var logMag = i / (n - 1) * scale;
    v[i] = Math.pow(10, logMag) * 2 * (Math.random() - 0.5);
  }
  v = v.sort(function(a, b) {
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
  var pairFlatSum = sums.pairwiseRadix1(A.data);
  var pairFlatSumRadix2 = sums.pairwiseRadix2(A.data);
  var pairFlatSumRadix4 = sums.pairwiseRadix4(A.data);
  var pairFlatSumRadix8 = sums.pairwiseRadix8(A.data);
  var kahanSum = sums.kahan(A.data);
  var trueSum = kahanSum;
  console.log('True value: ' + trueSum);
  console.log('Serial error: ' + Math.abs(trueSum - serialSum));
  console.log('Pairwise error: ' + Math.abs(trueSum - pairSum));
  console.log('Non-recursive pairwise radix=1 error: ' + Math.abs(trueSum - pairFlatSum));
  console.log('Non-recursive pairwise radix=2 error: ' + Math.abs(trueSum - pairFlatSumRadix2));
  console.log('Non-recursive pairwise radix=4 error: ' + Math.abs(trueSum - pairFlatSumRadix4));
  console.log('Non-recursive pairwise radix=8 error: ' + Math.abs(trueSum - pairFlatSumRadix8));
  console.log('Kahan error: ' + Math.abs(trueSum - kahanSum));
}

var suite = new Benchmark.Suite('Vector Summation');
suite.add('Pairwise summation', function () {
  sums.pairwiseRecursive(A.data);
})
.add('Non-recursive pairwise summation (radix = 1)', function () {
  sums.pairwiseRadix1(A.data);
})
.add('Non-recursive pairwise summation (radix = 2)', function () {
  sums.pairwiseRadix2(A.data);
})
.add('Non-recursive pairwise summation (radix = 4)', function () {
  sums.pairwiseRadix4(A.data);
})
.add('Non-recursive pairwise summation (radix = 8)', function () {
  sums.pairwiseRadix8(A.data);
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
.on('complete', function (){
  console.log(' ');
  console.log('Fastest function is ' + this.filter('fastest').map('name') + '.');
  console.log(' ');
  onComplete();
})
.run({
  'async': false
});
