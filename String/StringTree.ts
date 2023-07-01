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

    private printUtil(curr : TreeNode) {
        if(curr != null) {
            console.info(" value is ::" + curr.value);
            console.info(" count is :: " + curr.count);
            this.printUtil(curr.lChild);
            this.printUtil(curr.rChild);
        }
    }


    public Add(value : string) {
        this.root = this.addUtil(value, this.root);
    }

    private addUtil(value : string, curr : TreeNode) : TreeNode {
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

    public Find(value : string) : boolean {
        let ret : boolean = this.findUtil(this.root, value);
        console.info("Find " + value + " Return " + ret);
        return ret;
    }

    private findUtil(curr : TreeNode, value : string) : boolean {
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


    public Frequency(value : string) : number {
        return this.frequencyUtil(this.root, value);
    }

    private frequencyUtil(curr : TreeNode, value : string) : number {
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

    public freeTree() {
        this.root = null;
    }
}

// Testing code.
let tt : StringTree = new StringTree();
tt.Add("banana");
tt.Add("apple");
tt.Add("mango");
tt.Add("banana");
tt.Add("apple");
tt.Add("mango");
console.info("\nSearch results for apple, banana, grapes and mango :\n");
tt.Find("apple");
tt.Find("banana");
tt.Find("banan");
tt.Find("applkhjkhkj");
tt.Find("grapes");
tt.Find("mango");
tt.print();
console.info("frequency returned :: " + tt.Frequency("apple"));
console.info("frequency returned :: " + tt.Frequency("banana"));
console.info("frequency returned :: " + tt.Frequency("mango"));
console.info("frequency returned :: " + tt.Frequency("hemant"));
