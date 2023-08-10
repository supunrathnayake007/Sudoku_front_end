import { useState, useEffect } from "react";
function ButtonState() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");

  const UpdateTitleButtonPress = () => {
    setTitle("We have a Title");
  };
  useEffect(() => {
    if (title !== "") {
      console.log("from the useEffect: " + title);
    }
  }, [title]);

  const updateCountButtonPress = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <Data title={title} count={count} />
      <button type="button" onClick={UpdateTitleButtonPress}>
        Update Title
      </button>
      <button type="button" onClick={updateCountButtonPress}>
        Update Count
      </button>
    </div>
  );
}

function Data(props) {
  return (
    <div>
      <p>Title:{props.title}</p>
      <p>Count:{props.count}</p>
    </div>
  );
}

export default ButtonState;
