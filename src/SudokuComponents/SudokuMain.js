import React, { useEffect, useState } from "react";
import ViewAllSudoku from "./ViewAllSudoku";
import SudokuGrid from "./SudokuGrid";
import SolveSudoku from "./SolveSudoku";
import NewSudoku from "./NewSudoku";

function SudokuMain(props) {
  const [advanced_sudokuData, setAdvanced_SudokuData] = useState([]);
  const [sudokuData, setSudokuData] = useState([]);
  const [sudokuName, setSudokuName] = useState("");
  const [sudokuSolvedData, setSudokuSolvedData] = useState([]);
  const [gridMode, setGridMode] = useState("view"); //Modes- "view","create"
  const [showSave, setShowSave] = useState(false);
  const [apiUrls, setApiUrls] = useState(props.apiUrls);

  useEffect(() => {
    //debugger;
    if (sudokuData.length !== 0) {
      setSudokuSolvedData(sudokuData);
    }
  }, [sudokuData]);

  const updateSudokuData = (params) => {
    debugger;
    setSudokuData(params["sudokuData"]);
    setSudokuName(params["sudokuName"]);
    setSudokuSolvedData(params["sudokuData"]);
    setGridMode(params["gridMode"]);
    setShowSave(params["showSave"]);
  };
  const updateSudokuSolvedData = (params) => {
    //debugger;
    setSudokuSolvedData(params["sudokuSolvedData"]);
  };
  const newSudokuPressed = (params) => {
    debugger;
    setAdvanced_SudokuData(params["advanced_sudokuData"]);
    setSudokuName("New Sudoku");
    setGridMode(params["gridMode"]);
    //setSudokuSolvedData(params["advanced_sudokuData"]);
  };
  const updateStatusfmGrid = (params) => {
    debugger;
    let sudokuData = [];
    for (let i = 0; i < 9; i++) {
      let sudokuDataLines = [];
      for (let j = 0; j < 9; j++) {
        sudokuDataLines.push(params["advanced_sudokuData"][i][j].value);
      }
      sudokuData.push(sudokuDataLines);
    }
    setSudokuData(sudokuData);
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
          gridMode={gridMode}
        />
        <div className="col-sm">
          <SolveSudoku
            callback={updateSudokuSolvedData}
            sudokuData={sudokuData}
            sudokuSolve_Url={apiUrls.sudokuSolve_Url}
          />
          <NewSudoku
            callback={newSudokuPressed}
            sudokuData={sudokuData}
            showSave={showSave}
            sudokuSave_Url={apiUrls.sudokuSave_Url}
          />
        </div>
      </div>

      <div className="border border-primary p-3 col-sm">
        <ViewAllSudoku
          callback={updateSudokuData}
          sudokuList_Url={apiUrls.sudokuList_Url}
        />
      </div>
    </div>
  );
}
export default SudokuMain;
