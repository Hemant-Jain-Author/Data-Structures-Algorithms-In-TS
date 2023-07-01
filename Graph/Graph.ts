class Queue<T> {
    frontIndex: number;
    data: T[];

    public constructor() {
        this.frontIndex = 0;
        this.data = [];
    }

    public add(value: T) {
        this.data.push(value);
    }

    public remove(): T {
        let value = this.data[this.frontIndex];
        this.frontIndex++;
        if (this.data.length > 0 && this.frontIndex * 2 >= this.data.length) {
            this.data = this.data.slice(this.frontIndex);
            this.frontIndex = 0;
        }
        return value;
    }

    public peek(): T {
        let value = this.data[this.frontIndex];
        return value;
    }

    public isEmpty(): boolean {
        return (this.data.length - this.frontIndex) === 0;
    }

    public size(): number {
        return (this.data.length - this.frontIndex);
    }

    public peekLast(): T {
        return this.data[this.data.length - 1]
    }
}

const infi = 2147483647;

/*function more(x:number, y: number) : boolean {
    return (y - x) > 0;
}
*/

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

class GraphEdge {
    dest: number;
    cost: number;

    public constructor(dst: number, cst: number) {
        if (cst === undefined)
            cst = 1
        this.dest = dst;
        this.cost = cst;
    }
}

function EdgeComparator(a: GraphEdge, b: GraphEdge): boolean {
    return (a.cost - b.cost > 0);
}

class Graph {
    count: number;
    Adj: Array<Array<GraphEdge>>;

    public constructor(cnt: number) {
        if (cnt === undefined)
            throw new Error('Invalid argument')

        this.count = cnt;
        this.Adj = new Array();
        for (let i = 0; i < cnt; i++) {
            this.Adj[i] = new Array()
        }
    }

    public addDirectedEdge(source: number, dest: number, cost: number) {
        if (cost === undefined)
            cost = 1
        let edge: GraphEdge = new GraphEdge(dest, cost);
        this.Adj[source].push(edge);
    }

    public addUndirectedEdge(source: number, dest: number, cost: number) {
        this.addDirectedEdge(source, dest, cost);
        this.addDirectedEdge(dest, source, cost);
    }

    public print() {
        for (let i: number = 0; i < this.count; i++) {
            let ad: Array<GraphEdge> = this.Adj[i];
            console.info("Vertex " + i + " is connected to : ");
            for (let index = 0; index < ad.length; index++) {
                let adn = ad[index];
                console.info("(" + adn.dest + ", " + adn.cost + ") ");
            }
        };
    }

    public dfsStack(source: number, target: number): boolean {
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        let stk: Array<number> = new Array<number>();
        stk.push(source);
        visited[source] = true;
        while (stk.length !== 0) {

            let curr: number
            curr = stk.pop()!;
            let adl: Array<GraphEdge> = this.Adj[curr];
            for (let index = 0; index < adl.length; index++) {
                let adn = adl[index];
                if (visited[adn.dest] === false) {
                    visited[adn.dest] = true;
                    stk.push(adn.dest);
                }
            }
        };
        return visited[target];
    }

    public dfs(source: number, target: number): boolean {
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        this.dfsUtil(source, visited);
        return visited[target];
    }

    public dfsUtil(index: number, visited: Array<boolean>) {
        visited[index] = true;
        let adl: Array<GraphEdge> = this.Adj[index];
        for (let index = 0; index < adl.length; index++) {
            let adn = adl[index];
            if (visited[adn.dest] === false)
                this.dfsUtil(adn.dest, visited);
        }
    }

    public dfsUtil2(index: number, visited: Array<boolean>, stk: Array<number>) {
        visited[index] = true;
        let adl: Array<GraphEdge> = this.Adj[index];
        for (let index = 0; index < adl.length; index++) {
            let adn = adl[index];
            if (visited[adn.dest] === false) {
                this.dfsUtil2(adn.dest, visited, stk);
            }
        }
        stk.push(index);
    }

    public bfs(source: number, target: number): boolean {
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        let que: Queue<number> = new Queue<number>();;
        que.add(source);
        visited[source] = true;
        while (que.isEmpty() === false) {
            let curr = que.remove();
            let adl: Array<GraphEdge> = this.Adj[curr];
            for (let index = 0; index < adl.length; index++) {
                let adn = adl[index];
                if (visited[adn.dest] === false) {
                    visited[adn.dest] = true;
                    que.add(adn.dest);
                }
            }
        };
        return visited[target];
    }

    public topologicalSort(gph: Graph) {
        let stk: Array<number> = new Array<number>();
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        for (let i: number = 0; i < count; i++) {
            if (visited[i] === false) {
                this.dfsUtil2(i, visited, stk);
            }
        };
        console.info("topologicalSort :: ");
        while (stk.length !== 0) {
            console.info(" " + stk.pop());
        };
    }

    public pathExist(source: number, dest: number): boolean {
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        this.dfsUtil(source, visited);
        return visited[dest];
    }

    public countAllPathDFS(visited: Array<boolean>, source: number, dest: number): number {
        if (source === dest) {
            return 1;
        }
        let count: number = 0;
        visited[source] = true;
        let adl: Array<GraphEdge> = this.Adj[source];
        for (let index = 0; index < adl.length; index++) {
            let adn = adl[index];
            if (visited[adn.dest] === false) {
                count += this.countAllPathDFS(visited, adn.dest, dest);
            }
            visited[source] = false;
        }
        return count;
    }

    public countAllPath(src: number, dest: number): number {
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        return this.countAllPathDFS(visited, src, dest);
    }

    public printAllPathDFS(visited: Array<boolean>, source: number, dest: number, path: Array<number>) {
        path.push(source);
        if (source === dest) {
            console.info(path);
            path.pop();
            return;
        }
        visited[source] = true;
        let adl: Array<GraphEdge> = this.Adj[source];
        for (let index = 0; index < adl.length; index++) {
            let adn = adl[index];
            if (visited[adn.dest] === false) {
                this.printAllPathDFS(visited, adn.dest, dest, path);
            }
        }
        visited[source] = false;
        path.pop();
    }

    public printAllPath(src: number, dest: number) {
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        let path: Array<number> = new Array<number>();
        this.printAllPathDFS(visited, src, dest, path);
    }

    public rootVertex(gph: Graph): number {
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        let retVal: number = -1;
        for (let i: number = 0; i < count; i++) {
            if (visited[i] === false) {
                this.dfsUtil(i, visited);
                retVal = i;
            }
        };
        console.info("Root vertex is :: " + retVal);
        return retVal;
    }

    public transitiveClosureUtil(source: number, dest: number, tc: Array<Array<number>>) {
        tc[source][dest] = 1;
        let adl: Array<GraphEdge> = this.Adj[dest];
        for (let index = 0; index < adl.length; index++) {
            let adn = adl[index];
            if (tc[source][adn.dest] === 0)
                this.transitiveClosureUtil(source, adn.dest, tc);
        }
    }

    public transitiveClosure(gph: Graph): Array<Array<number>> {
        const count: number = this.count;
        let tc: Array<Array<number>> = new Array<Array<number>>(count);
        for (let i: number = 0; i < count; i++) {
            tc[i] = new Array<number>(count).fill(0);
        }
        for (let i: number = 0; i < count; i++) {
            this.transitiveClosureUtil(i, i, tc);
        };
        return tc;
    }

    public bfsLevelNode(source: number) {
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        let level: Array<number> = new Array<number>(count);
        visited[source] = true;
        let que: Queue<number> = new Queue<number>();;
        que.add(source);
        level[source] = 0;
        console.info("Node  - Level");
        while (que.isEmpty() === false) {
            let curr = que.remove();
            let depth: number = level[curr];
            let adl: Array<GraphEdge> = this.Adj[curr];
            console.info(curr + " - " + depth);
            for (let index = 0; index < adl.length; index++) {
                let adn = adl[index];

                if (visited[adn.dest] === false) {
                    visited[adn.dest] = true;
                    que.add(adn.dest);
                    level[adn.dest] = depth + 1;
                }

            }
        };
    }

    public bfsDistance(source: number, dest: number): number {
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        let que: Queue<number> = new Queue<number>();;
        que.add(source);
        visited[source] = true;
        let level: Array<number> = new Array<number>(count);
        level[source] = 0;
        while (que.isEmpty() === false) {
            let curr = que.remove();
            let depth: number = level[curr];
            let adl: Array<GraphEdge> = this.Adj[curr];
            for (let index = 0; index < adl.length; index++) {
                let adn = adl[index];
                if (adn.dest === dest) {
                    return depth + 1;
                }
                if (visited[adn.dest] === false) {
                    visited[adn.dest] = true;
                    que.add(adn.dest);
                    level[adn.dest] = depth + 1;
                }
            }
        };
        return -1;
    }

    public isCyclePresentUndirectedDFS(index: number, parentIndex: number, visited: Array<boolean>): boolean {
        visited[index] = true;
        let dest: number;
        let adl: Array<GraphEdge> = this.Adj[index];
        for (let index = 0; index < adl.length; index++) {
            let adn = adl[index];
            dest = adn.dest;
            if (visited[dest] === false) {
                if (this.isCyclePresentUndirectedDFS(dest, index, visited)) return true;
            } else if (parentIndex !== dest) return true;
        }
        return false;
    }

    public isCyclePresentUndirected(): boolean {
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        for (let i: number = 0; i < count; i++) {
            if (visited[i] === false)
                if (this.isCyclePresentUndirectedDFS(i, -1, visited))
                    return true;;
        }
        return false;
    }

    public isCyclePresentDFS(index: number, visited: Array<boolean>, marked: Array<number>): boolean {
        visited[index] = true;
        marked[index] = 1;
        let adl: Array<GraphEdge> = this.Adj[index];
        for (let index = 0; index < adl.length; index++) {
            let adn = adl[index];
            let dest: number = adn.dest;
            if (marked[dest] === 1) return true;
            if (visited[dest] === false)
                if (this.isCyclePresentDFS(dest, visited, marked))
                    return true;

        }
        marked[index] = 0;
        return false;
    }

    public isCyclePresent(): boolean {
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        let marked: Array<number> = new Array<number>(count);
        for (let index: number = 0; index < count; index++) {
            if (visited[index] === false)
                if (this.isCyclePresentDFS(index, visited, marked))
                    return true;
        };
        return false;
    }

    public isCyclePresentDFSColor(index: number, visited: Array<number>): boolean {
        visited[index] = 1;
        let dest: number;
        let adl: Array<GraphEdge> = this.Adj[index];
        for (let index = 0; index < adl.length; index++) {
            let adn = adl[index];
            dest = adn.dest;
            if (visited[dest] === 1)
                return true;
            if (visited[dest] === 0)
                if (this.isCyclePresentDFSColor(dest, visited))
                    return true;
        }
        visited[index] = 2;
        return false;
    }

    public isCyclePresentColor(): boolean {
        const count: number = this.count;
        let visited: Array<number> = new Array<number>(count);
        for (let i: number = 0; i < count; i++) {
            if (visited[i] === 0)
                if (this.isCyclePresentDFSColor(i, visited))
                    return true;
        };
        return false;
    }

    public transposeGraph(): Graph {
        const count: number = this.count;
        let g: Graph = new Graph(count);
        for (let i: number = 0; i < count; i++) {
            let adl: Array<GraphEdge> = this.Adj[i];
            for (let index = 0; index < adl.length; index++) {
                let adn = adl[index];
                let dest: number = adn.dest;
                g.addDirectedEdge(dest, i, 1);
            }
        };
        return g;
    }

    public isConnectedUndirected(gph: Graph): boolean {
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        this.dfsUtil(0, visited);
        for (let i: number = 0; i < count; i++) {
            if (visited[i] === false) {
                return false;
            }
        };
        return true;
    }

    public isStronglyConnected(gph: Graph): boolean {
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        this.dfsUtil(0, visited);
        for (let i: number = 0; i < count; i++) {
            if (visited[i] === false) {
                return false;
            }
        };
        let gReversed: Graph = this.transposeGraph();
        for (let i: number = 0; i < count; i++) {
            visited[i] = false;
        };
        gReversed.dfsUtil(0, visited);
        for (let i: number = 0; i < count; i++) {
            if (visited[i] === false) {
                return false;
            }
        };
        return true;
    }

    public stronglyConnectedComponent(gph: Graph) {
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        let stk: Array<number> = new Array<number>();
        for (let i: number = 0; i < count; i++) {
            if (visited[i] === false) {
                this.dfsUtil2(i, visited, stk);
            }
        };
        let gReversed: Graph = this.transposeGraph();
        for (let i: number = 0; i < count; i++) {
            visited[i] = false;
        };
        let stk2: Array<number> = new Array<number>();
        while (stk.length !== 0) {
            let index: number = stk.pop()!;
            if (visited[index] === false) {
                stk2.length = 0;
                gReversed.dfsUtil2(index, visited, stk2);
                console.info(stk2);
            }
        };
    }

    public prims() {
        let previous: Array<number> = new Array(this.count).fill(-1);
        let dist: Array<number> = new Array(this.count).fill(infi);
        let visited: Array<boolean> = new Array(this.count).fill(false);
        let source: number = 1;
        dist[source] = 0;

        let queue: PriorityQueue<GraphEdge> =
            new PriorityQueue<GraphEdge>(EdgeComparator);
        let node: GraphEdge = new GraphEdge(source, 0);
        queue.add(node);

        while (queue.isEmpty() === false) {
            node = queue.remove();
            source = node.dest;
            if (visited[source] == true) {
                continue
            }
            visited[source] = true;

            let adl: Array<GraphEdge> = this.Adj[source];
            for (let index = 0; index < adl.length; index++) {
                let adn = adl[index];
                let dest: number = adn.dest;
                let alt: number = adn.cost;
                if (dist[dest] > alt && visited[dest] === false) {
                    dist[dest] = alt;
                    previous[dest] = source;
                    node = new GraphEdge(dest, alt);
                    queue.add(node);
                }
            }
        };
        const count: number = this.count;
        for (let i: number = 0; i < count; i++) {
            if (dist[i] === infi) {
                console.info(" node id " + i + "  prev " + previous[i] + " distance : Unreachable");
            } else {
                console.info(" node id " + i + "  prev " + previous[i] + " distance : " + dist[i]);
            }
        };
    }


    public shortestPath(source: number) {
        let curr: number;
        const count: number = this.count;
        let distance: Array<number> = new Array<number>(count);
        let path: Array<number> = new Array<number>(count);
        for (let i: number = 0; i < count; i++) {
            distance[i] = -1;
        };
        let que: Queue<number> = new Queue<number>();;
        que.add(source);
        distance[source] = 0;
        while (que.isEmpty() === false) {
            curr = que.remove();
            let adl: Array<GraphEdge> = this.Adj[curr];
            for (let index = 0; index < adl.length; index++) {
                let adn = adl[index];
                if (distance[adn.dest] === -1) {
                    distance[adn.dest] = distance[curr] + 1;
                    path[adn.dest] = curr;
                    que.add(adn.dest);
                }
            }
        };
        for (let i: number = 0; i < count; i++) {
            console.info(path[i] + " to " + i + " weight " + distance[i]);
        };
    }


    public dijkstra(source: number) {
        let previous: Array<number> = new Array<number>(this.count);
        let dist: Array<number> = new Array<number>(this.count);
        let visited: Array<boolean> = new Array<boolean>(this.count).fill(false);;
        for (let i: number = 0; i < this.count; i++) {
            previous[i] = -1;
            dist[i] = infi;
        };
        dist[source] = 0;
        previous[source] = -1;
        let queue: PriorityQueue<GraphEdge> = new PriorityQueue<GraphEdge>(EdgeComparator);
        let node: GraphEdge = new GraphEdge(source, 0);
        queue.add(node);
        while (queue.isEmpty() === false) {
            node = queue.peek();
            queue.remove();
            source = node.dest;
            visited[source] = true;
            let adl: Array<GraphEdge> = this.Adj[source];
            for (let index = 0; index < adl.length; index++) {
                let adn = adl[index];
                let dest: number = adn.dest;
                let alt: number = adn.cost + dist[source];
                if (dist[dest] > alt && visited[dest] === false) {
                    dist[dest] = alt;
                    previous[dest] = source;
                    node = new GraphEdge(dest, alt);
                    queue.add(node);
                }
            }
        };
        const count: number = this.count;
        for (let i: number = 0; i < count; i++) {
            if (dist[i] === infi) {
                console.info("node id " + i + "  prev " + previous[i] + " distance : Unreachable");
            } else {
                console.info("node id " + i + "  prev " + previous[i] + " distance : " + dist[i]);
            }
        };
    }

    public bellmanFordshortestPath(source: number) {
        const count: number = this.count;
        let distance: Array<number> = new Array<number>(count);
        let path: Array<number> = new Array<number>(count);
        for (let i: number = 0; i < count; i++) {
            distance[i] = infi;
            path[i] = -1;
        };
        distance[source] = 0;
        for (let i: number = 0; i < count - 1; i++) {
            for (let j: number = 0; j < count; j++) {
                let adl: Array<GraphEdge> = this.Adj[j];
                for (let index = 0; index < adl.length; index++) {
                    let adn = adl[index];
                    let newDistance: number = distance[j] + adn.cost;
                    if (distance[adn.dest] > newDistance) {
                        distance[adn.dest] = newDistance;
                        path[adn.dest] = j;
                    }
                }
            };
        };
        for (let i: number = 0; i < count; i++) {
            console.info(path[i] + " to " + i + " weight " + distance[i]);
        };
    }


    public heightTreeParentArr(arr: Array<number>): number {
        const count: number = arr.length;
        let heightArr: Array<number> = new Array<number>(count);
        let gph: Graph = new Graph(count);
        let source: number = 0;
        for (let i: number = 0; i < count; i++) {
            if (arr[i] !== -1) {
                this.addDirectedEdge(arr[i], i, 1);
            } else {
                source = i;
            }
        };
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        visited[source] = true;
        let que: Queue<number> = new Queue<number>();;
        que.add(source);
        heightArr[source] = 0;
        let maxHight: number = 0;
        while (que.isEmpty() === false) {
            let curr = que.remove();
            let height: number = heightArr[curr];
            if (height > maxHight) {
                maxHight = height;
            }
            let adl: Array<GraphEdge> = this.Adj[curr];
            for (let index = 0; index < adl.length; index++) {
                let adn = adl[index];
                if (visited[adn.dest] === false) {
                    visited[adn.dest] = true;
                    que.add(adn.dest);
                    heightArr[adn.dest] = height + 1;
                }
            }
        };
        return maxHight;
    }

    public getHeight(arr: Array<number>, height: Array<number>, index: number): number {
        if (arr[index] === -1) {
            return 0;
        } else {
            return this.getHeight(arr, height, arr[index]) + 1;
        }
    }

    public heightTreeParentArr2(arr: Array<number>): number {
        const count: number = arr.length;
        let height: Array<number> = new Array<number>(count);
        let maxHeight: number = -1;
        for (let i: number = 0; i < count; i++) {
            height[i] = this.getHeight(arr, height, i);
            maxHeight = Math.max(maxHeight, height[i]);
        };
        return maxHeight;
    }


    public bestFirstSearchPQ(source: number, dest: number): number {
        let previous: Array<number> = new Array<number>(this.count);
        let dist: Array<number> = new Array<number>(this.count);
        let visited: Array<boolean> = new Array<boolean>(this.count).fill(false);
        for (let i: number = 0; i < this.count; i++) {
            previous[i] = -1;
            dist[i] = infi;
        };
        let pq: PriorityQueue<GraphEdge> = new PriorityQueue<GraphEdge>(EdgeComparator);
        dist[source] = 0;
        previous[source] = -1;
        let node: GraphEdge = new GraphEdge(source, 0);
        pq.add(node);
        while (pq.isEmpty() === false) {
            node = pq.peek();
            pq.remove();
            source = node.dest;
            if (source === dest) {
                return node.cost;
            }
            visited[source] = true;
            let adl: Array<GraphEdge> = this.Adj[source];
            for (let index = 0; index < adl.length; index++) {
                let adn = adl[index];
                {
                    let curr: number = adn.dest;
                    let cost: number = adn.cost;
                    let alt: number = cost + dist[source];
                    if (dist[curr] > alt && visited[curr] === false) {
                        dist[curr] = alt;
                        previous[curr] = source;
                        node = new GraphEdge(curr, alt);
                        pq.add(node);
                    }
                }
            }
        };
        return -1;
    }

    public isConnected(): boolean {
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        let adl: Array<GraphEdge>;
        for (let i: number = 0; i < count; i++) {
            adl = this.Adj[i];
            if ((<number>adl.length) > 0) {
                this.dfsUtil(i, visited);
                break;
            }
        };
        for (let i: number = 0; i < count; i++) {
            adl = this.Adj[i];
            if ((<number>adl.length) > 0) if (visited[i] === false) return false;
        };
        return true;
    }

    public isEulerian(): number {
        const count: number = this.count;
        let odd: number;
        let inDegree: Array<number>;
        let outDegree: Array<number>;
        let adl: Array<GraphEdge>;
        if (this.isConnected() === false) {
            console.info("graph is not Eulerian");
            return 0;
        } else {
            odd = 0;
            inDegree = Array(count);
            outDegree = Array(count);
            for (let i: number = 0; i < count; i++) {
                adl = this.Adj[i];
                for (let index = 0; index < adl.length; index++) {
                    let adn = adl[index];
                    outDegree[i] += 1;
                    inDegree[adn.dest] += 1;
                }
            };
            for (let i: number = 0; i < count; i++) {
                if ((inDegree[i] + outDegree[i]) % 2 !== 0) {
                    odd += 1;
                }
            };
        }
        if (odd === 0) {
            console.info("graph is Eulerian");
            return 2;
        } else if (odd === 2) {
            console.info("graph is Semi-Eulerian");
            return 1;
        } else {
            console.info("graph is not Eulerian");
            return 0;
        }
    }

    public isEulerianCycle(): boolean {
        const count: number = this.count;
        let inDegree: Array<number> = new Array<number>(count);
        let outDegree: Array<number> = new Array<number>(count);
        if (!this.isStronglyConnected2()) return false;
        for (let i: number = 0; i < count; i++) {
            let adl: Array<GraphEdge> = this.Adj[i];
            for (let index = 0; index < adl.length; index++) {
                let adn = adl[index];
                {
                    outDegree[i] += 1;
                    inDegree[adn.dest] += 1;
                }
            }
        };
        for (let i: number = 0; i < count; i++) {
            if (inDegree[i] !== outDegree[i])
                return false;
        }
        return true;
    }


    public isStronglyConnected2(): boolean {
        const count: number = this.count;
        let visited: Array<boolean> = new Array<boolean>(count).fill(false);
        let gReversed: Graph;
        let index: number;
        let adl: Array<GraphEdge>;
        for (index = 0; index < count; index++) {
            adl = this.Adj[index];
            if ((<number>adl.length) > 0)
                break;
        }
        this.dfsUtil(index, visited);
        for (let i: number = 0; i < count; i++) {
            adl = this.Adj[i];
            if (visited[i] === false && (<number>adl.length) > 0)
                return false;
        };
        gReversed = this.transposeGraph();
        for (let i: number = 0; i < count; i++) {
            visited[i] = false;
        }
        gReversed.dfsUtil(index, visited);
        for (let i: number = 0; i < count; i++) {
            adl = this.Adj[i];
            if (visited[i] === false && (<number>adl.length) > 0)
                return false;
        };
        return true;
    }
}
function main1() {
    let gph: Graph = new Graph(5);
    gph.addDirectedEdge(0, 1, 3);
    gph.addDirectedEdge(0, 4, 2);
    gph.addDirectedEdge(1, 2, 1);
    gph.addDirectedEdge(2, 3, 1);
    gph.addDirectedEdge(4, 1, -2);
    gph.addDirectedEdge(4, 3, 1);
    gph.print();
    //console.info(gph.dfs(0, 2));
    //console.info(gph.bfs(0, 2));
    //console.info(gph.dfsStack(0, 2));
}

function main2() {
    let gph: Graph = new Graph(6);
    gph.addDirectedEdge(5, 2, 1);
    gph.addDirectedEdge(5, 0, 1);
    gph.addDirectedEdge(4, 0, 1);
    gph.addDirectedEdge(4, 1, 1);
    gph.addDirectedEdge(2, 3, 1);
    gph.addDirectedEdge(3, 1, 1);
    gph.print();
    gph.topologicalSort(gph);
}
function main3() {
    let gph: Graph = new Graph(5);
    gph.addDirectedEdge(0, 1, 1);
    gph.addDirectedEdge(0, 2, 1);
    gph.addDirectedEdge(2, 3, 1);
    gph.addDirectedEdge(1, 3, 1);
    gph.addDirectedEdge(3, 4, 1);
    gph.addDirectedEdge(1, 4, 1);
    gph.print();
    console.info("PathExist :: " + gph.pathExist(0, 4));
    console.info();
    console.info(gph.countAllPath(0, 4));
    gph.printAllPath(0, 4);
}

function main4() {
    let gph: Graph = new Graph(7);
    gph.addDirectedEdge(0, 1, 1);
    gph.addDirectedEdge(0, 2, 1);
    gph.addDirectedEdge(1, 3, 1);
    gph.addDirectedEdge(4, 1, 1);
    gph.addDirectedEdge(6, 4, 1);
    gph.addDirectedEdge(5, 6, 1);
    gph.addDirectedEdge(5, 2, 1);
    gph.addDirectedEdge(6, 0, 1);
    gph.print();
    gph.rootVertex(gph);
}


function main5() {
    let gph: Graph = new Graph(4);
    gph.addDirectedEdge(0, 1, 1);
    gph.addDirectedEdge(0, 2, 1);
    gph.addDirectedEdge(1, 2, 1);
    gph.addDirectedEdge(2, 0, 1);
    gph.addDirectedEdge(2, 3, 1);
    gph.addDirectedEdge(3, 3, 1);
    let tc: Array<Array<number>> = gph.transitiveClosure(gph);
    for (let i: number = 0; i < 4; i++) {
        for (let j: number = 0; j < 4; j++) {
            //console.info(tc[i][j] + " ");
        };
        console.info();
    };
}


function main6() {
    let gph: Graph = new Graph(7);
    gph.addUndirectedEdge(0, 1, 1);
    gph.addUndirectedEdge(0, 2, 1);
    gph.addUndirectedEdge(0, 4, 1);
    gph.addUndirectedEdge(1, 2, 1);
    gph.addUndirectedEdge(2, 5, 1);
    gph.addUndirectedEdge(3, 4, 1);
    gph.addUndirectedEdge(4, 5, 1);
    gph.addUndirectedEdge(4, 6, 1);
    gph.print();
    gph.bfsLevelNode(1);
    console.info(gph.bfsDistance(1, 6));
}


function main7() {
    let gph: Graph = new Graph(6);
    gph.addUndirectedEdge(0, 1, 1);
    gph.addUndirectedEdge(1, 2, 1);
    gph.addUndirectedEdge(3, 4, 1);
    gph.addUndirectedEdge(4, 2, 1);
    gph.addUndirectedEdge(2, 5, 1);
    console.info(gph.isCyclePresentUndirected());
}


function main8() {
    let gph: Graph = new Graph(5);
    gph.addDirectedEdge(0, 1, 1);
    gph.addDirectedEdge(0, 2, 1);
    gph.addDirectedEdge(2, 3, 1);
    gph.addDirectedEdge(1, 3, 1);
    gph.addDirectedEdge(3, 4, 1);
    gph.addDirectedEdge(4, 1, 1);
    console.info(gph.isCyclePresentColor());
}



function main9() {
    let gph: Graph = new Graph(5);
    gph.addDirectedEdge(0, 1, 1);
    gph.addDirectedEdge(1, 2, 1);
    gph.addDirectedEdge(2, 3, 1);
    gph.addDirectedEdge(3, 0, 1);
    gph.addDirectedEdge(2, 4, 1);
    gph.addDirectedEdge(4, 2, 1);
    console.info(" IsStronglyConnected:: " + gph.isStronglyConnected(gph));
}


function main10() {
    let gph: Graph = new Graph(7);
    gph.addDirectedEdge(0, 1, 1);
    gph.addDirectedEdge(1, 2, 1);
    gph.addDirectedEdge(2, 0, 1);
    gph.addDirectedEdge(2, 3, 1);
    gph.addDirectedEdge(3, 4, 1);
    gph.addDirectedEdge(4, 5, 1);
    gph.addDirectedEdge(5, 3, 1);
    gph.addDirectedEdge(5, 6, 1);
    gph.stronglyConnectedComponent(gph);
}


function main11() {
    let gph: Graph = new Graph(9);
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
    console.info();
    gph.prims();
    console.info();
    gph.dijkstra(0);
}

function main12() {
    let gph: Graph = new Graph(9);
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
    gph.bellmanFordshortestPath(1);
    console.info("isConnectedUndirected :: " + gph.isConnectedUndirected(gph));
}



function main13() {
    let gph: Graph = new Graph(5);
    gph.addDirectedEdge(0, 1, 3);
    gph.addDirectedEdge(0, 4, 2);
    gph.addDirectedEdge(1, 2, 1);
    gph.addDirectedEdge(2, 3, 1);
    gph.addDirectedEdge(4, 1, -2);
    gph.addDirectedEdge(4, 3, 1);
    gph.print();
    console.info();
    gph.bellmanFordshortestPath(0);
}


function main14() {
    let parentArray: Array<number> = [-1, 0, 1, 2, 3];
    //console.info(gph.heightTreeParentArr(parentArray));
    //console.info(gph.heightTreeParentArr2(parentArray));
}


function main15() {
    let gph: Graph = new Graph(5);
    gph.addDirectedEdge(1, 0, 1);
    gph.addDirectedEdge(0, 2, 1);
    gph.addDirectedEdge(2, 1, 1);
    gph.addDirectedEdge(0, 3, 1);
    gph.addDirectedEdge(3, 4, 1);
    console.info(gph.isEulerian());
}


function main16() {
    let gph: Graph = new Graph(5);
    gph.addDirectedEdge(0, 1, 1);
    gph.addDirectedEdge(1, 2, 1);
    gph.addDirectedEdge(2, 0, 1);
    gph.addDirectedEdge(0, 4, 1);
    gph.addDirectedEdge(4, 3, 1);
    gph.addDirectedEdge(3, 0, 1);
    console.info(gph.isEulerianCycle());
}

function main() {
    main1()
    main2()
    main3();
    main4();
    main5();
    main6();
    main7();
    main8();
    main9();
    main10();
    main11();
    main12();
    main13();
    main14();
    main15();
    main16();

}

main();