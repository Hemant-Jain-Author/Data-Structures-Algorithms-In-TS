function fun1(n: number): number {
    let m = 0;
    for (let i = 0; i < n; i++) {
        m += 1;
    }
    return m;
}

function fun2(n: number): number {
    let m = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            m += 1;
        }
    }
    return m;
}

function fun3(n: number): number {
    let m = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                m += 1;
            }
        }
    }
    return m;
}

function fun4(n: number): number {
    let m = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            for (let k = j + 1; k < n; k++) {
                m += 1;
            }
        }
    }
    return m;
}

function fun5(n: number): number {
    let m = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            m += 1;
        }
    }
    return m;
}

function fun6(n: number): number {
    let m = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i; j > 0; j--) {
            m += 1;
        }
    }
    return m;
}

function fun7(n: number): number {
    let m = 0;
    for (let i = n; i > 1; i /= 2) {
        for (let j = 0; j < i; j++) {
            m += 1;
        }
    }
    return m;
}

function fun8(n: number): number {
    let m = 0;
    for (let i = 1; i <= n; i *= 2) {
        for (let j = 0; j <= i; j++) {
            m += 1;
        }
    }
    return m;
}

function fun9(n: number): number {
    let m = 0;
    let i = 1;
    while (i < n) {
        m += 1;
        i = i * 2;
    }
    return m;
}

function fun10(n: number): number {
    let m = 0;
    let i = n;
    while (i > 0) {
        m += 1;
        i = (i / 2) | 0;
    }
    return m;
}

function fun11(n: number): number {
    let m = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            m += 1;
        }
    }
    for (let i = 0; i < n; i++) {
        for (let k = 0; k < n; k++) {
            m += 1;
        }
    }
    return m;
}

function fun12(n: number): number {
    let m = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < Math.sqrt(n); j++) {
            m += 1;
        }
    }
    return m;
}

function fun13(n: number): number {
    let i: number;
    let j: number = 0;
    let m: number = 0;
    for (i = 0; i < n; i++) {
        for (; j < n; j++) {
            m += 1;
        }
    }
    return m;
}

console.log('Number of instructions O(n):', fun1(100));
console.log('Number of instructions O(n^2):', fun2(100));
console.log('Number of instructions O(n^3):', fun3(100));
console.log('Number of instructions O(n^3):', fun4(100));
console.log('Number of instructions O(n^2):', fun5(100));
console.log('Number of instructions O(n^2):', fun6(100));
console.log('Number of instructions O(n):', fun7(100));
console.log('Number of instructions O(n):', fun8(100));
console.log('Number of instructions O(log(n)):', fun9(100));
console.log('Number of instructions O(log(n)):', fun10(100));
console.log('Number of instructions O(n^2):', fun11(100));
console.log('Number of instructions O(n^(3/2)):', fun12(100));
console.log('Number of instructions O(n):', fun13(100));

/*
Number of instructions O(n): 100
Number of instructions O(n^2): 10000
Number of instructions O(n^3): 1000000
Number of instructions O(n^3): 166650
Number of instructions O(n^2): 4950
Number of instructions O(n^2): 4950
Number of instructions O(n): 201
Number of instructions O(n): 134
Number of instructions O(log(n)): 7
Number of instructions O(log(n)): 7
Number of instructions O(n^2): 20000
Number of instructions O(n^(3/2)): 1000
Number of instructions O(n): 100
*/