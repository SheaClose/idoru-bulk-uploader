import { useState, useEffect, useMemo } from "react";
import { set } from "lodash";

function useSetStorage() {
  const [session, ogSetSession] = useState(
    JSON.parse(localStorage.getItem("iP1Session"))
  );

  useEffect(() => {
    localStorage.setItem("iP1Session", JSON.stringify(session));
  }, [session]);

  const setSession = (path, value) => {
    if (!value) {
      // no path is given, just a value, rename path to value;
      value = path;
      ogSetSession(path);
      return;
    }
    ogSetSession(set({ ...session }, path, value));
  };

  const songsById = useMemo(() => {
    if (!session?.songs) return;
    const songsById = session.songs.reduce((acc, song) => {
      return { ...acc, [song.id]: song };
    }, {});
    return songsById;
  }, [session?.songs]);

  return { session, setSession, songsById };
}

export default useSetStorage;
