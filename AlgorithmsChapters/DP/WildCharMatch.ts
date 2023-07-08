function matchExp(exp: string, str: string): boolean {
	return matchExpUtil(exp, str, 0, 0);
}

function matchExpUtil(exp: string, str: string, m: number, n: number): boolean {
	if (m === exp.length && (n === str.length || exp[m - 1] === '*')) {
		return true;
	}
	if ((m === exp.length && n !== str.length) || (m !== exp.length && n === str.length)) {
		return false;
	}
	if (exp[m] === '?' || exp[m] === str[n]) {
		return matchExpUtil(exp, str, m + 1, n + 1);
	}
	if (exp[m] === '*') {
		return matchExpUtil(exp, str, m + 1, n) || matchExpUtil(exp, str, m, n + 1);
	}
	return false;
}

function matchExpDP(exp: string, str: string): boolean {
	return matchExpUtilDP(exp, str, exp.length, str.length);
}

function matchExpUtilDP(exp: string, str: string, m: number, n: number): boolean {
	const lookup: boolean[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
	lookup[0][0] = true;

	for (let i = 1; i <= m; i++) {
		if (exp[i - 1] === '*') {
			lookup[i][0] = lookup[i - 1][0];
		} else {
			break;
		}
	}

	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (exp[i - 1] === '*') {
				lookup[i][j] = lookup[i - 1][j] || lookup[i][j - 1];
			} else if (exp[i - 1] === '?' || str[j - 1] === exp[i - 1]) {
				lookup[i][j] = lookup[i - 1][j - 1];
			} else {
				lookup[i][j] = false;
			}
		}
	}

	return lookup[m][n];
}

console.log("matchExp :: " + matchExp("*llo,?World?", "Hello, World!"));
console.log("matchExp :: " + matchExpDP("*llo,?World?", "Hello, World!"));

/*
matchExp :: true
matchExp :: true
*/
