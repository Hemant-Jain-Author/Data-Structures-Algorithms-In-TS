function less(x:number, y: number) : boolean {
    return (x - y) > 0;
}

function more(x:number, y: number) : boolean {
    return (y - x) > 0;
}

class Heap {
    size : number;
    arr :  Array<number>;
    compare : (numbrer, number) => boolean;

    public constructor(array? : any, cmp? : (a:number, b:number) => boolean) {
        if(cmp === null || cmp === undefined)
        {    
            this.compare = less;
        }
        else 
        {
            this.compare = cmp;
        }

        if(array === null || array === undefined)
        {    
            this.arr = [];
            this.size = 0;
        }
        else 
        {    
            this.arr = array;
            this.size = array.length;
    
            for (let i = Math.floor(this.size / 2); i >= 0; i--) {
                this.proclateDown(i);
            }
        } 
    }

    proclateDown(parent : number) {
        let lChild : number = 2 * parent + 1;
        let rChild : number = lChild + 1;
        let child : number = -1;
        let temp : number;
        if(lChild < this.size) {
            child = lChild;
        }
        if(rChild < this.size && this.compare(this.arr[lChild], this.arr[rChild])) {
            child = rChild;
        }
        if(child !== -1 && this.compare(this.arr[parent], this.arr[child])) {
            temp = this.arr[parent];
            this.arr[parent] = this.arr[child];
            this.arr[child] = temp;
            this.proclateDown(child);
        }
    }

    proclateUp(child : number) {
        let parent : number = Math.floor((child - 1) / 2);
        let temp : number;
        if(parent < 0) {
            return;
        }
        if(this.compare(this.arr[parent], this.arr[child])) {
            temp = this.arr[child];
            this.arr[child] = this.arr[parent];
            this.arr[parent] = temp;
            this.proclateUp(parent);
        }
    }

    public add(value : number) {
        if(this.size === this.arr.length) {
            this.doubleSize();
        }
        this.arr[this.size++] = value;
        this.proclateUp(this.size - 1);
    }

    private doubleSize() {
        let old :  Array<number> = this.arr;
        let newsize = this.size*2;
        if (newsize === 0)
            newsize = 1;
        this.arr = new Array<number>(newsize).fill(0);
        /* arraycopy */
        for (let i = 0; i < this.size; i++)
        {
            this.arr[i] = old[i];
        }
    }

    public remove() : number {
        if(this.isEmpty()) {
            throw new Error("IllegalStateException");
        }
        let value : number = this.arr[0];
        this.arr[0] = this.arr[this.size - 1];
        this.size--;
        this.proclateDown(0);
        return value;
    }

    public print() {
            console.info(this.arr);;
    }

    public isEmpty() : boolean {
        return (this.size === 0);
    }

    public length() : number {
        return this.size;
    }

    public peek() : number {
        if(this.isEmpty()) {
            throw new Error("IllegalStateException");
        }
        return this.arr[0];
    }
}

function HeapSort(array :  Array<number>, cmp : (a:number, b:number) => boolean) {
    let hp : Heap = new Heap(array, cmp);
    for(let i : number = 0; i < array.length; i++) {
        array[array.length - i - 1] = hp.remove();
    };
}

function test1() {
    let hp1 : Heap = new Heap();
    hp1.add(1);
    hp1.remove();
    hp1.add(6);
    hp1.add(7);
    hp1.print();
    while (hp1.isEmpty() == false) {
        console.log(hp1.remove());
    }
}

//test1()

function test2() {
    let a :  Array<number> = [1, 0, 2, 4, 5, 3];
    let hp : Heap = new Heap(a); // Min Heap
    hp.print();
    while (hp.isEmpty() == false) {
        console.log(hp.remove())
    }
}

//test2()

function test3() {
    let a :  Array<number> = [1, 0, 2, 4, 5, 3];
    let hp : Heap = new Heap(a, more); // Max Heap
    hp.print();
    while (hp.isEmpty() == false) {
        console.log(hp.remove())
    }
}

//test3() 

function test4() {
    let b :  Array<number> = [6, 5, 3, 4, 1, 2];
    HeapSort(b, more); // Increasing Order
    console.log(b);
}

//test4()

function KthSmallest(arr :  Array<number>, size : number, k : number) {
    arr = arr.sort();
    return arr[k - 1];
};

function KthSmallest2(arr :  Array<number>, size : number, k : number) {
    let value : number = 0;
    let pq : Heap = new Heap(arr, less);
    let i : number = 0;
    while (i < size && i < k) {
        value = pq.remove();
        i += 1;
    }
    return value;
};

function test5() {
    let arr :  Array<number> = [8, 7, 6, 5, 7, 5, 2, 1];
    console.info(`Kth Smallest :: ${KthSmallest(arr, arr.length, 3)}`);
    let arr2 :  Array<number> = [8, 7, 6, 5, 7, 5, 2, 1];
    console.info(`Kth Smallest :: ${KthSmallest2(arr2, arr2.length, 3)}`);
};

test5()

function isMinHeap(arr :  Array<number>) : boolean {
    let lchild : number;
    let rchild : number;
    let size : number = arr.length;
    for(let parent : number = 0; 
        parent < ((size / 2|0) + 1); parent++) {
        lchild = parent * 2 + 1;
        rchild = parent * 2 + 2;
        if(((lchild < size) && (arr[parent] > arr[lchild])) 
        || ((rchild < size) && (arr[parent] > arr[rchild]))) 
        return false;
    };
    return true;
}

function isMaxHeap(arr :  Array<number>) : boolean {
    let lchild : number;
    let rchild : number;
    let size : number = arr.length;
    for(let parent : number = 0; parent < ((size / 2|0) + 1); parent++) {
        lchild = parent * 2 + 1;
        rchild = lchild + 1;
        if(((lchild < size) && (arr[parent] < arr[lchild])) || 
        ((rchild < size) && (arr[parent] < arr[rchild]))) 
        return false;
    };
    return true;
}

function test6() {
    let arr3 :  Array<number> = [8, 7, 6, 5, 7, 5, 2, 1];
    console.info(`isMaxHeap :: ${isMaxHeap(arr3)}`);
    let arr4 :  Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
    console.info(`isMinHeap :: ${isMinHeap(arr4)}`);
};

test6()

function KSmallestProduct(arr :  Array<number>, 
    size : number, k : number) : number {
    arr = arr.sort();
    let product : number = 1;
    for(let i : number = 0; i < k; i++)
    {
        product *= arr[i];
    }
    return product;
}

function swap(arr :  Array<number>, i : number, j : number) {
    let temp : number = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function QuickSelectUtil(arr :  Array<number>, lower : number, upper : number, k : number) {
    if(upper <= lower) return;
    let pivot : number = arr[lower];
    let start : number = lower;
    let stop : number = upper;
    while(lower < upper) {
        while(lower < upper && arr[lower] <= pivot) {
            lower++;
        };
        while(lower <= upper && arr[upper] > pivot) {
            upper--;
        };
        if(lower < upper) {
            swap(arr, upper, lower);
        }
    };
    swap(arr, upper, start);
    if(k < upper) 
        QuickSelectUtil(arr, start, upper - 1, k);
    if(k > upper) 
        QuickSelectUtil(arr, upper + 1, stop, k);
}

function KSmallestProduct3(arr :  Array<number>, size : number, k : number) : number {
    QuickSelectUtil(arr, 0, size - 1, k);
    let product : number = 1;
    for(let i : number = 0; i < k; i++) 
    {
        product *= arr[i];
    }
    return product;
}

function KSmallestProduct2(arr :  Array<number>, size : number, k : number) : number {
    let pq : Heap = new Heap(arr, less); 
    let i : number = 0;
    let product : number = 1;
    for(i = 0; i < size; i++) {
        pq.add(arr[i]);
    };
    while(i < size && i < k) {
        product *= pq.remove();
        i += 1;
    };
    return product;
}

function test7() {
    const arr = [8, 7, 6, 5, 7, 5, 2, 1];
    console.info(`Kth Smallest product:: ${KSmallestProduct(arr, 8, 3)}`);
    const arr2 = [8, 7, 6, 5, 7, 5, 2, 1];
    console.info(`Kth Smallest product:: ${KSmallestProduct2(arr2, 8, 3)}`);
    const arr3 = [8, 7, 6, 5, 7, 5, 2, 1];
    console.info(`Kth Smallest product:: ${KSmallestProduct3(arr3, 8, 3)}`);
};

test7();

function PrintLargerHalf(arr :  Array<number>, size : number) {
    arr = arr.sort();
    for(let i : number = (size / 2|0); i < size; i++) 
    {
        console.info(arr[i]);
    }
    console.info();
}

function PrintLargerHalf2(arr :  Array<number>, size : number) {
    let pq : Heap = new Heap(arr, less); 
    
    for(let i : number = 0; i < (size / 2|0); i++) {
        pq.remove();
    }
    pq.print();
}

function PrintLargerHalf3(arr :  Array<number>, size : number) {
    QuickSelectUtil(arr, 0, size - 1, (size / 2|0));
    for(let i : number = (size / 2|0); i < size; i++) 
    {
        console.info(arr[i]);
    }
    console.info();
}

function test8() {
    let arr :  Array<number> = [8, 7, 6, 5, 7, 5, 2, 1];
    PrintLargerHalf(arr, 8);
    let arr2 :  Array<number> = [8, 7, 6, 5, 7, 5, 2, 1];
    PrintLargerHalf2(arr2, 8);
    let arr3 :  Array<number> = [8, 7, 6, 5, 7, 5, 2, 1];
    PrintLargerHalf3(arr3, 8);
}

test8();

function sortK(arr :  Array<number>, size : number, k : number) {
    let pq : Heap = new Heap([], less); 
    let i : number = 0;
    let output :  Array<number> = new Array(size);
    let index : number = 0;

    for (i = 0; i < k; i++) {
        pq.add(arr[i]);
    };

    for(i = k; i < size; i++) {
        output[index++] = pq.remove();
        pq.add(arr[i]);
    };

    while(pq.isEmpty() === false) {
        output[index++] = pq.remove()
    };
    
    for(i = 0; i < size; i++) {
        arr[i] = output[i];
    };
    console.info(arr);
}

function test9() {
    let k : number = 3;
    let arr :  Array<number> = [1, 5, 4, 10, 50, 9];
    let size : number = arr.length;
    sortK(arr, size, k);
};

test9();

function ChotaBhim(cups :  Array<number>, size : number) : number {
    let time : number = 60;
    cups.sort();
    let total : number = 0;
    let index : number;
    let temp : number;
    while(time > 0) {
        total += cups[0];
        cups[0] = Math.ceil(cups[0] / 2.0);
        index = 0;
        temp = cups[0];
        while(index < size - 1 && 
            temp < cups[index + 1]) {
            cups[index] = cups[index + 1];
            index += 1;
        };
        cups[index] = temp;
        time -= 1;
    };
    console.info("Total : " + total);
    return total;
}


function ChotaBhim2(cups :  Array<number>, size : number) : number {
    let time : number = 60;
    cups.sort();
    let total : number = 0;
    let i : number;
    let temp : number;
    while(time > 0) {
        total += cups[0];
        cups[0] = Math.ceil(cups[0] / 2.0);
        i = 0;
        while(i < size - 1) {
            if(cups[i] > cups[i + 1]) break;
            temp = cups[i];
            cups[i] = cups[i + 1];
            cups[i + 1] = temp;
            i += 1;
        };
        time -= 1;
    };
    console.info("Total : " + total);
    return total;
}

function ChotaBhim3(cups :  Array<number>, size : number) : number {
    let time : number = 60;
    let pq : Heap = new Heap(cups, more); 
    let total : number = 0;
    let value : number;
    while(time > 0) {
        value = pq.remove();
        total += value;
        value = (Math.ceil(value / 2.0));
        pq.add(value);
        time -= 1;
    };
    console.info("Total : " + total);
    return total;
}

function test10(){
    let cups :  Array<number> = [2, 1, 7, 4, 2];
    ChotaBhim(cups, cups.length);
    let cups2 :  Array<number> = [2, 1, 7, 4, 2];
    ChotaBhim2(cups2, cups.length);
    let cups3 :  Array<number> = [2, 1, 7, 4, 2];
    ChotaBhim3(cups3, cups.length);
};

test10()

function JoinRopes(ropes :  Array<number>, size : number) : number {
    ropes.sort().reverse();
    let total : number = 0;
    let value : number = 0;
    let temp : number;
    let index : number;
    let length : number = size;
    while(length >= 2) {
        value = ropes[length - 1] + ropes[length - 2];
        total += value;
        index = length - 2;
        while((index > 0 && ropes[index - 1] < value)) {
            ropes[index] = ropes[index - 1];
            index -= 1;
        };
        ropes[index] = value;
        length--;
    };
    console.info("Total : " + total);
    return total;
}

function JoinRopes2(ropes :  Array<number>, size : number) : number {
    let pq : Heap = new Heap(ropes, less);
    let i : number = 0;
    let total : number = 0;
    let value : number = 0;

    while(pq.length() > 1) {
        value = pq.remove();
        value += pq.remove();
        pq.add(value);
        total += value;
    };
    console.info("Total : " + total);
    return total;
}

function test11(){
    let ropes :  Array<number> = [2, 1, 7, 4, 2];
    JoinRopes(ropes, ropes.length);
    let rope2 :  Array<number> = [2, 1, 7, 4, 2];
    JoinRopes2(rope2, rope2.length);
};

test11()

class MedianHeap {
    minHeap : Heap;
    maxHeap : Heap;
    
    constructor() {
        this.minHeap = new Heap([], less);
        this.maxHeap = new Heap([], more);
    }

    public insert(value : number) {
        if (this.maxHeap.isEmpty() === true || this.maxHeap.peek() >= value) {
            this.maxHeap.add(value);
        }
        else {
            this.minHeap.add(value);
        }
        if (this.maxHeap.length() > this.minHeap.length() + 1) {
            value = this.maxHeap.remove();
            this.minHeap.add(value);
        }
        if (this.minHeap.length() > this.maxHeap.length() + 1) {
            value = this.minHeap.remove();
            this.maxHeap.add(value);
        }
    }

    public getMedian() : number {
        if (this.maxHeap.isEmpty() === true && this.minHeap.isEmpty() === true)
            return 2147483647;
        if (this.maxHeap.length() === this.minHeap.length())
            return ((this.maxHeap.peek() + this.minHeap.peek()) / 2 | 0);
        else if (this.maxHeap.length() > this.minHeap.length())
            return this.maxHeap.peek();
        else
            return this.minHeap.peek();
    }
}

function test12(){
    let arr :  Array<number> = [1, 9, 2, 8, 3, 7, 4, 6, 5, 1, 9, 2, 8, 3, 7, 4, 6, 5, 10, 10];
    let hp : MedianHeap = new MedianHeap();
    for(let i : number = 0; i < 20; i++) {
        hp.insert(arr[i]);
        console.info("Median after insertion of " + arr[i] + " is  " + hp.getMedian());
    };
};

test12();