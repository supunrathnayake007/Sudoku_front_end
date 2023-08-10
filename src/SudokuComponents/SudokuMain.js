import React, { useEffect, useState } from "react";
import ViewAllSudoku from "./ViewAllSudoku";
import SudokuGrid from "./SudokuGrid";
import SolveSudoku from "./SolveSudoku";
import NewSudoku from "./NewSudoku";

function SudokuMain() {
  const [advanced_sudokuData, setAdvanced_SudokuData] = useState([]);
  const [sudokuData, setSudokuData] = useState([]);
  const [sudokuName, setSudokuName] = useState("");
  const [sudokuSolvedData, setSudokuSolvedData] = useState([]);

  useEffect(() => {
    //debugger;
    if (sudokuData.length !== 0) {
      setSudokuSolvedData(sudokuData);
    }
  }, [sudokuData]);

  const updateSudokuData = (params) => {
    //debugger;
    setSudokuData(params["sudokuData"]);
    setSudokuName(params["sudokuName"]);
    setSudokuSolvedData(params["sudokuData"]);
  };
  const updateSudokuSolvedData = (params) => {
    //debugger;
    setSudokuSolvedData(params["sudokuSolvedData"]);
  };
  const newSudokuPressed = (params) => {
    debugger;
    setAdvanced_SudokuData(params["advanced_sudokuData"]);
    setSudokuName("New Sudoku");
    //setSudokuSolvedData(params["advanced_sudokuData"]);
  };
  const updateStatusfmGrid = (params) => {
    debugger;
    setAdvanced_SudokuData(params["advanced_sudokuData"]);
  };

  return (
    <div className="">
      <div className="border border-primary p-3 row">
        <SudokuGrid
          callback={updateStatusfmGrid}
          sudokuData={sudokuData}
          sudokuName={sudokuName}
          sudokuSolvedData={sudokuSolvedData}
          advanced_sudokuData={advanced_sudokuData}
        />
        <div className="col-sm">
          <SolveSudoku
            callback={updateSudokuSolvedData}
            sudokuData={sudokuData}
          />
          <NewSudoku callback={newSudokuPressed} sudokuData={sudokuData} />
        </div>
      </div>

      <div className="border border-primary p-3 col-sm">
        <ViewAllSudoku callback={updateSudokuData} />
      </div>
    </div>
  );
}
export default SudokuMain;
