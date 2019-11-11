let CharCount : number = 26;


class TrieNode {
    isLastChar : boolean;
    child : TrieNode[];

    public constructor(c : string) {
        this.isLastChar = false;
        this.child = new Array(CharCount).fill(null);
        this.isLastChar = false;
    }
}

class Trie {
    
    root : TrieNode = null;

    public constructor() {
        this.root = new TrieNode(' ');
    }

    Add(str : string) : TrieNode {
        if(str == null) {
            return this.root;
        }
        return this.AddUtil(this.root, str.toLowerCase(), 0);
    }

    public AddUtil(curr : TrieNode, str : string, index : number) : TrieNode {
        if(curr == null) {
            curr = new TrieNode(str.charAt(index - 1));
        }
        if(str.length === index) {
            curr.isLastChar = true;
        } else {
            curr.child[str[index].charCodeAt(0) - 'a'.charCodeAt(0)] = this.AddUtil(curr.child[str[index].charCodeAt(0) - 'a'.charCodeAt(0)], str, index + 1);
        }
        return curr;
    }

    Remove(str : string) {
        if(str == null) {
            return;
        }
        str = str.toLowerCase();
        this.RemoveUtil(this.root, str, 0);
    }

    public RemoveUtil(curr : TrieNode, str : string, index : number) {
        if(curr == null) {
            return;
        }
        if(str.length === index) {
            if(curr.isLastChar) {
                curr.isLastChar = false;
            }
            return;
        }
        this.RemoveUtil(curr.child[str[index].charCodeAt(0) - 'a'.charCodeAt(0)], str, index + 1);
    }

    Find(str : string) : boolean {
        if(str == null) {
            return false;
        }
        str = str.toLowerCase();
        return this.FindUtil(this.root, str, 0);
    }

    public FindUtil(curr : TrieNode, str : string, index : number) : boolean {
        if(curr == null) {
            return false;
        }
        if(str.length === index) {
            return curr.isLastChar;
        }
        return this.FindUtil(curr.child[str[index].charCodeAt(0) - 'a'.charCodeAt(0)], str, index + 1);
    }
}



function main(args : string[]) {
    let t : Trie = new Trie();
    let a : string = "hemant";
    let b : string = "heman";
    let c : string = "hemantjain";
    let d : string = "jain";
    t.Add(a);
    t.Add(d);
    console.info(t.Find(a));
    t.Remove(a);
    t.Remove(d);
    console.info(t.Find(a));
    console.info(t.Find(c));
    console.info(t.Find(d));
}

main(null);