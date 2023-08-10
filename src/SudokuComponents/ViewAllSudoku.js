import React, { useState, useEffect } from "react";

function ViewAllSudoku(props) {
  //console.log("sudoku Manager here. line 23");
  const [data, setData] = useState([]);
  const sudokuList_Url = "http://192.168.44.15:8080/get-Sudoku";
  const sudokuList_Url_test = "http://127.0.0.1:5000/get-Sudoku";

  const [sudokuUrl, setSudokuUrl] = useState("");
  const [sudokuData, setSudokuData] = useState(null);
  const [sudokuName, setSudokuName] = useState("");

  //get selected sudoku data
  useEffect(() => {
    //debugger;
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
    //debugger;
    if (sudokuData !== null) {
      props.callback({ sudokuData, sudokuName });
    }
  }, [sudokuData]);

  //get sudoku list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(sudokuList_Url);
        const jsonData = await response.json();
        setData(jsonData); // Update the state with the API response data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the function to fetch data when the component mounts
  }, []);

  const sudokuNamePressed = (id, name) => {
    // debugger;
    setSudokuUrl(sudokuList_Url + "/" + id);
    setSudokuName(name);
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
