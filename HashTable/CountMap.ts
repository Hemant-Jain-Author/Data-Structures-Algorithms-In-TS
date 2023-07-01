class CountMap<T> {
    hm: Map<T, number> = new Map<T, number>();

    public add(key: T) {
        if (this.hm.has(key)) {
            this.hm.set(key, this.hm.get(key) + 1);
        } else {
            this.hm.set(key, 1);
        }
    }

    public remove(key: T) {
        if (this.hm.has(key)) {
            if (this.hm.get(key) == 1)
                this.hm.delete(key);
            else {
                this.hm.set(key, this.hm.get(key) - 1);
            }
        }
    }

    public get(key: T): number {
        if (this.hm.has(key))
            return this.hm.get(key);
        return 0;

    }

    public containsKey(key: T): boolean {
        return this.hm.has(key);
    }

    public size(): number {
        return this.hm.size;
    }
}

function main1() {
    let cm: CountMap<number> = new CountMap<number>();
    cm.add(2);
    cm.add(2);
    console.info("count is : " + cm.get(2));
    cm.remove(2);
    console.info("count is : " + cm.get(2));
    cm.remove(2);
    console.info("count is : " + cm.get(2));
}

main1();