class StackNode<T> {
    value: T;
    next: StackNode<T> | null;

    constructor(v: T, n: StackNode<T> | null) {
        this.value = v;
        this.next = n;
    }
}

class Stack<T> {
    head: StackNode<T> | null;
    length: number;

    constructor() {
        this.head = null;
        this.length = 0;
    }

    size(): number {
        return this.length;
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

    peek(): T {
        if (this.isEmpty()) {
            throw new Error("StackEmptyError");
        }
        return this.head!.value;
    }

    push(value: T): void {
        this.head = new StackNode(value, this.head);
        this.length++;
    }

    pop(): T {
        if (this.isEmpty()) {
            throw new Error("StackEmptyError");
        }
        const value = this.head!.value;
        this.head = this.head!.next;
        this.length--;
        return value;
    }

    insertAtBottom(value: T): void {
        if (this.isEmpty()) {
            this.push(value);
        } else {
            const temp = this.pop();
            this.insertAtBottom(value);
            this.push(temp);
        }
    }

    print(): void {
        let out = "";
        let temp = this.head;
        while (temp !== null) {
            out += temp.value + " ";
            temp = temp.next;
        }
        console.log(out);
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
