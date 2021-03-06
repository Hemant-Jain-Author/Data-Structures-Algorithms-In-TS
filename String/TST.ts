class TSTNode {
    data : string;
    isLastChar : boolean;
    left : TSTNode;
    equal : TSTNode;
    right : TSTNode;

    constructor(d : string) {
        this.data = d;
        this.isLastChar = false;
        this.left = this.equal = this.right = null;
    }
}

class TST {
    root : TSTNode;
    
    constructor() {
        this.root = null;
    }

    public add(word : string) {
        this.root = this.addUtil(this.root, word, 0);
    }

    public addUtil(curr : TSTNode, word : string, wordIndex : number) : TSTNode {
        if(curr == null) 
            curr = new TSTNode(word.charAt(wordIndex));
        
        if ((word.charAt(wordIndex)).charCodeAt(0) < (curr.data).toString().charCodeAt(0))
            curr.left = this.addUtil(curr.left, word, wordIndex);
        else if ((word.charAt(wordIndex)).charCodeAt(0) > (curr.data).toString().charCodeAt(0))
            curr.right = this.addUtil(curr.right, word, wordIndex);
        else {
            if (wordIndex < word.length - 1)
                curr.equal = this.addUtil(curr.equal, word, wordIndex + 1);
            else
                curr.isLastChar = true;
        }
        return curr;
    }

    public findUtil(curr : TSTNode, word : string, wordIndex : number) : boolean {
        if(curr == null) 
            return false;
        if ((word.charAt(wordIndex)).charCodeAt(0) < (curr.data).toString().charCodeAt(0))
            return this.findUtil(curr.left, word, wordIndex);
        else if ((word.charAt(wordIndex)).charCodeAt(0) > (curr.data).toString().charCodeAt(0))
            return this.findUtil(curr.right, word, wordIndex);
        else {
            if (wordIndex === word.length - 1)
                return curr.isLastChar;
            return this.findUtil(curr.equal, word, wordIndex + 1);
        }
    }


    public find(word : string) : boolean {
        let ret : boolean = this.findUtil(this.root, word, 0);
        if(ret) 
            console.info(word + " Found"); 
        else 
            console.info(word + " Not Found ");
        return ret;
    }
}

function main() {
    let tt : TST = new TST();
    tt.add("banana");
    tt.add("apple");
    tt.add("mango");

    console.log("Apple Found :", tt.find("apple"));
    console.log("Banana Found :", tt.find("banana"));
    console.log("Mango Found :", tt.find("mango"));
    console.log("Grapes Found :", tt.find("grapes"));
}

main();