function fibonacci(n : number) : number {
    if(n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function fibonacci2(n : number) : number {
    let first : number = 0;
    let second : number = 1;
    let temp : number = 0;
    if(n === 0) 
        return first; 
    else if(n === 1) 
        return second;
    
    let i : number = 2;
    while(i <= n) {
        temp = first + second;
        first = second;
        second = temp;
        i += 1;
    };
    return temp;
}

function main1(){
    console.log("fibonacci(10) : " , fibonacci(10))
}

function Feasible(Q :  Array<number>, k : number) : boolean {
    for(let i : number = 0; i < k; i++) {
        if(Q[k] === Q[i] || Math.abs(Q[i] - Q[k]) === Math.abs(i - k)) {
            return false;
        }
    };
    return true;
}

function NQueens(Q :  Array<number>, k : number, n : number) {
    if(k === n) {
        console.log(Q);
        return;
    }
    for(let i : number = 0; i < n; i++) {
        Q[k] = i;
        if(Feasible(Q, k)) {
            NQueens(Q, k + 1, n);
        }
    };
}

function main2() {
    let Q :  Array<number> = [0, 0, 0, 0, 0, 0, 0, 0];
    NQueens(Q, 0, 8);
}

function TOHUtil(num : number, from : string, to : string, temp : string) {
    if(num < 1) {
        return;
    }
    TOHUtil(num - 1, from, temp, to);
    console.info("Move disk " + num + " from peg " + from + " to peg " + to);
    TOHUtil(num - 1, temp, to, from);
}

function TowersOfHanoi(num : number) {
    console.info("The sequence of moves involved in the Tower of Hanoi are :");
    TOHUtil(num, 'A', 'C', 'B');
}

function main3() {
    TowersOfHanoi(3);
}

function isPrime(n : number) : number {
    let answer : number = (n > 1)?1:0;
    for(let i : number = 2; i * i <= n; ++i) {
        if(n % i === 0) {
            answer = 1;
            break;
        }
    };
    return answer;
}

function main4(){
    console.log(isPrime(7));
}


main1()
main2()
main3()
main4()