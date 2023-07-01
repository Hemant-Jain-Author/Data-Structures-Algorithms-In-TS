type Point = {
	x: number;
	y: number;
};

function closestPairBF(arr: number[][]): number {
	const n = arr.length;
	let dmin = Number.MAX_VALUE;
	let d: number;
	for (let i = 0; i < n - 1; i++) {
		for (let j = i + 1; j < n; j++) {
			d = Math.sqrt(
				(arr[i][0] - arr[j][0]) ** 2 + (arr[i][1] - arr[j][1]) ** 2
			);
			if (d < dmin) {
				dmin = d;
			}
		}
	}
	return dmin;
}

function distance(a: Point, b: Point): number {
	return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function xComp(a: Point, b: Point): number {
	return a.x - b.x;
}

function yComp(a: Point, b: Point): number {
	return a.y - b.y;
}

function stripMin(q: Point[], n: number, d: number): number {
	let min = d;

	for (let i = 0; i < n; ++i) {
		for (let j = i + 1; j < n && q[j].y - q[i].y < min; ++j) {
			d = distance(q[i], q[j]);
			if (d < min) {
				min = d;
			}
		}
	}
	return min;
}

function closestPairUtil(
	p: Point[],
	start: number,
	stop: number,
	q: Point[],
	n: number
): number {
	if (stop - start < 1) {
		return Number.MAX_VALUE;
	}

	if (stop - start === 1) {
		return distance(p[start], p[stop]);
	}

	const mid = Math.floor((start + stop) / 2);
	const dl = closestPairUtil(p, start, mid, q, n);
	const dr = closestPairUtil(p, mid + 1, stop, q, n);
	let d = Math.min(dl, dr);

	const strip: Point[] = [];
	let j = 0;
	for (let i = 0; i < n; i++) {
		if (Math.abs(q[i].x - p[mid].x) < d) {
			strip[j] = q[i];
			j++;
		}
	}

	return Math.min(d, stripMin(strip, j, d));
}

function closestPairDC(arr: number[][]): number {
	const n = arr.length;
	const p: Point[] = [];
	for (let i = 0; i < n; i++) {
		p[i] = { x: arr[i][0], y: arr[i][1] };
	}
	p.sort(xComp);

	const q = p.slice();
	q.sort(yComp);

	return closestPairUtil(p, 0, n - 1, q, n);
}

const arr = [
	[648, 896],
	[269, 879],
	[250, 922],
	[453, 347],
	[213, 17],
];

console.log("Smallest distance is:" + closestPairBF(arr));
console.log("Smallest distance is:" + closestPairDC(arr));

/*
Smallest distance is:47.01063709417264
Smallest distance is:47.01063709417264
*/