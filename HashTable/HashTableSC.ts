class HashTableNode {
    key: number;
    value: number;
    next: HashTableNode;

    public constructor(k: number, v: number, n: HashTableNode) {
        this.key = k;
        this.value = v;
        this.next = n;
    }
}

class HashTableSC {
    tableSize: number;
    listArray: HashTableNode[];

    public constructor() {
        this.tableSize = 512;
        this.listArray = new Array(this.tableSize).fill(null);
    }

    computeHash(key: number): number {
        let hashValue: number = key;
        return hashValue % this.tableSize;
    }

    public add(key: number, value: number) {
        let index: number = this.computeHash(value);
        this.listArray[index] = new HashTableNode(key, value, this.listArray[index]);
    }

    public delete(key: number): boolean {
        let index: number = this.computeHash(key);
        let nextNode: HashTableNode;
        let head: HashTableNode = this.listArray[index];
        if (head != null && head.key === key) {
            this.listArray[index] = head.next;
            return true;
        }
        while (head != null) {
            nextNode = head.next;
            if (nextNode != null && nextNode.key === key) {
                head.next = nextNode.next;
                return true;
            } else {
                head = nextNode;
            }
        };
        return false;
    }

    public print() {
        for (let i = 0; i < this.tableSize; i++) {
            let head = this.listArray[i];
            let data = "";

            while (head != null) {
                data += (`${head.value} `)
                head = head.next;
            }

            if (data != "") {
                console.log(`Index value :: ${i} Data :: ${data}`);
            }
        }
    }

    public find(key: number): boolean {
        let index: number = this.computeHash(key);
        let head: HashTableNode = this.listArray[index];
        while (head != null) {
            if (head.key === key) {
                return true;
            }
            head = head.next;
        };
        return false;
    }


    public get(key: number): number {
        let index: number = this.computeHash(key);
        let head: HashTableNode = this.listArray[index];
        while (head != null) {
            if (head.key === key) {
                return head.value;
            }
            head = head.next;
        };
        return 0;
    }
}

let ht: HashTableSC = new HashTableSC();
ht.add(1, 10);
ht.add(2, 20);
ht.add(3, 30);
ht.print();

console.log("Find key 2 : ", ht.find(2));
console.log("Value at key 2 : ", ht.get(2));
ht.delete(1);
ht.print();
