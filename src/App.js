import { useState } from "react";
import "./App.css";
//import { Info } from "./TechWithTim/info.js";
import ButtonState from "./TechWithTim/States.js";
import SudokuMain from "./SudokuComponents/SudokuMain.js";

function App() {
  //console.log("App here.");

  ///for sudokuMain
  const api_debug = false; //change to true when debugging the API
  const baseApiUrl = api_debug
    ? "http://127.0.0.1:5000"
    : "http://192.168.44.15:8080";
  const [apiUrls, setApiUrls] = useState({
    sudokuSolve_Url: baseApiUrl + "/solve-Sudoku",
    sudokuSave_Url: baseApiUrl + "/create-Sudoku",
    sudokuList_Url: baseApiUrl + "/get-Sudoku",
  });
  ///end SudokuMain

  return (
    <div className="App">
      <SudokuMain apiUrls={apiUrls} />
    </div>
  );
}

// function AddItems() {
//   const value = "default";
//   return (
//     <form>
//       <Info />
//       <label for="text-form">Type Something</label>
//       <input type="text" value={value} id="text-form" />
//     </form>
//   );
// }

export default App;
