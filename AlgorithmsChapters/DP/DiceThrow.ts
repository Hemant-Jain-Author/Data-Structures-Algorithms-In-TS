function findWays(n: number, m: number, V: number): number {
  const dp: number[][] = new Array(n + 1).fill(0).map(() => new Array(V + 1).fill(0));

  // Table entries for only one dice.
  for (let j = 1; j <= m && j <= V; j++) {
    dp[1][j] = 1;
  }

  // i is number of dice, j is Value, k value of dice.
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= V; j++) {
      for (let k = 1; k <= j && k <= m; k++) {
        dp[i][j] += dp[i - 1][j - k];
      }
    }
  }
  return dp[n][V];
}

for (let i = 1; i <= 6; i++) {
  console.log(`${findWays(i, 6, 6)} `);
}

/*
1 
5 
10 
10 
5 
1 
 */