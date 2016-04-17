# summation-algorithms

## Rationale

The purpose of this repo is to implement and test different summation algorithms. Naive summation with a simple accumulator is fast, but it tends to accrue numerical error due to finite precision. The [Kahan summation algorithm](https://en.wikipedia.org/wiki/Kahan_summation_algorithm) uses an extra variable to track and restore lost precision, but at the cost of significantly more floating point operations. [Pairwise summation](https://en.wikipedia.org/wiki/Pairwise_summation) simply regroups the addition operations hierarchically to achieve much better stability than naive summation but without the additional floating point operations.

Perhaps or perhaps not surprisingly, pairwise implemented with simple recursion ends up significantly slower than Kahan summation. This repo implements a potential solution using a stack of size `ceil(log2(n))` that tracks partial sums. Additionally, it unrolls the innermost partial sums into groups of 2, 4, and 8 to acheive significantly improved speed. The algorithm also lends itself well to SIMD extensions, but that's left for another day.

Potential issue: I expected the recursive and non-recursive sums to be numerically identical, but they aren't. The stability is significantly better than naive summation, but it remains to double-check precisely why the operations aren't exactly identical.

## Results

The test adds a vector of length 1,000,000 containing random numbers with log-magnitude increasing from 0 to 20, sorted in increasing order of magnitude. The error of the Kahan algorithms is defined to be zero.

```
$ node benchmark/index.js
Pairwise summation x 62.79 ops/sec ±0.76% (63 runs sampled)
Non-recursive pairwise summation (radix = 1) x 95.31 ops/sec ±0.73% (76 runs sampled)
Non-recursive pairwise summation (radix = 2) x 187 ops/sec ±2.79% (83 runs sampled)
Non-recursive pairwise summation (radix = 4) x 318 ops/sec ±3.57% (86 runs sampled)
Non-recursive pairwise summation (radix = 8) x 540 ops/sec ±0.98% (90 runs sampled)
Kahan summation x 239 ops/sec ±0.87% (84 runs sampled)
Naive summation x 478 ops/sec ±1.00% (89 runs sampled)
 
Fastest function is Non-recursive pairwise summation (radix = 8).
 
True value: -2.976139627065145e+21
Serial error: 17301504
Pairwise error: 524288
Non-recursive pairwise radix=1 error: 524288
Non-recursive pairwise radix=2 error: 524288
Non-recursive pairwise radix=4 error: 524288
Non-recursive pairwise radix=8 error: 524288
Kahan error: 0
```

## Conclusions

It's not currently clear what's up with the slow serial algorithm, unless unrolling pairs is actually that much faster than V8's ability to group additions in a simple loop. The recursive and non-recursive pairwise summations aren't always numerically identical which suggests perhaps an equivalent algorithm with an ever so slightly different order of operations.


## License

&copy; 2016 Tim Bright, Ricky Reusser. License terms pending discussion/confirmation :)
