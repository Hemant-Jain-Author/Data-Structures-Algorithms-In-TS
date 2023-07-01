class Stack<T> {
    capacity: number = 1000;
    data: Array<T>;
    __top: number = -1;

    public constructor(size: number = 1000) {
        this.capacity = size;
        this.__top = -1;
        this.data = new Array<T>(size);
    }

    public size(): number {
        return (this.__top + 1);
    }

    public isEmpty(): boolean {
        return (this.__top === -1);
    }

    public push(value: T) {
        if (this.size() === this.data.length) {
            throw "StackOvarflowException";
        }
        this.__top++;
        this.data[this.__top] = value;
    }

    public top(): T {
        if (this.isEmpty()) {
            throw "StackEmptyException";
        }
        return this.data[this.__top];
    }

    public pop(): T {
        if (this.isEmpty()) {
            throw "StackEmptyException";
        }
        let topVal: T = this.data[this.__top];
        this.__top--;
        return topVal;
    }

    public print() {
        let output = "Stack: ";
        for (let i: number = this.__top; i > -1; i--) {
            output += (this.data[i] + " ");
        };
        console.log(output);
    }

}

// Testing code.
let s: Stack<number> = new Stack<number>();
s.push(1);
s.push(2);
s.push(3);
s.print();
console.info(s.pop());
console.info(s.pop());
s.print();
