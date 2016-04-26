set terminal postscript
set output "optimization.ps"

set xrange [0:1000]
set yrange [0:110]
set nokey
set xlabel "Run number"
set ylabel "% functions optimized"
plot "count.csv" using 1:($2/7*100) with points pt 6
