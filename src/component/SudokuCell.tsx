import React from "react";

interface SudokuCellProps {
  value: number;
  readOnly: boolean;
  onChange: (value: number) => void;
  row: number;
  col: number;
}

const SudokuCell: React.FC<SudokuCellProps> = ({
  value,
  readOnly,
  onChange,
  row,
  col,
}) => {
  return (
    <input
      type="text"
      maxLength={1}
      value={value === 0 ? "" : value}
      onChange={e => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val >= 1 && val <= 9) {
          onChange(val);
        } else if (e.target.value === "") {
          onChange(0);
        }
      }}
      disabled={readOnly}
      className={readOnly ? "readonly" : ""}
      title={`Sudoku cell at row ${row + 1}, column ${col + 1}`}
      aria-label={`Sudoku cell at row ${row + 1}, column ${col + 1}`}
      placeholder=""
    />
  );
};

export default SudokuCell;