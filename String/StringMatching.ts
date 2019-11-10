function bruteForceSearch$java_lang_String$java_lang_String(text : string, pattern : string) : number {
    return this.bruteForceSearch$char_A$char_A(/* toCharArray */(text).split(''), /* toCharArray */(pattern).split(''));
}

function bruteForceSearch(text? : any, pattern? : any) : any {
    if(((typeof text === 'string') || text === null) && ((typeof pattern === 'string') || pattern === null)) {
        return <any>this.bruteForceSearch$java_lang_String$java_lang_String(text, pattern);
    } else if(((text != null && text instanceof <any>Array && (text.length==0 || text[0] == null ||(typeof text[0] === 'string'))) || text === null) && ((pattern != null && pattern instanceof <any>Array && (pattern.length==0 || pattern[0] == null ||(typeof pattern[0] === 'string'))) || pattern === null)) {
        return <any>this.bruteForceSearch$char_A$char_A(text, pattern);
    } else throw new Error('invalid overload');
}

function bruteForceSearch$char_A$char_A(text : string[], pattern : string[]) : number {
    let i : number = 0;
    let j : number = 0;
    let n : number = text.length;
    let m : number = pattern.length;
    while((i <= n - m)) {{
        j = 0;
        while((j < m && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(pattern[j]) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text[i + j]))) {{
            j++;
        }};
        if(j === m) {
            return (i);
        }
        i++;
    }};
    return -1;
}

function robinKarp$java_lang_String$java_lang_String(text : string, pattern : string) : number {
    return this.robinKarp$char_A$char_A(/* toCharArray */(text).split(''), /* toCharArray */(pattern).split(''));
}

function robinKarp(text? : any, pattern? : any) : any {
    if(((typeof text === 'string') || text === null) && ((typeof pattern === 'string') || pattern === null)) {
        return <any>this.robinKarp$java_lang_String$java_lang_String(text, pattern);
    } else if(((text != null && text instanceof <any>Array && (text.length==0 || text[0] == null ||(typeof text[0] === 'string'))) || text === null) && ((pattern != null && pattern instanceof <any>Array && (pattern.length==0 || pattern[0] == null ||(typeof pattern[0] === 'string'))) || pattern === null)) {
        return <any>this.robinKarp$char_A$char_A(text, pattern);
    } else throw new Error('invalid overload');
}

function robinKarp$char_A$char_A(text : string[], pattern : string[]) : number {
    let n : number = text.length;
    let m : number = pattern.length;
    let i : number;
    let j : number;
    let prime : number = 101;
    let powm : number = 1;
    let TextHash : number = 0;
    let PatternHash : number = 0;
    if(m === 0 || m > n) {
        return -1;
    }
    for(i = 0; i < m - 1; i++) {{
        powm = (powm << 1) % prime;
    };}
    for(i = 0; i < m; i++) {{
        PatternHash = ((PatternHash << 1) + (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(pattern[i])) % prime;
        TextHash = ((TextHash << 1) + (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text[i])) % prime;
    };}
    for(i = 0; i <= (n - m); i++) {{
        if(TextHash === PatternHash) {
            for(j = 0; j < m; j++) {{
                if((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text[i + j]) != (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(pattern[j])) {
                    break;
                }
            };}
            if(j === m) return i;
        }
        TextHash = (((TextHash - (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text[i]) * powm) << 1) + (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text[i + m])) % prime;
        if(TextHash < 0) {
            TextHash = (TextHash + prime);
        }
    };}
    return -1;
}

function KMPPreprocess(pattern : string[], ShiftArr : number[]) {
    let m : number = pattern.length;
    let i : number = 0;
    let j : number = -1;
    ShiftArr[i] = -1;
    while((i < m)) {{
        while((j >= 0 && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(pattern[i]) != (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(pattern[j]))) {{
            j = ShiftArr[j];
        }};
        i++;
        j++;
        ShiftArr[i] = j;
    }};
}

function KMP$java_lang_String$java_lang_String(text : string, pattern : string) : number {
    return this.KMP$char_A$char_A(/* toCharArray */(text).split(''), /* toCharArray */(pattern).split(''));
}

function KMP(text? : any, pattern? : any) : any {
    if(((typeof text === 'string') || text === null) && ((typeof pattern === 'string') || pattern === null)) {
        return <any>this.KMP$java_lang_String$java_lang_String(text, pattern);
    } else if(((text != null && text instanceof <any>Array && (text.length==0 || text[0] == null ||(typeof text[0] === 'string'))) || text === null) && ((pattern != null && pattern instanceof <any>Array && (pattern.length==0 || pattern[0] == null ||(typeof pattern[0] === 'string'))) || pattern === null)) {
        return <any>this.KMP$char_A$char_A(text, pattern);
    } else throw new Error('invalid overload');
}

function KMP$char_A$char_A(text : string[], pattern : string[]) : number {
    let i : number = 0;
    let j : number = 0;
    let n : number = text.length;
    let m : number = pattern.length;
    let ShiftArr : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(m + 1);
    this.KMPPreprocess(pattern, ShiftArr);
    while((i < n)) {{
        while((j >= 0 && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text[i]) != (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(pattern[j]))) {j = ShiftArr[j]};
        i++;
        j++;
        if(j === m) {
            return (i - m);
        }
    }};
    return -1;
}

function KMPFindCount(text : string[], pattern : string[]) : number {
    let i : number = 0;
    let j : number = 0;
    let count : number = 0;
    let n : number = text.length;
    let m : number = pattern.length;
    let ShiftArr : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(m + 1);
    this.KMPPreprocess(pattern, ShiftArr);
    while((i < n)) {{
        while((j >= 0 && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text[i]) != (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(pattern[j]))) {{
            j = ShiftArr[j];
        }};
        i++;
        j++;
        if(j === m) {
            count++;
            j = ShiftArr[j];
        }
    }};
    return count;
}

function main() {
    let st1 : string = "hello, world!";
    let st2 : string = "world";
    console.info("BruteForceSearch return : " + bruteForceSearch$java_lang_String$java_lang_String(st1, st2));
    console.info("RobinKarp return : " + robinKarp$java_lang_String$java_lang_String(st1, st2));
    console.info("KMP return : " + KMP$java_lang_String$java_lang_String(st1, st2));
}

main();