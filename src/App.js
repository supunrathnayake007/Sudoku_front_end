// import { useState } from "react";
import "./App.css";
//import { Info } from "./TechWithTim/info.js";
import ButtonState from "./TechWithTim/States.js";
import SudokuMain from "./SudokuComponents/SudokuMain.js";

function App() {
  //console.log("App here.");
  return (
    <div className="App">
      <SudokuMain />
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
