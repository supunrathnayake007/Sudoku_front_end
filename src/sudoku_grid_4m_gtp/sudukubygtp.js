import React, { useState } from "react";

const SudokuGrid = () => {
  // Initialize a 9x9 grid with empty cells
  const initialGrid = Array(9).fill(Array(9).fill(0));
  const [grid, setGrid] = useState(initialGrid);

  // Function to handle cell value changes
  const handleChange = (row, col, event) => {
    const value = parseInt(event.target.value) || 0;
    const newGrid = [...grid];
    newGrid[row][col] = value;
    setGrid(newGrid);
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">Sudoku Grid</h2>
      <div className="row justify-content-center mt-4">
        <div className="col-6">
          <table className="table table-bordered text-center">
            <tbody>
              {grid.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type="number"
                        min="0"
                        max="9"
                        value={cell === 0 ? "" : cell}
                        onChange={(event) =>
                          handleChange(rowIndex, colIndex, event)
                        }
                        className="form-control"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SudokuGrid;
