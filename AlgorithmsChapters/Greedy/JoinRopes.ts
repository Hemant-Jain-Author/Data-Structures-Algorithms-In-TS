class PriorityQueue<T> {
    static CAPACITY: number = 32;
    size: number;
    arr: Array<T>;
    compare: (a: T, b: T) => boolean;

    public constructor(cmp: (a: T, b: T) => boolean) {
        this.compare = cmp;
        this.arr = new Array<T>(PriorityQueue.CAPACITY);
        this.size = 0;
    }

    proclateDown(parent: number) {
        let lChild: number = 2 * parent + 1;
        let rChild: number = lChild + 1;
        let child: number = -1;
        let temp: T;
        if (lChild < this.size) {
            child = lChild;
        }
        if (rChild < this.size && this.compare(this.arr[lChild], this.arr[rChild])) {
            child = rChild;
        }
        if (child !== -1 && this.compare(this.arr[parent], this.arr[child])) {
            temp = this.arr[parent];
            this.arr[parent] = this.arr[child];
            this.arr[child] = temp;
            this.proclateDown(child);
        }
    }

    proclateUp(child: number) {
        let parent: number = Math.floor((child - 1) / 2);
        let temp: T;
        if (parent < 0) {
            return;
        }
        if (this.compare(this.arr[parent], this.arr[child])) {
            temp = this.arr[child];
            this.arr[child] = this.arr[parent];
            this.arr[parent] = temp;
            this.proclateUp(parent);
        }
    }

    public add(value: T) {
        if (this.size === this.arr.length) {
            this.doubleSize();
        }

        this.arr[this.size++] = value;
        this.proclateUp(this.size - 1);
    }

    private doubleSize() {
        let old: Array<T> = this.arr;
        let newSize = this.size * 2;
        this.arr = new Array<T>(newSize);
        /* arraycopy */
        var size = this.size;
        for (let i = 0; i < size; i++) {
            this.arr[i] = old[i];
        }
    }

    public remove(): T {
        if (this.isEmpty()) {
            throw new Error("IllegalStateException");
        }
        let value: T = this.arr[0];
        this.arr[0] = this.arr[this.size - 1];
        this.size--;
        this.proclateDown(0);
        return value;
    }

    public PrintTree() {
        console.info(this.arr);
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }

    public length(): number {
        return this.size;
    }

    public peek(): T {
        if (this.isEmpty()) {
            throw new Error("IllegalStateException");
        }
        return this.arr[0];
    }
}


function joinRopes(ropes: number[], size: number): number {
    ropes.sort();
    for (let i = 0, j = size - 1; i < j; i++, j--) {
        let temp = ropes[i];
        ropes[i] = ropes[j];
        ropes[j] = temp;
    }
    let total = 0;
    let value = 0;
    let index: number;
    let length = size;

    while (length >= 2) {
        value = ropes[length - 1] + ropes[length - 2];
        total += value;
        index = length - 2;
        while (index > 0 && ropes[index - 1] < value) {
            ropes[index] = ropes[index - 1];
            index -= 1;
        }
        ropes[index] = value;
        length--;
    }
    console.log("Total: " + total);
    return total;
}

function joinRopes2(ropes: number[], size: number): number {
    const pq: PriorityQueue<number> = new PriorityQueue<number>((a, b) => a > b);
    let i = 0;
    for (i = 0; i < size; i++) {
        pq.add(ropes[i]);
    }

    let total = 0;
    let value = 0;
    while (pq.length() > 1) {
        value = pq.remove();
        value += pq.remove();
        pq.add(value);
        total += value;
    }
    console.log("Total: " + total);
    return total;
}

/* Testing Code */
const ropes: number[] = [4, 3, 2, 6];
joinRopes(ropes, ropes.length);
const rope2: number[] = [4, 3, 2, 6];
joinRopes2(rope2, rope2.length);

/*
Total: 29
Total: 29
*/