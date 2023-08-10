//fetch is a built-in JavaScript function that allows you to make network requests and handle responses.
//Here's an example of how to use it in a React component:

import React, { useState, useEffect } from "react";

export default function FetchApi() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        //const response = await fetch("https://api.example.com/data");//this is example
        const response = await fetch("http://127.0.0.1:5000/get-Sudoku");
        const jsonData = await response.json();
        setData(jsonData); // Update the state with the API response data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []);

  //////////////Post method////////////
  const asyncPostCall = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // your expected POST request payload goes here
            title: "My post title",
            body: "My post content.",
          }),
        }
      );
      const data = await response.json();
      // enter you logic when the fetch is successful
      console.log(data);
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    }
  };

  asyncPostCall();
  ///////////////////post method end//////////////////////
  return (
    <div>
      {/* Display data from the API */}
      {data.map((item) => (
        <p key={item[0]}>{item[0] + " " + item[1]}</p>
      ))}
    </div>
  );
}
