import React, { useEffect, useState } from "react";

const NewSudoku = (props) => {
  const [advanced_sudokuData, setAdvanced_SudokuData] = useState([]);
  const [sudokuData, setSudokuData] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [sudokuName, setSudokuName] = useState("");
  const [showSave, setShowSave] = useState(false);
  // const [sudokuList, setSudokuList] = useState([]);
  // const [last_sudokuId, setLast_sudokuId] = useState("");
  const [sudokuCreatedData, setSudokuCreatedData] = useState({});

  useEffect(() => {
    debugger;
  }, [currentData]);

  useEffect(() => {
    if (sudokuData.length !== 0) {
      debugger;
      props.callback({
        sudokuData: sudokuData,
        sudokuName: sudokuName,
        gridMode: "create",
        showSave: showSave,
      });
    }
  }, [sudokuData]);

  useEffect(() => {
    debugger;
    setCurrentData(props.newSudokuData);
    setShowSave(props.showSave);
  }, [props.newSudokuData]);
  useEffect(() => {
    debugger;
    setShowSave(props.showSave);
  }, [props.showSave]);
  useEffect(() => {
    setSudokuName(props.sudokuName);
  }, [props.sudokuName]);

  const newSudokuPressed = () => {
    debugger;
    let sudokuData = [];
    for (let i = 0; i < 9; i++) {
      let advanced_sudokuDataLines = [];
      let sudokuLine = [];
      for (let j = 0; j < 9; j++) {
        sudokuLine.push(0);
        // advanced_sudokuDataLines.push({
        //   className: "form-control",
        //   type: "number",
        //   min: "0",
        //   max: "9",
        //   value: 0,
        //   readOnly: false,
        // });
      }
      sudokuData.push(sudokuLine);
    }
    debugger;
    //setAdvanced_SudokuData(sudokuData);
    setSudokuData(sudokuData);
    setSudokuName("New_Sudoku");
    setShowSave(true);
  };
  const saveButtonPressed = () => {
    let count = 0;
    let data_str = "";
    debugger;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (currentData[i][j] > 0) {
          count++;
          if (currentData[i][j] !== 0) {
            data_str =
              data_str +
              (i + 1).toString() +
              (j + 1).toString() +
              currentData[i][j].toString();
            if (i !== 8 || j !== 8) {
              data_str = data_str + ",";
            }
          }
        }
      }
    }
    debugger;
    let dataJson = JSON.stringify({
      sudoku_name: sudokuName,
      sudoku_data: data_str,
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
        debugger; //for check api Data
        const data = await response.json();
        setSudokuCreatedData({
          sudokuList: data["sudokuList"],
          sudokuId: data["sudokuId"],
          sudokuName: data["sudokuName"],
        });
        // setSudokuList(data["sudokuList"]);
        // setLast_sudokuId(data["sudokuId"]);
      } catch (error) {
        // enter your logic for when there is an error (ex. error toast)
        console.log("Error fetching data:", error);
      }
    };
    if (count >= 17) {
      asyncPostCall();
    } else console.log("invalid Sudoku- inputs are less than 17!");
  };

  useEffect(() => {
    props.callback_afterNewSudokuCreated(
      // sudokuList: sudokuList,
      // last_sudokuId: last_sudokuId,
      sudokuCreatedData
    );
  }, [sudokuCreatedData]);

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
      <p>
        <h3>{sudokuName}</h3>
      </p>
      <p>current data: {currentData}</p>
      {/* <p>sudoku data: {sudokuData}</p> */}
    </div>
  );
};

export default NewSudoku;
