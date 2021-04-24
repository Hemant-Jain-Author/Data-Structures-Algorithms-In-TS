enum FlagState {
    Empty,
    Filled,
    Deleted
};

class HashTableLP {

    tableSize : number;
    KeyArr : Array<number>;
    DataArr : Array<number>;
    FlagArr : Array<number>;

    public constructor(tSize : number) {
        this.tableSize = tSize;
        this.KeyArr = new Array(tSize + 1);
        this.DataArr = new Array(tSize + 1);
        this.FlagArr = new Array(tSize + 1).fill(FlagState.Empty);
    }

    computeHash(key : number) : number {
        return key % this.tableSize;
    }

    resolverFun(index : number) : number {
        return index;
    }

    resolverFun2(index : number) : number {
        return index * index;
    }

    add(key : number, value : number) : boolean {
        let hashValue : number = this.computeHash(key);
        for(let i : number = 0; i < this.tableSize; i++) {
            if(this.FlagArr[hashValue] === FlagState.Empty || 
                this.FlagArr[hashValue] === FlagState.Deleted) 
            {
                this.KeyArr[hashValue] = key;
                this.DataArr[hashValue] = value;
                this.FlagArr[hashValue] = FlagState.Filled;
                return true;
            }
            else if (this.FlagArr[hashValue] === FlagState.Filled && 
                this.KeyArr[hashValue] === key) 
            {
                this.DataArr[hashValue] = value;
                return true;
            }
            hashValue += this.resolverFun(i);
            hashValue %= this.tableSize;
        };
        return false;
    }

    find(key : number) : boolean {
        let hashValue : number = this.computeHash(key);
        for(let i : number = 0; i < this.tableSize; i++) {
            if (this.FlagArr[hashValue] === FlagState.Empty) {
                return false;
            }
            if (this.FlagArr[hashValue] === FlagState.Filled
                && this.KeyArr[hashValue] === key) {
                return true;
            }
            hashValue += this.resolverFun(i);
            hashValue %= this.tableSize;
        };
        return false;
    }

    get(key : number) : number {
        let hashValue : number = this.computeHash(key);
        for (let i = 0; i < this.tableSize; i++) {
            if (this.FlagArr[hashValue] === FlagState.Empty) {
                return 0;
            }
            if (this.FlagArr[hashValue] === FlagState.Filled
                && this.KeyArr[hashValue] === key) {
                return this.DataArr[hashValue];
            }
            hashValue += this.resolverFun(i);
            hashValue %= this.tableSize;
        }
        return 0;    
    }

    delete(key : number) : boolean {
        let hashValue : number = this.computeHash(key);
        for (let i = 0; i < this.tableSize; i++) {
            if (this.FlagArr[hashValue] === FlagState.Empty) {
                return false;
            }
            if (this.FlagArr[hashValue] === FlagState.Filled
                && this.KeyArr[hashValue] === key) {
                this.FlagArr[hashValue] = FlagState.Deleted;
                return true;
            }
            hashValue += this.resolverFun(i);
            hashValue %= this.tableSize;
        }
        return false;
    }

    print() {
        for(let i : number = 0; i < this.tableSize; i++) {
            if(this.FlagArr[i] === FlagState.Filled) {
                console.info("Node at index [" + i + " ] :: " + this.DataArr[i]);
            }
        };
    }    
}

function main() {
    let ht : HashTableLP = new HashTableLP(1000);
    ht.add(1, 10);
    ht.add(2, 20);
    ht.add(3, 30);
    ht.print();
    
    console.log("Find key 2 : ", ht.find(2));
    console.log("Value at key 2 : ",ht.get(2))
    ht.delete(1)
    ht.print()
}
main();