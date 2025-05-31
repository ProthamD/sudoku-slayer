export type Board = number[][];

// Helper to clone a board
function cloneBoard(board: Board): Board {
  return board.map(row => [...row]);
}

// Simple backtracking solver
export function solveBoard(board: Board): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveBoard(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function isSafe(board: Board, row: number, col: number, num: number): boolean {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
}

// Generate a fully solved board
export function generateFullBoard(): Board {
  const board: Board = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillBoard(board);
  return board;
}

// Recursive fill for full board (used for puzzle generation)
function fillBoard(board: Board): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const nums = shuffle([1,2,3,4,5,6,7,8,9]);
        for (const num of nums) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Fisher-Yates shuffle
function shuffle(arr: number[]): number[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Remove numbers to create a puzzle
export function generatePuzzle(difficulty: "easy" | "medium" | "hard" = "easy"): Board {
  const board = generateFullBoard();
  let attempts = difficulty === "easy" ? 30 : difficulty === "medium" ? 40 : 50;
  while (attempts > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (board[row][col] !== 0) {
      const backup = board[row][col];
      board[row][col] = 0;

      // Check if puzzle is still uniquely solvable
      const boardCopy = cloneBoard(board);
      if (!hasUniqueSolution(boardCopy)) {
        board[row][col] = backup;
      }
      attempts--;
    }
  }
  return board;
}

// Check if a board has a unique solution (backtracking with early exit)
function hasUniqueSolution(board: Board): boolean {
  let count = 0;
  function helper(b: Board): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (b[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isSafe(b, row, col, num)) {
              b[row][col] = num;
              if (helper(b)) {
                b[row][col] = 0;
                return true;
              }
              b[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    count++;
    return count > 1;
  }
  helper(cloneBoard(board));
  return count === 1;
}

export function boardsAreEqual(a: Board, b: Board): boolean {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (a[i][j] !== b[i][j]) return false;
    }
  }
  return true;
}