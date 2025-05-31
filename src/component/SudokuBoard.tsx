import React from "react";
import { Board } from "../logic/sudoku";

interface SudokuBoardProps {
  board: Board;
  onCellChange: (row: number, col: number, value: number) => void;
  readOnlyCells?: boolean[][];
}

export const SudokuBoard: React.FC<SudokuBoardProps> = ({ board, onCellChange, readOnlyCells }) => {
  return (
    <table className="sudoku-board">
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => {
              const isReadOnly = readOnlyCells ? readOnlyCells[rowIndex][colIndex] : false;
              return (
                <td key={colIndex} className="sudoku-cell">
                  <input
                    type="text"
                    maxLength={1}
                    value={cell === 0 ? "" : cell}
                    onChange={e => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val) && val >= 1 && val <= 9) {
                        onCellChange(rowIndex, colIndex, val);
                      } else if (e.target.value === "") {
                        onCellChange(rowIndex, colIndex, 0);
                      }
                    }}
                    disabled={isReadOnly}
                    className={isReadOnly ? "readonly" : ""}
                    title={`Sudoku cell at row ${rowIndex + 1}, column ${colIndex + 1}`}
                    aria-label={`Sudoku cell at row ${rowIndex + 1}, column ${colIndex + 1}`}
                    placeholder=""
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SudokuBoard;