'use strict';

var assert = require('chai').assert;
var ndarray = require('ndarray');
var almostEqual = require('almost-equal');
var block1PairwiseSum = require('../src/block-1-pairwise');
var block2PairwiseSum = require('../src/block-2-pairwise');
var block4PairwiseSum = require('../src/block-4-pairwise');
var block8PairwiseSum = require('../src/block-8-pairwise');
var sumPairwiseRecursive = require('../src/pairwise-recursive');
var sumKahan = require('../src/kahan');
var sumSerial = require('../src/serial');

var algos = {
  kahan: sumKahan,
  serial: sumSerial,
  pairwiseRecursive: sumPairwiseRecursive,
  block1Pairwise: block1PairwiseSum,
  block2Pairwise: block2PairwiseSum,
  block4Pairwise: block4PairwiseSum,
  block8Pairwise: block8PairwiseSum
};

for (var algoName in algos) {
  if (algos.hasOwnProperty(algoName)) {
    var algo = algos[algoName];

    describe(algoName, function () {
      for (var nn = 10; nn < 110; nn++) {
        (function (n, computeSum) {
          it('Adds numbers from 1 to ' + n, function () {
            var data = new Float64Array(n);
            for (var i = 0; i < n; i++) {
              data[i] = i + 1;
            }
            var A = ndarray(data);
            var computed = computeSum(A.data);
            var expected = n * (n + 1) / 2;

            assert(almostEqual(computed, expected), 'Expected sum = ' + expected + ', got sum = ' + computed);
          });
        }(nn, algo));
      }
    });
  }
}
