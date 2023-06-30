
class Queue {
    frontIndex : number;
    data : any[];

    public constructor() {
        this.frontIndex = 0;
        this.data = [];
    }

    public add(value : any) {
        this.data.push(value);
    }

    public remove() : any {
        let value = this.data[this.frontIndex];
        this.frontIndex++;
        if (this.data.length > 0 && this.frontIndex * 2 >= this.data.length) {
            this.data = this.data.slice(this.frontIndex);
            this.frontIndex = 0;
        }
        return value;
    }

    public peek() : any {
        let value = this.data[this.frontIndex];
        return value;
    }

    public isEmpty() : boolean {
        return (this.data.length - this.frontIndex) === 0;
    }

    public size() : number {
        return (this.data.length - this.frontIndex);
    }

    public peekLast() : any {
        return this.data[this.data.length - 1]
    }
}

const MAX_INT = 2147483647;
const MIN_INT = -2147483647;

class TNode {
    value : number;
    lChild : TNode;
    rChild : TNode;

    public constructor(v : number, l : TNode = null, r : TNode = null) {
        this.value = v;
        this.lChild = l;
        this.rChild = r;
    }
}

class Tree {
    root : TNode;

    public constructor() {
        this.root = null;
    }

    public levelOrderBinaryTree(arr :  Array<number>) {
        this.root = this.levelOrderBinaryTreeUtil(arr, 0);
    }

    public levelOrderBinaryTreeUtil(arr :  Array<number>, start : number) : TNode {
        let size : number = arr.length;
        let curr : TNode = new TNode(arr[start]);
        let left : number = 2 * start + 1;
        let right : number = 2 * start + 2;
        if(left < size) 
            curr.lChild = this.levelOrderBinaryTreeUtil(arr, left);
        if(right < size) 
            curr.rChild = this.levelOrderBinaryTreeUtil(arr, right);
        return curr;
    }

    public InsertNode(value : number) {
        this.root = this.InsertNodeUtil(this.root, value);
    }

    public InsertNodeUtil(node : TNode, value : number) : TNode {
        if(node == null) {
            node = new TNode(value, null, null);
        } else {
            if(node.value > value) {
                node.lChild = this.InsertNodeUtil(node.lChild, value);
            } else {
                node.rChild = this.InsertNodeUtil(node.rChild, value);
            }
        }
        return node;
    }

    public PrintPreOrder() {
        this.PrintPreOrderUtil(this.root);
    }

    public PrintPreOrderUtil(node : TNode) {
        if(node != null) {
            console.info(" " + node.value);
            this.PrintPreOrderUtil(node.lChild);
            this.PrintPreOrderUtil(node.rChild);
        }
    }

    
    public NthPreOrder(index : number) {
        let counter = [0];
        this.NthPreOrderUtil(this.root, index, counter);
    }

    public NthPreOrderUtil(node : TNode, index : number, counter :  Array<number>) {
        if(node != null) {
            counter[0]++;
            if(counter[0] === index) {
                console.info("NthPreOrder:", node.value);
            }
            this.NthPreOrderUtil(node.lChild, index, counter);
            this.NthPreOrderUtil(node.rChild, index, counter);
        }
    }

    public PrintPostOrder() {
        this.PrintPostOrderUtil(this.root);
    }

    public PrintPostOrderUtil(node : TNode) {
        if(node != null) {
            this.PrintPostOrderUtil(node.lChild);
            this.PrintPostOrderUtil(node.rChild);
            console.info(" " + node.value);
        }
    }

    public NthPostOrder(index : number) {
        let counter = [0];
        this.NthPostOrderUtil(this.root, index, counter);
    }

    public NthPostOrderUtil(node : TNode, index : number, counter :  Array<number>) {
        if(node != null) {
            this.NthPostOrderUtil(node.lChild, index, counter);
            this.NthPostOrderUtil(node.rChild, index, counter);
            counter[0]++;
            if(counter[0] === index) {
                console.info("NthPostOrder: " + node.value);
            }
        }
    }

    public PrintInOrder() {
        this.PrintInOrderUtil(this.root);
    }

    public PrintInOrderUtil(node : TNode) {
        if(node != null) {
            this.PrintInOrderUtil(node.lChild);
            console.info(" " + node.value);
            this.PrintInOrderUtil(node.rChild);
        }
    }

    public NthInOrder(index : number) {
        let counter = [0];
        this.NthInOrderUtil(this.root, index, counter);

    }

    public NthInOrderUtil(node : TNode, index : number, counter :  Array<number>) {
        if(node != null) {
            this.NthInOrderUtil(node.lChild, index, counter);
            counter[0]++;
            if(counter[0] === index) {
                console.info("NthInOrder: " + node.value);
            }
            this.NthInOrderUtil(node.rChild, index, counter);
        }
    }

    public PrintBredthFirst() {
        let que : Queue= new Queue();;
        let temp : TNode;
        if(this.root != null) 
            que.add(this.root);
        while(que.isEmpty() === false) {
            temp = que.remove();
            console.info(" " + temp.value);
            if(temp.lChild != null) 
                que.add(temp.lChild);
            if(temp.rChild != null) 
                que.add(temp.rChild);
        };
    }

    public PrintDepthFirst() {
        let stk : Array<TNode> = new Array<TNode>();
        let temp : TNode;
        if(this.root != null) 
            stk.push(this.root);
        while(stk.length > 0) {
            temp = stk.pop();
            console.info(temp.value);
            if(temp.lChild != null) 
                stk.push(temp.lChild);
            if(temp.rChild != null) 
                stk.push(temp.rChild);
        };
    }

    PrintLevelOrderLineByLine() {
        let que1 : Queue = new Queue();
        let que2 : Queue = new Queue();
        let temp : TNode = null;
        if(this.root != null) 
            que1.add(this.root);
        while(que1.size() > 0 || que2.size() > 0) {
            while(que1.size() > 0) {
                temp = que1.remove();
                console.info(" " + temp.value);
                if(temp.lChild != null) 
                    que2.add(temp.lChild);
                if(temp.rChild != null) 
                    que2.add(temp.rChild);
            };
            console.info("");
            while(que2.size() > 0) {
                temp = que2.remove();
                console.info(" " + temp.value);
                if(temp.lChild != null) 
                    que1.add(temp.lChild);
                if(temp.rChild != null) 
                    que1.add(temp.rChild);
            };
            console.info("");
        };
    }

    PrintLevelOrderLineByLine2() {
        let que : Queue = new Queue();
        let temp : TNode = null;
        let count : number = 0;
        if(this.root != null) que.add(this.root);
        while(que.size() !== 0) {
            count = que.size();
            while(count > 0) {
                temp = que.remove();
                console.info(" " + temp.value);
                if(temp.lChild != null) 
                    que.add(temp.lChild);
                if(temp.rChild != null) 
                    que.add(temp.rChild);
                count -= 1;
            };
            console.info("");
        };
    }

    PrintSpiralTree() {
        let stk1 : Array<TNode> = new Array<TNode>();
        let stk2 : Array<TNode> = new Array<TNode>();
        let temp : TNode;
        if(this.root != null) 
            stk1.push(this.root);
        while(stk1.length > 0 || stk2.length > 0) {
            while(stk1.length > 0) {
                temp = stk1.pop();
                console.info(" " + temp.value);
                if(temp.rChild != null) 
                    stk2.push(temp.rChild);
                if(temp.lChild != null) 
                    stk2.push(temp.lChild);
            };
            while(stk2.length > 0) {
                temp = stk2.pop();
                console.info(" " + temp.value);
                if(temp.lChild != null) 
                    stk1.push(temp.lChild);
                if(temp.rChild != null) 
                    stk1.push(temp.rChild);
            };
        };
    }

    public Find(value : number) : boolean {
        let curr : TNode = this.root;
        while(curr != null) {
            if(curr.value === value) {
                return true;
            } else if(curr.value > value) {
                curr = curr.lChild;
            } else {
                curr = curr.rChild;
            }
        };
        return false;
    }

    public Find2(value : number) : boolean {
        let curr : TNode = this.root;
        while(curr != null && curr.value !== value) {
            curr = (curr.value > value)?curr.lChild:curr.rChild
        };
        return curr != null;
    }

    public FindMin() : number {
        let node : TNode = this.root;
        if(node == null) {
            return MAX_INT;
        }
        while(node.lChild != null) {
            node = node.lChild;
        };
        return node.value;
    }

    public FindMax() : number {
        let node : TNode = this.root;
        if(node == null) {
            return MIN_INT;
        }
        while(node.rChild != null) {
            node = node.rChild;
        };
        return node.value;
    }

    public FindMaxNode(curr : TNode) : TNode {
        let node : TNode = curr;
        if(node == null) {
            return null;
        }
        while(node.rChild != null) {
            node = node.rChild;
        };
        return node;
    }

    public FindMinNode(curr : TNode) : TNode {
        let node : TNode = curr;
        if(node == null) {
            return null;
        }
        while(node.lChild != null) {
            node = node.lChild;
        };
        return node;
    }

    public Free() {
        this.root = null;
    }

    public DeleteNode(value : number) {
        this.root = this.DeleteNodeUtil(this.root, value);
    }

    public DeleteNodeUtil(node : TNode, value : number) : TNode {
        let temp : TNode = null;
        if(node != null) {
            if(node.value === value) {
                if(node.lChild == null && node.rChild == null) {
                    return null;
                } else {
                    if(node.lChild == null) {
                        temp = node.rChild;
                        return temp;
                    }
                    if(node.rChild == null) {
                        temp = node.lChild;
                        return temp;
                    }
                    let minNode : TNode = this.FindMinNode(node.rChild);
                    let minValue : number = minNode.value;
                    node.value = minValue;
                    node.rChild = this.DeleteNodeUtil(node.rChild, minValue);
                }
            } else {
                if(node.value > value) {
                    node.lChild = this.DeleteNodeUtil(node.lChild, value);
                } else {
                    node.rChild = this.DeleteNodeUtil(node.rChild, value);
                }
            }
        }
        return node;
    }

    public TreeDepth() : number {
        return this.TreeDepthUtil(this.root);
    }

    public TreeDepthUtil(curr : TNode) : number {
        if(curr == null) 
            return 0; 
        else {
            let lDepth : number = this.TreeDepthUtil(curr.lChild);
            let rDepth : number = this.TreeDepthUtil(curr.rChild);
            if(lDepth > rDepth) 
                return lDepth + 1; 
            else 
                return rDepth + 1;
        }
    }

    public isEqual(T2 : Tree) : boolean {
        return this.isEqualUtil(this.root, T2.root);
    }

    isEqualUtil(node1 : TNode, node2 : TNode) : boolean {
        if(node1 == null && node2 == null) 
            return true; 
        else if(node1 == null || node2 == null) 
            return false; 
        else 
            return (this.isEqualUtil(node1.lChild, node2.lChild) && 
            this.isEqualUtil(node1.rChild, node2.rChild) && 
            (node1.value === node2.value));
    }

    public Ancestor(first : number, second : number) : TNode {
        if(first > second) {
            let temp : number = first;
            first = second;
            second = temp;
        }
        return this.AncestorUtil(this.root, first, second);
    }

    public AncestorUtil(curr : TNode, first : number, second : number) : TNode {
        if(curr == null) {
            return null;
        }
        if(curr.value > first && curr.value > second) {
            return this.AncestorUtil(curr.lChild, first, second);
        }
        if(curr.value < first && curr.value < second) {
            return this.AncestorUtil(curr.rChild, first, second);
        }
        return curr;
    }

    public CopyTree() : Tree {
        let tree2 : Tree = new Tree();
        tree2.root = this.CopyTreeUtil(this.root);
        return tree2;
    }

    public CopyTreeUtil(curr : TNode) : TNode {
        let temp : TNode;
        if(curr != null) {
            temp = new TNode(curr.value);
            temp.lChild = this.CopyTreeUtil(curr.lChild);
            temp.rChild = this.CopyTreeUtil(curr.rChild);
            return temp;
        } 
        else 
            return null;
    }

    public CopyMirrorTree() : Tree {
        let tree2 : Tree = new Tree();
        tree2.root = this.CopyMirrorTreeUtil(this.root);
        return tree2;
    }

    public CopyMirrorTreeUtil(curr : TNode) : TNode {
        let temp : TNode;
        if(curr != null) {
            temp = new TNode(curr.value);
            temp.rChild = this.CopyMirrorTreeUtil(curr.lChild);
            temp.lChild = this.CopyMirrorTreeUtil(curr.rChild);
            return temp;
        } 
        else 
            return null;
    }

    public numNodes() : number {
        return this.numNodesUtil(this.root);
    }

    public numNodesUtil(curr : TNode) : number {
        if(curr == null) 
            return 0; 
        else 
            return (1 + this.numNodesUtil(curr.rChild) + 
            this.numNodesUtil(curr.lChild));
    }

    public numFullNodesBT() : number {
        return this.numNodesUtil(this.root);
    }

    public numFullNodesBTUtil(curr : TNode) : number {
        let count : number;
        if(curr == null) 
            return 0;
        count = this.numFullNodesBTUtil(curr.rChild) + this.numFullNodesBTUtil(curr.lChild);
        if(curr.rChild != null && curr.lChild != null) 
            count++;
        return count;
    }

    public maxLengthPathBT() : number {
        return this.maxLengthPathBTUtil(this.root);
    }

    public maxLengthPathBTUtil(curr : TNode) : number {
        let max : number;
        let leftPath : number;
        let rightPath : number;
        let leftMax : number;
        let rightMax : number;

        if(curr == null) 
            return 0;
        
        leftPath = this.TreeDepthUtil(curr.lChild);
        rightPath = this.TreeDepthUtil(curr.rChild);
        max = leftPath + rightPath + 1;
        leftMax = this.maxLengthPathBTUtil(curr.lChild);
        rightMax = this.maxLengthPathBTUtil(curr.rChild);
        
        if(leftMax > max) 
            max = leftMax;
        if(rightMax > max) 
            max = rightMax;
        return max;
    }

    public numLeafNodes() : number {
        return this.numLeafNodesUtil(this.root);
    }

    public numLeafNodesUtil(curr : TNode) : number {
        if(curr == null) 
            return 0;
        
        if(curr.lChild == null && curr.rChild == null) 
            return 1; 
        else 
            return (this.numLeafNodesUtil(curr.rChild) + this.numLeafNodesUtil(curr.lChild));
    }

    public sumAllBT() : number {
        return this.sumAllBTUtil(this.root);
    }

    public sumAllBTUtil(curr : TNode) : number {
        if(curr == null) 
            return 0;
        return (curr.value + this.sumAllBTUtil(curr.lChild) + 
        this.sumAllBTUtil(curr.lChild));
    }

    public iterativePreOrder() {
        let stk : Array<TNode> = new Array<TNode>();
        let curr : TNode;
        if(this.root != null) 
            stk.push(this.root);
        while(stk.length > 0) {
            curr = stk.pop();
            console.info(curr.value + " ");
            if(curr.rChild != null) 
                stk.push(curr.rChild);
            if(curr.lChild != null) 
                stk.push(curr.lChild);
        };
    }

    public iterativePostOrder() {
        let stk : Array<TNode> = new Array<TNode>();
        let visited : Array<number> = new Array<number>();
        let curr : TNode;
        let vtd : number;
        if(this.root != null) {
            stk.push(this.root);
            visited.push(0);
        }
        while(stk.length > 0) {
            curr = stk.pop();
            vtd = visited.pop();
            if(vtd === 1) {
                console.info(curr.value + " ");
            } else {
                stk.push(curr);
                visited.push(1);
                if(curr.rChild != null) {
                    stk.push(curr.rChild);
                    visited.push(0);
                }
                if(curr.lChild != null) {
                    stk.push(curr.lChild);
                    visited.push(0);
                }
            }
        };
    }

    public iterativeInOrder() {
        let stk : Array<TNode> = new Array<TNode>();
        let visited : Array<number> = new Array<number>();
        let curr : TNode;
        let vtd : number;
        if(this.root != null) {
            stk.push(this.root);
            visited.push(0);
        }
        while(stk.length > 0) {
            curr = stk.pop();
            vtd = visited.pop();
            if(vtd === 1) {
                console.info(curr.value + " ");
            } else {
                if(curr.rChild != null) {
                    stk.push(curr.rChild);
                    visited.push(0);
                }
                stk.push(curr);
                visited.push(1);
                if(curr.lChild != null) {
                    stk.push(curr.lChild);
                    visited.push(0);
                }
            }
        };
    }

    public isBST3(root : TNode) : boolean {
        if(root == null) 
            return true;

        if(root.lChild != null && this.FindMaxNode(root.lChild).value > root.value) 
            return false;
        if(root.rChild != null && this.FindMinNode(root.rChild).value <= root.value) 
            return false;
        return (this.isBST3(root.lChild) && this.isBST3(root.rChild));
    }

    public isBST() : boolean {
        return this.isBSTUtil(this.root, MIN_INT, MAX_INT);
    }

    public isBSTUtil(curr : TNode, min : number, max : number) : boolean {
        if(curr == null) 
            return true;

        if(curr.value < min || curr.value > max) 
            return false;
        return this.isBSTUtil(curr.lChild, min, curr.value) && 
        this.isBSTUtil(curr.rChild, curr.value, max);
    }

    public isBST2() : boolean {
        let count :  Array<number> = [0];
        return this.isBST2Util(this.root, count);
    }

    public isBST2Util(root : TNode, count :  Array<number>) : boolean {
        let ret : boolean;
        if(root != null) {
            ret = this.isBST2Util(root.lChild, count);
            if(!ret) 
                return false;
            if(count[0] > root.value) 
                return false;
            count[0] = root.value;
            ret = this.isBST2Util(root.rChild, count);
            if(!ret) return false;
        }
        return true;
    }

    isCompleteTree() : boolean {
        let que : Queue = new Queue();
        let temp : TNode = null;
        let noChild : number = 0;
        if(this.root != null) 
            que.add(this.root);
        while(que.size() > 0) {
            temp = que.remove();
            if(temp.lChild != null) {
                if(noChild === 1) 
                    return false;
                que.add(temp.lChild);
            } 
            else 
                noChild = 1;
            
            if(temp.rChild != null) {
                if(noChild === 1) 
                    return false;
                que.add(temp.rChild);
            } 
            else 
                noChild = 1;
        };
        return true;
    }

    isCompleteTreeUtil(curr : TNode, index : number, count : number) : boolean {
        if(curr == null) 
            return true;
        if(index > count) 
            return false;
        return this.isCompleteTreeUtil(curr.lChild, index * 2 + 1, count) && 
        this.isCompleteTreeUtil(curr.rChild, index * 2 + 2, count);
    }

    isCompleteTree2() : boolean {
        let count : number = this.numNodes();
        return this.isCompleteTreeUtil(this.root, 0, count);
    }

    isHeapUtil(curr : TNode, parentValue : number) : boolean {
        if(curr == null) 
            return true;
        if(curr.value < parentValue) 
            return false;
        return (this.isHeapUtil(curr.lChild, curr.value) && 
        this.isHeapUtil(curr.rChild, curr.value));
    }

    isHeap() : boolean {
        let infi : number = MIN_INT;
        return (this.isCompleteTree() && this.isHeapUtil(this.root, infi));
    }

    isHeapUtil2(curr : TNode, index : number, count : number, parentValue : number) : boolean {
        if(curr == null) 
            return true;
        if(index > count) 
            return false;
        if(curr.value < parentValue) 
            return false;
        return this.isHeapUtil2(curr.lChild, index * 2 + 1, count, curr.value) && this.isHeapUtil2(curr.rChild, index * 2 + 2, count, curr.value);
    }

    isHeap2() : boolean {
        let count : number = this.numNodes();
        let parentValue : number = MIN_INT;
        return this.isHeapUtil2(this.root, 0, count, parentValue);
    }

    public treeToListRec() : TNode {
        let head : TNode = this.treeToListRecUtil(this.root);
        let temp : TNode = head;
        return temp;
    }

    public treeToListRecUtil(curr : TNode) : TNode {
        let Head : TNode = null;
        let Tail : TNode = null;

        if(curr == null) 
            return null;
        
        if(curr.lChild == null && curr.rChild == null) {
            curr.lChild = curr;
            curr.rChild = curr;
            return curr;
        }

        if(curr.lChild != null) {
            Head = this.treeToListRecUtil(curr.lChild);
            Tail = Head.lChild;
            curr.lChild = Tail;
            Tail.rChild = curr;
        } 
        else 
            Head = curr;
        
        if(curr.rChild != null) {
            let tempHead : TNode = this.treeToListRecUtil(curr.rChild);
            Tail = tempHead.lChild;
            curr.rChild = tempHead;
            tempHead.lChild = curr;
        } 
        else 
            Tail = curr;
        
        Head.lChild = Tail;
        Tail.rChild = Head;
        return Head;
    }

    public printAllPath() {
        let stk : Array<number> = new Array<number>();
        this.printAllPathUtil(this.root, stk);
    }

    printAllPathUtil(curr : TNode, stk : Array<number>) {
        if(curr == null) 
            return;
        
        stk.push(curr.value);
        if(curr.lChild == null && curr.rChild == null) {
            console.info(stk);
            stk.pop();
            return;
        }
        this.printAllPathUtil(curr.rChild, stk);
        this.printAllPathUtil(curr.lChild, stk);
        stk.pop();
    }

    public LCA(first : number, second : number) : number {
        let ans : TNode = this.LCAUtil(this.root, first, second);
        if(ans != null) 
            return ans.value; 
        else 
            return MIN_INT;
    }

    public LCAUtil(curr : TNode, first : number, second : number) : TNode {
        let left : TNode;
        let right : TNode;
        if(curr == null) 
            return null;
        if(curr.value === first || curr.value === second) 
            return curr;
        left = this.LCAUtil(curr.lChild, first, second);
        right = this.LCAUtil(curr.rChild, first, second);
        if(left != null && right != null) 
            return curr; 
        else if(left != null) 
            return left; 
        else 
            return right;
    }

    public LcaBST(first : number, second : number) : number {
        return this.LcaBSTUtil(this.root, first, second);
    }

    public LcaBSTUtil(curr : TNode, first : number, second : number) : number {
        if(curr == null) {
            return MAX_INT;
        }
        if(curr.value > first && curr.value > second) {
            return this.LcaBSTUtil(curr.lChild, first, second);
        }
        if(curr.value < first && curr.value < second) {
            return this.LcaBSTUtil(curr.rChild, first, second);
        }
        return curr.value;
    }

    public trimOutsideRange(min : number, max : number) {
        this.trimOutsideRangeUtil(this.root, min, max);
    }

    public trimOutsideRangeUtil(curr : TNode, min : number, max : number) : TNode {
        if(curr == null) 
            return null;
        curr.lChild = this.trimOutsideRangeUtil(curr.lChild, min, max);
        curr.rChild = this.trimOutsideRangeUtil(curr.rChild, min, max);
        if(curr.value < min) {
            return curr.rChild;
        }
        if(curr.value > max) {
            return curr.lChild;
        }
        return curr;
    }

    public printInRange(min : number, max : number) {
        this.printInRangeUtil(this.root, min, max);
    }

    public printInRangeUtil(root : TNode, min : number, max : number) {
        if(root == null) 
            return;
        this.printInRangeUtil(root.lChild, min, max);
        if(root.value >= min && root.value <= max) 
            console.info(root.value + " ");
        this.printInRangeUtil(root.rChild, min, max);
    }

    public FloorBST(val : number) : number {
        let curr : TNode = this.root;
        let floor : number = MAX_INT;
        while(curr != null) {
            if(curr.value === val) {
                floor = curr.value;
                break;
            } else if(curr.value > val) {
                curr = curr.lChild;
            } else {
                floor = curr.value;
                curr = curr.rChild;
            }
        };
        return floor;
    }

    public CeilBST(val : number) : number {
        let curr : TNode = this.root;
        let ceil : number = MIN_INT;
        while(curr != null) {
            if(curr.value === val) {
                ceil = curr.value;
                break;
            } else if(curr.value > val) {
                ceil = curr.value;
                curr = curr.lChild;
            } else {
                curr = curr.rChild;
            }
        };
        return ceil;
    }

    public findMaxBT() : number {
        let ans : number = this.findMaxBTUtil(this.root);
        return ans;
    }

    public findMaxBTUtil(curr : TNode) : number {
        let left : number;
        let right : number;
        if(curr == null) 
            return MIN_INT;
        let max : number = curr.value;
        left = this.findMaxBTUtil(curr.lChild);
        right = this.findMaxBTUtil(curr.rChild);
        if(left > max) 
            max = left;
        if(right > max) 
            max = right;
        return max;
    }

    public searchBT(value : number) : boolean {
        return this.searchBTUtil(this.root, value);
    }

    public searchBTUtil(curr : TNode, value : number) : boolean {
        let left : boolean;
        let right : boolean;
        if(curr == null) 
            return false;
        if(curr.value === value) 
            return true;
        left = this.searchBTUtil(curr.lChild, value);
        if(left) 
            return true;
        right = this.searchBTUtil(curr.rChild, value);
        if(right) 
            return true;
        return false;
    }

    public CreateBinaryTree(arr :  Array<number>) {
        this.root = this.CreateBinaryTreeUtil(arr, 0, arr.length - 1);
    }

    public CreateBinaryTreeUtil(arr :  Array<number>, start : number, end : number) : TNode {
        let curr : TNode = null;
        if(start > end) 
            return null;
        let mid : number = ((start + end) / 2|0);
        curr = new TNode(arr[mid]);
        curr.lChild = this.CreateBinaryTreeUtil(arr, start, mid - 1);
        curr.rChild = this.CreateBinaryTreeUtil(arr, mid + 1, end);
        return curr;
    }

    isBSTArray(preorder :  Array<number>, size : number) : boolean {
        let stk : Array<number> = new Array<number>();
        let value : number;
        let root : number = MIN_INT;
        for(let i : number = 0; i < size; i++) {
            value = preorder[i];
            if(value < root) return false;
            while((stk.length > 0) && (stk[stk.length-1]< value)) {
                root = stk.pop()
            };
            stk.push(value);
        };
        return true;
    }
}

function main() {
    let t : Tree = new Tree();
    let arr :  Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    t.levelOrderBinaryTree(arr);

    console.info("isHeap : " + t.isHeap());
    console.info("isHeap2 : " + t.isHeap2());
    console.info("isCompleteTree : " + t.isCompleteTree());
    
    console.info("PrintBredthFirst : ");
    t.PrintBredthFirst();
    
    console.info("PrintPreOrder : ");
    t.PrintPreOrder();
    
    console.info("PrintLevelOrderLineByLine : ");
    t.PrintLevelOrderLineByLine();

    console.info("PrintLevelOrderLineByLine2 : ");
    t.PrintLevelOrderLineByLine2();

    console.info("PrintSpiralTree : ");
    t.PrintSpiralTree();

    console.info("printAllPath : ");
    t.printAllPath();

    t.NthInOrder(4);
    t.NthPostOrder(4);
    t.NthPreOrder(4);
}

main();