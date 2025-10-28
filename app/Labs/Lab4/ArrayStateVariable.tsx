import { useState } from "react";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index) => {
    setArray(array.filter((_, i) => i !== index));
  };

  return (
    <div
      id="wd-array-state-variables"
      style={{
        width: "250px",
        border: "1px solid lightgray",
        borderRadius: "6px",
        padding: "15px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "18px",
          marginBottom: "15px",
        }}
      >
        Array State Variable
      </h2>

      <button
        onClick={addElement}
        style={{
          display: "block",
          width: "100%",
          backgroundColor: "green",
          color: "white",
          border: "none",
          padding: "8px 0",
          borderRadius: "5px",
          marginBottom: "10px",
          cursor: "pointer",
        }}
      >
        Add Element
      </button>

      <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
        {array.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid lightgray",
              borderRadius: "4px",
              padding: "6px 10px",
              marginBottom: "8px",
              fontSize: "16px",
            }}
          >
            {item}
            <button
              onClick={() => deleteElement(index)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 12px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <hr style={{ marginTop: "15px" }}  /> 
    </div>
  );
}
