
// Activities selection problem.
// Prints a maximum set of activities that can be done by a 
// single person performing one task at a time.
// s[] is an array that contains start time of all activities
// f[] is an array that contains finish time of all activities

class Activity {
	start: number;
	stop: number;

	constructor(s: number, f: number) {
		this.start = s;
		this.stop = f;
	}
}
  
function maxActivities(s: number[], f: number[], n: number): void {
	const act: Activity[] = [];
	for (let i = 0; i < n; i++) {
		act.push(new Activity(s[i], f[i]));
	}
	act.sort((a, b) => a.stop - b.stop);

	let i = 0;
	let output = `Activities are: (${act[i].start},${act[i].stop})`;

	for (let j = 1; j < n; j++) {
		if (act[j].start >= act[i].stop) {
		output += (`, (${act[j].start},${act[j].stop})`);
		i = j;
		}
	}
	console.log(output);
}

// Testing code.
const s = [1, 5, 0, 3, 5, 6, 8];
const f = [2, 6, 5, 4, 9, 7, 9];
const n = s.length;
maxActivities(s, f, n);
  

/*
 * Activities are : (1,2), (3,4), (5,6), (6,7), (8,9)
 */