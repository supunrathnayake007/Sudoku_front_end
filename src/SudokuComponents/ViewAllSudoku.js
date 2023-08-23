import React, { useState, useEffect } from "react";

function ViewAllSudoku(props) {
  //console.log("sudoku Manager here. line 23");
  const [data, setData] = useState([]); // sudoku list
  const [sudokuUrl, setSudokuUrl] = useState("");
  const [sudokuData, setSudokuData] = useState(null);
  const [sudokuName, setSudokuName] = useState("");
  const [gridMode, setGridMode] = useState("view"); //Modes- "view","create"

  //get selected sudoku data
  useEffect(() => {
    debugger;
    const fetchData = async () => {
      try {
        const response = await fetch(sudokuUrl);
        const jsonData = await response.json();
        setSudokuData(jsonData); // Update the state with the API response data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (sudokuUrl !== "") {
      fetchData();
    }
  }, [sudokuUrl]);

  //send back selected sudoku data
  useEffect(() => {
    debugger;
    if (sudokuData !== null) {
      if (gridMode === "view") {
        props.callback({ sudokuData, sudokuName, gridMode, showSave: false });
      }
    }
  }, [sudokuData]);

  //get sudoku list
  useEffect(() => {
    debugger;
    const fetchData = async () => {
      try {
        const response = await fetch(props.sudokuList_Url);
        const jsonData = await response.json();
        setData(jsonData); // Update the state with the API response data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the function to fetch data when the component mounts
  }, []);
  useEffect(() => {
    setSudokuData(props.sudokuData);
  }, [props.sudokuData]);
  useEffect(() => {
    setGridMode(props.gridMode);
  }, [props.gridMode]);
  // useEffect(() => {
  //   if (props.sudokuList.length !== 0) {
  //     setData(props.sudokuList);
  //   }
  // }, [props.sudokuList]);
  useEffect(() => {
    debugger;
    if (props.sudokuCreatedData["sudokuList"] !== undefined) {
      setData(props.sudokuCreatedData["sudokuList"]);
      setSudokuUrl(
        props.sudokuList_Url + "/" + props.sudokuCreatedData["sudokuId"]
      );
      setSudokuName(props.sudokuCreatedData["sudokuName"]);
      setGridMode("view");
    }
  }, [props.sudokuCreatedData]);

  const sudokuNamePressed = (id, name) => {
    // debugger;
    setSudokuUrl(props.sudokuList_Url + "/" + id);
    setSudokuName(name);
    setGridMode("view");
  };

  return (
    <div>
      {data.map((item, i) => (
        <button
          key={i}
          type="button"
          className="btn btn-primary m-1"
          onClick={() => sudokuNamePressed(String(item[0]), item[1])}
        >
          {item[1]}
        </button>
      ))}
    </div>
  );
}
export default ViewAllSudoku;
