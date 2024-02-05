import { useState, useEffect } from "react";
import { set } from "lodash";

function useSetStorage() {
  const [session, setSession] = useState(
    JSON.parse(localStorage.getItem("iP1Session"))
  );

  useEffect(() => {
    localStorage.setItem("iP1Session", JSON.stringify(session));
  }, [session]);

  const handleSetSession = (path, value) => {
    if (!value) {
      // no path is given, just a value, rename path to value;
      value = path;
      setSession(path);
      return;
    }
    setSession(set({ ...session }, path, value));
  };

  return [session, handleSetSession];
}

export default useSetStorage;
