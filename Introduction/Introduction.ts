function printArray(arr : Array<number>) {
    console.info(arr);
}

function swap(arr : Array<number>, x : number, y : number) {
    let temp : number = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
    return;
}

function SumArray(arr : Array<number>) : number {
    let size : number = arr.length;
    let total : number = 0;
    for(let index : number = 0; index < size; index++) {
        total = total + arr[index];
    };
    return total;
}

function test1() {
    let arr : Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.info("Sum of values in array:" + SumArray(arr));
}

function function2() {
    console.info("fun2 line 1");
}

function function1() {
    console.info("fun1 line 1");
    function2();
    console.info("fun1 line 2");
}

function test2() {
    console.info("main line 1");
    function1();
    console.info("main line 2");
}

function SequentialSearch(arr : Array<number>, size : number, value : number) : number {
    for(let i : number = 0; i < size; i++) {
        if(value === arr[i]) {
            return i;
        }
    };
    return -1;
}

function BinarySearch(arr : Array<number>, size : number, value : number) : number {
    let mid : number;
    let low : number = 0;
    let high : number = size - 1;
    while(low <= high) {
        mid = ((low + high ) / 2|0);
        if(arr[mid] === value) {
            return mid;
        } else {
            if(arr[mid] < value) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    };
    return -1;
}

function test3() {
    let arr : Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.info("Sum of values in array:" + SequentialSearch(arr, arr.length, 7));
    console.info("Sum of values in array:" + BinarySearch(arr, arr.length, 7));
}

function rotateArray(a : Array<number>, n : number, k : number) {
    reverseArray(a, 0, k - 1);
    reverseArray(a, k, n - 1);
    reverseArray(a, 0, n - 1);
}

function reverseArray(a : Array<number>, start : number, end : number) {
    for(let i : number = start, j : number = end; i < j; i++, j--) {
        let temp : number = a[i];
        a[i] = a[j];
        a[j] = temp;
    };
}

function reverseArray2(a : Array<number>) {
    let start : number = 0;
    let end : number = a.length - 1;
    for(let i : number = start, j : number = end; i < j; i++, j--) {
        let temp : number = a[i];
        a[i] = a[j];
        a[j] = temp;
    };
}

function test4() {
    let arr : Array<number> = [1, 2, 3, 4, 5, 6];
    rotateArray(arr, arr.length, 2);
    printArray(arr);
}

function maxSubArraySum(a : Array<number>, size : number) : number {
    let maxSoFar : number = 0;
    let maxEndingHere : number = 0;
    for(let i : number = 0; i < size; i++) {
        maxEndingHere = maxEndingHere + a[i];
        if(maxEndingHere < 0) {
            maxEndingHere = 0;
        }
        if(maxSoFar < maxEndingHere) {
            maxSoFar = maxEndingHere;
        }
    };
    return maxSoFar;
}

function test5() {
    let arr : Array<number> = [1, -2, 3, 4, -4, 6, -4, 3, 2];
    console.info("Max sub array sum :" + maxSubArraySum(arr, 9));
}

function WaveArray2(arr : Array<number>) {
    let size : number = arr.length;
    for(let i : number = 1; i < size; i += 2) {
        if((i - 1) >= 0 && arr[i] > arr[i - 1]) {
            swap(arr, i, i - 1);
        }
        if((i + 1) < size && arr[i] > arr[i + 1]) {
            swap(arr, i, i + 1);
        }
    };
}

function WaveArray(arr : Array<number>) {
    let size : number = arr.length;
    arr.sort();
    printArray(arr);
    for(let i : number = 0; i < size - 1; i += 2) {
        swap(arr, i, i + 1);
    };
}

function test6() {
    let arr : Array<number> = [8, 1, 2, 3, 4, 5, 6, 4, 2];
    printArray(arr);
    WaveArray(arr);
    printArray(arr);
    let arr2 : Array<number> = [8, 1, 2, 3, 4, 5, 6, 4, 2];
    WaveArray2(arr2);
    printArray(arr2);
}

function indexArray(arr : Array<number>, size : number) {
    for(let i : number = 0; i < size; i++) {
        let curr : number = i;
        let value : number = -1;
        while((arr[curr] !== -1 && arr[curr] !== curr)) {
            let temp : number = arr[curr];
            arr[curr] = value;
            value = curr = temp;
        };
        if(value !== -1) {
            arr[curr] = value;
        }
    };
}

function indexArray2(arr : Array<number>, size : number) {
    let temp : number;
    for(let i : number = 0; i < size; i++) {
        while((arr[i] !== -1 && arr[i] !== i)) {
            temp = arr[i];
            arr[i] = arr[temp];
            arr[temp] = temp;
        };
    };
}

function test7() {
    let arr : Array<number> = [8, -1, 6, 1, 9, 3, 2, 7, 4, -1];
    let size : number = arr.length;
    indexArray2(arr, size);
    printArray(arr);
    let arr2 : Array<number> = [8, -1, 6, 1, 9, 3, 2, 7, 4, -1];
    size = arr2.length;
    indexArray(arr2, size);
    printArray(arr2);
}

function Sort1toN(arr : Array<number>, size : number) {
    let curr : number;
    let value : number;
    let next : number;
    for(let i : number = 0; i < size; i++) {
        curr = i;
        value = -1;
        while(curr >= 0 && curr < size && arr[curr] !== curr + 1) {
            next = arr[curr];
            arr[curr] = value;
            value = next;
            curr = next - 1;
        };
    };
}

function Sort1toN2(arr : Array<number>, size : number) {
    let temp : number;
    for(let i : number = 0; i < size; i++) {
        while(arr[i] !== i + 1 && arr[i] > 1) {
            temp = arr[i];
            arr[i] = arr[temp - 1];
            arr[temp - 1] = temp;
        };
    };
}

function test8() {
    let arr : Array<number> = [8, 5, 6, 1, 9, 3, 2, 7, 4, 10];
    let size : number = arr.length;
    Sort1toN2(arr, size);
    printArray(arr);
    let arr2 : Array<number> = [8, 5, 6, 1, 9, 3, 2, 7, 4, 10];
    size = arr2.length;
    Sort1toN(arr2, size);
    printArray(arr2);
}

function SmallestPositiveMissingNumber(arr : Array<number>, size : number) : number {
    let found : number;
    for(let i : number = 1; i < size + 1; i++) {
        found = 0;
        for(let j : number = 0; j < size; j++) {
            if(arr[j] === i) {
                found = 1;
                break;
            }
        };
        if(found === 0) {
            return i;
        }
    };
    return -1;
}

function SmallestPositiveMissingNumber2(arr : Array<number>, size : number) : number {
    let hs = new Set();
    for (let i = 0; i < size; i++) {
        hs.add(arr[i]);
    }

    for (let i = 1; i < size + 1; i++) {
        if (hs.has(i) === false)
            return i;
    }
    return -1;
}

function SmallestPositiveMissingNumber3(arr : Array<number>, size : number) : number {
    let aux = new Array(size).fill(-1);

    for (let i = 0; i < size; i++) {
        if (arr[i] > 0 && arr[i] <= size) {
            aux[arr[i] - 1] = arr[i];
        }
    }
    
    for (let i = 0; i < size; i++) {
        if (aux[i] !== i + 1) {
            return i + 1;
        }
    }
    return -1;
}

function SmallestPositiveMissingNumber4(arr : Array<number>, size : number) : number {
    let temp : number;
    for(let i : number = 0; i < size; i++) {
        while(arr[i] !== i + 1 && arr[i] > 0 && arr[i] <= size) {
            temp = arr[i];
            arr[i] = arr[temp - 1];
            arr[temp - 1] = temp;
        };
    };
    for(let i : number = 0; i < size; i++) {
        if(arr[i] !== i + 1) {
            return i + 1;
        }
    };
    return -1;
}

function test9() {
    let arr : Array<number> = [8, 5, 6, 1, 9, 11, 2, 7, 4, 10];
    let size : number = arr.length;
    console.info("Max sub array sum :" + SmallestPositiveMissingNumber(arr, size));
    console.info("Max sub array sum :" + SmallestPositiveMissingNumber2(arr, size));
    console.info("Max sub array sum :" + SmallestPositiveMissingNumber3(arr, size));
    console.info("Max sub array sum :" + SmallestPositiveMissingNumber4(arr, size));
}

function MaxMinArr(arr : Array<number>, size : number) {
    let aux : Array<number> = arr.slice(0,size);
    let start : number = 0;
    let stop : number = size - 1;
    for(let i : number = 0; i < size; i++) {
        if(i % 2 === 0) {
            arr[i] = aux[stop];
            stop -= 1;
        } else {
            arr[i] = aux[start];
            start += 1;
        }
    };
}

function ReverseArr(arr : Array<number>, start : number, stop : number) {
    while(start < stop) {
        swap(arr, start, stop);
        start += 1;
        stop -= 1;
    };
}

function MaxMinArr2(arr : Array<number>, size : number) {
    for(let i : number = 0; i < (size - 1); i++) {
        ReverseArr(arr, i, size - 1);
    };
}

function test10() {
    let arr : Array<number> = [1, 2, 3, 4, 5, 6, 7];
    let size : number = arr.length;
    MaxMinArr(arr, size);
    printArray(arr);
    let arr2 : Array<number> = [1, 2, 3, 4, 5, 6, 7];
    let size2 : number = arr.length;
    MaxMinArr2(arr2, size2);
    printArray(arr2);
}

function maxCircularSum(arr : Array<number>, size : number) : number {
    let sumAll : number = 0;
    let currVal : number = 0;
    let maxVal : number;
    for(let i : number = 0; i < size; i++) {
        sumAll += arr[i];
        currVal += (i * arr[i]);
    };
    maxVal = currVal;
    for(let i : number = 1; i < size; i++) {
        currVal = (currVal + sumAll) - (size * arr[size - i]);
        if(currVal > maxVal) {
            maxVal = currVal;
        }
    };
    return maxVal;
}

function test11() {
    let arr : Array<number> = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    console.info("MaxCirculrSm: " + maxCircularSum(arr, arr.length));
}

function ArrayIndexMaxDiff(arr : Array<number>, size : number) : number {
    let maxDiff : number = -1;
    let j : number;
    for(let i : number = 0; i < size; i++) {
        j = size - 1;
        while(j > i) {
            if(arr[j] > arr[i]) {
                maxDiff = Math.max(maxDiff, j - i);
                break;
            }
            j -= 1;
        };
    };
    return maxDiff;
}

function ArrayIndexMaxDiff2(arr : Array<number>, size : number) : number {
    let leftMin : Array<number> = new Array(size);
    let rightMax : Array<number> = new Array(size);
    leftMin[0] = arr[0];
    let i : number;
    let j : number;
    let maxDiff : number;
    for(i = 1; i < size; i++) {
        if(leftMin[i - 1] < arr[i]) {
            leftMin[i] = leftMin[i - 1];
        } else {
            leftMin[i] = arr[i];
        }
    };
    rightMax[size - 1] = arr[size - 1];
    for(i = size - 2; i >= 0; i--) {
        if(rightMax[i + 1] > arr[i]) {
            rightMax[i] = rightMax[i + 1];
        } else {
            rightMax[i] = arr[i];
        }
    };
    i = 0;
    j = 0;
    maxDiff = -1;
    while(j < size && i < size) {
        if(leftMin[i] < rightMax[j]) {
            maxDiff = Math.max(maxDiff, j - i);
            j = j + 1;
        } else {
            i = i + 1;
        }
    };
    return maxDiff;
}

function test12() {
    let arr : Array<number> = [33, 9, 10, 3, 2, 60, 30, 33, 1];
    console.info("ArrayIndexMaxDiff : " + ArrayIndexMaxDiff(arr, arr.length));
    console.info("ArrayIndexMaxDiff : " + ArrayIndexMaxDiff2(arr, arr.length));
}

function maxPathSum(arr1 : Array<number>, size1 : number, arr2 : Array<number>, size2 : number) : number {
    let i : number = 0;
    let j : number = 0;
    let result : number = 0;
    let sum1 : number = 0;
    let sum2 : number = 0;
    while(i < size1 && j < size2) {
        if(arr1[i] < arr2[j]) {
            sum1 += arr1[i];
            i += 1;
        } else if(arr1[i] > arr2[j]) {
            sum2 += arr2[j];
            j += 1;
        } else {
            result += Math.max(sum1, sum2);
            result = result + arr1[i];
            sum1 = 0;
            sum2 = 0;
            i += 1;
            j += 1;
        }
    };
    while(i < size1) {
        sum1 += arr1[i];
        i += 1;
    };
    while(j < size2) {
        sum2 += arr2[j];
        j += 1;
    };
    result += Math.max(sum1, sum2);
    return result;
}

function test13() {
    let arr1 : Array<number> = [12, 13, 18, 20, 22, 26, 70];
    let arr2 : Array<number> = [11, 15, 18, 19, 20, 26, 30, 31];
    console.info("Max Path Sum :: " + maxPathSum(arr1, arr1.length, arr2, arr2.length));
}

function factorial(i : number) : number {
    if(i <= 1) {
        return 1;
    }
    return i * factorial(i - 1);
}

function printInt1(number : number) {
    let digit : string = String.fromCharCode((number % 10 + '0'.charCodeAt(0)));
    number = (number / 10|0);
    if(number !== 0) {
        printInt1(number);
    }
    console.info("%c" + digit);
}

function printInt(number : number) {
    let conversion : string = "0123456789ABCDEF";
    let base : number = 16;
    let digit : string = String.fromCharCode((number % base));
    number = (number / base|0);
    if(number !== 0) {
        printInt(number);
    }
    console.info(conversion.charAt((digit).charCodeAt(0)));
}

function towerOfHanoi(num : number, src : string, dst : string, temp : string) {
    if(num < 1) {
        return;
    }
    towerOfHanoi(num - 1, src, temp, dst);
    console.info("Move " + num + " disk  from peg " + src + " to peg " + dst);
    towerOfHanoi(num - 1, temp, dst, src);
}

function test14() {
    let num : number = 4;
    console.info("The sequence of moves involved in the Tower of Hanoi are :\n");
    towerOfHanoi(num, 'A', 'C', 'B');
}

function GCD(m : number, n : number) : number {
    if(m < n) {
        return (GCD(n, m));
    }
    if(m % n === 0) {
        return (n);
    }
    return (GCD(n, m % n));
}

function fibonacci(n : number) : number {
    if(n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function permutation(arr : Array<number>, i : number, length : number) {
    if(length === i) {
        printArray(arr);
        return;
    }
    let j : number = i;
    for(j = i; j < length; j++) {
        swap(arr, i, j);
        permutation(arr, i + 1, length);
        swap(arr, i, j);
    };
    return;
}

function test15() {
    let arr : Array<number> = [0, 0, 0, 0, 0];
    for(let i : number = 0; i < 5; i++) {
        arr[i] = i;
    };
    permutation(arr, 0, 5);
}

function BinarySearchRecursive(arr : Array<number>, low : number, high : number, value : number) : number {
    if(low > high) return -1;
    let mid : number = ((low + high) / 2|0);
    if(arr[mid] === value) {
        return mid;
    } else if(arr[mid] < value) {
        return BinarySearchRecursive(arr, mid + 1, high, value);
    } else {
        return BinarySearchRecursive(arr, low, mid - 1, value);
    }
}

function test16() {
    let arr : Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.info(BinarySearchRecursive(arr, 0, arr.length - 1, 6));
    console.info(BinarySearchRecursive(arr, 0, arr.length - 1, 16));
}

test1();
test2();
test3();
test4();
test5();
test6();
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
