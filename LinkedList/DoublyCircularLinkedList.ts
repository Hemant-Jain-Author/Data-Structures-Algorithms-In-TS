class DCLLNode {
    value : number;
    next : DCLLNode;
    prev : DCLLNode;

    public constructor(v : number, nxt : DCLLNode = null, prv : DCLLNode = null) {
        this.value = v;
        this.next = nxt;
        this.prev = prv;
    }
}

class DoublyCircularLinkedList {
    head : DCLLNode = null;
    tail : DCLLNode = null;
    _size : number = 0;

    public size() : number {
        return this._size;
    }

    public isEmpty() : boolean {
        return this._size === 0;
    }

    public peekHead() : number {
        if(this.isEmpty()) 
            throw "EmptyListException";
        return this.head.value;
    }

    public addHead(value : number) {
        let newNode : DCLLNode = new DCLLNode(value, null, null);
        if(this._size === 0) {
            this.tail = this.head = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        } else {
            newNode.next = this.head;
            newNode.prev = this.head.prev;
            this.head.prev = newNode;
            newNode.prev.next = newNode;
            this.head = newNode;
        }
        this._size++;
    }

    public addTail(value : number) {
        let newNode : DCLLNode = new DCLLNode(value, null, null);
        if(this._size === 0) {
            this.head = this.tail = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        } else {
            newNode.next = this.tail.next;
            newNode.prev = this.tail;
            this.tail.next = newNode;
            newNode.next.prev = newNode;
            this.tail = newNode;
        }
        this._size++;
    }

    public removeHead() : number {
        if(this._size === 0) 
            "EmptyListException";
        let value : number = this.head.value;
        this._size--;
        if(this._size === 0) {
            this.head = null;
            this.tail = null;
            return value;
        }
        let next : DCLLNode = this.head.next;
        next.prev = this.tail;
        this.tail.next = next;
        this.head = next;
        return value;
    }

    public removeTail() : number {
        if(this._size === 0) 
            throw "EmptyListException";
        let value : number = this.tail.value;
        this._size--;
        if(this._size === 0) {
            this.head = null;
            this.tail = null;
            return value;
        }
        let prev : DCLLNode = this.tail.prev;
        prev.next = this.head;
        this.head.prev = prev;
        this.tail = prev;
        return value;
    }

    public isPresent(key : number) : boolean {
        let temp : DCLLNode = this.head;
        if(this.head == null) 
            return false;
        do {
            if(temp.value === key) 
                return true;
            temp = temp.next;
        } while(temp !== this.head);
        return false;
    }

    public deleteList() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    public print() {
        if(this.isEmpty()) {
            return;
        }
        let temp : DCLLNode = this.head;
        let result : string = "";

        while(temp !== this.tail) {
            result += (temp.value + " ");
            temp = temp.next;
        };
        result += temp.value;
        console.info(result);
    }
}


function main() {
    let ll : DoublyCircularLinkedList = new DoublyCircularLinkedList();
    ll.addHead(1);
    ll.addHead(2);
    ll.addHead(3);
    ll.addHead(1);
    ll.addHead(2);
    ll.addHead(3);
    ll.print();
}

main();