function wildCharMatchExp(exp: string, str: string): boolean {
	return wildCharMatchExpUtil(exp, str, 0, 0);
}

function wildCharMatchExpUtil(exp: string, str: string, m: number, n: number): boolean {
	if (m === exp.length && (n === str.length || exp[m - 1] === '*')) {
		return true;
	}
	if ((m === exp.length && n !== str.length) || (m !== exp.length && n === str.length)) {
		return false;
	}
	if (exp[m] === '?' || exp[m] === str[n]) {
		return wildCharMatchExpUtil(exp, str, m + 1, n + 1);
	}
	if (exp[m] === '*') {
		return wildCharMatchExpUtil(exp, str, m + 1, n) || wildCharMatchExpUtil(exp, str, m, n + 1);
	}
	return false;
}

function wildCharMatchExpDP(exp: string, str: string): boolean {
	return wildCharMatchExpDPUtil(exp, str, exp.length, str.length);
}

function wildCharMatchExpDPUtil(exp: string, str: string, m: number, n: number): boolean {
	const lookup: boolean[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
    lookup[0][0] = true; // empty exp and empty str match.

    // 0 row will remain all false. empty exp can't match any str.
    // '*' can match with empty string, column 0 update.
    for (let i = 1; i <= m; i++) {
        if (exp[i-1] == '*')
            lookup[i][0] = lookup[i-1][0];
        else
            break;
    }

    // Fill the table in bottom-up fashion
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // If we see a '*' in pattern:
            // 1) We ignore '*' character and consider 
            // next character in the pattern.
            // 2) We ignore one character in the input str
            // and consider next character.
            if (exp[i-1] == '*')
                lookup[i][j] = lookup[i-1][j] || lookup[i][j-1];

            // Condition when both the pattern and input string
            // have same character. Also '?' match with all the
            // characters.
            else if (exp[i-1] == '?' || str[j-1] == exp[i-1])
                lookup[i][j] = lookup[i-1][j-1];

            // If characters don't match
            else
                lookup[i][j] = false;
        }
    }

    return lookup[m][n];
}

console.log("wildCharMatchExp: " + wildCharMatchExp("*llo,?World?", "Hello, World!"));
console.log("wildCharMatchExp: " + wildCharMatchExpDP("*llo,?World?", "Hello, World!"));

/*
wildCharMatchExp: true
wildCharMatchExp: true
*/
