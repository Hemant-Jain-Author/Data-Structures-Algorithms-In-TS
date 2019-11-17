const MIN_VALUE = -2147483647
const MAX_VALUE = 2147483647

function linearSearchUnsorted(arr :  Array<number>, size : number, value : number) : boolean {
    for(let i : number = 0; i < size; i++) {
        if(value === arr[i]) {
            return true;
        }
    };
    return false;
}

function linearSearchSorted(arr :  Array<number>, size : number, value : number) : boolean {
    for(let i : number = 0; i < size; i++) {
        if(value === arr[i]) {
            return true;
        } else if(value < arr[i]) {
            return false;
        }
    };
    return false;
}

function BinarySearch(arr :  Array<number>, size : number, value : number) : boolean {
    let low : number = 0;
    let high : number = size - 1;
    let mid : number;
    while(low <= high) {
        mid = (low + high) / 2;
        if(arr[mid] === value) {
            return true;
        } else if(arr[mid] < value) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    };
    return false;
}

function BinarySearchRec(arr :  Array<number>, size : number, value : number) : boolean {
    let low : number = 0;
    let high : number = size - 1;
    return BinarySearchRecUtil(arr, low, high, value);
}

function BinarySearchRecUtil(arr :  Array<number>, low : number, high : number, value : number) : boolean {
    if(low > high) {
        return false;
    }
    let mid : number = ((low + high) / 2|0);
    if(arr[mid] === value) {
        return true;
    } else if(arr[mid] < value) {
        return BinarySearchRecUtil(arr, mid + 1, high, value);
    } else {
        return BinarySearchRecUtil(arr, low, mid - 1, value);
    }
}

function BinarySearch2(arr :  Array<number>, start : number, end : number, key : number, isInc : boolean) : number {
    let mid : number;
    if(end < start) {
        return -1;
    }
    mid = ((start + end) / 2|0);
    if(key === arr[mid]) {
        return mid;
    }
    if(isInc !== false && key < arr[mid] || isInc === false && key > arr[mid]) {
        return BinarySearch2(arr, start, mid - 1, key, isInc);
    } else {
        return BinarySearch2(arr, mid + 1, end, key, isInc);
    }
}

function test1() {
    let first :  Array<number> = [1, 3, 5, 7, 9, 25, 30];
    console.info(linearSearchUnsorted(first, 7, 8));
    console.info(linearSearchSorted(first, 7, 8));
    console.info(BinarySearch(first, 7, 8));
    console.info(BinarySearchRec(first, 7, 8));
    console.info(linearSearchUnsorted(first, 7, 25));
    console.info(linearSearchSorted(first, 7, 25));
    console.info(BinarySearch(first, 7, 25));
    console.info(BinarySearchRec(first, 7, 25));
}

function swap(arr :  Array<number>, first : number, second : number) {
    let temp : number = arr[first];
    arr[first] = arr[second];
    arr[second] = temp;
}

function FirstRepeated(arr :  Array<number>, size : number) : number {
    for(let i : number = 0; i < size; i++) {
        for(let j : number = i + 1; j < size; j++) {
            if(arr[i] === arr[j]) {
                return arr[i];
            }
        };
    };
    return 0;
}

function test2() {
    let first :  Array<number> = [34, 56, 77, 1, 5, 6, 6, 6, 6, 6, 6, 7, 8, 10, 34, 20, 30];
    console.log(`FirstRepeated :: ${FirstRepeated(first, first.length)}`);
}

function printRepeating(arr :  Array<number>, size : number) {
    let output = "Repeating elements are ";
    for(let i : number = 0; i < size; i++) {
        for(let j : number = i + 1; j < size; j++) {
            if(arr[i] === arr[j]) {
                output += (" " + arr[i]);
            }
        };
    };
    console.log(output)
}

function printRepeating2(arr :  Array<number>, size : number) {
    arr.sort(function cmp(a, b) { return (a - b); });
    let output = "Repeating elements are ";
    for(let i : number = 1; i < size; i++) {
        if(arr[i] === arr[i - 1]) {
            output += (" " + arr[i]);
        }
    };
    console.log(output)
}

function printRepeating3(arr :  Array<number>, size : number) {
    let hs = {};
    let output = "Repeating elements are ";

    for(let i : number = 0; i < size; i++) {
        if(arr[i] in hs) {
            output += (" " + arr[i]);
        } else {
            hs[arr[i]] = 1;
        }
    };
    console.log(output)
}

function printRepeating4(arr :  Array<number>, size : number, range : number) {
    let count :  Array<number> = new Array(size).fill(0);
    let i : number;
    for(i = 0; i < size; i++) {
        count[i] = 0;
    };
    let output = "Repeating elements are ";
    for(i = 0; i < size; i++) {
        if(count[arr[i]] === 1) {
            output += (" " + arr[i]);
        } else {
            count[arr[i]]++;
        }
    };
    console.log(output)
}

function test3() {
    let first :  Array<number> = [1, 3, 5, 3, 9, 1, 30];
    printRepeating(first, first.length);
    printRepeating2(first, first.length);
    printRepeating3(first, first.length);
    printRepeating4(first, first.length, 50);
}

function removeDuplicates(array :  Array<number>, size : number) :  Array<number> {
    let j : number = 0;
    array.sort(function cmp(a, b) { return (a - b); });
    for(let i : number = 1; i < size; i++) {
        if(array[i] !== array[j]) {
            j++;
            array[j] = array[i];
        }
    };
    let ret :  Array<number> = array.slice(0,j + 1);
    return ret;
}

function test4() {
    let first :  Array<number> = [1, 3, 5, 3, 9, 1, 30];
    let ret :  Array<number> = removeDuplicates(first, first.length);
    for(let i : number = 0; i < ret.length; i++) {
        console.info(ret[i] + " ");
    };
}

function findMissingNumber(arr :  Array<number>, size : number) : number {
    let i : number;
    let j : number;
    let found : number = 0;
    for(i = 1; i <= size; i++) {
        found = 0;
        for(j = 0; j < size; j++) {
            if(arr[j] === i) {
                found = 1;
                break;
            }
        };
        if(found === 0) {
            return i;
        }
    };
    return MAX_VALUE;
}

function findMissingNumber2(arr :  Array<number>, size : number, range : number) : number {
    let i : number;
    let xorSum : number = 0;
    for(i = 1; i <= range; i++) {
        xorSum ^= i;
    };
    for(i = 0; i < size; i++) {
        xorSum ^= arr[i];
    };
    return xorSum;
}

function findMissingNumber3(arr :  Array<number>, size : number, upperRange : number) : number {
    let st : Set<number> = new Set<number>();
    let i : number = 0;
    while(i < size) {
        st.add(arr[i]);
        i += 1;
    };
    i = 1;
    while(i <= upperRange) {
        if(st.has(i) === false) 
            return i;
        i += 1;
    };
    console.info("NoNumberMissing");
    return -1;
}

function test5() {
    let first :  Array<number> = [1, 3, 5, 4, 6, 8, 7];
    console.info(findMissingNumber(first, first.length));
    console.info(findMissingNumber2(first, first.length, 8));
    console.info(findMissingNumber3(first, first.length, 8));
}

/*
function MissingValues(arr :  Array<number>, size : number) {
    arr.sort(function cmp(a, b) { return (a - b); });
    let value : number = arr[0];
    let i : number = 0;
    while(i < size) {
        if(value === arr[i]) {
            value += 1;
            i += 1;
        } else {
            console.info(value);
            value += 1;
        }
    };
}

function MissingValues2(arr :  Array<number>, size : number) {
    let ht : Array<number> = <any>([]);
    let minVal : number = 999999;
    let maxVal : number = -999999;
    for(let i : number = 0; i < size; i++) {
        ((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ht, arr[i]);
        if(minVal > arr[i]) minVal = arr[i];
        if(maxVal < arr[i]) maxVal = arr[i];
    };
    for(let i : number = minVal; i < maxVal + 1; i++) {
        if((ht.indexOf(<any>(i) >= 0) === false) {
            console.info(i);
        }
    };
}

function test6() {
    let arr :  Array<number> = [1, 9, 2, 8, 3, 7, 4, 6];
    let size : number = arr.length;
    MissingValues(arr, size);
    MissingValues2(arr, size);
}
*/

function OddCount(arr :  Array<number>, size : number) {
    let ctr : Array<number> = new Array<number>(size).fill(0);
    let count : number = 0;
    for(let i : number = 0; i < size; i++) {
        ctr[arr[i]] += 1;
    };
    for(let i : number = 0; i < size; i++) {
        if (ctr[arr[i]] != 0 && 
            (ctr[arr[i]] % 2 == 1)) {
            count++;
        }
    };
    console.info("Odd count is :: " + count);
}

function OddCount2(arr :  Array<number>, size : number) {
    let xorSum : number = 0;
    let first : number = 0;
    let second : number = 0;
    let setBit : number;
    for(let i : number = 0; i < size; i++) {
        xorSum = xorSum ^ arr[i];
    }
    setBit = xorSum & ~(xorSum - 1);
    for(let i : number = 0; i < size; i++) {
        if((arr[i] & setBit) !== 0) 
            first ^= arr[i]; 
        else 
            second ^= arr[i];
    };
    console.info(first + second);
}

function SumDistinct(arr :  Array<number>, size : number) {
    let sum : number = 0;
    arr.sort(function cmp(a, b) { return (a - b); });
    for(let i : number = 0; i < (size - 1); i++) {
        if(arr[i] !== arr[i + 1]) 
            sum += arr[i];
    };
    sum += arr[size - 1];
    console.info(sum);
}

function test7() {
    let first = [1, 3, 2, 7, 2, 4, 3, 8, 9, 9, 4, 7, 1, 12];
    let size = first.length
    OddCount(first, size);
    OddCount2(first, size);
    SumDistinct(first, size)
}

function minAbsSumPair(arr :  Array<number>, size : number) {
    let l : number;
    let r : number;
    let minSum : number;
    let sum : number;
    let minFirst : number = 0;
    let minSecond : number = 1;
    if(size < 2) {
        console.info("Invalid Input");
        return;
    }

    minSum = Math.abs(arr[0] + arr[1]);
    for(l = 0; l < size - 1; l++) {
        for(r = l + 1; r < size; r++) {
            sum = Math.abs(arr[l] + arr[r]);
            if(sum < minSum) {
                minSum = sum;
                minFirst = l;
                minSecond = r;
            }
        };
    };
    console.info(" Minimum sum elements are : " + arr[minFirst] + " , " + arr[minSecond]);
}

function minAbsSumPair2(arr :  Array<number>, size : number) {
    if(size < 2) {
        console.info("Invalid Input");
        return;
    }
    arr.sort(function cmp(a, b) { return (a - b); });
    let minFirst : number = 0;
    let minSecond : number = size - 1;
    let minSum : number = Math.abs(arr[minFirst] + arr[minSecond]);
    let l : number;
    let r : number;
    let sum : number;
    for(l = 0, r = size - 1; l < r; ) {
        sum = (arr[l] + arr[r]);
        if(Math.abs(sum) < minSum) {
            minSum = Math.abs(sum);
            minFirst = l;
            minSecond = r;
        }
        if(sum < 0) {
            l++;
        } else if(sum > 0) {
            r--;
        } else {
            break;
        }
    };
    console.info(" Minimum sum pair : " + arr[minFirst] + " , " + arr[minSecond]);
}

function test8() {
    let first :  Array<number> = [1, 5, -10, 3, 2, -6, 8, 9, 6];
    minAbsSumPair2(first, first.length);
    minAbsSumPair(first, first.length);
}

function FindPair(arr :  Array<number>, size : number, value : number) : boolean {
    for(let i : number = 0; i < size; i++) {
        for(let j : number = i + 1; j < size; j++) {
            if((arr[i] + arr[j]) === value) {
                console.info("The pair is : " + arr[i] + "," + arr[j]);
                return true;
            }
        };
    };
    return false;
}

function FindPair2(arr :  Array<number>, size : number, value : number) : boolean {
    let first : number = 0;
    let second : number = size - 1;
    let curr : number;
    arr.sort(function cmp(a, b) { return (a - b); });
    while(first < second) {
        curr = arr[first] + arr[second];
        if(curr === value) {
            console.info("The pair is " + arr[first] + "," + arr[second]);
            return true;
        } else if(curr < value) {
            first++;
        } else {
            second--;
        }
    };
    return false;
}

function FindPair3(arr :  Array<number>, size : number, value : number) : boolean {
    let hs = {};
    for (let i = 0; i < size; i++) {
        if ((value - arr[i]) in hs) {
            console.log(`The pair is : ${arr[i]} , ${value - arr[i]}`);
            return true;
        }
        hs[arr[i]] = 1;
    }
    return false;
}

function test9() {
    let first :  Array<number> = [1, 5, 4, 3, 2, 7, 8, 9, 6];
    console.info(FindPair(first, first.length, 8));
    console.info(FindPair2(first, first.length, 8));
    console.info(FindPair3(first, first.length, 8));
}

function FindDifference(arr :  Array<number>, size : number, value : number) : boolean {
    for(let i : number = 0; i < size; i++) {
        for(let j : number = i + 1; j < size; j++) {
            if(Math.abs(arr[i] - arr[j]) === value) {
                console.info("The pair is:: " + arr[i] + " & " + arr[j]);
                return true;
            }
        };
    };
    return false;
}

function FindDifference2(arr :  Array<number>, size : number, value : number) : boolean {
    let first : number = 0;
    let second : number = 0;
    let diff : number;
    arr.sort(function cmp(a, b) { return (a - b); });
    while(first < size && second < size) {
        diff = Math.abs(arr[first] - arr[second]);
        if(diff === value) {
            console.info("The pair is::" + arr[first] + " & " + arr[second]);
            return true;
        } 
        else if(diff > value) 
            first += 1; 
        else 
            second += 1;
    };
    return false;
}

function test10() {
    const first = [1, 5, 4, 3, 2, 7, 8, 9, 6];
    console.info(FindDifference(first, first.length, 6));
    console.info(FindDifference2(first, first.length, 6));
};
//test9();


function findMinDiff(arr :  Array<number>, size : number) : number {
    arr.sort(function cmp(a, b) { return (a - b); });
    let diff : number = MAX_VALUE;
    for(let i : number = 0; i < (size - 1); i++) {
        if((arr[i + 1] - arr[i]) < diff) 
            diff = arr[i + 1] - arr[i];
    };
    return diff;
}

function MinDiffPair(arr1 :  Array<number>, size1 : number, arr2 :  Array<number>, size2 : number) : number {
    let minDiff : number = MAX_VALUE;
    let first : number = 0;
    let second : number = 0;
    let out1 : number = 0;
    let out2 : number = 0;
    let diff : number;
    arr1.sort(function cmp(a, b) { return (a - b); });
    arr2.sort(function cmp(a, b) { return (a - b); });
    while(first < size1 && second < size2) {
        diff = Math.abs(arr1[first] - arr2[second]);
        if(minDiff > diff) {
            minDiff = diff;
            out1 = arr1[first];
            out2 = arr2[second];
        }
        if(arr1[first] < arr2[second]) 
            first += 1; 
        else 
            second += 1;
    };
    console.info("The pair is :: " + out1 + out2);
    console.info("Minimum difference is :: " + minDiff);
    return minDiff;
}

function test11() {
    let first :  Array<number> = [1, 5, 4, 3, 2, 7, 8, 9, 6];
    console.info(FindDifference(first, first.length, 6));
    console.info(FindDifference2(first, first.length, 6));
    console.info(findMinDiff(first, first.length));
    console.info(MinDiffPair(first, first.length, first, first.length));
}

function ClosestPair(arr :  Array<number>, size : number, value : number) {
    let diff : number = MAX_VALUE;
    let first : number = -1;
    let second : number = -1;
    let curr : number;
    for(let i : number = 0; i < size; i++) {
        for(let j : number = i + 1; j < size; j++) {
            curr = Math.abs(value - (arr[i] + arr[j]));
            if(curr < diff) {
                diff = curr;
                first = arr[i];
                second = arr[j];
            }
        };
    };
    console.info("closest pair is ::" + first + second);
}

function ClosestPair2(arr :  Array<number>, size : number, value : number) {
    let first : number = 0;
    let second : number = 0;
    let start : number = 0;
    let stop : number = size - 1;
    let diff : number;
    let curr : number;
    arr.sort(function cmp(a, b) { return (a - b); });
    diff = MAX_VALUE;
    
    while(start < stop) {
        curr = (value - (arr[start] + arr[stop]));
        if(Math.abs(curr) < diff) {
            diff = Math.abs(curr);
            first = arr[start];
            second = arr[stop];
        }
        if(curr === 0) {
            break;
        } else if(curr > 0) {
            start += 1;
        } else {
            stop -= 1;
        }
    };
    
    console.info("closest pair is :: " + first + second);
}

function test12() {
    let first :  Array<number> = [1, 5, 4, 3, 2, 7, 8, 9, 6];
    ClosestPair(first, first.length, 6);
    ClosestPair2(first, first.length, 6);
}

function SumPairRestArray(arr :  Array<number>, size : number) : boolean { 
    let total : number = 0;
    for(let i : number = 0; i < size; i++) {
        total += arr[i];
    }
    let value : number = (total / 2|0);
    let low : number = 0;
    let high : number = size - 1;
    let curr : number;
    arr.sort(function cmp(a, b) { return (a - b); });
    while(low < high) {
        curr = arr[low] + arr[high];
        if(curr === value) {
            console.info("Pair is :: " + arr[low] + arr[high]);
            return true;
        } 
        else if(curr < value) 
            low += 1; 
        else 
            high -= 1;
    };
    return false;
}

function test13() {
    const first = [1, 2, 4, 3, 7, 3];
    SumPairRestArray(first, first.length);
};

function ZeroSumTriplets(arr :  Array<number>, size : number) {
    for(let i : number = 0; i < (size - 2); i++) {
        for(let j : number = i + 1; j < (size - 1); j++) {
            for(let k : number = j + 1; k < size; k++) {
                if(arr[i] + arr[j] + arr[k] === 0) 
                    console.info("Triplet :: " + arr[i] + arr[j] + arr[k]);
            };
        };
    };
}

function ZeroSumTriplets2(arr :  Array<number>, size : number) {
    let start : number;
    let stop : number;
    arr.sort(function cmp(a, b) { return (a - b); });
    for(let i : number = 0; i < (size - 2); i++) {
        start = i + 1;
        stop = size - 1;
        while(start < stop) {
            if(arr[i] + arr[start] + arr[stop] === 0) {
                console.info("Triplet :: " + arr[i] + arr[start] + arr[stop]);
                start += 1;
                stop -= 1;
            } 
            else if(arr[i] + arr[start] + arr[stop] > 0) 
                stop -= 1; 
            else 
                start += 1;
        };
    };
}

function test14() {
    const first = [1, 2, -4, 3, 7, -3];
    ZeroSumTriplets(first, first.length);
    console.info()
    ZeroSumTriplets2(first, first.length);
};

function findTriplet(arr :  Array<number>, size : number, value : number) {
    for (let i = 0; i < (size - 2); i++) {
        for (let j = i + 1; j < (size - 1); j++) {
            for (let k = j + 1; k < size; k++) {
                {
                    if ((arr[i] + arr[j] + arr[k]) === value)
                        console.info(`Triplet :: ${arr[i]}, ${arr[j]}, ${arr[k]}`);
                };
            };
        };
    }
}

function findTriplet2(arr :  Array<number>, size : number, value : number) {
    let start : number;
    let stop : number;
    arr.sort(function cmp(a, b) { return (a - b); });
    for(let i : number = 0; i < size - 2; i++) {
        start = i + 1;
        stop = size - 1;
        while(start < stop) {
            if(arr[i] + arr[start] + arr[stop] === value) {
                console.info("Triplet ::" + arr[i] + arr[start] + arr[stop]);
                start += 1;
                stop -= 1;
            } 
            else if(arr[i] + arr[start] + arr[stop] > value) 
                stop -= 1; 
            else 
                start += 1;
        };
    };
}

function test15() {
    const first = [1, 2, -4, 3, 7, -3];
    findTriplet(first, first.length, 6);
    findTriplet2(first, first.length, 6);
};

function ABCTriplet(arr :  Array<number>, size : number) {
    let start : number;
    let stop : number;
    arr.sort(function cmp(a, b) { return (a - b); });
    for(let i : number = 0; i < (size - 2); i++) {
        start = i + 1;
        stop = size - 1;
        while(start < stop) {
            if(arr[i] === arr[start] + arr[stop]) {
                console.info("Triplet ::%d, %d, %d" + arr[i] + arr[start] + arr[stop]);
                start += 1;
                stop -= 1;
            } 
            else if(arr[i] > arr[start] + arr[stop]) 
                stop -= 1; 
            else 
                start += 1;
        };
    };
}

function test16() {
    const first = [1, 2, -4, 3, 8, -3];
    ABCTriplet(first, first.length);
};

function SmallerThenTripletCount(arr :  Array<number>, size : number, value : number) {
    let start : number;
    let stop : number;
    let count : number = 0;
    arr.sort(function cmp(a, b) { return (a - b); });
    for(let i : number = 0; i < (size - 2); i++) {
        start = i + 1;
        stop = size - 1;
        while(start < stop) {
            if(arr[i] + arr[start] + arr[stop] >= value) 
                stop -= 1; 
            else {
                count += stop - start;
                start += 1;
            }
        };
    };
    console.info(count);
}

function test17() {
    const first = [1, 2, -4, 3, 7, -3];
    SmallerThenTripletCount(first, first.length, 6);
};

function APTriplets(arr :  Array<number>, size : number) {
    let i : number;
    let j : number;
    let k : number;
    for(i = 1; i < size - 1; i++) {
        j = i - 1;
        k = i + 1;
        while(j >= 0 && k < size) {
            if(arr[j] + arr[k] === 2 * arr[i]) {
                console.info("Triplet ::" + arr[j] + arr[i] + arr[k]);
                k += 1;
                j -= 1;
            } 
            else if(arr[j] + arr[k] < 2 * arr[i]) 
                k += 1; 
            else 
                j -= 1;
        };
    };
}

function GPTriplets(arr :  Array<number>, size : number) {
    let i : number;
    let j : number;
    let k : number;
    for(i = 1; i < size - 1; i++) {
        j = i - 1;
        k = i + 1;
        while(j >= 0 && k < size) {
            if(arr[j] * arr[k] === arr[i] * arr[i]) {
                console.info("Triplet is :: " + arr[j] + arr[i] + arr[k]);
                k += 1;
                j -= 1;
            } 
            else if(arr[j] + arr[k] < 2 * arr[i]) 
                k += 1; 
            else 
                j -= 1;
        };
    };
}

function test18() {
    const first = [1, 2, 3, 4, 9, 17, 23];
    APTriplets(first, first.length);
    GPTriplets(first, first.length);
};

function numberOfTriangles(arr :  Array<number>, size : number) : number {
    let count : number = 0;
    for(let i : number = 0; i < (size - 2); i++) {
        for(let j : number = i + 1; j < (size - 1); j++) {
            for(let k : number = j + 1; k < size; k++) {
                if(arr[i] + arr[j] > arr[k]) 
                    count += 1;
            };
        };
    };
    return count;
}

function numberOfTriangles2(arr :  Array<number>, size : number) : number {
    let k : number;
    let count : number = 0;
    arr.sort(function cmp(a, b) { return (a - b); });
    for(let i : number = 0; i < (size - 2); i++) {
        k = i + 2;
        for(let j : number = i + 1; j < (size - 1); j++) {
            while(k < size && arr[i] + arr[j] > arr[k]) {
                k += 1
            };
            count += k - j - 1;
        };
    };
    return count;
}

function test19() {
    const first = [1, 2, 5, 4, 3, 6];
    console.log(numberOfTriangles(first, first.length));
    console.log(numberOfTriangles2(first, first.length));

};

function getMax(arr :  Array<number>, size : number) : number {
    let max : number = arr[0];
    let count : number = 1;
    let maxCount : number = 1;
    for(let i : number = 0; i < size; i++) {
        count = 1;
        for(let j : number = i + 1; j < size; j++) {
            if(arr[i] === arr[j]) {
                count++;
            }
        };
        if(count > maxCount) {
            max = arr[i];
            maxCount = count;
        }
    };
    return max;
}

function getMax2(arr :  Array<number>, size : number) : number {
    let max : number = arr[0];
    let maxCount : number = 1;
    let curr : number = arr[0];
    let currCount : number = 1;
    arr.sort(function cmp(a, b) { return (a - b); });
    for(let i : number = 1; i < size; i++) {
        if(arr[i] === arr[i - 1]) {
            currCount++;
        } else {
            currCount = 1;
            curr = arr[i];
        }
        if(currCount > maxCount) {
            maxCount = currCount;
            max = curr;
        }
    };
    return max;
}

function getMax3(arr :  Array<number>, size : number, range : number) : number {
    let max : number = arr[0];
    let maxCount : number = 1;
    let count :  Array<number> = new Array(range).fill(0);
    for(let i : number = 0; i < size; i++) {
        count[arr[i]]++;
        if(count[arr[i]] > maxCount) {
            maxCount = count[arr[i]];
            max = arr[i];
        }
    };
    return max;
}

function test20() {
    let first :  Array<number> = [1, 30, 5, 13, 9, 31, 5];
    console.info(getMax(first, first.length));
    console.info(getMax2(first, first.length));
    console.info(getMax3(first, first.length, 50));
}

function getMajority(arr :  Array<number>, size : number) : number {
    let max : number = 0;
    let count : number = 0;
    let maxCount : number = 0;
    for(let i : number = 0; i < size; i++) {
        for(let j : number = i + 1; j < size; j++) {
            if(arr[i] === arr[j]) {
                count++;
            }
        };
        if(count > maxCount) {
            max = arr[i];
            maxCount = count;
        }
    };
    if(maxCount > Math.floor(size / 2)) {
        return max;
    } else {
        return 0;
    }
}

function getMajority2(arr :  Array<number>, size : number) : number {
    let majIndex = Math.floor(size / 2);
    arr.sort(function cmp(a, b) { return (a - b); });
    let candidate : number = arr[majIndex];
    let count : number = 0;
    for(let i : number = 0; i < size; i++) {
        if(arr[i] === candidate) {
            count++;
        }
    };
    if(count > Math.floor(size / 2)) {
        return arr[majIndex];
    } else {
        return 0;
    }
}

function getMajority3(arr :  Array<number>, size : number) : number {
    let majIndex : number = 0;
    let count : number = 1;
    let i : number;
    let candidate : number;
    for(i = 1; i < size; i++) {
        if(arr[majIndex] === arr[i]) {
            count++;
        } else {
            count--;
        }
        if(count === 0) {
            majIndex = i;
            count = 1;
        }
    };
    candidate = arr[majIndex];
    count = 0;
    for(i = 0; i < size; i++) {
        if(arr[i] === candidate) {
            count++;
        }
    };
    if(count > Math.floor(size / 2)) {
        return arr[majIndex];
    } else {
        return 0;
    }
}

function isMajority(arr :  Array<number>, size : number) : boolean {
    let majority : number = arr[Math.floor(size / 2)];
    let i = FirstIndex(arr, size, 0, size - 1, majority);
    if (((i + size / 2) <= (size - 1)) && 
    arr[i + Math.floor(size / 2)] === majority)
        return true;
    else
        return false;
};

function test21() {
    let first :  Array<number> = [1, 5, 5, 13, 5, 31, 5];
    console.info(getMajority(first, first.length));
    console.info(getMajority2(first, first.length));
    console.info(getMajority3(first, first.length));
    console.log(isMajority(first, first.length))
}

function getMedian(arr :  Array<number>, size : number) : number {
    arr.sort(function cmp(a, b) { return (a - b); });
    return arr[Math.floor(size / 2)];
}

function test22() {
    const first = [10, 10, 5, 7, 9, 11, 12, 8, 5, 3, 10];
    console.log(`median value is :: ${getMedian(first, first.length)}`);
}

function SearchBotinicArrayMax(arr :  Array<number>, size : number) : number {
    let start : number = 0;
    let end : number = size - 1;
    let mid : number = ((start + end) / 2|0);
    if(size < 3) {
        console.info("error");
        return 0;
    }
    while(start <= end) {
        mid = Math.floor((start + end) / 2);
        if(arr[mid - 1] < arr[mid] && arr[mid + 1] < arr[mid]) {
            return arr[mid];
        } else if(arr[mid - 1] < arr[mid] && arr[mid] < arr[mid + 1]) {
            start = mid + 1;
        } else if(arr[mid - 1] > arr[mid] && arr[mid] > arr[mid + 1]) {
            end = mid - 1;
        } else {
            break;
        }
    };
    console.log("NoMaximaFound");
    return -1;
    
}
function test23() {
    const first = [1, 3, 5, 7, 9, 11, 12, 8, 5, 3, 1];
    console.log(SearchBotinicArrayMax(first, first.length));
}

function SearchBitonicArray(arr :  Array<number>, size : number, key : number) : boolean {
    let max : number = FindMaxBitonicArray(arr, size);
    let k : number = BinarySearch2(arr, 0, max, key, true);
    if (k !== -1) {
        return true;
    }
    k = BinarySearch2(arr, max + 1, size - 1, key, false);
    if (k !== -1) {
        return true;
    }
    return false;
}

function FindMaxBitonicArray(arr :  Array<number>, size : number) : number {
    let start : number = 0;
    let end : number = size - 1;
    let mid : number;
    if(size < 3) {
        console.info("error");
        return -1;
    }
    while(start <= end) {
        mid = (start + end) / 2|0;
        if(arr[mid - 1] < arr[mid] && arr[mid + 1] < arr[mid]) {
            return mid;
        } else if(arr[mid - 1] < arr[mid] && arr[mid] < arr[mid + 1]) {
            start = mid + 1;
        } else if(arr[mid - 1] > arr[mid] && arr[mid] > arr[mid + 1]) {
            end = mid - 1;
        } else {
            break;
        }
    };
    console.info("NoMaximaFound");
    return -1;
}

function test24() {
    let first :  Array<number> = [1, 3, 5, 7, 9, 11, 12, 8, 5, 3, 1];
    console.log(SearchBitonicArray(first, first.length,  8));
    console.log(SearchBitonicArray(first, first.length, 7));
    console.log(SearchBitonicArray(first, first.length, 12));
    console.log(FindMaxBitonicArray(first, first.length));
}

function findKeyCount(arr :  Array<number>, size : number, key : number) : number {
    let count : number = 0;
    for(let i : number = 0; i < size; i++) {
        if(arr[i] === key) {
            count++;
        }
    };
    return count;
}

function findKeyCount2(arr :  Array<number>, size : number, key : number) : number {
    let firstIndex : number;
    let lastIndex : number;
    firstIndex = findFirstIndex(arr, 0, size - 1, key);
    lastIndex = findLastIndex(arr, 0, size - 1, key);
    return (lastIndex - firstIndex + 1);
}

function FirstIndex(arr :  Array<number>, size : number, low : number, high : number, value : number) : number {
    let mid : number = 0;
    if(high >= low) 
        mid = ((low + high) / 2|0);
    if((mid === 0 || arr[mid - 1] < value) && (arr[mid] === value)) 
        return mid; 
    else if(arr[mid] < value) 
        return FirstIndex(arr, size, mid + 1, high, value); 
    else 
        return FirstIndex(arr, size, low, mid - 1, value);
}

function findFirstIndex(arr :  Array<number>, start : number, end : number, key : number) : number {
    if(end < start) {
        return -1;
    }
    let mid : number = ((start + end) / 2|0);
    if(key === arr[mid] && 
        (mid === start || arr[mid - 1] !== key)) {
        return mid;
    }
    if(key <= arr[mid]) {
        return findFirstIndex(arr, start, mid - 1, key);
    } else {
        return findFirstIndex(arr, mid + 1, end, key);
    }
}

function findLastIndex(arr :  Array<number>, start : number, end : number, key : number) : number {
    if(end < start) {
        return -1;
    }
    let mid : number = ((start + end) / 2|0);
    if(key === arr[mid] && (mid === end || arr[mid + 1] !== key)) {
        return mid;
    }
    if(key < arr[mid]) {
        return findLastIndex(arr, start, mid - 1, key);
    } else {
        return findLastIndex(arr, mid + 1, end, key);
    }
}

function test25() {
    let first :  Array<number> = [1, 5, 10, 13, 20, 30, 8, 7, 6];
    console.info(findKeyCount(first, first.length, 6));
    console.info(findKeyCount2(first, first.length, 6));
};

function maxProfit(stocks :  Array<number>, size : number) : number {
    let buy : number = 0;
    let sell : number = 0;
    let curMin : number = 0;
    let currProfit : number = 0;
    let maxProfit : number = 0;
    for(let i : number = 0; i < size; i++) {
        if(stocks[i] < stocks[curMin]) {
            curMin = i;
        }
        currProfit = stocks[i] - stocks[curMin];
        if(currProfit > maxProfit) {
            buy = curMin;
            sell = i;
            maxProfit = currProfit;
        }
    };
    console.info("Purchase day is- " + buy + " at price " + stocks[buy]);
    console.info("Sell day is- " + sell + " at price " + stocks[sell]);
    return maxProfit;
}

function test26() {
    let first :  Array<number> = [10, 150, 6, 67, 61, 16, 86, 6, 67, 78, 150, 3, 28, 143];
    console.info(maxProfit(first, first.length));
}

function findMedian(arrFirst :  Array<number>, sizeFirst : number, arrSecond :  Array<number>, sizeSecond : number) : number {
    let medianIndex : number = (((sizeFirst + sizeSecond) + (sizeFirst + sizeSecond) % 2) / 2|0);
    let i : number = 0;
    let j : number = 0;
    let count : number = 0;
    while(count < medianIndex - 1) {
        if(i < sizeFirst - 1 && arrFirst[i] < arrSecond[j]) {
            i++;
        } else {
            j++;
        }
        count++;
    };
    if(arrFirst[i] < arrSecond[j]) {
        return arrFirst[i];
    } else {
        return arrSecond[j];
    }
}

function test27() {
    let first :  Array<number> = [1, 5, 6, 6, 6, 6, 6, 6, 7, 8, 10, 13, 20, 30];
    let second :  Array<number> = [1, 5, 6, 6, 6, 6, 6, 6, 7, 8, 10, 13, 20, 30];
    console.info(findMedian(first, first.length, second, second.length));
}

function BinarySearch01(arr :  Array<number>, size : number) : number {
    if(size === 1 && arr[0] === 1) {
        return 0;
    }
    return BinarySearch01Util(arr, 0, size - 1);
}

function BinarySearch01Util(arr :  Array<number>, start : number, end : number) : number {
    if(end < start) {
        return -1;
    }
    let mid : number = ((start + end) / 2|0);
    if(1 === arr[mid] && 0 === arr[mid - 1]) {
        return mid;
    }
    if(0 === arr[mid]) {
        return BinarySearch01Util(arr, mid + 1, end);
    } else {
        return BinarySearch01Util(arr, start, mid - 1);
    }
}

function test28() {
    let first :  Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1];
    console.info(BinarySearch01(first, first.length));
}

function RotationMaxUtil(arr :  Array<number>, start : number, end : number) : number {
    if(end <= start) {
        return arr[start];
    }
    let mid : number = ((start + end) / 2|0);
    if(arr[mid] > arr[mid + 1]) 
        return arr[mid];
    if(arr[start] <= arr[mid]) 
        return RotationMaxUtil(arr, mid + 1, end); 
    else 
        return RotationMaxUtil(arr, start, mid - 1);
}

function RotationMax(arr :  Array<number>, size : number) : number {
    return RotationMaxUtil(arr, 0, size - 1);
}

function FindRotationMaxUtil(arr :  Array<number>, start : number, end : number) : number {
    if(end <= start) 
        return start;
    let mid : number = ((start + end) / 2|0);
    if(arr[mid] > arr[mid + 1]) 
        return mid;
    if(arr[start] <= arr[mid]) 
        return FindRotationMaxUtil(arr, mid + 1, end); 
    else 
        return FindRotationMaxUtil(arr, start, mid - 1);
}

function FindRotationMax(arr :  Array<number>, size : number) : number {
    return FindRotationMaxUtil(arr, 0, size - 1);
}

function CountRotation(arr :  Array<number>, size : number) : number {
    let maxIndex : number = FindRotationMaxUtil(arr, 0, size - 1);
    return (maxIndex + 1) % size;
}

function BinarySearchRotateArrayUtil(arr :  Array<number>, start : number, end : number, key : number) : number {
    if(end < start) {
        return -1;
    }
    let mid : number = ((start + end) / 2|0);
    if(key === arr[mid]) {
        return mid;
    }
    if(arr[mid] > arr[start]) {
        if(arr[start] <= key && key < arr[mid]) {
            return BinarySearchRotateArrayUtil(arr, start, mid - 1, key);
        } else {
            return BinarySearchRotateArrayUtil(arr, mid + 1, end, key);
        }
    } else {
        if(arr[mid] < key && key <= arr[end]) {
            return BinarySearchRotateArrayUtil(arr, mid + 1, end, key);
        } else {
            return BinarySearchRotateArrayUtil(arr, start, mid - 1, key);
        }
    }
}

function BinarySearchRotateArray(arr :  Array<number>, size : number, key : number) : number {
    return BinarySearchRotateArrayUtil(arr, 0, size - 1, key);
}

function test29() {
    let first :  Array<number> = [34, 56, 77, 1, 5, 6, 6, 6, 6, 6, 6, 7, 8, 10, 13, 20, 30];
    console.info(BinarySearchRotateArray(first, first.length, 20));
    console.info(CountRotation(first, first.length));
    console.info(first[FindRotationMax(first, first.length)]);
}

function minAbsDiffAdjCircular(arr :  Array<number>, size : number) : number {
    let diff : number = MAX_VALUE;
    if(size < 2) 
        return -1;
    for(let i : number = 0; i < size; i++) {
        diff = Math.min(diff, Math.abs(arr[i] - arr[(i + 1) % size]));
    }
    return diff;
}

function test30() {
    let arr :  Array<number> = [5, 29, 18, 51, 11];
    console.info(minAbsDiffAdjCircular(arr, arr.length));
}

function swapch(arr : string[], first : number, second : number) {
    let temp : string = arr[first];
    arr[first] = arr[second];
    arr[second] = temp;
}

function transformArrayAB1(arr : string[], size : number) {
    let N : number = (size / 2|0);
    let i : number;
    let j : number;
    for(i = 1; i < N; i++) {
        for(j = 0; j < i; j++) {
            swapch(arr, N - i + 2 * j, N - i + 2 * j + 1);
        };
    };
}

function test31() {
    let str : string[] = ("aaaabbbb").split('');
    transformArrayAB1(str, str.length);
    console.info(str);
}

function checkPermutation(array1 :  Array<number>, size1 : number, array2 :  Array<number>, size2 : number) : boolean {
    if(size1 !== size2) {
        return false;
    }
    array1.sort(function cmp(a, b) { return (a - b); });
    array2.sort(function cmp(a, b) { return (a - b); });
    for(let i : number = 0; i < size1; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    };
    return true;
}

function checkPermutation2(array1 :  Array<number>, size1 : number, array2 :  Array<number>, size2 : number) {

    if (size1 !== size2) {
        return false;
    }
    const ht = {};
    let i;
    for (i = 0; i < size1; i++) {
        if (array1[i] in ht) {
            ht[array1[i]] += 1
        } else {
            ht[array1[i]] = 1
        }
    }
    for (i = 0; i < size2; i++) {
        if (array2[i] in ht === false) {
            return false;
        } else {
            ht[array1[i]] -= 1
            if (ht[array1[i]] == 0) {
                delete ht[array2[i]]
            }
        }
    }
    return true;
};

function test32() {
    const first = [1, 2, 3, 1, 2, 3, 5, 6, 7, 7, 8, 9, 3, 4, 5];
    const second = [1, 2, 4, 5, 3, 1, 2, 3, 5, 6, 7, 7, 8, 9, 3];

    console.log(`checkPermutation ${checkPermutation(first, first.length, second, second.length)}`)
    console.log(`checkPermutation2 ${checkPermutation2(first, first.length, second, second.length)}`)
}

function FindElementIn2DArray(arr :  Array<number>[], r : number, c : number, value : number) : boolean {
    let row : number = 0;
    let column : number = c - 1;
    while(row < r && column >= 0) {
        if(arr[row][column] === value) {
            return true;
        } else if(arr[row][column] > value) {
            column--;
        } else {
            row++;
        }
    };
    return false;
}

function test33() {
    const f = new Array(10);
    let count = 0;
    for (let i = 0; i < 10; i++) {
        f[i] = new Array(10);
        for (let j = 0; j < 10; j++) {
            f[i][j] = count++;
        }
    }

    console.log(FindElementIn2DArray(f, 10, 10, 21));
    console.log(FindElementIn2DArray(f, 10, 10, 121));
}

function isAP(arr :  Array<number>, size : number) : boolean {
    if(size <= 1) 
        return true;
    arr.sort(function cmp(a, b) { return (a - b); });
    let diff : number = arr[1] - arr[0];
    for(let i : number = 2; i < size; i++) {
        if(arr[i] - arr[i - 1] !== diff) 
            return false;
    };
    return true;
}

function isAP2(arr :  Array<number>, size : number) : boolean {
    let first : number = MAX_VALUE;
    let second : number = MAX_VALUE;
    let value : number;
    const hs = new Set();
    for (var i = 0; i < size; i++) {
        if (arr[i] < first) {
            second = first;
            first = arr[i];
        } else if (arr[i] < second)
            second = arr[i];
    }
    let diff = second - first;

    for (var i = 0; i < size; i++) {
        if (hs.has(arr[i]))
            return false;
        hs.add(arr[i]);
    }

    for (var i = 0; i < size; i++) {
        value = first + i * diff;
        if (!hs.has(value))
            return false;
    }
    return true;
}

function isAP3(arr :  Array<number>, size : number) : boolean {
    let first : number = MAX_VALUE;
    let second : number = MAX_VALUE;
    let count :  Array<number> = new Array<number>(size);
    let index : number = -1;
    for(let i : number = 0; i < size; i++) {
        if(arr[i] < first) {
            second = first;
            first = arr[i];
        } else if(arr[i] < second) 
            second = arr[i];
    };
    let diff = second - first;
    for (let i = 0; i < size; i++) {
        index = (arr[i] - first) / diff ;
        if (index > size - 1 || count[index] !== 0)
            return false;
        count[index] = 1;
    }
    for (var i = 0; i < size; i++) {
        if (count[i] !== 1)
            return false;
    }
    return true;
}

function test34() {
    const first = [3, 6, 9, 12, 15];
    const size = first.length;

    console.log(`isAP ${isAP(first, size)}`)
    console.log(`isAP ${isAP2(first, size)}`)
    console.log(`isAP ${isAP3(first, size)}`)
};

function findBalancedPoint(arr :  Array<number>, size : number) : number {
    let first : number = 0;
    let second : number = 0;
    for(let i : number = 1; i < size; i++) 
    {
        second += arr[i];
    }

    for(let i : number = 0; i < size; i++) {
        if(first === second) {
            console.info(i);
            return i;
        }
        if(i < size - 1) 
            first += arr[i];
        second -= arr[i + 1];
    };
    return -1;
}

function test35() {
    const arr = [-7, 1, 5, 2, -4, 3, 0];
    console.info("BalancedPoint : " , findBalancedPoint(arr, arr.length));
};

function findFloor(arr :  Array<number>, size : number, value : number) : number {
    let start : number = 0;
    let stop : number = size - 1;
    let mid : number;
    while(start <= stop) {
        mid = ((start + stop) / 2|0);
        if(arr[mid] === value || 
            (arr[mid] < value && (mid === size - 1 || arr[mid + 1] > value))) 
            return mid; 
        else if(arr[mid] < value) 
            start = mid + 1; 
        else 
            stop = mid - 1;
    };
    return -1;
}

function findCeil(arr :  Array<number>, size : number, value : number) : number {
    let start : number = 0;
    let stop : number = size - 1;
    let mid : number;
    while(start <= stop) {
        mid = ((start + stop) / 2|0);
        if(arr[mid] === value || 
            (arr[mid] > value && (mid === 0 || arr[mid - 1] < value))) 
            return mid; 
        else if(arr[mid] < value) 
            start = mid + 1; 
        else 
            stop = mid - 1;
    };
    return -1;
}

function ClosestNumber(arr :  Array<number>, size : number, num : number) : number {
    let start : number = 0;
    let stop : number = size - 1;
    let output : number = -1;
    let minDist : number = MAX_VALUE;
    let mid : number;
    while(start <= stop) {
        mid = ((start + stop) / 2|0);
        if(minDist > Math.abs(arr[mid] - num)) {
            minDist = Math.abs(arr[mid] - num);
            output = arr[mid];
        }
        if(arr[mid] === num) 
            break; 
        else if(arr[mid] > num) 
            stop = mid - 1; 
        else 
            start = mid + 1;
    };
    return output;
}

function test36() {
    const arr = [-7, 1, 2, 3, 6, 8, 10];
    console.info("findFloor : " , findFloor(arr, arr.length, 4));        
    console.info("findCeil : " , findCeil(arr, arr.length, 4));
    console.info("ClosestNumber : " , ClosestNumber(arr, arr.length, 4));
};

function DuplicateKDistance(arr :  Array<number>, size : number, k : number) : boolean {
    let hm = new Map();
    for(let i : number = 0; i < size; i++) {
        if (hm.has(arr[i]) && i - hm.get(arr[i]) <= k) {
            console.log(`Value:${arr[i]} Index: ${hm.get(arr[i])} & ${i}`);
            return true;
        } else
            hm.set(arr[i], i);
    }
    return false;
}

function test37() {
    let arr :  Array<number> = [1, 2, 3, 1, 4, 5];
    DuplicateKDistance(arr, arr.length, 3);
}

function frequencyCounts(arr :  Array<number>, size : number) {
    let index : number;
    for(let i : number = 0; i < size; i++) {
        while(arr[i] > 0) {
            index = arr[i] - 1;
            if(arr[index] > 0) {
                arr[i] = arr[index];
                arr[index] = -1;
            } else {
                arr[index] -= 1;
                arr[i] = 0;
            }
        };
    };
    for(let i : number = 0; i < size; i++) {
        console.info((i + 1) + Math.abs(arr[i]));
    }
}

function test38() {
    const arr = [1, 2, 2, 2, 1];
    frequencyCounts(arr, arr.length);
};

function KLargestElements(arrIn :  Array<number>, size : number, k : number) : number {
    let arr :  Array<number> = new Array(size);
    for (var i = 0; i < size; i++) {
        arr[i] = arrIn[i];
    }
    arr.sort(function cmp(a, b) { return (a - b); });
    for(let i : number = 0; i < size; i++) {
        if(arrIn[i] >= arr[size - k]) {
            console.info(arrIn[i]);
            return arrIn[i];
        }
    };
    return -1;
}

function QuickSelectUtil(arr :  Array<number>, lower : number, upper : number, k : number) {
    if(upper <= lower) return;
    let pivot : number = arr[lower];
    let start : number = lower;
    let stop : number = upper;
    while(lower < upper) {
        while(arr[lower] <= pivot) {
            lower++;
        };
        while(arr[upper] > pivot) {
            upper--;
        };
        if(lower < upper) {
            swap(arr, upper, lower);
        }
    };
    swap(arr, upper, start);
    if(k < upper) 
        QuickSelectUtil(arr, start, upper - 1, k);
    if(k > upper) 
        QuickSelectUtil(arr, upper + 1, stop, k);
}

function KLargestElements2(arrIn :  Array<number>, size : number, k : number) : number {
    let arr :  Array<number> = new Array(size);
    for(let i : number = 0; i < size; i++) {
        arr[i] = arrIn[i];
    }
    QuickSelectUtil(arr, 0, size - 1, size - k);
    for(let i : number = 0; i < size; i++) {
        if(arrIn[i] >= arr[size - k]) {
            console.info(arrIn[i]);
            return arrIn[i];
        }
    };
    return -1;
}

function test39() {
    const arr = [1, 3, 4, 2, 2, 1, 5, 9, 3];
    KLargestElements(arr, arr.length, 4);
    //KLargestElements2(arr, arr.length, 4);
};

function FixPoint(arr :  Array<number>, size : number) : number {
    for(let i : number = 0; i < size; i++) {
        if(arr[i] === i) 
            return i;
    };
    return -1;
}

function FixPoint2(arr :  Array<number>, size : number) : number {
    let low : number = 0;
    let high : number = size - 1;
    let mid : number;
    while(low <= high) {
        mid = (low + high) / 2;
        if(arr[mid] === mid) 
            return mid; 
        else if(arr[mid] < mid) 
            low = mid + 1; 
        else 
            high = mid - 1;
    };
    return -1;
}

function test40() {
    const arr = [-1, 0, 2, 3, 6, 7, 9, 10, 18];
    console.log(FixPoint(arr, arr.length));
    console.log(FixPoint2(arr, arr.length));
};

function subArraySums(arr :  Array<number>, size : number, value : number) : boolean {
    let first : number = 0;
    let second : number = 0;
    let sum : number = arr[first];
    while(second < size && first < size) {
        if(sum === value) { 
            console.info("values between index : ", first ,"&", second);
            return true;
        }

        if(sum < value) {
            second += 1;
            if(second < size) 
                sum += arr[second];
        } else {
            sum -= arr[first];
            first += 1;
        }
    };
    return false;
}

function test41() {
    const arr = [1, 3, 4, 4, 6, 7, 7, 8, 8];
    console.log(subArraySums(arr, arr.length, 17));
};

function MaxConSub(arr :  Array<number>, size : number) : number {
    let currMax : number = 0;
    let maximum : number = 0;
    for(let i : number = 0; i < size; i++) {
        currMax = Math.max(arr[i], currMax + arr[i]);
        if(currMax < 0) currMax = 0;
        if(maximum < currMax) maximum = currMax;
    };
    console.info(maximum);
    return maximum;
}

function test42() {
    const arr = [1, -2, 3, 4, -4, 6, -4, 8, 2];
    console.log(MaxConSub(arr, arr.length));
};

function MaxConSubArr(A :  Array<number>, sizeA : number, B :  Array<number>, sizeB : number) : number {
    let currMax : number = 0;
    let maximum : number = 0;
    let hs = new Set();
    for (var i = 0; i < sizeB; i++)
        hs.add(B[i]);
    for (var i = 0; i < sizeA; i++){
        if (hs.has(A[i]))
            currMax = 0;
        else
            currMax = Math.max(A[i], currMax + A[i]);

        if (currMax < 0)
            currMax = 0;

        if (maximum < currMax)
            maximum = currMax;
    }
        
    console.info(maximum);
    return maximum;
}

function MaxConSubArr2(A :  Array<number>, sizeA : number, B :  Array<number>, sizeB : number) : number {
    B.sort(function cmp(a, b) { return (a - b); });
    let currMax : number = 0;
    let maximum : number = 0;
    for(let i : number = 0; i < sizeA; i++) {
        if(BinarySearch(B, sizeB, A[i])) 
            currMax = 0; 
        else {
            currMax = Math.max(A[i], currMax + A[i]);
            if(currMax < 0) 
                currMax = 0;
            if(maximum < currMax) 
                maximum = currMax;
        }
    };
    console.info(maximum);
    return maximum;
}

function test43() {
    const arr = [1, 2, 3, 4, 4, 6, 4, 8, 2];
    const arr2 = [2,4, 8, 18, 10];
    
    console.log(MaxConSubArr(arr, arr.length, arr2, arr2.length));
    console.log(MaxConSubArr2(arr, arr.length, arr2, arr2.length));
};

function RainWater(arr :  Array<number>, size : number) : number {
    let leftHigh :  Array<number> = new Array(size);
    let rightHigh :  Array<number> = new Array(size);
    let max : number = arr[0];
    leftHigh[0] = arr[0];
    for(let i : number = 1; i < size; i++) {
        if(max < arr[i]) 
            max = arr[i];
        leftHigh[i] = max;
    };
    max = arr[size - 1];
    rightHigh[size - 1] = arr[size - 1];
    for(let i : number = (size - 2); i >= 0; i--) {
        if(max < arr[i]) 
            max = arr[i];
        rightHigh[i] = max;
    };
    let water : number = 0;
    for(let i : number = 0; i < size; i++) {
        water += Math.min(leftHigh[i], rightHigh[i]) - arr[i];
    }
    console.info("Water : " + water);
    return water;
}

function RainWater2(arr :  Array<number>, size : number) : number {
    let water : number = 0;
    let leftMax : number = 0;
    let rightMax : number = 0;
    let left : number = 0;
    let right : number = size - 1;
    while(left <= right) {
        if(arr[left] < arr[right]) {
            if(arr[left] > leftMax) 
                leftMax = arr[left]; 
            else 
                water += leftMax - arr[left];
            left += 1;
        } else {
            if(arr[right] > rightMax) 
                rightMax = arr[right]; 
            else 
                water += rightMax - arr[right];
            right -= 1;
        }
    };
    console.info("Water : " + water);
    return water;
}

function test44() {
    const arr = [4, 0, 1, 5];
    RainWater(arr, arr.length);
    RainWater2(arr, arr.length);
};

function seperateEvenAndOdd(arr :  Array<number>, size : number) {
    let left : number = 0;
    let right : number = size - 1;
    while(left < right) {
        if(arr[left] % 2 === 0) {
            left++;
        } else if(arr[right] % 2 === 1) {
            right--;
        } else {
            swap(arr, left, right);
            left++;
            right--;
        }
    };
}

function test45() {
    const first = [1, 0, 5, 7, 9, 11, 12, 8, 5, 3, 1];
    seperateEvenAndOdd(first, first.length);
    console.log(first);
}

test1();
test2();
test3();
test4();
test5();
//test6();
test7();
test8();
test9();
test10();
test11();
test12();
test13();
test14();
test15();
test16();
test17();
test18();
test19();
test20();
test21();
test22();
test23();
test24();
test25();
test26();
test27();
test28();
test29();
test30();
test31();
test32();
test33();
test34();
test35();
test36();
test37();
test38();
test39();
test40();
test41();
test42();
test43();
test44();
test45();

