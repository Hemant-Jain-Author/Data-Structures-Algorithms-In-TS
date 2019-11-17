class QueueUsingStack<T> {
    stk1 : Array<T>;
    stk2 : Array<T>;

    public constructor() {
        this.stk1 = new Array<T>();
        this.stk2 = new Array<T>();
    }

    add(value : T) {
        this.stk1.push(value);
    }

    length() : number  {
        return (this.stk1.length + this.stk2.length);
    }

    isEmpty() : boolean  {
        return (this.stk1.length + this.stk2.length) === 0;
    }

    remove() : T {
        let value : T;
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

let que : QueueUsingStack<number> = new QueueUsingStack<number>();
que.add(1);
que.add(11);
que.add(111);
console.info(que.remove());
console.info(que.remove());
