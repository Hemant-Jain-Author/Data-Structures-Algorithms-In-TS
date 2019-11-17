class TreeNode {
    value : string;
    count : number;
    lChild : TreeNode;
    rChild : TreeNode;

    constructor() {
        this.value = null;
        this.count = 0;
        this.lChild = null;
        this.rChild = null;
    }
}

class StringTree {
    root : TreeNode = null;

    public print() {
        this.printUtil(this.root);
    }

    public printUtil(curr : TreeNode) {
        if(curr != null) {
            console.info(" value is ::" + curr.value);
            console.info(" count is :: " + curr.count);
            this.printUtil(curr.lChild);
            this.printUtil(curr.rChild);
        }
    }


    public add(value : string) {
        this.root = this.addUtil(value, this.root);
    }

    public addUtil(value : string, curr : TreeNode) : TreeNode {
        if(curr == null) {
            curr = new TreeNode();
            curr.value = value;
            curr.lChild = curr.rChild = null;
            curr.count = 1;
        } else {
            let compare : number = curr.value.localeCompare(value);
            if(compare === 0) 
                curr.count++; 
            else if(compare === 1) 
                curr.lChild = this.addUtil(value, curr.lChild); 
            else 
                curr.rChild = this.addUtil(value, curr.rChild);
        }
        return curr;
    }

    find(value : string) : boolean {
        let ret : boolean = this.findUtil(this.root, value);
        console.info("Find " + value + " Return " + ret);
        return ret;
    }

    public findUtil(curr : TreeNode, value : string) : boolean {
        if(curr == null) 
            return false;
        let compare : number = curr.value.localeCompare(value);
        if(compare === 0) 
            return true; 
        else {
            if(compare === 1) 
                return this.findUtil(curr.lChild, value); 
            else 
                return this.findUtil(curr.rChild, value);
        }
    }


    frequency(value : string) : number {
        return this.frequencyUtil(this.root, value);
    }

    public frequencyUtil(curr : TreeNode, value : string) : number {
        if(curr == null) 
            return 0;
        let compare : number = curr.value.localeCompare(value);
        if(compare === 0) 
            return curr.count; 
        else {
            if(compare > 0) 
                return this.frequencyUtil(curr.lChild, value); 
            else 
                return this.frequencyUtil(curr.rChild, value);
        }
    }

    freeTree() {
        this.root = null;
    }
}

function main() {
    let tt : StringTree = new StringTree();
    tt.add("banana");
    tt.add("apple");
    tt.add("mango");
    tt.add("banana");
    tt.add("apple");
    tt.add("mango");
    console.info("\nSearch results for apple, banana, grapes and mango :\n");
    tt.find("apple");
    tt.find("banana");
    tt.find("banan");
    tt.find("applkhjkhkj");
    tt.find("grapes");
    tt.find("mango");
    tt.print();
    console.info("frequency returned :: " + tt.frequency("apple"));
    console.info("frequency returned :: " + tt.frequency("banana"));
    console.info("frequency returned :: " + tt.frequency("mango"));
    console.info("frequency returned :: " + tt.frequency("hemant"));
}

main();