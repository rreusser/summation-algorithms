'use strict';

var assert = require('chai').assert;
var ndarray = require('ndarray');
var almostEqual = require('almost-equal');
var sumPairwiseRadix1 = require('../src/pairwise-radix-1');
var sumPairwiseRadix2 = require('../src/pairwise-radix-2');
var sumPairwiseRadix4 = require('../src/pairwise-radix-4');
var sumPairwiseRadix8 = require('../src/pairwise-radix-8');
var sumPairwiseRecursive = require('../src/pairwise-recursive');
var sumKahan = require('../src/kahan');
var sumSerial = require('../src/serial');

var algos = {
  //kahan: sumKahan,
  //serial: sumSerial,
  pairwiseRecursive: sumPairwiseRecursive,
  pairwiseRadix1: sumPairwiseRadix1,
  //pairwiseRadix2: sumPairwiseRadix2,
  //pairwiseRadix4: sumPairwiseRadix4,
  //pairwiseRadix8: sumPairwiseRadix8
};

for (var algoName in algos) {
  if (algos.hasOwnProperty(algoName)) {
    var algo = algos[algoName];

    describe(algoName, function () {
      for (var nn = 10; nn <= 10; nn++) {
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
