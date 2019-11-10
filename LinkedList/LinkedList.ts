class LNode {
    public value : number;
    public next : LNode;

    public constructor(v : number, n : LNode) {
        if(this.value===undefined) this.value = 0;
        if(this.next===undefined) 
            this.next = null;
        else 
            this.next = n;
    }
}

class LinkedList {
    head : LNode;
    _size : number = 0;

    constructor() {
        this.head = null;
    }

    public size() : number {
        return this._size;
    }

    public isEmpty() : boolean {
        return this._size === 0;
    }

    public peek() : number {
        if(this.isEmpty()) throw Object.defineProperty(new Error("EmptyListException"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.IllegalStateException','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
        return this.head.value;
    }

    public addHead(value : number) {
        this.head = new LNode(value, this.head);
        this._size++;
    }

    public addTail(value : number) {
        let newNode : LNode = new LNode(value, null);
        let curr : LNode = this.head;
        if(this.head == null) {
            this.head = newNode;
        }
        while(curr.next != null) {
            curr = curr.next;
        }
        curr.next = newNode;
    }

    public removeHead() : number {
        if(this.isEmpty()) throw Object.defineProperty(new Error("EmptyListException"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.IllegalStateException','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
        let value : number = this.head.value;
        this.head = this.head.next;
        this._size--;
        return value;
    }

    public searchList(data : number) : boolean {
        let temp : LNode = this.head;
        while(temp != null) {
            if(temp.value === data) return true;
            temp = temp.next;
        }
        return false;
    }

    public deleteNode(delValue : number) : boolean {
        let temp : LNode = this.head;
        if(this.isEmpty()) return false;
        if(delValue === this.head.value) {
            this.head = this.head.next;
            this._size--;
            return true;
        }
        while(temp.next != null) {
            if(temp.next.value === delValue) {
                temp.next = temp.next.next;
                this._size--;
                return true;
            }
            temp = temp.next;
        }
        return false;
    }

    public deleteNodes(delValue : number) {
        let currNode : LNode = this.head;
        let nextNode : LNode;
        while(currNode != null && currNode.value === delValue) {
            this.head = currNode.next;
            currNode = this.head;
        }
        while(currNode != null) {
            nextNode = currNode.next;
            if(nextNode != null && nextNode.value === delValue) {
                currNode.next = nextNode.next;
            } else {
                currNode = nextNode;
            }
        }
    }

    public reverseRecurseUtil(currentNode : LNode, nextNode : LNode) : LNode {
        let ret : LNode;
        if(currentNode == null) return null;
        if(currentNode.next == null) {
            currentNode.next = nextNode;
            return currentNode;
        }
        ret = this.reverseRecurseUtil(currentNode.next, currentNode);
        currentNode.next = nextNode;
        return ret;
    }

    public reverseRecurse() {
        this.head = this.reverseRecurseUtil(this.head, null);
    }

    public reverse() {
        let curr : LNode = this.head;
        let prev : LNode = null;
        let next : LNode = null;
        while(curr != null) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        this.head = prev;
    }

    public copyListReversed() : LinkedList {
        let tempNode : LNode = null;
        let tempNode2 : LNode = null;
        let curr : LNode = this.head;
        while(curr != null) {
            tempNode2 = new LNode(curr.value, tempNode);
            curr = curr.next;
            tempNode = tempNode2;
        }
        let ll2 : LinkedList = new LinkedList();
        ll2.head = tempNode;
        return ll2;
    }

    public copyList() : LinkedList {
        let headNode : LNode = null;
        let tailNode : LNode = null;
        let tempNode : LNode = null;
        let curr : LNode = this.head;
        if(curr == null) return null;
        headNode = new LNode(curr.value, null);
        tailNode = headNode;
        curr = curr.next;
        while(curr != null) {
            tempNode = new LNode(curr.value, null);
            tailNode.next = tempNode;
            tailNode = tempNode;
            curr = curr.next;
        }
        let ll2 : LinkedList = new LinkedList();
        ll2.head = headNode;
        return ll2;
    }

    public compareList$LinkedList(ll : LinkedList) : boolean {
        return this.compareList$LinkedList_Node$LinkedList_Node(this.head, ll.head);
    }

    public compareList$LinkedList_Node$LinkedList_Node(head1 : LNode, head2 : LNode) : boolean {
        if(head1 == null && head2 == null) 
            return true; 
        else if((head1 == null) || (head2 == null) || (head1.value !== head2.value)) 
            return false; 
        else 
            return this.compareList$LinkedList_Node$LinkedList_Node(head1.next, head2.next);
    }

    public compareList(head1? : any, head2? : any) : any {
        if(((head1 != null && head1 instanceof <any>LNode) || head1 === null) && 
        ((head2 != null && head2 instanceof <any>LNode) || head2 === null)) {
            return <any>this.compareList$LinkedList_Node$LinkedList_Node(head1, head2);
        } else if(((head1 != null && head1 instanceof <any>LinkedList) || head1 === null) && 
        (head2 === undefined)) {
            return <any>this.compareList$LinkedList(head1);
        } else throw new Error('invalid overload');
    }

    public compareList2(ll2 : LinkedList) : boolean {
        let head1 : LNode = this.head;
        let head2 : LNode = ll2.head;
        while(head1 == null && head2 == null) {
            if(head1.value !== head2.value) return false;
            head1 = head1.next;
            head2 = head2.next;
        }
        if(head1 == null && head2 == null) return true;
        return false;
    }

    public findLength() : number {
        let curr : LNode = this.head;
        let count : number = 0;
        while(curr != null) {
            count++;
            curr = curr.next;
        }
        return count;
    }

    public nthNodeFromBegining(index : number) : number {
        if(index > this.size() || index < 1) return 2147483647;
        let count : number = 0;
        let curr : LNode = this.head;
        while(curr != null && count < index - 1) {
            count++;
            curr = curr.next;
        }
        return curr.value;
    }

    public nthNodeFromEnd(index : number) : number {
        let size : number = this.findLength();
        let startIndex : number;
        if(size !== 0 && size < index) {
            return 2147483647;
        }
        startIndex = size - index + 1;
        return this.nthNodeFromBegining(startIndex);
    }

    public nthNodeFromEnd2(index : number) : number {
        let count : number = 1;
        let forward : LNode = this.head;
        let curr : LNode = this.head;
        while(forward != null && count <= index) {
            count++;
            forward = forward.next;
        }
        if(forward == null) return 2147483647;
        while(forward != null) {
            forward = forward.next;
            curr = curr.next;
        }
        return curr.value;
    }

    public findIntersection(lst2 : LinkedList) : LNode {
        let head2 : LNode = lst2.head;
        let l1 : number = 0;
        let l2 : number = 0;
        let tempHead : LNode = this.head;
        let tempHead2 : LNode = head2;
        while(tempHead != null) {
            l1++;
            tempHead = tempHead.next;
        }
        while(tempHead2 != null) {
            l2++;
            tempHead2 = tempHead2.next;
        }
        let diff : number;
        if(l1 < 12) {
            let temp : LNode = this.head;
            this.head = head2;
            head2 = temp;
            diff = l2 - l1;
        } else {
            diff = l1 - l2;
        }
        for(; diff > 0; diff--) {
            this.head = this.head.next;
        }
        while(this.head !== head2) {
            this.head = this.head.next;
            head2 = head2.next;
        }
        return this.head;
    }

    public deleteList() {
        this.head = null;
        this._size = 0;
    }

    public print() {
        let temp : LNode = this.head;
        while(temp != null) {
            console.info(temp.value + " ");
            temp = temp.next;
        }
    }

    public sortedInsert(value : number) {
        let newNode : LNode = new LNode(value, null);
        let curr : LNode = this.head;
        if(curr == null || curr.value > value) {
            newNode.next = this.head;
            this.head = newNode;
            return;
        }
        while(curr.next != null && curr.next.value < value) {
            curr = curr.next;
        }
        newNode.next = curr.next;
        curr.next = newNode;
    }

    public removeDuplicate() {
        let curr : LNode = this.head;
        while(curr != null) {
            if(curr.next != null && curr.value === curr.next.value) {
                curr.next = curr.next.next;
            } else {
                curr = curr.next;
            }
        }
    }

    public makeLoop() {
        let temp : LNode = this.head;
        while(temp != null) {
            if(temp.next == null) {
                temp.next = this.head;
                return;
            }
            temp = temp.next;
        }
    }

    public loopDetect() : boolean {
        let slowPtr : LNode;
        let fastPtr : LNode;
        slowPtr = fastPtr = this.head;
        while(fastPtr.next != null && fastPtr.next.next != null) {
            slowPtr = slowPtr.next;
            fastPtr = fastPtr.next.next;
            if(slowPtr === fastPtr) {
                console.info("loop found");
                return true;
            }
        }
        console.info("loop not found");
        return false;
    }

    public reverseListLoopDetect() : boolean {
        let tempHead : LNode = this.head;
        this.reverse();
        if(tempHead === this.head) {
            this.reverse();
            console.info("loop found");
            return true;
        } else {
            this.reverse();
            console.info("loop not found");
            return false;
        }
    }

    public loopTypeDetect() : number {
        let slowPtr : LNode;
        let fastPtr : LNode;
        slowPtr = fastPtr = this.head;
        while(fastPtr.next != null && fastPtr.next.next != null) {
            if(this.head === fastPtr.next || this.head === fastPtr.next.next) {
                console.info("circular list loop found");
                return 2;
            }
            slowPtr = slowPtr.next;
            fastPtr = fastPtr.next.next;
            if(slowPtr === fastPtr) {
                console.info("loop found");
                return 1;
            }
        }
        console.info("loop not found");
        return 0;
    }
}
function main() {
    let ll : LinkedList = new LinkedList();
    ll.addHead(1);
    ll.addHead(2);
    let nd : LNode = ll.head;
    ll.addHead(3);
    let ll2 : LinkedList = new LinkedList();
    ll2.addHead(1);
    ll2.head.next = nd;
    ll2.addHead(2);
    ll2.addHead(3);
    ll2.print();
    //console.info(ll.findIntersection(ll2).value);
}

main();