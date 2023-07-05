class Stack<T> {
    private arr: T[];

    constructor() {
        this.arr = [];
    }

    size(): number {
        return this.arr.length;
    }

    isEmpty(): boolean {
        return this.arr.length === 0;
    }

    push(value: T): void {
        this.arr.push(value);
    }

    top(): T {
        if (this.isEmpty()) {
            throw new Error("Stack Empty Exception");
        }
        return this.arr[this.arr.length - 1];
    }

    pop(): T {
        if (this.isEmpty()) {
            throw new Error("Stack Empty Exception");
        }
        return this.arr.pop()!;
    }

    print(): void {
        console.log(this.arr);
    }
}

// Testing code.
const s = new Stack<number>();
s.push(1);
s.push(2);
s.push(3);
s.print();
console.log(s.pop());
console.log(s.pop());
console.log(s.pop());

/*
[ 1, 2, 3 ]
3
2
1
*/
