const INF = Number.MAX_SAFE_INTEGER;

function floydWarshall(graph: number[][], V: number): void {
  const dist: number[][] = [];

  for (let i = 0; i < V; i++) {
    dist[i] = [];
    for (let j = 0; j < V; j++) {
      dist[i][j] = graph[i][j];
    }
  }

  // Pick intermediate vertices.
  for (let k = 0; k < V; k++) {
    // Pick source vertices one by one.
    for (let i = 0; i < V; i++) {
      // Pick destination vertices.
      for (let j = 0; j < V; j++) {
        // If we have shorter path from i to j via k,
        // then update dist[i][j].
        if (
          dist[i][k] !== INF &&
          dist[k][j] !== INF &&
          dist[i][k] + dist[k][j] < dist[i][j]
        ) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  // Print the shortest distance matrix.
  printSolution(dist, V);
}

function printSolution(dist: number[][], V: number): void {
  for (let i = 0; i < V; i++) {
    let row = "";
    for (let j = 0; j < V; j++) {
      if (dist[i][j] === INF) {
        row += "INF ";
      } else {
        row += dist[i][j] + " ";
      }
    }
    console.log(row);
  }
}

const graph: number[][] = [
  [0, 2, 4, INF, INF, INF, INF],
  [2, 0, 4, 1, INF, INF, INF],
  [4, 4, 0, 2, 8, 4, INF],
  [INF, 1, 2, 0, 3, INF, 6],
  [INF, INF, 6, 4, 0, 3, 1],
  [INF, INF, 4, INF, 4, 0, 2],
  [INF, INF, INF, 4, 2, 3, 0],
];

floydWarshall(graph, 7);


/*
0 2 4 3 6 8 7 
2 0 3 1 4 7 5 
4 3 0 2 5 4 6 
3 1 2 0 3 6 4 
7 5 6 4 0 3 1 
8 7 4 6 4 0 2 
7 5 6 4 2 3 0 
*/