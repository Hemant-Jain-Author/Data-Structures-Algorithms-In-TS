
class PriorityQueue<T> {
    static CAPACITY: number = 32;
    size: number;
    arr: Array<T>;
    compare: (a: T, b: T) => boolean;

    public constructor(cmp: (a: T, b: T) => boolean) {
        this.compare = cmp;
        this.arr = new Array<T>(PriorityQueue.CAPACITY);
        this.size = 0;
    }

    proclateDown(parent: number) {
        let lChild: number = 2 * parent + 1;
        let rChild: number = lChild + 1;
        let child: number = -1;
        let temp: T;
        if (lChild < this.size) {
            child = lChild;
        }
        if (rChild < this.size && this.compare(this.arr[lChild], this.arr[rChild])) {
            child = rChild;
        }
        if (child !== -1 && this.compare(this.arr[parent], this.arr[child])) {
            temp = this.arr[parent];
            this.arr[parent] = this.arr[child];
            this.arr[child] = temp;
            this.proclateDown(child);
        }
    }

    proclateUp(child: number) {
        let parent: number = Math.floor((child - 1) / 2);
        let temp: T;
        if (parent < 0) {
            return;
        }
        if (this.compare(this.arr[parent], this.arr[child])) {
            temp = this.arr[child];
            this.arr[child] = this.arr[parent];
            this.arr[parent] = temp;
            this.proclateUp(parent);
        }
    }

    public add(value: T) {
        if (this.size === this.arr.length) {
            this.doubleSize();
        }

        this.arr[this.size++] = value;

        this.proclateUp(this.size - 1);
    }

    private doubleSize() {
        let old: Array<T> = this.arr;
        let newSize = this.size * 2;
        if (newSize === 0)
            newSize = 1;
        this.arr = new Array<T>(newSize);
        /* arraycopy */
        let size = this.size;
        for (let i = 0; i < size; i++) {
            this.arr[i] = old[i];
        }
    }

    public remove(): T {
        if (this.isEmpty()) {
            throw new Error("IllegalStateException");
        }
        let value: T = this.arr[0];
        this.arr[0] = this.arr[this.size - 1];
        this.size--;
        this.proclateDown(0);
        return value;
    }

    public print() {
        console.info(this.arr);;
    }

    public isEmpty(): boolean {
        return (this.size === 0);
    }

    public length(): number {
        return this.size;
    }

    public peek(): T {
        if (this.isEmpty()) {
            throw new Error("IllegalStateException");
        }
        return this.arr[0];
    }
}

const infi = 2147483647;

class GraphEdge {
    dest: number;
    cost: number;

    public constructor(dst: number, cst: number) {
        this.dest = dst;
        this.cost = cst;
    }
}

function compare(x: GraphEdge, y: GraphEdge): boolean {
    return x.cost > y.cost
}

class GraphAM {
    count: number;
    adj: Array<Array<number>>;

    constructor(cnt: number) {
        this.count = cnt;
        this.adj = new Array<Array<number>>(this.count)
        for (let i = 0; i < this.count; i++)
            this.adj[i] = new Array<number>(this.count).fill(0);
    }

    public addDirectedEdge(src: number, dst: number, cost: number) {
        this.adj[src][dst] = cost;
    }

    public addUndirectedEdge(src: number, dst: number, cost: number) {
        this.addDirectedEdge(src, dst, cost);
        this.addDirectedEdge(dst, src, cost);
    }

    public print() {
        for (let i: number = 0; i < this.count; i++) {
            console.info("Node index [ " + i + " ] is connected with : " + this.adj[i])
        };
    }


    public dijkstra(source: number) {
        let previous: Array<number> = new Array<number>(this.count).fill(-1);
        let dist: Array<number> = new Array<number>(this.count).fill(0);
        let visited: Array<boolean> = new Array<boolean>(this.count).fill(false);
        for (let i: number = 0; i < this.count; i++) {
            previous[i] = -1;
            dist[i] = infi;
            visited[i] = false;
        };
        dist[source] = 0;
        previous[source] = -1;
        let queue: PriorityQueue<GraphEdge> = new PriorityQueue<GraphEdge>(compare);
        let node: GraphEdge = new GraphEdge(source, 0);
        queue.add(node);
        while (queue.isEmpty() === false) {
            node = queue.remove();
            source = node.dest;
            visited[source] = true;
            for (let dest: number = 0; dest < this.count; dest++) {
                let cost: number = this.adj[source][dest];
                if (cost !== 0) {
                    let alt: number = cost + dist[source];
                    if (dist[dest] > alt && visited[dest] === false) {
                        dist[dest] = alt;
                        previous[dest] = source;
                        node = new GraphEdge(dest, alt);
                        queue.add(node);
                    }
                }
            };
        };
        let count: number = this.count;
        for (let i: number = 0; i < count; i++) {
            if (dist[i] === infi) {
                console.info("Node id " + i + "  prev " + previous[i] + " distance : Unreachable");
            } else {
                console.info("Node id " + i + "  prev " + previous[i] + " distance : " + dist[i]);
            }
        };
    }

    public prims() {
        let previous: Array<number> = new Array<number>(this.count).fill(-1);
        let dist: Array<number> = new Array<number>(this.count).fill(0);
        let source: number = 0;
        let visited: Array<boolean> = new Array<boolean>(this.count).fill(false);
        for (let i: number = 0; i < this.count; i++) {
            previous[i] = -1;
            dist[i] = infi;
            visited[i] = false;
        };
        dist[source] = 0;
        previous[source] = -1;
        let queue: PriorityQueue<GraphEdge> = new PriorityQueue<GraphEdge>(compare);
        let node: GraphEdge = new GraphEdge(source, 0);
        queue.add(node);
        while (queue.isEmpty() === false) {
            node = queue.remove();
            source = node.dest;
            visited[source] = true;
            for (let dest: number = 0; dest < this.count; dest++) {
                let cost: number = this.adj[source][dest];
                if (cost !== 0) {
                    let alt: number = cost;
                    if (dist[dest] > alt && visited[dest] === false) {
                        dist[dest] = alt;
                        previous[dest] = source;
                        node = new GraphEdge(dest, alt);
                        queue.add(node);
                    }
                }
            };
        };
        const count: number = this.count;
        for (let i: number = 0; i < count; i++) {
            if (dist[i] === infi) {
                console.info("Node id " + i + "  prev " + previous[i] + " distance : Unreachable");
            } else {
                console.info("Node id " + i + "  prev " + previous[i] + " distance : " + dist[i]);
            }
        };
    }


    public hamiltonianPathUtil(path: Array<number>, pSize: number, added: Array<number>): boolean {
        if (pSize === this.count) {
            return true;
        }
        for (let vertex: number = 0; vertex < this.count; vertex++) {
            if (pSize === 0 || (this.adj[path[pSize - 1]][vertex] === 1 && added[vertex] === 0)) {
                path[pSize++] = vertex;
                added[vertex] = 1;
                if (this.hamiltonianPathUtil(path, pSize, added)) return true;
                pSize--;
                added[vertex] = 0;
            }
        };
        return false;
    }

    public hamiltonianPath(): boolean {
        let path: Array<number> = new Array<number>(this.count).fill(0);
        let added: Array<number> = new Array<number>(this.count).fill(0);
        if (this.hamiltonianPathUtil(path, 0, added)) {
            console.info("Hamiltonian Path found :: " + path);
            return true;
        }
        console.info("Hamiltonian Path not found");
        return false;
    }

    public hamiltonianCycleUtil(path: Array<number>, pSize: number, added: Array<number>): boolean {
        if (pSize === this.count) {
            if (this.adj[path[pSize - 1]][path[0]] === 1) {
                path[pSize] = path[0];
                return true;
            } else return false;
        }
        for (let vertex: number = 0; vertex < this.count; vertex++) {
            if (pSize === 0 || (this.adj[path[pSize - 1]][vertex] === 1 && added[vertex] === 0)) {
                path[pSize++] = vertex;
                added[vertex] = 1;
                if (this.hamiltonianCycleUtil(path, pSize, added)) return true;
                pSize--;
                added[vertex] = 0;
            }
        };
        return false;
    }

    public hamiltonianCycle(): boolean {
        let path: Array<number> = new Array<number>(this.count + 1).fill(0);
        let added: Array<number> = new Array<number>(this.count).fill(0);
        if (this.hamiltonianCycleUtil(path, 0, added)) {
            console.info("Hamiltonian Cycle found :: " + path);
            return true;
        }
        console.info("Hamiltonian Cycle not found");
        return false;
    }
}
function main1() {
    let graph: GraphAM = new GraphAM(4);
    graph.addUndirectedEdge(0, 1, 1);
    graph.addUndirectedEdge(0, 2, 1);
    graph.addUndirectedEdge(1, 2, 1);
    graph.addUndirectedEdge(2, 3, 1);
    graph.print();
}

function main2() {
    let gph: GraphAM = new GraphAM(9);
    gph.addUndirectedEdge(0, 1, 4);
    gph.addUndirectedEdge(0, 7, 8);
    gph.addUndirectedEdge(1, 2, 8);
    gph.addUndirectedEdge(1, 7, 11);
    gph.addUndirectedEdge(2, 3, 7);
    gph.addUndirectedEdge(2, 8, 2);
    gph.addUndirectedEdge(2, 5, 4);
    gph.addUndirectedEdge(3, 4, 9);
    gph.addUndirectedEdge(3, 5, 14);
    gph.addUndirectedEdge(4, 5, 10);
    gph.addUndirectedEdge(5, 6, 2);
    gph.addUndirectedEdge(6, 7, 1);
    gph.addUndirectedEdge(6, 8, 6);
    gph.addUndirectedEdge(7, 8, 7);
    gph.print();
    gph.prims();
    gph.dijkstra(0);
}

function main3() {
    let gph: GraphAM = new GraphAM(9);
    gph.addUndirectedEdge(0, 2, 1);
    gph.addUndirectedEdge(1, 2, 5);
    gph.addUndirectedEdge(1, 3, 7);
    gph.addUndirectedEdge(1, 4, 9);
    gph.addUndirectedEdge(3, 2, 2);
    gph.addUndirectedEdge(3, 5, 4);
    gph.addUndirectedEdge(4, 5, 6);
    gph.addUndirectedEdge(4, 6, 3);
    gph.addUndirectedEdge(5, 7, 1);
    gph.addUndirectedEdge(6, 7, 7);
    gph.addUndirectedEdge(7, 8, 17);
    gph.print();
    gph.prims();
    gph.dijkstra(1);
}

function main4() {
    let count: number = 5;
    let graph: GraphAM = new GraphAM(count);
    let adj: Array<Array<number>> = [
        [0, 1, 0, 1, 0],
        [1, 0, 1, 1, 0],
        [0, 1, 0, 0, 1],
        [1, 1, 0, 0, 1],
        [0, 1, 1, 1, 0]];
    for (let i: number = 0; i < count; i++) {
        for (let j: number = 0; j < count; j++) {
            if (adj[i][j] === 1)
                graph.addDirectedEdge(i, j, 1);
        };
    }
    console.info("hamiltonianPath : " + graph.hamiltonianPath());
    console.info("hamiltonianCycle : " + graph.hamiltonianCycle());
    let graph2: GraphAM = new GraphAM(count);
    let adj2: Array<Array<number>> = [
        [0, 1, 0, 1, 0],
        [1, 0, 1, 1, 0],
        [0, 1, 0, 0, 1],
        [1, 1, 0, 0, 0],
        [0, 1, 1, 0, 0]];
    for (let i: number = 0; i < count; i++) {
        for (let j: number = 0; j < count; j++) {
            if (adj2[i][j] === 1)
                graph2.addDirectedEdge(i, j, 1);
        };
    }
    console.info("hamiltonianPath :  " + graph2.hamiltonianPath());
    console.info("hamiltonianCycle :  " + graph2.hamiltonianCycle());
}


main1();
main2();
main3();
main4();