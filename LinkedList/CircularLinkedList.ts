class CLNode {
    public value : number;
    public next : CLNode;

    public constructor(v : number, n : CLNode = null) {
        this.value = v;            
        this.next = n;            
    }
}

class CircularLinkedList {
    tail : CLNode;
    _size : number = 0;

    public size() : number {
        return this._size;
    }

    public isEmpty() : boolean {
        return this._size === 0;
    }

    public peek() : number {
        if(this.isEmpty()) 
            throw "EmptyListException";
        return this.tail.next.value;
    }

    public addTail(value : number) {
        let temp : CLNode = new CLNode(value, null);
        if(this.isEmpty()) {
            this.tail = temp;
            temp.next = temp;
        } else {
            temp.next = this.tail.next;
            this.tail.next = temp;
            this.tail = temp;
        }
        this._size++;
    }

    public addHead(value : number) {
        let temp : CLNode = new CLNode(value, null);
        if(this.isEmpty()) {
            this.tail = temp;
            temp.next = temp;
        } else {
            temp.next = this.tail.next;
            this.tail.next = temp;
        }
        this._size++;
    }

    public removeHead() : number {
        if(this.isEmpty()) {
            throw "EmptyListException";
        }
        let value : number = this.tail.next.value;
        if(this.tail === this.tail.next) 
            this.tail = null; 
        else 
            this.tail.next = this.tail.next.next;
        this._size--;
        return value;
    }

    public removeNode(key : number) : boolean {
        if(this.isEmpty()) {
            return false;
        }
        let prev : CLNode = this.tail;
        let curr : CLNode = this.tail.next;
        let head : CLNode = this.tail.next;
        if(curr.value === key) {
            if(curr === curr.next) 
                this.tail = null; 
            else 
                this.tail.next = this.tail.next.next;
            return true;
        }
        prev = curr;
        curr = curr.next;
        while(curr !== head) {
            if(curr.value === key) {
                if(curr === this.tail) 
                    this.tail = prev;
                prev.next = curr.next;
                return true;
            }
            prev = curr;
            curr = curr.next;
        }
        return false;
    }

    public copyListReversed() : CircularLinkedList {
        let cl : CircularLinkedList = new CircularLinkedList();
        let curr : CLNode = this.tail.next;
        let head : CLNode = curr;
        if(curr != null) {
            cl.addHead(curr.value);
            curr = curr.next;
        }
        while(curr !== head) {
            cl.addHead(curr.value);
            curr = curr.next;
        }
        return cl;
    }

    public copyList() : CircularLinkedList {
        let cl : CircularLinkedList = new CircularLinkedList();
        let curr : CLNode = this.tail.next;
        let head : CLNode = curr;
        if(curr != null) {
            cl.addTail(curr.value);
            curr = curr.next;
        }
        while(curr !== head) {
            cl.addTail(curr.value);
            curr = curr.next;
        }
        return cl;
    }

    public searchList(data : number) : boolean {
        let temp : CLNode = this.tail;
        for(let i : number = 0; i < this._size; i++) {
            if(temp.value === data) 
                return true;
            temp = temp.next;
        }
        return false;
    }

    public deleteList() {
        this.tail = null;
        this._size = 0;
    }

    public print() {
        if(this.isEmpty()) {
            return;
        }
        let result : string = "";
        let temp : CLNode = this.tail.next;
        while((temp !== this.tail)) {
            result += (temp.value + " ");
            temp = temp.next;
        }
        result += temp.value
        console.info(result);
    }


    constructor() {
        if(this.tail===undefined) this.tail = null;
    }
}

let ll : CircularLinkedList = new CircularLinkedList();
ll.addHead(1);
ll.addHead(2);
ll.addHead(3);
ll.addHead(1);
ll.addHead(2);
ll.addHead(3);
ll.print();
