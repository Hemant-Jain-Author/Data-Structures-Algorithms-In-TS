function feasible(Q: number[], k: number): boolean {
    for (let i = 0; i < k; i++) {
        if (Q[k] === Q[i] || Math.abs(Q[i] - Q[k]) === Math.abs(i - k)) {
            return false;
        }
    }
    return true;
}

function nQueens(Q: number[], k: number, n: number): void {
    if (k === n) {
        console.log(Q);
        return;
    }
    for (let i = 0; i < n; i++) {
        Q[k] = i;
        if (feasible(Q, k)) {
            nQueens(Q, k + 1, n);
        }
    }
}

// Testing code.
const Q: number[] = new Array(8).fill(0);
nQueens(Q, 0, 8);

/*
0, 4, 7, 5, 2, 6, 1, 3
0, 5, 7, 2, 6, 3, 1, 4
...
7, 2, 0, 5, 1, 4, 6, 3
7, 3, 0, 2, 5, 1, 6, 4
*/
