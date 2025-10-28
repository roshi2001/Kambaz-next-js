import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(7);

  return (
    <div
      id="wd-counter-use-state"
      style={{
        marginTop: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Counter: {count}</h2>

      <button
        onClick={() => setCount(count + 1)}
        id="wd-counter-up-click"
        style={{
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          marginRight: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Up
      </button>

      <button
        onClick={() => setCount(count - 1)}
        id="wd-counter-down-click"
        style={{
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Down
      </button>

      <hr style={{ marginTop: "30px" }} />
    </div>
  );
}
