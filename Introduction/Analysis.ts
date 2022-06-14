function fun1(n : number) : number {
    let m : number = 0;
    for(let i : number = 0; i < n; i++) {
        m += 1;
    };
    return m;
}

function fun2(n : number) : number {
    let i : number;
    let j : number;
    let m : number = 0;
    for(i = 0; i < n; i++) {
        for(j = 0; j < n; j++) {
            m += 1;
        };
    };
    return m;
}

function fun3(n: number): number {
    let i : number;
    let j : number;
    let k : number;
    let m : number = 0;
    for(i = 0; i < n; i++) {
        for(j = 0; j < n; j++) {
            for(k = 0; k < n; k++) {
                m += 1;
            };
        };
    };
    return m;
}

function fun4(n : number) : number {
    let i : number;
    let j : number;
    let k : number;
    let m : number = 0;
    for(i = 0; i < n; i++) {
        for(j = i; j < n; j++) {
            for(k = j + 1; k < n; k++) {
                m += 1;
            };
        };
    };
    return m;
}

function fun5(n : number) : number {
    let i : number;
    let j : number;
    let m : number = 0;
    for(i = 0; i < n; i++) {
        for(j = 0; j < i; j++) {
            m += 1;
        };
    };
    return m;
}

function fun6(n : number) : number {
    let i : number;
    let j : number;
    let m : number = 0;
    for(i = 0; i < n; i++) {
        for(j = i; j > 0; j--) {
            m += 1;
        };
    };
    return m;
}

function fun7(n: number): number {
    let i : number;
    let j : number;
    let m : number = 0;
    for(i = n; i > 1; i /= 2) {
        for(j = 0; j < i; j++) {
            m += 1;
        };
    };
    return m;
}

function fun8(n: number): number {
    let i : number;
    let j : number = 0;
    let m : number = 0;
    for(i = 1; i <= n; i *= 2) {
        for(j = 0; j <= i; j++) {
            m += 1;
        };
    };
    return m;
}

function fun9(n : number) : number {
    let i : number;
    let m : number = 0;
    i = 1;
    while(i < n) {
        m += 1;
        i = i * 2;
    };
    return m;
}

function fun10(n : number) : number {
    let i : number;
    let m : number = 0;
    i = n;
    while(i > 0) {
        m += 1;
        i = (i / 2|0);
    };
    return m;
}

function fun11(n : number) : number {
    let i : number;
    let j : number;
    let k : number;
    let m : number = 0;
    for(i = 0; i < n; i++) {
        for(j = 0; j < n; j++) {
            m += 1;
        };
    };
    for(i = 0; i < n; i++) {
        for(k = 0; k < n; k++) {
            m += 1;
        };
    };
    return m;
}

function fun12(n : number) : number {
    let i : number;
    let j : number;
    let m : number = 0;
    for(i = 0; i < n; i++) {
        for(j = 0; j < Math.sqrt(n); j++) {
            m += 1;
        };
    };
    return m;
}

function fun13(n : number) : number {
    let i : number;
    let j : number = 0;
    let m : number = 0;
    for(i = 0; i < n; i++) {
        for(; j < n; j++) {
            m += 1;
        };
    };
    return m;
}

function main() {
    console.info(fun1(100));
    console.info(fun2(100));
    console.info(fun3(100));
    console.info(fun4(100));
    console.info(fun5(100));
    console.info(fun6(100));
    console.info(fun7(100));
    console.info(fun8(100));
    console.info(fun9(100));
    console.info(fun10(100));
    console.info(fun11(100));
    console.info(fun12(100));
    console.info(fun13(100));
}

main();