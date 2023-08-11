import React, { useEffect, useState } from "react";

const NewSudoku = (props) => {
  const [advanced_sudokuData, setAdvanced_SudokuData] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [sudokuName, setSudokuName] = useState("");
  const [showSave, setShowSave] = useState(false);

  useEffect(() => {
    debugger;
    props.callback({
      advanced_sudokuData: advanced_sudokuData,
      gridMode: "create",
    });
  }, [advanced_sudokuData]);

  useEffect(() => {
    debugger;
    setCurrentData(props.sudokuData);
    setShowSave(props.showSave);
  }, [props.sudokuData]);
  useEffect(() => {
    debugger;
    setShowSave(props.showSave);
  }, [props.showSave]);

  const newSudokuPressed = () => {
    debugger;
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
    setShowSave(true);
  };
  const saveButtonPressed = () => {
    let dataJson = JSON.stringify({
      sudoku_name: sudokuName,
      sudoku_data: currentData,
    });
    const asyncPostCall = async () => {
      try {
        const response = await fetch(props.sudokuSave_Url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: dataJson,
        });
        const data = await response.json();
        //setSudokuSolvedData(data);
      } catch (error) {
        // enter your logic for when there is an error (ex. error toast)
        console.log("Error fetching data:", error);
      }
    };
    asyncPostCall();
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
      {showSave ? (
        <button
          type="button"
          className="btn btn-warning m-1"
          onClick={saveButtonPressed}
        >
          Save
        </button>
      ) : (
        ""
      )}
      <p>sudoku data: {currentData}</p>
    </div>
  );
};

export default NewSudoku;
