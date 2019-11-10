function isAnagram(first : string, second : string) : boolean {
    let str1 : string[] = first.split('');
    let str2 : string[] = second.split('');
    
    let size1 : number = str1.length;
    let size2 : number = str2.length;
    if(size1 !== size2) return false;
    let hm : Map<any, number> = new Map<any, number>();
    
    for(let index=0; index < str1.length; index++) {
        let ch = str1[index];
        if(hm.has(ch))
            hm.set(ch, hm.get(ch) + 1);
        else
            hm.set(ch, 1);
    }
    for(let index=0; index < str2.length; index++) {
        let ch = str2[index];
        if(hm.has(ch))
            hm.set(ch, hm.get(ch) - 1);
        else
            return false;
    }
    return true;
}

function removeDuplicate(first : string) : string {
    let str : string[]= first.split('');
    let hs : Set<any> = new Set<any>();
    let out : string = "";
    for(let index=0; index < str.length; index++) {
        let ch = str[index];
        if(hs.has(ch) == false){
            out += ch;
            hs.add(ch);
        }
    }
    return out;
}


function findMissing(arr : number[], start : number, end : number) : number {
    let hs : Set<number> = new Set<number>();
    for(let index=0; index < arr.length; index++) {
        let i = arr[index];
        hs.add(i);
    }
    for(let curr : number = start; curr <= end; curr++) {
        if(hs.has(curr) == false)
            return curr;
    };
    return 2147483647;
}

function printRepeating(arr : number[]) {
    let hs : Set<number> = new Set<number>();
    console.info("Repeating elements are:");
    for(let index=0; index < arr.length; index++) {
        let val = arr[index];
        
        if(hs.has(val)) {
            console.info(" " + val); 
        } 
        else 
            hs.add(val);
    }
}

function printFirstRepeating(arr : number[]) {
    let i : number;
    let size : number = arr.length;
    let hs : Set<any> = new Set<any>();
    let firstRepeating : number = 2147483647;
    for(i = size - 1; i >= 0; i--) {
        if(hs.has(arr[i])) {
            firstRepeating = arr[i];
        }
        hs.add(arr[i]);
    };
    console.info("First Repeating number is : " + firstRepeating);
}

function hornerHash(key : string[], tableSize : number) : number {
    let size : number = key.length;
    let h : number = 0;
    let i : number;
    for(i = 0; i < size; i++) {
        h = (32 * h + ((+key[i]) % tableSize));
    };
    return h;
}


function main() {
    let first : string = "hello";
    let second : string = "elloh";
    let third : string = "world";
    console.info("isAnagram : " + isAnagram(first, second));
    console.info("isAnagram : " + isAnagram(first, third));
    first = removeDuplicate(first);
    console.info(first);
    let arr : number[] = [1, 2, 3, 5, 6, 7, 8, 9, 10];
    console.info(findMissing(arr, 1, 10));
    let arr1 : number[] = [1, 2, 3, 4, 4, 5, 6, 7, 8, 9, 1];
    printRepeating(arr1);
    printFirstRepeating(arr1);
}

main();
