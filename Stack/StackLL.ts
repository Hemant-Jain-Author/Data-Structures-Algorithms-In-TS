class StackNode {
    value: number;
    next: StackNode;

    public constructor(v: number, n: StackNode) {
        this.value = v;
        this.next = n;
    }
}

class StackLL {
    head: StackNode = null;
    __size: number = 0;

    public size(): number {
        return this.__size;
    }

    public isEmpty(): boolean {
        return this.__size === 0;
    }

    public peek(): number {
        if (this.isEmpty()) {
            throw "StackEmptyException";
        }
        return this.head.value;
    }

    public push(value: number) {
        this.head = new StackNode(value, this.head);
        this.__size++;
    }

    public pop(): number {
        if (this.isEmpty()) {
            throw "StackEmptyException";
        }
        let value: number = this.head.value;
        this.head = this.head.next;
        this.__size--;
        return value;
    }

    public insertAtBottom(value: number) {
        if (this.isEmpty()) {
            this.push(value);
        } else {
            let temp: number = this.pop();
            this.insertAtBottom(value);
            this.push(temp);
        }
    }

    public print() {
        let temp: StackNode = this.head;
        let result: string = "Stack: ";
        while ((temp != null)) {
            result += (temp.value + " ");
            temp = temp.next;
        };
        console.log(result);
    }

}

// Testing code.
let s: StackLL = new StackLL();
s.push(1);
s.push(2);
s.push(3);
s.print();
console.info(s.pop());
console.info(s.pop());
s.print();
