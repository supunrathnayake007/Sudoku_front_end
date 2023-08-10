import React, { useEffect, useState } from "react";

const NewSudoku = (props) => {
  const [advanced_sudokuData, setAdvanced_SudokuData] = useState([]);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    let sudokuData = [];
    for (let i = 0; i < 9; i++) {
      let advanced_sudokuDataLines = [];
      for (let j = 0; j < 9; j++) {
        advanced_sudokuDataLines.push({
          className: "form-control",
          type: "number",
          min: "0",
          max: "9",
          value: 0,
          readOnly: false,
        });
      }
      sudokuData.push(advanced_sudokuDataLines);
    }
    setAdvanced_SudokuData(sudokuData);
  }, []);

  useEffect(() => {
    debugger;
    setCurrentData(props.sudokuData);
  }, [props.sudokuData]);

  const newSudokuPressed = () => {
    debugger;
    props.callback({ advanced_sudokuData: advanced_sudokuData });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary m-1"
        onClick={() => newSudokuPressed()}
      >
        NewSudoku
      </button>
      <p>sudoku data: {currentData}</p>
    </div>
  );
};

export default NewSudoku;
