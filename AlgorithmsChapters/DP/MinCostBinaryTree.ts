function maxVal(max: number[][], i: number, j: number): number {
	if (max[i][j] !== Number.MIN_VALUE) return max[i][j];

	for (let k = i; k < j; k++) {
		max[i][j] = Math.max(
			max[i][j],
			Math.max(maxVal(max, i, k), maxVal(max, k + 1, j))
		);
	}
	return max[i][j];
}

function minCostBstTDUtil( dp: number[][],	max: number[][],
	i: number,	j: number, arr: number[]): number {
	if (j <= i) return 0;

	if (dp[i][j] !== Number.MAX_VALUE) return dp[i][j];

	for (let k = i; k < j; k++) {
		dp[i][j] = Math.min(
			dp[i][j],
			minCostBstTDUtil(dp, max, i, k, arr) +
			minCostBstTDUtil(dp, max, k + 1, j, arr) +
			maxVal(max, i, k) * maxVal(max, k + 1, j)
		);
	}
	return dp[i][j];
}

function minCostBstTD(arr: number[]): number {
	const n = arr.length;
	const dp: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(Number.MAX_VALUE));

	const max: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(Number.MIN_VALUE));

	for (let i = 0; i < n; i++) max[i][i] = arr[i];

	return minCostBstTDUtil(dp, max, 0, n - 1, arr);
}

function minCostBstBU(arr: number[]): number {
	const n = arr.length;
	const dp: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));

	const max: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));

	for (let i = 0; i < n; i++) max[i][i] = arr[i];

	for (let l = 1; l < n; l++) {
		for (let i = 0, j = i + l; j < n; i++, j++) {
			dp[i][j] = Number.MAX_VALUE;
			for (let k = i; k < j; k++) {
				dp[i][j] = Math.min(
					dp[i][j],
					dp[i][k] + dp[k + 1][j] + max[i][k] * max[k + 1][j]
				);
				max[i][j] = Math.max(max[i][k], max[k + 1][j]);
			}
		}
	}

	return dp[0][n - 1];
}

const arr: number[] = [6, 2, 4];
console.log("Total cost: " + minCostBstTD(arr));
console.log("Total cost: " + minCostBstBU(arr));

/*
 * Total cost: 32 
 * Total cost: 32
 */