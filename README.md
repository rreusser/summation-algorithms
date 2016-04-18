# summation-algorithms

[![Build Status][travis-image]][travis-url]

> Naive, pairwise recursive, pairwise non-recursive, and Kahan summation algorithms, compared

## Rationale

Inspired by [this gist](https://gist.github.com/tab58/d230a60a3da2f2ccff428579d28a42b9) by [Tim Bright](https://github.com/tab58).

The purpose of this repo is to implement and test different summation algorithms. Naive summation with a simple accumulator is fast, but it tends to accrue numerical error due to finite precision. The [Kahan summation algorithm](https://en.wikipedia.org/wiki/Kahan_summation_algorithm) uses an extra variable to track and restore lost precision, but at the cost of significantly more floating point operations. [Pairwise summation](https://en.wikipedia.org/wiki/Pairwise_summation) simply regroups the addition operations hierarchically to achieve much better stability than naive summation but without the additional floating point operations.

Perhaps or perhaps not surprisingly, pairwise implemented with simple recursion ends up significantly slower than Kahan summation. This repo implements a potential solution using a stack of size `ceil(log2(n))` that tracks partial sums. Additionally, it unrolls the innermost partial sums into groups of 2, 4, and 8 to acheive significantly improved speed. The algorithm also lends itself well to SIMD extensions, but that's left for another day.

Potential issue: I expected the recursive and non-recursive sums to be numerically identical, but they aren't. The stability is significantly better than naive summation, but it remains to double-check precisely why the operations aren't exactly identical.

**Edit:** I was worried there was an error, but the `pairwiseRecursive` routine just groups terms in an ever so slightly different grouping when the array is not exactly a power of two. I can see an argument that its grouping is *slightly* better since it prevents leftover data elements from passing straight through without grouping into sums along the way. I'm debating whether this is acceptable.

## Results

The test adds a vector of length 1,000,000 containing random numbers with log-magnitude increasing from 0 to 20, sorted in increasing order of magnitude. The error of the Kahan algorithms is defined to be zero.

```
$ node benchmark/index.js
Pairwise summation x 62.79 ops/sec ±0.76% (63 runs sampled)
Non-recursive pairwise summation (blocksize = 1) x 95.31 ops/sec ±0.73% (76 runs sampled)
Non-recursive pairwise summation (blocksize = 2) x 187 ops/sec ±2.79% (83 runs sampled)
Non-recursive pairwise summation (blocksize = 4) x 318 ops/sec ±3.57% (86 runs sampled)
Non-recursive pairwise summation (blocksize = 8) x 540 ops/sec ±0.98% (90 runs sampled)
Kahan summation x 239 ops/sec ±0.87% (84 runs sampled)
Naive summation x 478 ops/sec ±1.00% (89 runs sampled)
 
Fastest function is Non-recursive pairwise summation (blocksize = 8).
 
True value: -2.976139627065145e+21
Serial error: 17301504
Pairwise error: 524288
Non-recursive pairwise blocksize=1 error: 524288
Non-recursive pairwise blocksize=2 error: 524288
Non-recursive pairwise blocksize=4 error: 524288
Non-recursive pairwise blocksize=8 error: 524288
Kahan error: 0
```

## Conclusions

It's not currently clear what's up with the slow serial algorithm, unless unrolling pairs is actually that much faster than V8's ability to group additions in a simple loop.

Increasing block size for pairwise summation is numerically identical and gets better and better. It's not clear where the tradeoff ends. Perhaps 16/32 actually makes sense.

## License

&copy; 2016 Tim Bright, Ricky Reusser. License terms pending discussion/confirmation :)

[travis-image]: https://travis-ci.org/rreusser/summation-algorithms.svg?branch=master
[travis-url]: https://travis-ci.org/rreusser/summation-algorithms
