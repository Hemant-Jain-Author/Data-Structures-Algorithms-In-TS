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

class NodeStr {
    c: string;
    freq: number;
    left: NodeStr | null;
    right: NodeStr | null;

    constructor(ch: string, fr: number, l: NodeStr | null, r: NodeStr | null) {
        this.c = ch;
        this.freq = fr;
        this.left = l;
        this.right = r;
    }

    compareTo(n2: NodeStr): number {
        return this.freq - n2.freq;
    }
}

function HuffmanTree(arr: string[], freq: number[]): void {
    const n = arr.length;
    const que: PriorityQueue<NodeStr> = new PriorityQueue<NodeStr>((a, b) => a.compareTo(b) > 0);

    for (let i = 0; i < n; i++) {
        const node = new NodeStr(arr[i], freq[i], null, null);
        que.add(node);
    }

    while (que.size > 1) {
        const lt = que.peek();
        que.remove();
        const rt = que.peek();
        que.remove();

        const nd = new NodeStr('+', lt.freq + rt.freq, lt, rt);
        que.add(nd);
    }

    const root = que.peek();
    PrintTree(root, "");
}

function PrintTree(root: NodeStr | null, s: string): void {
    if (root?.left === null && root?.right === null && root.c !== '+') {
        console.log(root.c + " = " + s);
        return;
    }
    PrintTree(root?.left, s + "0");
    PrintTree(root?.right, s + "1");
}

const ar = ['A', 'B', 'C', 'D', 'E'];
const fr = [30, 25, 21, 14, 10];
console.log("Char = Huffman code");
HuffmanTree(ar, fr);

/*
Char = Huffman code
C = 00
E = 010
D = 011
B = 10
A = 11
*/