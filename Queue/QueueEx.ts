class Deque {
    data : number[];

    public constructor() {
        this.data = [];
    }

    public size() : number {
        return this.data.length;
    }

    public add(val : number) {
        this.data.push(val);
    }

    public remove() : number {
        return this.data.shift();
    }

    public removeLast() : number {
        return this.data.pop()
    }
    
    public peek() : number{
        return this.data[0]
    }

    public peekLast() : number {
        return this.data[this.data.length - 1]
    }
}


class Queue {
    frontIndex : number;
    data : number[];

    public constructor() {
        this.frontIndex = 0;
        this.data = [];
    }

    public add(value : number) {
        this.data.push(value);
    }

    public remove() : number {
        let value = this.data[this.frontIndex];
        this.frontIndex++;
        if (this.data.length > 0 && this.frontIndex * 2 >= this.data.length) {
            this.data = this.data.slice(this.frontIndex);
            this.frontIndex = 0;
        }
        return value;
    }

    public peek() : number {
        let value = this.data[this.frontIndex];
        return value;
    }

    public isEmpty() : boolean {
        return (this.data.length - this.frontIndex) === 0;
    }

    public size() : number {
        return (this.data.length - this.frontIndex);
    }

    public peekLast() : number {
        return this.data[this.data.length - 1]
    }
}

function CircularTour(arr : number[][], n : number) : number {
    let que : Queue = new Queue();
    let nextPump : number = 0;
    let prevPump : number;
    let count : number = 0;
    let petrol : number = 0;
    while(que.size() !== n) {
        while((petrol >= 0 && que.size() !== n)) {
            que.add(nextPump);
            petrol += (arr[nextPump][0] - arr[nextPump][1]);
            nextPump = (nextPump + 1) % n;
        };
        while((petrol < 0 && que.size() > 0)) {
            prevPump = que.remove();
            petrol -= (arr[prevPump][0] - arr[prevPump][1]);
        };
        count += 1;
        if(count === n) return -1;
    };
    if(petrol >= 0) 
        return que.remove(); 
    else 
        return -1;
}

function main1() {
    let tour : number[][] = [[8, 6], [1, 4], [7, 6]];
    console.info(" Circular Tour : " + CircularTour(tour, 3));
}

function convertXY(src : number, dst : number) : number {
    let que : Queue = new Queue();
    let arr : number[] = new Array<number>(100);
    let steps : number = 0;
    let index : number = 0;
    let value : number;
    que.add(src);
    while(que.size() !== 0) {
        value = que.remove();
        arr[index++] = value;
        if(value === dst) {
            for(let i : number = 0; i < index; i++) {
                console.info(arr[i]);
            }
            console.info("Steps countr :: " + steps);
            return steps;
        }
        steps++;
        if(value < dst) 
            que.add(value * 2); 
        else 
            que.add(value - 1);
    };
    return -1;
}

function main2() {
    convertXY(2, 7);
}

function maxSlidingWindows(arr : number[], size : number, k : number) {
    let que : Deque = new Deque();
    for (let i = 0; i < size; i++) {
        if (que.size() > 0 && que.peek() <= i - k)
            que.remove();
        while (que.size() > 0 && arr[que.peekLast()] <= arr[i]) {
            que.removeLast();
        };
        que.add(i);
        if (i >= (k - 1))
            console.info(`${arr[que.peek()]} `);
    }
}

function main3() {
    let arr : number[] = [11, 2, 75, 92, 59, 90, 55];
    let k : number = 3;
    maxSlidingWindows(arr, 7, 3);
}

function minOfMaxSlidingWindows(arr : number[], size : number, k : number) : number {
    let que : Queue = new Queue();
    let minVal : number = 999999;
    for (let i = 0; i < size; i++) {
        if (que.size() > 0 && que.peek() <= i - k)
            que.remove();
        while (que.size() > 0 && arr[que.peekLast()] <= arr[i]) {
            que.remove();
        };
        que.add(i);
        if (i >= (k - 1) && minVal > arr[que.peek()])
            minVal = arr[que.peek()];
    }
    console.info(`Min of max is :: ${minVal}`);
    return minVal;
}

function main4() {
    let arr : number[] = [11, 2, 75, 92, 59, 90, 55];
    let k : number = 3;
    minOfMaxSlidingWindows(arr, 7, 3);
}

function maxOfMinSlidingWindows(arr : number[], size : number, k : number) {
    let que : Queue = new Queue();
    let maxVal : number = -999999;
    for (let i = 0; i < size; i++) {
        if (que.size() > 0 && que.peek() <= i - k)
            que.remove();
        while (que.size() > 0 && arr[que.peekLast()] >= arr[i]) {
            que.remove();
        };
        que.add(i);
        if (i >= (k - 1) && maxVal < arr[que.peek()])
            maxVal = arr[que.peek()];
    }
    console.info("Max of min is :: " + maxVal);
}

function main5() {
    let arr : number[] = [11, 2, 75, 92, 59, 90, 55];
    let k : number = 3;
    maxOfMinSlidingWindows(arr, 7, 3);
}

function firstNegSlidingWindows(arr : number[], size : number, k : number) {
    let que : Queue = new Queue();
    for (let i = 0; i < size; i++) {
        if (que.size() > 0 && que.peek() <= i - k)
            que.remove();
        if (arr[i] < 0)
            que.add(i);
        if (i >= (k - 1)) {
            if (que.size() > 0)
                console.info(`${arr[que.peek()]} `);
            else
                console.info("NAN ");
        }
    }
}

function main6() {
    let arr : number[] = [3, -2, -6, 10, -14, 50, 14, 21];
    let k : number = 3;
    firstNegSlidingWindows(arr, 8, 3);
}

main1();
main2();
main3();
main4();
main5();
main6();