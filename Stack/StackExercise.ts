function isBalancedParenthesis(expn: string): boolean {
    let stk: Array<string> = new Array<string>();

    for (let index = 0; index < expn.length; index++) {
        let ch = expn[index];

        switch (ch) {
            case '{':
            case '[':
            case '(':
                stk.push(ch);
                break;
            case '}':
                if (stk.pop() != '{') {
                    return false;
                }
                break;
            case ']':
                if (stk.pop() != '[') {
                    return false;
                }
                break;
            case ')':
                if (stk.pop() != '(') {
                    return false;
                }
                break;
        }
    }

    return (stk.length == 0);
}

// Testing code.
function main1() {
    let expn: string = "{()}[]";
    let value: boolean = isBalancedParenthesis(expn);
    console.info("Given Expn:" + expn);
    console.info("Result after isParenthesisMatched:" + value);
}

function insertAtBottom<T>(stk: Array<T>, value: T) {
    if (stk.length == 0) {
        stk.push(value);
    } else {
        let out: T = stk.pop();
        insertAtBottom<T>(stk, value);
        stk.push(out);
    }
}

function reverseStack<T>(stk: Array<T>) {
    if (stk.length == 0) {
        return;
    } else {
        let value: T = stk.pop();
        reverseStack<T>(stk);
        insertAtBottom<T>(stk, value);
    }
}

function precedence(x: number): number {
    if (x == '('.charCodeAt(0)) {
        return (0);
    }
    if (x == '+'.charCodeAt(0) || x == '-'.charCodeAt(0)) {
        return (1);
    }
    if (x == '*'.charCodeAt(0) || x == '/'.charCodeAt(0) || x == '%'.charCodeAt(0)) {
        return (2);
    }
    if (x == '^'.charCodeAt(0)) {
        return (3);
    }
    return (4);
}

function infixToPostfix(expn: string): string {
    let stk: Array<string> = new Array<string>();
    let output: string = "";
    let out: string;
    for (let index = 0; index < expn.length; index++) {
        let ch = expn[index];
        if (ch <= '9' && ch >= '0') {
            output = output + ch;
        } else {
            switch (ch) {
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                case '^':
                    while (stk.length != 0 &&
                        precedence(ch.charCodeAt(0)) <= precedence(stk[stk.length - 1].charCodeAt(0))) {
                        out = stk.pop();
                        output = output + " " + out;
                    };
                    stk.push(ch);
                    output = output + " ";
                    break;
                case '(':
                    stk.push(ch);
                    break;
                case ')':
                    while (stk.length != 0 && (out = stk.pop()) !== '(') {
                        output = output + " " + out + " ";
                    };
                    break;
            }
        }
    }
    while (stk.length != 0) {
        out = stk.pop();
        output = output + out + " ";
    };
    return output;
}

// Testing code.
function main2() {
    let expn: string = "10+((3))*5/(16-4)";
    let value: string = infixToPostfix(expn);
    console.info("Infix Expn: " + expn);
    console.info("Postfix Expn: " + value);
}

function infixToPrefix(expn: string): string {
    let arr: string[] = (expn).split('');
    reverseString(arr);
    replaceParanthesis(arr);
    let str = infixToPostfix(arr.join(''));
    arr = str.split('');
    reverseString(arr);
    expn = arr.join('');
    return expn;
}

function replaceParanthesis(expn: string[]) {
    let lower: number = 0;
    let upper: number = expn.length - 1;
    while (lower <= upper) {
        if (expn[lower].charCodeAt(0) == '('.charCodeAt(0)) {
            expn[lower] = ')';
        } else if (expn[lower].charCodeAt(0) == ')'.charCodeAt(0)) {
            expn[lower] = '(';
        }
        lower++;
    };
}

function reverseString(expn: string[]) {
    let lower: number = 0;
    let upper: number = expn.length - 1;
    let tempChar: string;
    while (lower < upper) {
        tempChar = expn[lower];
        expn[lower] = expn[upper];
        expn[upper] = tempChar;
        lower++;
        upper--;
    };
}

// Testing code.
function main3() {
    let expn: string = "10+((3))*5/(16-4)";
    let value: string = infixToPrefix(expn);
    console.info("Infix Expn: " + expn);
    console.info("Prefix Expn: " + value);
}

function StockSpanRange(arr: Array<number>): Array<number> {
    let SR: Array<number> = new Array<number>(arr.length);
    SR[0] = 1;
    for (let i: number = 1; i < arr.length; i++) {
        SR[i] = 1;
        for (let j: number = i - 1; (j >= 0) && (arr[i] >= arr[j]); j--) {
            SR[i]++;
        };
    };
    return SR;
}

function StockSpanRange2(arr: Array<number>): Array<number> {
    let stk: Array<number> = new Array<number>();
    let SR: Array<number> = new Array<number>(arr.length);
    stk.push(0);
    SR[0] = 1;
    for (let i: number = 1; i < arr.length; i++) {
        while ((stk.length != 0) && arr[stk[stk.length - 1]] <= arr[i]) {
            stk.pop();
        };
        SR[i] = (stk.length == 0) ? (i + 1) : (i - stk[stk.length - 1]);
        stk.push(i);
    };
    return SR;
}

// Testing code.
function main4() {
    let arr: Array<number> = [6, 5, 4, 3, 2, 4, 5, 7, 9];
    let size: number = arr.length;
    let value: Array<number> = StockSpanRange(arr);
    console.info("StockSpanRange : ");
    for (let index = 0; index < value.length; index++) {
        let val = value[index];
        console.info(" " + val)
    }
    value = StockSpanRange2(arr);
    console.info("StockSpanRange : ");
    for (let index = 0; index < value.length; index++) {
        let val = value[index];
        console.info(" " + val)
    }
}

function GetMaxArea(arr: Array<number>): number {
    let size: number = arr.length;
    let maxArea: number = -1;
    let currArea: number;
    let minHeight: number = 0;
    for (let i: number = 1; i < size; i++) {
        minHeight = arr[i];
        for (let j: number = i - 1; j >= 0; j--) {
            if (minHeight > arr[j]) {
                minHeight = arr[j];
            }
            currArea = minHeight * (i - j + 1);
            if (maxArea < currArea) {
                maxArea = currArea;
            }
        };
    };
    return maxArea;
}

function GetMaxArea2(arr: Array<number>): number {
    let size: number = arr.length;
    let stk: Array<number> = new Array<number>();
    let maxArea: number = 0;
    let top: number;
    let topArea: number;
    let i: number = 0;
    while (i < size) {
        while ((i < size) && ((stk.length == 0)
            || arr[stk[stk.length - 1]] <= arr[i])) {
            stk.push(i);
            i++;
        };
        while ((stk.length != 0) &&
            (i === size || arr[stk[stk.length - 1]] > arr[i])) {
            top = stk[stk.length - 1];
            stk.pop();
            topArea = arr[top] *
                ((stk.length == 0) ? i : i - stk[stk.length - 1] - 1);
            if (maxArea < topArea) {
                maxArea = topArea;
            }
        };
    };
    return maxArea;
}

// Testing code.
function main5() {
    let arr: Array<number> = [7, 6, 5, 4, 4, 1, 6, 3, 1];
    let size: number = arr.length;
    let value: number = GetMaxArea(arr);
    console.info("GetMaxArea :: " + value);
    value = GetMaxArea2(arr);
    console.info("GetMaxArea :: " + value);
}

function sortedInsert(stk: Array<number>, element: number) {
    let temp: number;
    if ((stk.length == 0) || element > stk[stk.length - 1])
        stk.push(element);
    else {
        temp = stk.pop();
        sortedInsert(stk, element);
        stk.push(temp);
    }
}

function sortStack(stk: Array<number>) {
    let temp: number;
    if (stk.length != 0) {
        temp = stk.pop();
        sortStack(stk);
        stk.push(temp);
    }
}

function sortStack2(stk: Array<number>) {
    let temp: number;
    let stk2: Array<number> = new Array<number>();
    while (stk.length != 0) {
        temp = stk.pop();
        while ((stk.length != 0) &&
            (stk2[stk2.length - 1] < temp)) {
            stk.push(stk2.pop())
        };
        stk2.push(temp);
    };
    while (stk2.length !== 0) {
        stk.push(stk2.pop())
    };
}

function bottomInsert(stk: Array<number>, element: number) {
    let temp: number;
    if (stk.length == 0)
        stk.push(element);
    else {
        temp = stk.pop();
        bottomInsert(stk, element);
        stk.push(temp);
    }
}

function reverseStack2(stk: Array<number>) {
    let que: Array<number> = new Array<number>();
    while (stk.length != 0) {
        que.push(stk.pop())
    };
    while (que.length !== 0) {
        stk.push(que.pop())
    };
}

function reverseKElementInStack(stk: Array<number>, k: number) {
    let que: Array<number> = new Array<number>();
    let i: number = 0;
    while (stk.length != 0 && i < k) {
        que.push(stk.pop());
        i++;
    };
    while (que.length !== 0) {
        stk.push(que.pop())
    };
}

function reverseQueue(que: Array<number>) {
    let stk: Array<number> = new Array<number>();
    while (que.length !== 0) {
        stk.push(que.pop())
    };
    while (stk.length != 0) {
        que.push(stk.pop())
    };
}

function reverseKElementInQueue(que: Array<number>, k: number) {
    let stk: Array<number> = new Array<number>();
    let i: number = 0;
    let diff: number;
    let temp: number;
    while (que.length !== 0 && i < k) {
        stk.push(que.pop());
        i++;
    };
    while (stk.length != 0) {
        que.push(stk.pop());
    };
    diff = que.length - k;
    while (diff > 0) {
        temp = que.pop();
        que.push(temp);
        diff -= 1;
    };
}

// Testing code.
function main6() {
    let stk: Array<number> = new Array<number>();
    stk.push(1);
    stk.push(2);
    stk.push(3);
    stk.push(4);
    stk.push(5);
    console.info(stk);
}

// Testing code.
function main7() {
    let stk: Array<number> = new Array<number>();
    stk.push(-2);
    stk.push(13);
    stk.push(16);
    stk.push(-6);
    stk.push(40);
    console.info(stk);
    reverseStack2(stk);
    console.info(stk);
    reverseKElementInStack(stk, 2);
    console.info(stk);
    let que: Array<number> = new Array<number>();
    que.push(1);
    que.push(2);
    que.push(3);
    que.push(4);
    que.push(5);
    que.push(6);
    console.info(que);
    reverseQueue(que);
    console.info(que);
    reverseKElementInQueue(que, 2);
    console.info(que);
}

function maxDepthParenthesis(expn: string, size: number): number {
    let stk: Array<string> = new Array<string>();
    let maxDepth: number = 0;
    let depth: number = 0;
    let ch: string;
    for (let i: number = 0; i < size; i++) {
        ch = expn.charAt(i);
        if (ch == '(') {
            stk.push(ch);
            depth += 1;
        } else if (ch == ')') {
            stk.pop();
            depth -= 1;
        }
        if (depth > maxDepth) maxDepth = depth;
    };
    return maxDepth;
}

function maxDepthParenthesis2(expn: string, size: number): number {
    let maxDepth: number = 0;
    let depth: number = 0;
    let ch: string;
    for (let i: number = 0; i < size; i++) {
        ch = expn.charAt(i);
        if (ch == '(')
            depth += 1;
        else if (ch == ')')
            depth -= 1;
        if (depth > maxDepth)
            maxDepth = depth;
    };
    return maxDepth;
}

// Testing code.
function main8() {
    let expn: string = "((((A)))((((BBB()))))()()()())";
    let size: number = expn.length;
    let value: number = maxDepthParenthesis(expn, size);
    let value2: number = maxDepthParenthesis2(expn, size);
    console.info("Given expn " + expn);
    console.info("Max depth parenthesis is " + value);
    console.info("Max depth parenthesis is " + value2);
}

function longestContBalParen(str: string, size: number): number {
    let stk: Array<number> = new Array<number>();
    stk.push(-1);
    let length: number = 0;
    for (let i: number = 0; i < size; i++) {
        if (str[i] == '(')
            stk.push(i);
        else {
            stk.pop();
            if (stk.length !== 0)
                length = Math.max(length, i - stk[stk.length - 1]);
            else
                stk.push(i);
        }
    };
    return length;
}

// Testing code.
function main9() {
    let expn: string = "())((()))(())()(()";
    let size: number = expn.length;
    let value: number = longestContBalParen(expn, size);
    console.info("longestContBalParen " + value);
}

function reverseParenthesis(expn: string, size: number): number {
    let stk: Array<string> = new Array<string>();
    let openCount: number = 0;
    let closeCount: number = 0;
    let ch: string;
    if (size % 2 === 1) {
        console.info("Invalid odd length " + size);
        return -1;
    }
    for (let i: number = 0; i < size; i++) {
        ch = expn.charAt(i);
        if (ch == '(')
            stk.push(ch);
        else if (ch == ')')
            if (stk.length !== 0 && stk[stk.length - 1] == '(')
                stk.pop();
            else
                stk.push(')');
    };
    while (stk.length !== 0) {
        if (stk.pop() == '(')
            openCount += 1;
        else
            closeCount += 1;
    };
    let reversal: number = Math.ceil(openCount / 2.0) +
        Math.ceil(closeCount / 2.0);
    return reversal;
}

// Testing code.
function main10() {
    let expn: string = "())((()))(())()(()()()()))";
    let expn2: string = ")(())(((";
    let size: number = expn2.length;
    let value: number = reverseParenthesis(expn2, size);
    console.info("Given expn : " + expn2);
    console.info("reverse Parenthesis is : " + value);
}

function findDuplicateParenthesis(expn: string, size: number): boolean {
    let stk: Array<string> = new Array<string>();
    let ch: string;
    let count: number;
    for (let i: number = 0; i < size; i++) {
        ch = expn[i];
        if (ch == ')') {
            count = 0;
            while (stk.length !== 0 && stk[stk.length - 1] != '(') {
                stk.pop();
                count += 1;
            };
            if (count <= 1)
                return true;
        }
        else
            stk.push(ch);
    };
    return false;
}

// Testing code.
function main11() {
    let expn: string = "(((a+b))+c)";
    console.info("Given expn : " + expn);
    let size: number = expn.length;
    let value: boolean = findDuplicateParenthesis(expn, size);
    console.info("Duplicate Found : " + value);
}

function printParenthesisNumber(expn: string, size: number) {
    let ch: string;
    let stk: Array<number> = new Array<number>();
    let output: string = "";
    let count: number = 1;
    for (let i: number = 0; i < size; i++) {
        ch = expn[i];
        if (ch == '(') {
            stk.push(count);
            output += count;
            count += 1;
        }
        else if (ch == ')')
            output += stk.pop();
    };
    console.info("Parenthesis Count ", output);
}

// Testing code.
function main12() {
    let expn1: string = "(((a+(b))+(c+d)))";
    let expn2: string = "(((a+b))+c)(((";
    let size: number = expn1.length;
    console.info("Given expn " + expn1);
    printParenthesisNumber(expn1, size);
    size = expn2.length;
    console.info("Given expn " + expn2);
    printParenthesisNumber(expn2, size);
}

function nextLargerElement(arr: Array<number>, size: number) {
    let output: Array<number> = new Array<number>(size);
    let outIndex: number = 0;
    let next: number;
    for (let i: number = 0; i < size; i++) {
        next = -1;
        for (let j: number = i + 1; j < size; j++) {
            if (arr[i] < arr[j]) {
                next = arr[j];
                break;
            }
        };
        output[outIndex++] = next;
    };
    console.log(output)
}

function nextLargerElement2(arr: Array<number>, size: number) {
    let stk: Array<number> = new Array<number>();
    let output: Array<number> = new Array<number>(size);
    let index: number = 0;
    let curr: number;
    for (let i: number = 0; i < size; i++) {
        curr = arr[i];
        while (stk.length != 0 &&
            arr[stk[stk.length - 1]] <= curr) {
            index = stk.pop();
            output[index] = curr;
        };
        stk.push(i);
    };
    while (stk.length != 0) {
        index = stk.pop();
        output[index] = -1;
    };
    console.log(output)
}

function nextSmallerElement(arr: Array<number>, size: number) {
    let stk: Array<number> = new Array<number>();
    let output: Array<number> = new Array<number>(size);
    let curr: number;
    let index: number;
    for (let i: number = 0; i < size; i++) {
        curr = arr[i];
        while (stk.length != 0 && arr[stk[stk.length - 1]] > curr) {
            index = stk.pop();
            output[index] = curr;
        };
        stk.push(i);
    };
    while (stk.length != 0) {
        index = stk.pop();
        output[index] = -1;
    };
    console.log(output)
}

// Testing code.
function main13() {
    let arr: Array<number> = [13, 21, 3, 6, 20, 3];
    let size: number = arr.length;
    nextLargerElement(arr, size);
    nextLargerElement2(arr, size);
    nextSmallerElement(arr, size);
}

function nextLargerElementCircular(arr: Array<number>, size: number) {
    let stk: Array<number> = new Array<number>();
    let curr: number;
    let index: number;
    let output: Array<number> = new Array<number>(size);
    for (let i: number = 0; i < (2 * size - 1); i++) {
        curr = arr[i % size];
        while (stk.length != 0 && arr[stk[stk.length - 1]] <= curr) {
            index = stk.pop();
            output[index] = curr;
        };
        stk.push(i % size);
    };
    while (stk.length != 0) {
        index = stk.pop();
        output[index] = -1;
    };
    console.log(output)
}

// Testing code.
function main14() {
    let arr: Array<number> = [6, 3, 9, 8, 10, 2, 1, 15, 7];
    let size: number = arr.length;
    nextLargerElementCircular(arr, size);
}

function RottenFruitUtil(arr: Array<Array<number>>, maxCol: number, maxRow: number, currCol: number, currRow: number, traversed: Array<Array<number>>, day: number) {
    if (currCol < 0 || currCol >= maxCol || currRow < 0 || currRow >= maxRow) return;
    if (traversed[currCol][currRow] <= day || arr[currCol][currRow] === 0) return;
    traversed[currCol][currRow] = day;
    RottenFruitUtil(arr, maxCol, maxRow, currCol - 1, currRow, traversed, day + 1);
    RottenFruitUtil(arr, maxCol, maxRow, currCol + 1, currRow, traversed, day + 1);
    RottenFruitUtil(arr, maxCol, maxRow, currCol, currRow + 1, traversed, day + 1);
    RottenFruitUtil(arr, maxCol, maxRow, currCol, currRow - 1, traversed, day + 1);
}

function RottenFruit(arr: Array<Array<number>>, maxCol: number, maxRow: number): number {
    let traversed: Array<Array<number>> = new Array(maxRow);
    for (let i = 0; i < maxRow; i++) {
        traversed[i] = Array(maxCol).fill(2147483647)
    }

    for (let i: number = 0; i < maxCol - 1; i++) {
        for (let j: number = 0; j < maxRow - 1; j++) {
            if (arr[i][j] === 2) RottenFruitUtil(arr, maxCol, maxRow, i, j, traversed, 0);
        };
    };
    let maxDay: number = 0;
    for (let i: number = 0; i < maxCol - 1; i++) {
        for (let j: number = 0; j < maxRow - 1; j++) {
            if (arr[i][j] === 1) {
                if (traversed[i][j] === 2147483647) return -1;
                if (maxDay < traversed[i][j]) maxDay = traversed[i][j];
            }
        };
    };
    return maxDay;
}

// Testing code.
function main15() {
    let arr: Array<Array<number>> = [
        [1, 0, 1, 1, 0],
        [2, 1, 0, 1, 0],
        [0, 0, 0, 2, 1],
        [0, 2, 0, 0, 1],
        [1, 1, 0, 0, 1]];
    console.info(RottenFruit(arr, 5, 5));
}

function StepsOfKnightUtil(size: number, currCol: number, currRow: number,
    traversed: Array<Array<number>>, dist: number) {
    if (currCol < 0 || currCol >= size || currRow < 0 || currRow >= size) return;
    if (traversed[currCol][currRow] <= dist) return;
    traversed[currCol][currRow] = dist;
    StepsOfKnightUtil(size, currCol - 2, currRow - 1, traversed, dist + 1);
    StepsOfKnightUtil(size, currCol - 2, currRow + 1, traversed, dist + 1);
    StepsOfKnightUtil(size, currCol + 2, currRow - 1, traversed, dist + 1);
    StepsOfKnightUtil(size, currCol + 2, currRow + 1, traversed, dist + 1);
    StepsOfKnightUtil(size, currCol - 1, currRow - 2, traversed, dist + 1);
    StepsOfKnightUtil(size, currCol + 1, currRow - 2, traversed, dist + 1);
    StepsOfKnightUtil(size, currCol - 1, currRow + 2, traversed, dist + 1);
    StepsOfKnightUtil(size, currCol + 1, currRow + 2, traversed, dist + 1);
}

function StepsOfKnight(size: number, srcX: number, srcY: number, dstX: number, dstY: number): number {
    let traversed: Array<Array<number>> = new Array(size);
    for (let i = 0; i < size; i++) {
        traversed[i] = new Array(size).fill(2147483647)
    }

    StepsOfKnightUtil(size, srcX - 1, srcY - 1, traversed, 0);
    let retval: number = traversed[dstX - 1][dstY - 1];
    return retval;
}

// Testing code.
function main16() {
    console.info(StepsOfKnight(20, 10, 10, 20, 20));
}

function DistNearestFillUtil(arr: Array<Array<number>>, maxCol: number, maxRow: number, currCol: number, currRow: number, traversed: Array<Array<number>>, dist: number) {
    if (currCol < 0 || currCol >= maxCol || currRow < 0 || currRow >= maxRow)
        return;
    if (traversed[currCol][currRow] <= dist)
        return;
    traversed[currCol][currRow] = dist;
    DistNearestFillUtil(arr, maxCol, maxRow, currCol - 1, currRow, traversed, dist + 1);
    DistNearestFillUtil(arr, maxCol, maxRow, currCol + 1, currRow, traversed, dist + 1);
    DistNearestFillUtil(arr, maxCol, maxRow, currCol, currRow + 1, traversed, dist + 1);
    DistNearestFillUtil(arr, maxCol, maxRow, currCol, currRow - 1, traversed, dist + 1);
}

function DistNearestFill(arr: Array<Array<number>>, maxCol: number, maxRow: number) {
    let traversed: Array<Array<number>> = new Array(maxRow);
    for (let i = 0; i < maxRow; i++) {
        traversed[i] = new Array(maxCol).fill(2147483647)
    }

    for (let i: number = 0; i < maxCol; i++) {
        for (let j: number = 0; j < maxRow; j++) {
            if (arr[i][j] === 1)
                DistNearestFillUtil(arr, maxCol, maxRow, i, j, traversed, 0);
        };
    };
    for (let i: number = 0; i < maxCol; i++) {
        console.info(traversed[i]);
    };
}

// Testing code.
function main17() {
    let arr: Array<Array<number>> = [
        [1, 0, 1, 1, 0],
        [1, 1, 0, 1, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1]];
    DistNearestFill(arr, 5, 5);
}

function findLargestIslandUtil(arr: Array<Array<number>>, maxCol: number, maxRow: number, currCol: number, currRow: number, value: number, traversed: Array<Array<number>>): number {
    if (currCol < 0 || currCol >= maxCol || currRow < 0 || currRow >= maxRow)
        return 0;
    if (traversed[currCol][currRow] === 1 || arr[currCol][currRow] !== value)
        return 0;
    traversed[currCol][currRow] = 1;
    return 1 + findLargestIslandUtil(arr, maxCol, maxRow, currCol - 1, currRow - 1, value, traversed) + findLargestIslandUtil(arr, maxCol, maxRow, currCol - 1, currRow, value, traversed) + findLargestIslandUtil(arr, maxCol, maxRow, currCol - 1, currRow + 1, value, traversed) + findLargestIslandUtil(arr, maxCol, maxRow, currCol, currRow - 1, value, traversed) + findLargestIslandUtil(arr, maxCol, maxRow, currCol, currRow + 1, value, traversed) + findLargestIslandUtil(arr, maxCol, maxRow, currCol + 1, currRow - 1, value, traversed) + findLargestIslandUtil(arr, maxCol, maxRow, currCol + 1, currRow, value, traversed) + findLargestIslandUtil(arr, maxCol, maxRow, currCol + 1, currRow + 1, value, traversed);
}

function findLargestIsland(arr: Array<Array<number>>, maxCol: number, maxRow: number): number {
    let maxVal: number = 0;
    let currVal: number = 0;
    let traversed: Array<Array<number>> = new Array(maxRow);
    for (let i = 0; i < maxRow; i++) {
        traversed[i] = new Array(maxCol).fill(2147483647)
    }

    for (let i: number = 0; i < maxCol; i++) {
        for (let j: number = 0; j < maxRow; j++) {
            {
                currVal = findLargestIslandUtil(arr, maxCol, maxRow, i, j, arr[i][j], traversed);
                if (currVal > maxVal) maxVal = currVal;
            };
        };
    };
    return maxVal;
}

// Testing code.
function main18() {
    let arr: Array<Array<number>> = [
        [1, 0, 1, 1, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 1, 1],
        [0, 1, 0, 0, 0],
        [1, 1, 0, 0, 1]];
    console.info("Largest Island : " + findLargestIsland(arr, 5, 5));
}

function isKnown(relation: Array<Array<number>>, a: number, b: number): boolean {
    if (relation[a][b] === 1) return true;
    return false;
}

function findCelebrity(relation: Array<Array<number>>, count: number): number {
    let stk: Array<number> = new Array<number>();
    let first: number = 0;
    let second: number = 0;
    for (let i: number = 0; i < count; i++) {
        stk.push(i);
    };
    first = stk.pop();
    while (stk.length !== 0) {
        second = stk.pop();
        if (isKnown(relation, first, second)) first = second;
    };
    for (let i: number = 0; i < count; i++) {
        if (first !== i && isKnown(relation, first, i)) return -1;
        if (first !== i && isKnown(relation, i, first) === false) return -1;
    };
    return first;
}

function findCelebrity2(relation: Array<Array<number>>, count: number): number {
    let first: number = 0;
    let second: number = 1;
    for (let i: number = 0; i < (count - 1); i++) {
        if (isKnown(relation, first, second)) first = second;
        second = second + 1;
    };
    for (let i: number = 0; i < count; i++) {
        if (first !== i && isKnown(relation, first, i)) return -1;
        if (first !== i && isKnown(relation, i, first) === false) return -1;
    };
    return first;
}

// Testing code.
function main19() {
    let arr: Array<Array<number>> = [[1, 0, 1, 1, 0], [1, 0, 0, 1, 0], [0, 0, 1, 1, 1], [0, 0, 0, 0, 0], [1, 1, 0, 1, 1]];
    console.info("Celebrity : " + findCelebrity(arr, 5));
    console.info("Celebrity : " + findCelebrity2(arr, 5));
}

function IsMinHeap(arr: Array<number>, size: number): number {
    for (let i: number = 0; i <= ((size - 2) / 2 | 0); i++) {
        if (2 * i + 1 < size) {
            if (arr[i] > arr[2 * i + 1]) return 0;
        }
        if (2 * i + 2 < size) {
            if (arr[i] > arr[2 * i + 2]) return 0;
        }
    };
    return 1;
}

function IsMaxHeap(arr: Array<number>, size: number): number {
    for (let i: number = 0; i <= ((size - 2) / 2 | 0); i++) {
        if (2 * i + 1 < size) {
            if (arr[i] < arr[2 * i + 1]) return 0;
        }
        if (2 * i + 2 < size) {
            if (arr[i] < arr[2 * i + 2]) return 0;
        }
    };
    return 1;
}

main1()
main2()
main3()
main4()
main5()
main6()
main7()
main8()
main9()
main10()
main11()
main12()
main13()
main14()
main15()
main16()
main17()
main18()
main19()