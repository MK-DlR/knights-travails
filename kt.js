// kt.js

// get all valid moves from a position
function getValidMoves(startPosition) {
  const [row, col] = startPosition;

  // all possible knight moves
  const moves = [
    // up 2, left/right 1
    [-2, -1],
    [-2, 1],
    // up 1, left/right 2
    [-1, -2],
    [-1, 2],
    // down 1, left/right 2
    [1, -2],
    [1, 2],
    // down 2, left/right 1
    [2, -1],
    [2, 1],
  ];

  const validMoves = [];

  for (let move of moves) {
    // row change
    const newRow = row + move[0];
    // column change
    const newCol = col + move[1];

    // check if new position is within board (0 - 7)
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      // if position is valid, add to array of valid moves
      validMoves.push([newRow, newCol]);
    }
  }

  return validMoves;
}

function knightMoves(startPosition, endPosition) {
  const [row, col] = startPosition;
  const rows = 8;
  const columns = 8;
  // create 2D array to hold visited positions
  const visited = Array.from({ length: rows }, () =>
    new Array(columns).fill(0)
  );
  // create 2D array for hold parent steps taken
  const parents = Array.from({ length: rows }, () =>
    new Array(columns).fill(null)
  );

  // queue
  let q = [];

  // mark starting cell as visited
  // and push it into the queue
  q.push([row, col]);
  visited[row][col] = true;

  // iterate while queue is not empty
  while (q.length != 0) {
    // get current position from queue and store result
    let currentPosition = q.shift();
    // check if current position is same as endPosition
    if (
      currentPosition[0] === endPosition[0] &&
      currentPosition[1] === endPosition[1]
    ) {
      // return path taken
      let path = [];
      let current = currentPosition;
      while (parents[current[0]][current[1]] != null) {
        path.push(current);
        current = parents[current[0]][current[1]];
      }
      path.push(current);
      const reversedPath = path.reverse();
      return reversedPath;
    }
    // get all valid moves from current position
    let validMoves = getValidMoves(currentPosition);

    for (move of validMoves) {
      // extract row and column from move
      const [moveRow, moveCol] = move;
      // check if visited
      // if not visited
      if (!visited[moveRow][moveCol]) {
        // mark as visited
        visited[moveRow][moveCol] = true;
        // and add to queue
        q.push(move);
        // set parent to current position
        parents[moveRow][moveCol] = currentPosition;
      }
    }
  }
  console.log("No path found");
  return false;
}

// test
/*
 * console.log("Knight at [0,0] can move to:", getValidMoves([0, 0]));
 * console.log("Knight at [4,4] can move to:", getValidMoves([4, 4]));
 * console.log("Knight at [7,7] can move to:", getValidMoves([7, 7]));
 */
console.log(knightMoves([0, 0], [1, 2])); // [[0, 0], [1, 2]]
console.log(knightMoves([0, 0], [0, 0])); // [[0, 0]]
console.log(knightMoves([0, 0], [7, 7])); // 6 move path
