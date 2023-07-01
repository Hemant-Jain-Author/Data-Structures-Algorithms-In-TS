
function printArray(arr :  Array<number>, count : number) {
    console.info(arr);
}

function swap(arr :  Array<number>, x : number, y : number) {
    let temp : number = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
    return;
}

function Partition01(arr :  Array<number>, size : number) : number {
    let left : number = 0;
    let right : number = size - 1;
    let count : number = 0;
    while(left < right) {
        while(arr[left] === 0) {
            left += 1
        };
        while(arr[right] === 1) {
            right -= 1
        };
        if(left < right) {
            swap(arr, left, right);
            count += 1;
        }
    };
    return count;
}

function Partition012(arr :  Array<number>, size : number) {
    let left : number = 0;
    let right : number = size - 1;
    let i : number = 0;
    while(i <= right) {
        if(arr[i] === 0) {
            swap(arr, i, left);
            i += 1;
            left += 1;
        } else if(arr[i] === 2) {
            swap(arr, i, right);
            right -= 1;
        } else {
            i += 1;
        }
    };
}

// Testing code.
function test1() {
    let arr :  Array<number> = [0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1];
    Partition01(arr, arr.length);
    printArray(arr, arr.length);
    let arr2 :  Array<number> = [0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1];
    Partition012(arr2, arr2.length);
    printArray(arr2, arr2.length);
}

function RangePartition(arr :  Array<number>, size : number, lower : number, higher : number) {
    let start : number = 0;
    let end : number = size - 1;
    let i : number = 0;
    while(i <= end) {
        if(arr[i] < lower) {
            swap(arr, i, start);
            i += 1;
            start += 1;
        } else if(arr[i] > higher) {
            swap(arr, i, end);
            end -= 1;
        } else {
            i += 1;
        }
    };
}

// Testing code.
function test2() {
    let arr :  Array<number> = [1, 21, 2, 20, 3, 19, 4, 18, 5, 17, 6, 16, 7, 15, 8, 14, 9, 13, 10, 12, 11];
    RangePartition(arr, arr.length, 9, 12);
    printArray(arr, arr.length);
}

function minSwaps(arr :  Array<number>, size : number, val : number) : number {
    let swapCount : number = 0;
    let first : number = 0;
    let second : number = size - 1;
    let temp : number;
    while(first < second) {
        if(arr[first] <= val) 
            first += 1; 
        else if(arr[second] > val) 
            second -= 1; 
        else {
            temp = arr[first];
            arr[first] = arr[second];
            arr[second] = temp;
            swapCount += 1;
        }
    };
    return swapCount;
}

function seperateEvenAndOdd(data :  Array<number>, size : number) {
    let left : number = 0;
    let right : number = size - 1;
    while(left < right) {
        if(data[left] % 2 === 0) 
            left++; 
        else if(data[right] % 2 === 1) 
            right--; 
        else {
            swap(data, left, right);
            left++;
            right--;
        }
    };
}

function AbsMore(value1 : number, value2 : number, ref : number) : boolean {
    return (Math.abs(value1 - ref) > Math.abs(value2 - ref));
}

function AbsBubbleSort(arr :  Array<number>, size : number, ref : number) {
    for(let i : number = 0; i < (size - 1); i++) {
        for(let j : number = 0; j < (size - i - 1); j++) {
            if(AbsMore(arr[j], arr[j + 1], ref)) {
                swap(arr, j, j + 1);
            }
        }
    }
}

// Testing code.
function test3() {
    let array :  Array<number> = [9, 1, 8, 2, 7, 3, 6, 4, 5];
    let ref : number = 5;
    AbsBubbleSort(array, array.length, ref);
    printArray(array, array.length);
}

function EqMore(value1 : number, value2 : number, A : number) : boolean {
    value1 = A * value1 * value1;
    value2 = A * value2 * value2;
    return value1 > value2;
}

function ArrayReduction(arr :  Array<number>, size : number) {
    arr.sort(function cmp(a, b) { return (a - b); });
    let count : number = 1;
    let reduction : number = arr[0];
    for(let i : number = 0; i < size; i++) {
        if(arr[i] - reduction > 0) {
            console.info(size - i);
            reduction = arr[i];
            count += 1;
        }
    }
    console.info("Total number of reductions " + count);
}

// Testing code.
function test4() {
    let arr :  Array<number> = [5, 1, 1, 1, 2, 3, 5];
    ArrayReduction(arr, arr.length);
}

function SortByOrder(arr :  Array<number>, size : number, arr2 :  Array<number>, size2 : number) {
    let ht : any = new Map();
    let value : number;
    const ret = new Array(size);
    let retIndex = 0;

    for (var i = 0; i < size; i++) {
        if (ht.has(arr[i])) {
            value = ht.get(arr[i]);
            ht.set(arr[i], value + 1);
        } else {
            ht.set(arr[i], 1);
        }
    }
    for (let j = 0; j < size2; j++) {
        if (ht.has(arr2[j])) {
            value = ht.get(arr2[j]);
            for (var k = 0; k < value; k++) {
                ret[retIndex++] = arr2[j];
            }
            ht.delete(arr2[j]);
        }
    }

    for (var i = 0; i < size; i++) {
        if (ht.has(arr[i])) {
            value = ht.get(arr[i]);
            for (var k = 0; k < value; k++) {
                ret[retIndex++] = arr[i];
            }
            ht.delete(arr[i]);
        }
    }
    for (var i = 0; i < size; i++) {
        arr[i] = ret[i];
    }
}

// Testing code.
function test5() {
    let arr :  Array<number> = [2, 1, 2, 5, 7, 1, 9, 3, 6, 8, 8];
    let arr2 :  Array<number> = [2, 1, 8, 3];
    SortByOrder(arr, arr.length, arr2, arr2.length);
}

function merge(arr1 :  Array<number>, size1 : number, arr2 :  Array<number>, size2 : number) {
    let index : number = 0;
    while(index < size1) {
        if(arr1[index] <= arr2[0]) {
            index += 1;
        } else {
            arr1[index] ^= arr2[0] ^= arr1[index] ^= arr2[0];
            index += 1;
            for(let i : number = 0; i < (size2 - 1); i++) {
                if(arr2[i] < arr2[i + 1]) 
                    break;
                arr2[i] ^= arr2[i + 1] ^= arr2[i] ^= arr2[i + 1];
            }
        }
    };
}

// Testing code.
function test6() {
    let arr1 :  Array<number> = [1, 5, 9, 10, 15, 20];
    let arr2 :  Array<number> = [2, 3, 8, 13];
    merge(arr1, arr1.length, arr2, arr2.length);
    printArray(arr1, arr1.length);
    printArray(arr2, arr2.length);
}

function checkReverse(arr :  Array<number>, size : number) : boolean {
    let start : number = -1;
    let stop : number = -1;
    for(let i : number = 0; i < (size - 1); i++) {
        if(arr[i] > arr[i + 1]) {
            start = i;
            break;
        }
    }
    if(start === -1) 
        return true;
    for(let i : number = start; i < (size - 1); i++) {
        if(arr[i] < arr[i + 1]) {
            stop = i;
            break;
        }
    }
    if(stop === -1) 
        return true;
    if(arr[start - 1] > arr[stop] || arr[stop + 1] < arr[start]) 
        return false;
    for(let i : number = stop + 1; i < size - 1; i++) {
        if(arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

function min(X : number, Y : number) : number {
    if(X < Y) {
        return X;
    }
    return Y;
}

function UnionIntersectionSorted(arr1 :  Array<number>, size1 : number, arr2 :  Array<number>, size2 : number) {
    let first : number = 0;
    let second : number = 0;
    let unionArr :  Array<number> = new Array(size1 + size2);
    let interArr :  Array<number> = new Array(min(size1, size2));
    let uIndex : number = 0;
    let iIndex : number = 0;
    console.log(arr1)
    console.log(arr2)
    while(first < size1 && second < size2) {
        if(arr1[first] === arr2[second]) {
            unionArr[uIndex++] = arr1[first];
            interArr[iIndex++] = arr1[first];
            first += 1;
            second += 1;
        } else if(arr1[first] < arr2[second]) {
            unionArr[uIndex++] = arr1[first];
            first += 1;
        } else {
            unionArr[uIndex++] = arr2[second];
            second += 1;
        }
    };
    while((first < size1)) {
        unionArr[uIndex++] = arr1[first];
        first += 1;
    };
    while((second < size2)) {
        unionArr[uIndex++] = arr2[second];
        second += 1;
    };
    printArray(unionArr, uIndex);
    printArray(interArr, iIndex);
}

function UnionIntersectionUnsorted(arr1 :  Array<number>, size1 : number, arr2 :  Array<number>, size2 : number) {
    arr1.sort(function cmp(a, b) { return (a - b); });
    arr2.sort(function cmp(a, b) { return (a - b); });
    UnionIntersectionSorted(arr1, size1, arr2, size2);
}

// Testing code.
function test7() {
    let arr1 :  Array<number> = [1, 11, 2, 3, 14, 5, 6, 8, 9];
    let arr2 :  Array<number> = [2, 4, 5, 12, 7, 8, 13, 10];
    UnionIntersectionUnsorted(arr1, arr1.length, arr2, arr2.length);
}

test1();
test2();
test3();
test4();
test5();
test6();
test7();