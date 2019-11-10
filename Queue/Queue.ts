class Queue {
    _size : number;
    capacity : number = 100;
    data : number[];
    front : number = 0;
    back : number = 0;

    public constructor() {
        this._size = 0;
        this.data = new Array(100).fill(0);
    }

    public add(value : number) : boolean {
        if(this._size >= this.capacity) {
            console.info("Queue is full.");
            return false;
        } else {
            this._size++;
            this.data[this.back] = value;
            this.back = (++this.back) % (this.capacity - 1);
        }
        return true;class Deque {
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
    }

    public remove() : number {
        let value : number;
        if(this._size <= 0) {
            console.info("Queue is empty.");
            return -999;
        } else {
            this._size--;
            value = this.data[this.front];
            this.front = (++this.front) % (this.capacity - 1);
        }
        return value;
    }

    isEmpty() : boolean {
        return this._size === 0;
    }

    size() : number {
        return this._size;
    }

}

function main() {
    let que : Queue = new Queue();
    for(let i : number = 0; i < 20; i++) {
        que.add(i);
    };
    for(let i : number = 0; i < 22; i++) {
        console.info(que.remove());
    };
}

main();