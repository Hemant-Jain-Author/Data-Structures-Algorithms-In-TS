class HashTableNode {
    key: any;
    value: any;
    next: HashTableNode | null;

    constructor(k: any, v: any, n: HashTableNode | null) {
        this.key = k;
        this.value = v;
        this.next = n;
    }
}

class HashTable {
    private tableSize: number;
    private listArray: (HashTableNode | null)[];
    private comp: (a: any, b: any) => number;
    private HashFun: (key: any) => number;

    constructor(cmp?: (a: any, b: any) => number, hashFun?: (key: any) => number) {
        this.comp = cmp ?? this.DefaultCompare;
        this.HashFun = hashFun ?? this.DefaultHashFun;
        this.tableSize = 512;
        this.listArray = new Array(this.tableSize).fill(null);
    }

    private ComputeHash(key: any): number {
        return this.HashFun(key) % this.tableSize;
    }

    private DefaultCompare(first: any, second: any): number {
        return first - second;
    }

    private DefaultHashFun(key: any): number {
        return key;
    }

    add(key: any, value?: any): void {
        if (key === undefined || key === null) {
            return;
        }

        if (value === undefined || value === null) {
            value = key;
        }

        const index = this.ComputeHash(key);
        this.listArray[index] = new HashTableNode(key, value, this.listArray[index]);
    }

    remove(key: any): boolean {
        const index = this.ComputeHash(key);
        let nextNode: HashTableNode | null;
        let head = this.listArray[index];
        if (head !== null && head.key === key) {
            this.listArray[index] = head.next;
            return true;
        }

        while (head !== null) {
            nextNode = head.next;
            if (nextNode !== null && nextNode.key === key) {
                head.next = nextNode.next;
                return true;
            } else {
                head = nextNode;
            }
        }
        return false;
    }

    print(): void {
        let output = "Hash Table contains ::";
        for (let i = 0; i < this.tableSize; i++) {
            let head = this.listArray[i];
            while (head !== null) {
                output += "(" + head.key + "=>" + head.value + ") ";
                head = head.next;
            }
        }
        console.log(output);
    }

    find(key: any): boolean {
        const index = this.ComputeHash(key);
        let head = this.listArray[index];
        while (head !== null) {
            if (head.key === key) {
                return true;
            }
            head = head.next;
        }
        return false;
    }

    get(key: any): any {
        const index = this.ComputeHash(key);
        let head = this.listArray[index];
        while (head !== null) {
            if (head.key === key) {
                return head.value;
            }
            head = head.next;
        }
        return 0;
    }
}

// Testing code.
const ht = new HashTable();
ht.add(1, 10);
ht.add(2, 20);
ht.add(3, 30);
ht.print();

console.log("Find key 2: ", ht.find(2));
console.log("Value at key 2: ", ht.get(2));
ht.remove(1);
ht.print();

/*
Hash Table contains ::(1=>10) (2=>20) (3=>30) 
Find key 2:  true
Value at key 2:  20
Hash Table contains ::(2=>20) (3=>30) 
*/