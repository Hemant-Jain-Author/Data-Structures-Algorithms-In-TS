class QueueNode {
    value : number;
    next : QueueNode;

    public constructor(v : number, n : QueueNode) {
        this.value = v;
        this.next = n;
    }
}

class QueueLL {
    tail : QueueNode = null;
    _size : number = 0;

    public size() : number {
        return this._size;
    }

    public isEmpty() : boolean {
        return this._size === 0;
    }

    public peek() : number {
        if(this.isEmpty()) throw Object.defineProperty(new Error("StackEmptyException"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.IllegalStateException','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
        let value : number;
        if(this.tail === this.tail.next) value = this.tail.value; else value = this.tail.next.value;
        return value;
    }

    public add(value : number) {
        let temp : QueueNode = new QueueNode(value, null);
        if(this.tail == null) {
            this.tail = temp;
            this.tail.next = this.tail;
        } else {
            temp.next = this.tail.next;
            this.tail.next = temp;
            this.tail = temp;
        }
        this._size++;
    }

    public remove() : number {
        if(this.isEmpty()) throw Object.defineProperty(new Error("StackEmptyException"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.IllegalStateException','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
        let value : number = 0;
        if(this.tail === this.tail.next) {
            value = this.tail.value;
            this.tail = null;
        } else {
            value = this.tail.next.value;
            this.tail.next = this.tail.next.next;
        }
        this._size--;
        return value;
    }
}

function main() {
    let q : QueueLL = new QueueLL();
    q.add(1);
    q.add(2);
    q.add(3);
    for(let i : number = 0; i < 3; i++) {
        console.info(q.remove());
    }
}

main();