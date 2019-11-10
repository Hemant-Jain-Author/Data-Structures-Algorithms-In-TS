class QueueUsingStack {
    stk1 : Array<number>;
    stk2 : Array<number>;

    public constructor() {
        this.stk1 = new Array<number>();
        this.stk2 = new Array<number>();
    }

    add(value : number) {
        this.stk1.push(value);
    }

    length() : number  {
        return (this.stk1.length + this.stk2.length);
    }

    isEmpty() : boolean  {
        return (this.stk1.length + this.stk2.length) === 0;
    }

    remove() : number {
        let value : number;
        if (this.stk2.length > 0) {
            return this.stk2.pop();
        }
        while (this.stk1.length > 0) {
            value = this.stk1.pop();
            this.stk2.push(value);
        };
        return this.stk2.pop();
    }
}

let que : QueueUsingStack = new QueueUsingStack();
que.add(1);
que.add(11);
que.add(111);
console.info(que.remove());
console.info(que.remove());
