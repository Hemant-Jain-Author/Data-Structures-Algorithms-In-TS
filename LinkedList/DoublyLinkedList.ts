class DLLNode {
    value: number;
    next: DLLNode;
    prev: DLLNode;

    public constructor(v: any, nxt: DLLNode = null, prv: DLLNode = null) {
        this.value = v;
        this.next = nxt;
        this.prev = prv;
    }
}

class DoublyLinkedList {
    head: DLLNode;
    tail: DLLNode;
    _size: number = 0;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    public size(): number {
        return this._size;
    }

    public isEmpty(): boolean {
        return this._size === 0;
    }

    public peek(): number {
        if (this.isEmpty())
            throw "EmptyListException";
        return this.head.value;
    }

    public addHead(value: number) {
        let newNode: DLLNode = new DLLNode(value, null, null);
        if (this._size === 0) {
            this.tail = this.head = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this._size++;
    }

    public addTail(value: number) {
        let newNode: DLLNode = new DLLNode(value, null, null);
        if (this._size === 0) {
            this.head = this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this._size++;
    }

    public removeHead(): number {
        if (this.isEmpty())
            throw "EmptyListException";
        let value: number = this.head.value;
        this.head = this.head.next;

        if (this.head == null)
            this.tail = null;
        else
            this.head.prev = null;
        this._size--;
        return value;
    }

    public removeNode(key: number): boolean {
        let curr: DLLNode = this.head;
        if (curr == null) return false;
        if (curr.value === key) {
            this.head = this.head.next;
            this._size--;
            if (this.head != null)
                this.head.prev = null;
            else
                this.tail = null;
            return true;
        }
        while (curr.next != null) {
            if (curr.next.value === key) {
                curr.next = curr.next.next;
                if (curr.next == null)
                    this.tail = curr;
                else
                    curr.next = curr;
                this._size--;
                return true;
            }
            curr = curr.next;
        }
        return false;
    }

    public isPresent(key: number): boolean {
        let temp: DLLNode = this.head;
        while (temp != null) {
            if (temp.value === key)
                return true;
            temp = temp.next;
        }
        return false;
    }

    public deleteList() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    public print() {
        let temp: DLLNode = this.head;
        let result: string = "";
        while (temp != null) {
            result += (temp.value + " ");
            temp = temp.next;
        }
        console.info(result);
    }

    public sortedInsert(value: number) {
        let temp: DLLNode = new DLLNode(value);
        let curr: DLLNode = this.head;
        if (curr == null) {
            this.head = temp;
            this.tail = temp;
        }
        if (this.head.value <= value) {
            temp.next = this.head;
            this.head.prev = temp;
            this.head = temp;
        }
        while (curr.next != null && curr.next.value > value) {
            curr = curr.next;
        }
        if (curr.next == null) {
            this.tail = temp;
            temp.prev = curr;
            curr.next = temp;
        } else {
            temp.next = curr.next;
            temp.prev = curr;
            curr.next = temp;
            temp.next.prev = temp;
        }
    }

    public reverseList() {
        let curr: DLLNode = this.head;
        let tempNode: DLLNode;
        while (curr != null) {
            tempNode = curr.next;
            curr.next = curr.prev;
            curr.prev = tempNode;
            if (curr.prev == null) {
                this.tail = this.head;
                this.head = curr;
                return;
            }
            curr = curr.prev;
        }
        return;
    }

    public removeDuplicate() {
        let curr: DLLNode = this.head;
        let deleteMe: DLLNode;
        while (curr != null) {
            if (curr.next != null && curr.value === curr.next.value) {
                deleteMe = curr.next;
                curr.next = deleteMe.next;
                curr.next.prev = curr;
                if (deleteMe === this.tail) {
                    this.tail = curr;
                }
            } else {
                curr = curr.next;
            }
        }
    }

    public copyListReversed(): DoublyLinkedList {
        let dll: DoublyLinkedList = new DoublyLinkedList();
        let curr: DLLNode = this.head;
        while (curr != null) {
            dll.addHead(curr.value);
            curr = curr.next;
        }
        return dll;
    }

    public copyList(): DoublyLinkedList {
        let dll: DoublyLinkedList = new DoublyLinkedList();
        let curr: DLLNode = this.head;
        while (curr != null) {
            dll.addTail(curr.value);
            curr = curr.next;
        }
        return dll;
    }
}

let ll: DoublyLinkedList = new DoublyLinkedList();
ll.addHead(1);
ll.addHead(2);
ll.addHead(3);
ll.addHead(4);
ll.addHead(5);
ll.addHead(6);
ll.removeHead();
ll.deleteList();
ll.print();
ll.addHead(11);
ll.addHead(21);
ll.addHead(31);
ll.addHead(41);
ll.addHead(51);
ll.addHead(61);
ll.print();
