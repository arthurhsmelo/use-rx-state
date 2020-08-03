import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import "./App.css";

function useRxState(fn, ...dependencies) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updater = useMemo(() => (typeof fn === "function" ? fn() : fn), [...dependencies]);
  let st = useRef(updater);

  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    st.current = updater;
  }, [updater]);

  return st.current;
}

function App() {
  const [text, setText] = useState("");
  const chars = useRxState(() => {
    // console.log(text.length);
    if (text.length < 5) {
      return "Not enough";
    } else {
      return text.length;
    }
  }, [text]);
  const words = useRxState(text.split(" ").length, text);

  return (
    <div className="App">
      <h1>{text}</h1>
      <p>Character Count: {chars}</p>
      <p>Word Count: {words}</p>
      <input defaultValue={text} onChange={(ev) => setText(ev.target.value)} />
    </div>
  );
}

export default App;
