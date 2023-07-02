class CountMap {
    private hm: Map<any, number>;

    constructor() {
        this.hm = new Map();
    }

    add(key: any): void {
        if (this.hm.has(key)) {
            const cnt = this.hm.get(key)!;
            this.hm.set(key, cnt + 1);
        } else {
            this.hm.set(key, 1);
        }
    }

    remove(key: any): void {
        if (this.hm.has(key)) {
            if (this.hm.get(key) === 1) {
                this.hm.delete(key);
            } else {
                const cnt = this.hm.get(key)!;
                this.hm.set(key, cnt - 1);
            }
        }
    }

    get(key: any): number {
        if (this.hm.has(key)) {
            return this.hm.get(key)!;
        }
        return 0;
    }

    find(key: any): boolean {
        return this.hm.has(key);
    }

    size(): number {
        return this.hm.size;
    }
}

/* Testing Code */
const cm = new CountMap();
cm.add(2);
cm.add(2);
console.log(`count of 2 is : ${cm.get(2)}`);
cm.remove(2);
console.log(`count of 2 is : ${cm.get(2)}`);
cm.remove(2);
console.log(`count of 2 is : ${cm.get(2)}`);
console.log(`count of 3 is : ${cm.get(3)}`);