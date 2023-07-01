class TwoStack {
    MAX_SIZE: number = 50;
    top1: number;
    top2: number;
    data: Array<number>;

    public constructor() {
        this.top1 = -1;
        this.top2 = this.MAX_SIZE;
        this.data = new Array(this.MAX_SIZE);
    }

    public Push1(value: number) {
        if (this.top1 < this.top2 - 1) {
            this.data[++this.top1] = value;
        } else {
            console.info("Stack is Full!");
        }
    }

    public Push2(value: number) {
        if (this.top1 < this.top2 - 1) {
            this.data[--this.top2] = value;
        } else {
            console.info("Stack is Full!");
        }
    }

    public Pop1(): number {
        if (this.top1 >= 0) {
            let value: number = this.data[this.top1--];
            return value;
        } else {
            console.info("Stack Empty!");
        }
        return -999;
    }

    public Pop2(): number {
        if (this.top2 < this.MAX_SIZE) {
            let value: number = this.data[this.top2++];
            return value;
        } else {
            console.info("Stack Empty!");
        }
        return -999;
    }
}

// Testing code.
let st: TwoStack = new TwoStack();
for (let i: number = 0; i < 10; i++) {
    st.Push1(i);
};
for (let j: number = 0; j < 10; j++) {
    st.Push2(j + 10);
};
for (let i: number = 0; i < 10; i++) {
    console.info("stack one pop value is : " + st.Pop1());
    console.info("stack two pop value is : " + st.Pop2());
};
