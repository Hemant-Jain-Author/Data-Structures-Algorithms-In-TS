class QueueNode<T> {
    value : T;
    next : QueueNode<T>;

    public constructor(v : T, n : QueueNode<T>) {
        this.value = v;
        this.next = n;
    }
}

class QueueLL<T> {
    tail : QueueNode<T> = null;
    _size : number = 0;

    public size() : number {
        return this._size;
    }

    public isEmpty() : boolean {
        return this._size === 0;
    }

    public peek() : T {
        if(this.isEmpty()) 
            throw "StackEmptyException";
        if(this.tail === this.tail.next) 
            return this.tail.value; 
        else 
            return this.tail.next.value;
    }

    public add(value : T) {
        let temp : QueueNode<T> = new QueueNode<T>(value, null);
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

    public remove() : T {
        if(this.isEmpty()) 
            throw "StackEmptyException";
        let value : T;
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

let q : QueueLL<number> = new QueueLL<number>();
q.add(1);
q.add(2);
q.add(3);
for(let i : number = 0; i < 3; i++) {
    console.info(q.remove());
}
