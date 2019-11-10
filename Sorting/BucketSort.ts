function BucketSort(array : number[], lowerRange : number, upperRange : number) {
    let i : number;
    let j : number;
    let size : number = array.length;
    let range : number = upperRange - lowerRange;
    let count : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(range);
    for(i = 0; i < size; i++) {
        count[array[i] - lowerRange]++;
    }
    j = 0;
    for(i = 0; i < range; i++) {
        for(; count[i] > 0; (count[i])--) {
            array[j++] = i + lowerRange;
        }
    }
}

function main(args : string[]) {
    let array : number[] = [23, 24, 22, 21, 26, 25, 27, 28, 21, 21];
    BucketSort(array, 20, 30);
    for(let i : number = 0; i < array.length; i++) {
        console.info(array[i] + " ");
    }
}

main(null);
