function fibonacci(n: number): number {
    if (n < 2) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function fibonacci2(n: number): number {
    if (n < 2) {
        return n;
    }
    
    let first: number = 0;
    let second: number = 1;
    let temp: number = 0;
    
    for(let i: number = 2; i <= n; i += 1) {
        temp = first + second;
        first = second;
        second = temp;
    }
    return temp;
}

function main1() {
    console.log("fibonacci(10):", fibonacci(10))
    console.log("fibonacci2(10):", fibonacci2(10))
}


/*
fibonacci(10): 55
fibonacci2(10): 55
*/

function Feasible(Q: Array<number>, k: number): boolean {
    for (let i: number = 0; i < k; i++) {
        if (Q[k] === Q[i] || Math.abs(Q[i] - Q[k]) === Math.abs(i - k)) {
            return false;
        }
    };
    return true;
}

function NQueens(Q: Array<number>, k: number, n: number) {
    if (k === n) {
        console.log(Q);
        return;
    }
    for (let i: number = 0; i < n; i++) {
        Q[k] = i;
        if (Feasible(Q, k)) {
            NQueens(Q, k + 1, n);
        }
    };
}

function main2() {
    let Q: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0];
    NQueens(Q, 0, 8);
}

/*
[ 0, 4, 7, 5, 2, 6, 1, 3 ]
[ 0, 5, 7, 2, 6, 3, 1, 4 ]
.....
[ 7, 2, 0, 5, 1, 4, 6, 3 ]
[ 7, 3, 0, 2, 5, 1, 6, 4 ]
*/


function TOHUtil(num: number, from: string, to: string, temp: string) {
    if (num < 1) {
        return;
    }
    TOHUtil(num - 1, from, temp, to);
    console.info("Move disk " + num + " from peg " + from + " to peg " + to);
    TOHUtil(num - 1, temp, to, from);
}

function TowersOfHanoi(num: number) {
    console.info("The sequence of moves involved in the Tower of Hanoi are :");
    TOHUtil(num, 'A', 'C', 'B');
}

function main3() {
    TowersOfHanoi(3);
}

/*
The sequence of moves involved in the Tower of Hanoi are :
Move disk 1 from peg A to peg C
Move disk 2 from peg A to peg B
Move disk 1 from peg C to peg B
Move disk 3 from peg A to peg C
Move disk 1 from peg B to peg A
Move disk 2 from peg B to peg C
Move disk 1 from peg A to peg C
*/


function isPrime(n: number): boolean {
    let answer: boolean = (n > 1) ? true : false;
    for (let i: number = 2; i * i <= n; ++i) {
        if (n % i === 0) {
            answer = false;
            break;
        }
    }
    return answer;
}

function main4() {
    console.log(isPrime(6));
    console.log(isPrime(11));
}

/*
false
true
*/

main1()
main2()
main3()
main4()