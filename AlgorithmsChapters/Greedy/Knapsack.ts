class Items {
	wt: number;
	cost: number;
	density: number;

	constructor(w: number, v: number) {
		this.wt = w;
		this.cost = v;
		this.density = v / w;
	}
}


function getMaxCostGreedy(wt: number[], cost: number[], capacity: number): number {
	let totalCost = 0;
	const n = wt.length;
	const itemList: Items[] = [];
	for (let i = 0; i < n; i++) {
		itemList[i] = new Items(wt[i], cost[i]);
	}

	itemList.sort((a: Items, b: Items) => (b.density - a.density));
	for (let i = 0; i < n && capacity > 0; i++) {
		if (capacity - itemList[i].wt >= 0) {
			capacity -= itemList[i].wt;
			totalCost += itemList[i].cost;
		}
	}
	return totalCost;
}

// Testing code.
const wt: number[] = [10, 40, 20, 30];
const cost: number[] = [60, 40, 90, 120];
const capacity: number = 50;
const maxCost: number = getMaxCostGreedy(wt, cost, capacity);
console.log("Maximum cost obtained:", maxCost);

/*
Maximum cost obtained: 150
*/