import React, { useState } from "react";
import { generatePuzzle, solveBoard, Board, boardsAreEqual } from "./logic/sudoku";
import SudokuBoard from "./component/SudokuBoard";
import "./App.css";

function getReadOnlyCells(puzzle: Board): boolean[][] {
  return puzzle.map(row => row.map(cell => cell !== 0));
}

const App: React.FC = () => {
  // Set up puzzle and solution
  const [puzzle, setPuzzle] = useState<Board>(() => generatePuzzle("easy"));
  const [board, setBoard] = useState<Board>(() => puzzle.map(row => [...row]));
  const [readOnlyCells, setReadOnlyCells] = useState<boolean[][]>(() => getReadOnlyCells(puzzle));
  const [solution, setSolution] = useState<Board>(() => {
    const puzzleCopy = puzzle.map(row => [...row]);
    solveBoard(puzzleCopy);
    return puzzleCopy;
  });

  // Handle cell change
  const handleCellChange = (row: number, col: number, value: number) => {
    if (readOnlyCells[row][col]) return;
    setBoard(prevBoard => {
      const copy = prevBoard.map(r => [...r]);
      copy[row][col] = value;
      return copy;
    });
  };

  // Start a new game
  const handleNewGame = () => {
    const newPuzzle = generatePuzzle("easy");
    setPuzzle(newPuzzle);
    setBoard(newPuzzle.map(row => [...row]));
    setReadOnlyCells(getReadOnlyCells(newPuzzle));
    const solutionCopy = newPuzzle.map(row => [...row]);
    solveBoard(solutionCopy);
    setSolution(solutionCopy);
  };

  const isSolved = boardsAreEqual(board, solution);

  return (
    <div className="App">
      <h1>Sudoku Game</h1>
      <SudokuBoard
        board={board}
        onCellChange={handleCellChange}
        readOnlyCells={readOnlyCells}
      />
      {isSolved && <div className="solved-message">🎉 Congratulations! You solved the puzzle!</div>}
      <button onClick={handleNewGame}>New Game</button>
    </div>
  );
};

export default App;