import React, { useState, useEffect } from "react";
import { Empty2DArray } from "./support/functions.js";
import { Fade } from "react-bootstrap";

function SudokuGrid(props) {
  // this contain object 2d array
  // 81 objects for each cell in the grid
  const [developerInputs, setDeveloperInputs] = useState("");
  const [sudokuData, setSudokuData] = useState([]);
  const [solved_sudokuData, setSolved_sudokuData] = useState([]);
  const [advanced_sudokuData, setAdvanced_SudokuData] = useState([]);
  const [sudokuName, setSudokuName] = useState("");
  const [gridMode, setGridMode] = useState("view"); //Modes- "view","create"
  //debugger;

  // sudokuData and solved_sudokuData states update from props
  useEffect(() => {
    if (props.sudokuSolvedData.length !== 0) {
      debugger;
      let sudoku_data = [];
      let sudoku_solvedData = [];
      for (let i = 0; i < 9; i++) {
        let sudoku_dataLines = [];
        let sudoku_solvedDataLines = [];
        for (let j = 0; j < 9; j++) {
          sudoku_solvedDataLines.push(props.sudokuSolvedData[i][j]);
          sudoku_dataLines.push(props.sudokuData[i][j]);
        }
        sudoku_solvedData.push(sudoku_solvedDataLines);
        sudoku_data.push(sudoku_dataLines);
      }
      debugger;
      if (gridMode === "view") {
        setSolved_sudokuData(sudoku_solvedData);
      }

      setSudokuData(sudoku_data);
    }
  }, [props.sudokuSolvedData]);

  useEffect(() => {
    setSudokuData(props.sudokuData);
  }, [props.sudokuData]);

  useEffect(() => {
    setGridMode(props.gridMode);
  }, [props.gridMode]);

  useEffect(() => {
    if (gridMode === "create") {
      debugger;
      let sudoku_data = developerInputs.split("");
      let data = Empty2DArray();
      if (sudoku_data.length > 1) {
        if (sudoku_data.length % 3 === 0) {
          for (let i = 0; i < sudoku_data.length; i = i + 3) {
            if (
              Number(sudoku_data[i]) !== 0 &&
              Number(sudoku_data[i + 1] !== 0)
            ) {
              data[Number(sudoku_data[i]) - 1][Number(sudoku_data[i + 1]) - 1] =
                Number(sudoku_data[i + 2]);
            }
          }
          setSudokuData(data);
          setSolved_sudokuData(data);
        }
      }
    }
  }, [developerInputs]);

  //data populated to "advanced_sudokuData" from Props (includes <input> data)
  useEffect(() => {
    if (sudokuData !== null) {
      if (sudokuData.length !== 0) {
        debugger;
        let sudoku_Data = [];
        let developerInputData = "";
        for (let i = 0; i < 9; i++) {
          let advanced_sudokuDataLines = [];
          for (let j = 0; j < 9; j++) {
            let className = "";
            let value = 0;
            let readOnly = false;
            //debugger;
            if (sudokuData[i][j] === 0) {
              if (solved_sudokuData[i][j] === 0) {
                className = "form-control";
                value = sudokuData[i][j];
              } else {
                value = solved_sudokuData[i][j];
                className = "form-control bg-info text-light";
                readOnly = true;
              }
            } else {
              if (props.gridMode === "view") {
                value = sudokuData[i][j];
                className = "form-control bg-secondary text-light";
                readOnly = true;
              } else {
                value = sudokuData[i][j]; //add for support developer inputs
                className = "form-control";
                readOnly = false;
              }
            }
            if (gridMode !== "create") {
              developerInputData =
                developerInputData +
                (i + 1).toString() +
                (j + 1).toString() +
                value.toString();
            }
            advanced_sudokuDataLines.push({
              className: className,
              type: "number",
              min: "0",
              max: "9",
              value: value,
              readOnly: readOnly,
            });
          }
          sudoku_Data.push(advanced_sudokuDataLines);
          //debugger;
        }
        debugger;

        setAdvanced_SudokuData(sudoku_Data);
        setSudokuName(props.sudokuName);
        setGridMode(props.gridMode);
        if (gridMode !== "create") {
          setDeveloperInputs(developerInputData);
        }
        if (gridMode === "create") {
          props.callback({ newSudokuData: sudokuData });
        }
      }
    }
  }, [sudokuData, solved_sudokuData]);

  const inputOnChange = (value, i, j) => {
    debugger;
    // let sudokuData = [...advanced_sudokuData];
    // sudokuData[i][j].value = Number(value);
    // setAdvanced_SudokuData(sudokuData);
    // if (gridMode === "create") {
    //   props.callback({ advanced_sudokuData: sudokuData });
    // }

    let sudoku_data = [...sudokuData];
    sudoku_data[i][j] = Number(value);
    setSudokuData(sudoku_data);
    setSolved_sudokuData(sudoku_data);
    // if (gridMode === "create") {
    //   props.callback({ newSudokuData: sudoku_data });
    // }
  };
  const nameOnChange = (value) => {
    debugger;
    setSudokuName(value);
    props.callbackName({ sudokuName: value });
  };

  const developerInputsOnChange = (value) => {
    setDeveloperInputs(value);
  };

  return (
    <div className="col-sm">
      <div>
        {gridMode === "create" ? (
          <div>
            <lable for="sudokuName">Name Sukodu </lable>
            <input
              id="sudokuName"
              className=""
              value={sudokuName}
              onChange={(e) => {
                nameOnChange(e.target.value);
              }}
            />
            {props.developerMode ? (
              <input
                className="form-control"
                type="number"
                value={developerInputs}
                onChange={(e) => {
                  developerInputsOnChange(e.target.value);
                }}
              ></input>
            ) : (
              ""
            )}
          </div>
        ) : (
          <h1>{sudokuName}</h1>
        )}
      </div>

      <table className="table table-bordered text-center">
        {advanced_sudokuData.map((sudokuRow, index) => (
          <tr key={index}>
            {sudokuRow.map((cell, cellIndex) => (
              <td key={cellIndex}>
                <input
                  className={cell.className}
                  type={cell.type}
                  min={cell.min}
                  max={cell.max}
                  readOnly={cell.readOnly}
                  value={cell.value}
                  onChange={(e) => {
                    inputOnChange(e.target.value, index, cellIndex);
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </table>
      <p>sudoku data: {sudokuData}</p>
    </div>
  );
}

export default SudokuGrid;
