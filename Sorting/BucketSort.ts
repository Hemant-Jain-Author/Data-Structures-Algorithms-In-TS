function BucketSort(array: Array<number>, lowerRange: number, upperRange: number) {
    let i: number;
    let j: number;
    let size: number = array.length;
    let range: number = upperRange - lowerRange;
    let count: Array<number> = new Array<number>(range).fill(0);
    for (i = 0; i < size; i++) {
        count[array[i] - lowerRange]++;
    }
    j = 0;
    for (i = 0; i < range; i++) {
        for (; count[i] > 0; (count[i])--) {
            array[j++] = i + lowerRange;
        }
    }
}

// Testing code.
let array: Array<number> = [23, 24, 22, 21, 26, 25, 27, 28, 21, 21];
BucketSort(array, 20, 30);
console.log(array);
