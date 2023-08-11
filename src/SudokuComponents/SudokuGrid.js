import React, { useState, useEffect } from "react";
import { Fade } from "react-bootstrap";

function SudokuGrid(props) {
  // this contain object 2d array
  // 81 objects for each cell in the grid
  const [advanced_sudokuData, setAdvanced_SudokuData] = useState([]);
  const [sudokuName, setSudokuName] = useState("");
  const [gridMode, setGridMode] = useState("view"); //Modes- "view","create"
  //debugger;

  //data populated to "advanced_sudokuData" from Props (includes <input> data)
  useEffect(() => {
    if (props.sudokuData.length !== 0) {
      debugger;
      let sudokuData = [];
      for (let i = 0; i < 9; i++) {
        let advanced_sudokuDataLines = [];
        for (let j = 0; j < 9; j++) {
          let className = "";
          let value = 0;
          let readOnly = false;
          //debugger;
          if (props.sudokuData[i][j] === 0) {
            if (props.sudokuSolvedData[i][j] === 0) {
              className = "form-control";
              value = props.sudokuData[i][j];
            } else {
              value = props.sudokuSolvedData[i][j];
              className = "form-control bg-info text-light";
              readOnly = true;
            }
          } else {
            if (gridMode === "view") {
              value = props.sudokuData[i][j];
              className = "form-control bg-secondary text-light";
              readOnly = true;
            } else {
              className = "form-control";
              readOnly = false;
            }
          }

          advanced_sudokuDataLines.push(
            {
              className: className,
              type: "number",
              min: "0",
              max: "9",
              value: value,
              readOnly: readOnly,
            }

            // <input
            //   className={className}
            //   type="number"
            //   min="0"
            //   value={sudokuValues[i][j]}
            //   onChange={(e) => inputOnChange(e.target.value, i, j)}
            // ></input>
          );
        }
        sudokuData.push(advanced_sudokuDataLines);
        //debugger;
      }
      //debugger;
      setAdvanced_SudokuData(sudokuData);
      setSudokuName(props.sudokuName);
    }
  }, [props.sudokuData, props.sudokuSolvedData]);

  useEffect(() => {
    debugger;
    setAdvanced_SudokuData(props.advanced_sudokuData);
  }, [props.advanced_sudokuData]);
  useEffect(() => {
    setGridMode(props.gridMode);
  }, [props.gridMode]);

  const inputOnChange = (value, i, j) => {
    debugger;
    let sudokuData = [...advanced_sudokuData];
    sudokuData[i][j].value = Number(value);
    setAdvanced_SudokuData(sudokuData);
    if (gridMode === "create") {
      props.callback({ advanced_sudokuData: sudokuData });
    }
  };

  return (
    <div className="col-sm">
      <div>
        {sudokuName === "New Sudoku" ? (
          <div>
            <lable for="sudokuName">Name Sukodu </lable>
            <input id="sudokuName" className="" value={sudokuName} />
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
    </div>
  );
}

export default SudokuGrid;
