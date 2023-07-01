function matchExpUtil(exp : string[], str : string[], i : number, j : number) : boolean {
    if(i === exp.length && j === str.length) {
        return true;
    }
    if((i === exp.length && j !== str.length) || (i !== exp.length && j === str.length)) {
        return false;
    }
    if((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(exp[i]) == '?'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(exp[i]) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(str[j])) {
        return matchExpUtil(exp, str, i + 1, j + 1);
    }
    if((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(exp[i]) == '*'.charCodeAt(0)) {
        return matchExpUtil(exp, str, i + 1, j) || matchExpUtil(exp, str, i, j + 1) || matchExpUtil(exp, str, i + 1, j + 1);
    }
    return false;
}

function matchExp(exp : string, str : string) : boolean {
    return matchExpUtil(/* toCharArray */(exp).split(''), /* toCharArray */(str).split(''), 0, 0);
}

// Testing code.
function main1() {
    console.info(matchExp("*llo,?World?", "Hello, World!"));
}

function match(src : string, ptn : string) : boolean {
    let source : string[] = /* toCharArray */(src).split('');
    let pattern : string[] = /* toCharArray */(ptn).split('');
    let iSource : number = 0;
    let iPattern : number = 0;
    let sourceLen : number = source.length;
    let patternLen : number = pattern.length;
    for(iSource = 0; iSource < sourceLen; iSource++) {
        if((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(source[iSource]) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(pattern[iPattern])) {
            iPattern++;
        }
        if(iPattern === patternLen) {
            return true;
        }
    };
    return false;
}

// Testing code.
function main2() {
    console.info(match("harrypottermustnotgotoschool", "pottergo"));
}

function myStrdup(src : string[]) : string[] {
    let index : number = 0;
    let dst : string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(src.length);
    for(let index8379=0; index8379 < src.length; index8379++) {
        let ch = src[index8379];
        {
            dst[index] = ch;
        }
    }
    return dst;
}

function isPrime(n : number) : boolean {
    let answer : boolean = (n > 1)?true:false;
    for(let i : number = 2; i * i < n; ++i) {
        if(n % i === 0) {
            answer = false;
            break;
        }
    };
    return answer;
}

// Testing code.
function main3() {
    console.info("Prime numbers under 100 :: ");
    for(let i : number = 0; i < 100; i++) {if(isPrime(i)) console.info(i + " ");;}
    console.info();
}

function myAtoi(str : string) : number {
    let value : number = 0;
    let size : number = str.length;
    for(let i : number = 0; i < size; i++) {
        let ch : string = str.charAt(i);
        value = (value << 3) + (value << 1) + ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(ch) - '0'.charCodeAt(0));
    };
    return value;
}

// Testing code.
function main4() {
    console.info(myAtoi("1000"));
}

function isUniqueChar(str : string) : boolean {
    let bitarr :  Array<number> = (s => { let a=[]; while(s-->0) a.push(0); return a; })(26);
    let index : number;
    for(let i : number = 0; i < 26; i++) {
        bitarr[i] = 0;
    };
    let size : number = str.length;
    for(let i : number = 0; i < size; i++) {
        let c : string = str.charAt(i);
        if('A'.charCodeAt(0) <= (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) && 'Z'.charCodeAt(0) >= (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c)) {
            index = ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) - 'A'.charCodeAt(0));
        } else if('a'.charCodeAt(0) <= (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) && 'z'.charCodeAt(0) >= (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c)) {
            index = ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) - 'a'.charCodeAt(0));
        } else {
            console.info("Unknown Char!\n");
            return false;
        }
        if(bitarr[index] !== 0) {
            console.info("Duplicate detected!");
            return false;
        }
        bitarr[index] += 1;
    };
    console.info("No duplicate detected!");
    return true;
}

// Testing code.
function main5() {
    console.info(isUniqueChar("aple"));
    console.info(isUniqueChar("apple"));
}

function ToUpper(s : string) : string {
    if((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s) >= 97 && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s) <= (97 + 25)) {
        s = String.fromCharCode(((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s) - 32));
    }
    return s;
}

function ToLower(s : string) : string {
    if((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s) >= 65 && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s) <= (65 + 25)) {
        s = String.fromCharCode(((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s) + 32));
    }
    return s;
}

function LowerUpper(s : string) : string {
    if((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s) >= 97 && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s) <= (97 + 25)) {
        s = String.fromCharCode(((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s) - 32));
    } else if((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s) >= 65 && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s) <= (65 + 25)) {
        s = String.fromCharCode(((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s) + 32));
    }
    return s;
}

// Testing code.
function main6() {
    console.info(ToLower('A'));
    console.info(ToUpper('a'));
    console.info(LowerUpper('s'));
    console.info(LowerUpper('S'));
}

function isPermutation(s1 : string, s2 : string) : boolean {
    let count :  Array<number> = (s => { let a=[]; while(s-->0) a.push(0); return a; })(256);
    let length : number = s1.length;
    if(s2.length !== length) {
        console.info("is permutation return false\n");
        return false;
    }
    for(let i : number = 0; i < 256; i++) {
        count[i] = 0;
    };
    for(let i : number = 0; i < length; i++) {
        let ch : string = s1.charAt(i);
        count[(ch).charCodeAt(0)]++;
        ch = s2.charAt(i);
        count[(ch).charCodeAt(0)]--;
    };
    for(let i : number = 0; i < length; i++) {
        if(count[i] !== 0) {
            console.info("is permutation return false\n");
            return false;
        }
    };
    console.info("is permutation return true\n");
    return true;
}

// Testing code.
function main7() {
    console.info(isPermutation("apple", "plepa"));
}

function isPalindrome(str : string) : boolean {
    let i : number = 0;
    let j : number = str.length - 1;
    while((i < j && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(str.charAt(i)) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(str.charAt(j)))) {
        i++;
        j--;
    };
    if(i < j) {
        console.info("String is not a Palindrome");
        return false;
    } else {
        console.info("String is a Palindrome");
        return true;
    }
}

// Testing code.
function main8() {
    console.info(isPalindrome("hello"));
    console.info(isPalindrome("eoloe"));
}

function pow(x : number, n : number) : number {
    let value : number;
    if(n === 0) {
        return (1);
    } else if(n % 2 === 0) {
        value = pow(x, (n / 2|0));
        return (value * value);
    } else {
        value = pow(x, (n / 2|0));
        return (x * value * value);
    }
}

// Testing code.
function main9() {
    console.info(pow(5, 2));
}

function myStrcmp(a : string, b : string) : number {
    let index : number = 0;
    let len1 : number = a.length;
    let len2 : number = b.length;
    let minlen : number = len1;
    if(len1 > len2) {
        minlen = len2;
    }
    while((index < minlen && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(a.charAt(index)) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(b.charAt(index)))) {
        index++;
    };
    if(index === len1 && index === len2) {
        return 0;
    } else if(len1 === index) {
        return -1;
    } else if(len2 === index) {
        return 1;
    } else {
        return (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(a.charAt(index)) - (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(b.charAt(index));
    }
}

// Testing code.
function main10() {
    console.info(myStrcmp("abs", "abs"));
}

function reverseString(str : string) : string {
    let a : string[] = /* toCharArray */(str).split('');
    reverseStringUtil$char_A(a);
    let expn : string = a.join('');
    return expn;
}

function reverseStringUtil$char_A(a : string[]) {
    let lower : number = 0;
    let upper : number = a.length - 1;
    let tempChar : string;
    while((lower < upper)) {
        tempChar = a[lower];
        a[lower] = a[upper];
        a[upper] = tempChar;
        lower++;
        upper--;
    };
}

function reverseStringUtil$char_A$int$int(a : string[], lower : number, upper : number) {
    let tempChar : string;
    while((lower < upper)) {
        tempChar = a[lower];
        a[lower] = a[upper];
        a[upper] = tempChar;
        lower++;
        upper--;
    };
}

function reverseStringUtil(a? : any, lower? : any, upper? : any) : any {
    if(((a != null && a instanceof <any>Array && (a.length==0 || a[0] == null ||(typeof a[0] === 'string'))) || a === null) && ((typeof lower === 'number') || lower === null) && ((typeof upper === 'number') || upper === null)) {
        return <any>reverseStringUtil$char_A$int$int(a, lower, upper);
    } else if(((a != null && a instanceof <any>Array && (a.length==0 || a[0] == null ||(typeof a[0] === 'string'))) || a === null) && lower === undefined && upper === undefined) {
        return <any>reverseStringUtil$char_A(a);
    } else throw new Error('invalid overload');
}

function reverseWords(str : string) : string {
    let a : string[] = /* toCharArray */(str).split('');
    let length : number = a.length;
    let lower : number = 0;
    let upper : number = -1;
    for(let i : number = 0; i <= length; i++) {
        if(i === length || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(a[i]) == ' '.charCodeAt(0)) {
            reverseStringUtil$char_A$int$int(a, lower, upper);
            lower = i + 1;
            upper = i;
        } else {
            upper++;
        }
    };
    reverseStringUtil$char_A$int$int(a, 0, length - 1);
    let expn : string = a.join('');
    return expn;
}

// Testing code.
function main11() {
    console.info(reverseString("apple"));
    console.info(reverseWords("hello world"));
}

function printAnagram(str : string) {
    let a : string[] = (str).split('');/* toCharArray */
    let n : number = a.length;
    printAnagramUtil(a, n, n);
}

function printAnagramUtil(a : string[], max : number, n : number) {
    if(max === 1) {
        console.info(a);
    }
    let temp : string;
    for(let i : number = -1; i < max - 1; i++) {
        if(i !== -1) {
            temp = a[i];
            a[i] = a[max - 1];
            a[max - 1] = temp;
        }
        printAnagramUtil(a, max - 1, n);
        if(i !== -1) {
            temp = a[i];
            a[i] = a[max - 1];
            a[max - 1] = temp;
        }
    };
}

function printAnagram2(a? : any, max? : any, n? : any) : any {
    if(((a != null && a instanceof <any>Array && (a.length==0 || a[0] == null ||(typeof a[0] === 'string'))) || a === null) && ((typeof max === 'number') || max === null) && ((typeof n === 'number') || n === null)) {
        return <any>printAnagramUtil(a, max, n);
    } else if(((typeof a === 'string') || a === null) && max === undefined && n === undefined) {
        return <any>printAnagram(a);
    } else throw new Error('invalid overload');
}

// Testing code.
function main12() {
    printAnagram("123");
}

function shuffle(str : string) {
    let ar : string[] = /* toCharArray */(str).split('');
    let n : number = (ar.length / 2|0);
    let count : number = 0;
    let k : number = 1;
    let temp : string = '\u0000';
    for(let i : number = 1; i < n; i = i + 2) {
        temp = ar[i];
        k = i;
        do {
            k = (2 * k) % (2 * n - 1);
            temp = String.fromCharCode((temp).charCodeAt(0) ^ (ar[k] = String.fromCharCode((ar[k]).charCodeAt(0) ^ (temp = String.fromCharCode((temp).charCodeAt(0) ^ (ar[k]).charCodeAt(0))).charCodeAt(0))).charCodeAt(0));
            count++;
        } while((i !== k));
        if(count === (2 * n - 2)) {
            break;
        }
    };
}

// Testing code.
function main13() {
    shuffle("ABCDE12345");
}

function addBinary(firstStr : string, secondStr : string) : string[] {
    let first : string[] = /* toCharArray */(firstStr).split('');
    let second : string[] = /* toCharArray */(secondStr).split('');
    let size1 : number = first.length;
    let size2 : number = second.length;
    let totalIndex : number;
    let total : string[];
    if(size1 > size2) {
        total = (s => { let a=[]; while(s-->0) a.push(null); return a; })(size1 + 2);
        totalIndex = size1;
    } else {
        total = (s => { let a=[]; while(s-->0) a.push(null); return a; })(size2 + 2);
        totalIndex = size2;
    }
    total[totalIndex + 1] = '\u0000';
    let carry : number = 0;
    size1--;
    size2--;
    while((size1 >= 0 || size2 >= 0)) {
        let firstValue : number = (size1 < 0)?0:(c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(first[size1]) - '0'.charCodeAt(0);
        let secondValue : number = (size2 < 0)?0:(c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(second[size2]) - '0'.charCodeAt(0);
        let sum : number = firstValue + secondValue + carry;
        carry = sum >> 1;
        sum = sum & 1;
        total[totalIndex] = (sum === 0)?'0':'1';
        totalIndex--;
        size1--;
        size2--;
    };
    total[totalIndex] = (carry === 0)?'0':'1';
    return total;
}

// Testing code.
function main14() {
    console.info(addBinary("1000", "11111111"));
}

main1();
main2();
main3();
main4();
main5();
main6();
main7();
main8();
main9();
main10();
main11();
main12();
main13();
main14();
