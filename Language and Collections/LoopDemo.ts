function main1() {
    const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    console.log(`Sum is: ${sum}`);
}

function main2() {
    const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let sum = 0;
    let i = 0;
    while (i < numbers.length) {
        sum += numbers[i];
        i++;
    }
    console.log(`Sum is: ${sum}`);
}

main1();
main2();
