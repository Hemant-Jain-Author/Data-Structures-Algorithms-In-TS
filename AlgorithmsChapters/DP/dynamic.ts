//General Top-Down function to solve Min and Max problems:
function TopDownFunction(dp_array, ways, target ) {
    // Base Case
    if(target == 0)
        return 0;

    if (dp_array[target] != INVALID_VALUE)
        return dp_array[target];

    // Recursion
    for (let i = 0; i < ways.length; i++) {
        dp_array[target] = min(dp_array[target], TopDownFunction(dp_array, ways, target – ways[i]) + cost);
    }

    return dp_array[target];
}

function TopDownFunction(ways, target ) {
    dp_array = new Array(target);
    dp_array.fill(INVALID_VALUE);
    return TopDownFunction(dp_array, ways, target);
}

//General Bottom-Up function to solve Min-Max problems:
function BottomUpFunction( ways, target ) { 
    dp_array = new Array(target);
    dp_array.fill(INVALID_VALUE);
    dp_array[0] = 0; // Base value.

    for (let i = 1; i <= target; i++) {
        for (let j = 0; j < ways.length; j++) {
            // For all fusible ways.
            dp_array[i] = min(dp_array[i], dp_array[i - ways[j]] + cost);  
        }
    }

    return dp_array[target]; 
}

//////////////////////////////////

//General Top-Down function to solve Distinct-Way problems:
function TopDownFunction(dp_array, ways, target ) {
    // Base Case
    if(target == 0)
        return 0;

    if (dp_array[target] != 0)
        return dp_array[target];

    // Recursion
    for (let i = 0; i < ways.length && ways[i] <= i; i++) {
        // For all fusible ways.
        dp_array[target] += TopDownFunction(dp_array, ways, target - ways[i]);
    }
    return dp_array[target];
}

function TopDownFunction(ways, target ) {
    dp_array = new Array(target);
    return TopDownFunction(dp_array, ways, target);
}

//General Bottom-Up function to solve Distinct-Way problems:
function BottomUpFunction( ways, target ) { 
    dp_array = new Array(target);

    for (let i = 1; i <= target; i++) {
        for (let j = 0; j < ways.length && ways[i] <= i ; j++) {
            // For all fusible ways.
            dp_array[i] += dp_array[i - ways[j]];  
        }
    } 
    return dp_array[target]; 
}


////////////////////////////////////////3

//General Top-Down function to solve Merging-Interval problems:
function TopDownFunction(costs) {
    let n = costs.length;
    
    // dp_array is two dimensional array n*n
    let dp_array = Array(n).fill(0).map(() => new Array(n).fill(INVALID_VALUE));

    return TopDownFunction(dp_array, costs, 0, n-1);
}

function TopDownFunction(dp_array, costs, i, j ) {
    // Base Case
    if(i == j)
        return 0;

    if (dp_array[i][j] != INVALID_VALUE)
        return dp_array[i][j];

    // Recursion
    for (let k = i; k < j; k++) {
        dp_array[i][j] = Min (dp_array[i][j], TopDownFunction(dp_array, costs, i, k) + costs[k] +                             TopDownFunction(dp_array, costs, k+1, j));
    }

    return dp_array[i][j];
}

//General Bottom-Up function to solve Merging-Interval problems:
function BottomUpFunction(costs) { 
    let n = costs.length;

    // dp_array is two dimensional array n*n
    let dp_array = Array(n).fill(0).map(() => new Array(n).fill(INVALID_VALUE));

    for(let l = 1; l<n; l++) { // l is length of range.
        for(let i = 1, j = i+l; j<n; i++,j++) {
            for(let k = i; k<j; k++) {
                dp_array[i][j] = min(dp_array[i][j], dp_array[i][k] + costs[k] + dp_array[k+1][j]);
            }
        }
     }

     return dp_array[1][n-1];
}

///////////////////////////////////////

//Type1 : Increasing or decreasing subsequence or substring in a given string.
for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
        // incremental found pattern of sub-problem.
    }
}

//Type2 : Largest substring or subsequence in a given string.
for (let l = 1; l < n; l++) {  // Range.
    for (let i = 0, j = i+l; j < n; i++, j++) {
        // incremental calculation of sub-problem 
        // with increasing range.
    }
}

//Type3 : Comparison of two different strings.
for (let i = 1; i <= m; i++) { // First string index.
    for (let j = 1; j <= n; j++) { // Second string index.
            // Comparison of two strings.    
    }
}

/////////////////////////////////

function BottomUpFunction(costs) {
    let n = costs.length;
    // dp_array is two dimensional array n*2
    let dp_array = Array(n).fill(0).map(() => new Array(2).fill(INVALID_VALUE));

    /* Initialization of 0th state of various types.*/;
    dp_array[0][1] = /* Initialization value */;
    dp_array[0][0] = /* Initialization value */ ;

    for (let i = 1; i < n; i++) {
        dp_array[i][1] = /*Max values based on previous states.*/;
        dp_array[i][0] = /*Max values based on previous states.*/;
    }
    
    return Math.max(dp_array[n-1][1] , dp_array[n-1][0]);
}
