import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    !replace ? setHistory ( [...history, mode] ) : setHistory ([...history]) ;
    return setMode( mode );
  }
  
  function back() {
    const newHist = [...history].slice(0, history.length-1);

    if (newHist.length >= 1) {
      setHistory(newHist);
      setMode(newHist[newHist.length - 1]);
    }
  }
  
    return { mode, transition, back };
  }