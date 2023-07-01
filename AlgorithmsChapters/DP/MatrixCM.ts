function MatrixChainMulBruteForce(p: number[], i: number, j: number): number {
	if (i === j) return 0;

	let min = Infinity;

	for (let k = i; k < j; k++) {
		const count =
			MatrixChainMulBruteForce(p, i, k) +
			MatrixChainMulBruteForce(p, k + 1, j) +
			p[i - 1] * p[k] * p[j];

		if (count < min) min = count;
	}

	return min;
}

function MatrixChainMulBruteForceWrapper(p: number[]): number {
	const i = 1;
	const j = p.length - 1;
	return MatrixChainMulBruteForce(p, i, j);
}

function MatrixChainMulTD(p: number[], n: number): number {
	const dp: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(Infinity));
	for (let i = 1; i < n; i++) dp[i][i] = 0;
	return MatrixChainMulTDHelper(dp, p, 1, n - 1);
}

function MatrixChainMulTDHelper(dp: number[][], p: number[], i: number, j: number): number {
	if (dp[i][j] !== Infinity) return dp[i][j];

	for (let k = i; k < j; k++) {
		dp[i][j] = Math.min(
			dp[i][j],
			MatrixChainMulTDHelper(dp, p, i, k) +
			MatrixChainMulTDHelper(dp, p, k + 1, j) +
			p[i - 1] * p[k] * p[j]
		);
	}

	return dp[i][j];
}

function MatrixChainMulBU(p: number[], n: number): number {
	const dp: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(Infinity));

	for (let i = 1; i < n; i++) dp[i][i] = 0;

	for (let l = 1; l < n; l++) {
		for (let i = 1, j = i + l; j < n; i++, j++) {
			for (let k = i; k < j; k++) {
				dp[i][j] = Math.min(
					dp[i][j],
					dp[i][k] + p[i - 1] * p[k] * p[j] + dp[k + 1][j]
				);
			}
		}
	}

	return dp[1][n - 1];
}

function PrintOptPar(n: number, pos: number[][], i: number, j: number): string {
	var str = "";
	if (i === j) {
		str += `M${pos[i][i]} `;
	} else {
		str += "( ";
		str += PrintOptPar(n, pos, i, pos[i][j]);
		str += PrintOptPar(n, pos, pos[i][j] + 1, j);
		str += ") ";
	}
	return str;
}

function PrintOptimalParenthesis(n: number, pos: number[][]): void {
	console.log("OptimalParenthesis : ", PrintOptPar(n, pos, 1, n - 1));
}

function MatrixChainMulBU2(p: number[], n: number): number {
	const dp: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(Infinity));
	const pos: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));

	for (let i = 1; i < n; i++) {
		dp[i][i] = 0;
		pos[i][i] = i;
	}

	for (let l = 1; l < n; l++) {
		for (let i = 1, j = i + l; j < n; i++, j++) {
			for (let k = i; k < j; k++) {
				dp[i][j] = Math.min(
					dp[i][j],
					dp[i][k] + p[i - 1] * p[k] * p[j] + dp[k + 1][j]
				);
				pos[i][j] = k;
			}
		}
	}

	PrintOptimalParenthesis(n, pos);
	return dp[1][n - 1];
}

const arr: number[] = [1, 2, 3, 4];
const n: number = arr.length;
console.log(
	"Matrix Chain Multiplication is: " + MatrixChainMulBruteForceWrapper(arr)
);
console.log("Matrix Chain Multiplication is: " + MatrixChainMulTD(arr, n));
console.log("Matrix Chain Multiplication is: " + MatrixChainMulBU(arr, n));
console.log("Matrix Chain Multiplication is: " + MatrixChainMulBU2(arr, n));


/*
Matrix Chain Multiplication is: 18
Matrix Chain Multiplication is: 18
Matrix Chain Multiplication is: 18
OptimalParenthesis : ( ( M1 M2 ) M3 ) 
Matrix Chain Multiplication is: 18
*/
