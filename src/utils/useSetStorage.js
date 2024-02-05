import { useState, useEffect, useMemo } from "react";
import { set } from "lodash";

function useSetStorage() {
  const [session, ogSetSession] = useState(
    JSON.parse(localStorage.getItem("iP1Session"))
  );

  useEffect(() => {
    localStorage.setItem("iP1Session", JSON.stringify(session));
  }, [session]);

  /**
   * This will create a global state and a way to set it
   *
   * @param {string | [string, any]} path the nested path value that needs to be changed
   * @param {any} [value] the value to set it to
   *
   * @returns {undefined}
   */
  const setSession = (path, value) => {
    // No path given, overwrite the entire file
    if (!path) {
      ogSetSession(value);
      return;
    }

    // Multiple values given, itterate over values ([ [path, val], [path, val] ]), then update all at once.
    if (Array.isArray(path)) {
      const newSession = path.reduce((acc, [nextPath, nextVal]) => {
        return set(acc, nextPath, nextVal);
      }, JSON.parse(localStorage.getItem("iP1Session")));
      ogSetSession(newSession);
      return;
    }

    // expected path value pair given.
    ogSetSession(
      set(JSON.parse(localStorage.getItem("iP1Session")), path, value)
    );
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
