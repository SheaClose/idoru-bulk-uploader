import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import idoruLogo from "./resources/Idoru-Logo-word_Dark.png";
import Button from "./Components/Button";
import FileImport from "./Components/FileImport";
import { useLocation, useParams, useNavigate, Outlet } from "react-router-dom";
import FormFieldWrapper from "./Components/FormFieldWrapper";
import { DragDropContext } from "react-beautiful-dnd";
import { set } from "lodash";
import Modal from "./Components/Modal";
import { FileDrop } from "react-file-drop";
import { onDrop } from "./resources/parseFiles";

function App() {
  let { playListId } = useParams();
  const navigate = useNavigate();
  let { pathname } = useLocation();
  const [session, ogSetSession] = useState(
    JSON.parse(localStorage.getItem("iP1Session"))
  );
  const [isIdoruImport, setIsIdoruImport] = useState(
    JSON.parse(localStorage.getItem("isIdoruImport"))
  );

  const playlistIndex = session?.playlists?.findIndex(
    ({ id }) => id === playListId
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

  const handleImport = (e) => {
    if (!e?.target?.files?.length) return;
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const text = e.target.result;
      setSession("", JSON.parse(text));
      navigate(`/setlist/${JSON.parse(text)?.playlists?.[0]?.id}`);
      setIsIdoruImport(true);
      localStorage.setItem("isIdoruImport", true);
    };
    fileReader.readAsText(e?.target?.files[0]);
  };

  useEffect(() => {
    if (pathname === "/" && session?.playlists?.length) {
      // if landing on root, but playlists exist, go ahead and load first playlist
      navigate(`/setlist/${session.playlists?.[0]?.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragEnd = ({ source, destination }) => {
    const sourceIndex = source?.index;
    const destinationIndex = destination?.index;
    // something went wrong, abandon ship!
    if (sourceIndex == null || destinationIndex == null) return;

    const playlistIndex = session?.playlists?.findIndex(
      ({ id }) => id === playListId
    );
    const songs = session?.playlists?.[playlistIndex]?.songs;
    const newSongs = [...songs];
    const [songId] = newSongs.splice(sourceIndex, 1);
    newSongs.splice(destinationIndex, 0, songId);
    setSession(`playlists[${playlistIndex}].songs`, newSongs);
  };

  const handleExport = () => {
    /*
      TODO: once drag import is done, address song locations based on:
        session?.playlists?.[playlistIndex]?.filePath
      Unless an *.idoru file was used for import.
    */
    const fileName = `${session?.session?.name}.idoru`;
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:application/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(session))
    );
    element.setAttribute("download", fileName);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const onFrameDrop = (event) => {
    const { newSession, latestSetlistId } = onDrop(event, session);
    /* TODO: reset session and navigate to newly imported setlist */
    // setSession(newSession);
    // navigate(`/setlist/${latestSetlistId}`);
  };

  return (
    <div className="app">
      {/* <Modal /> */}
      <nav className="w-full px-16 py-8 text-white bg-black flex justify-between">
        <div className="flex gap-4 items-center font-bold text-2xl">
          <img className="h-10 w-10" src={idoruLogo} alt="Logo" />{" "}
          <span>Idoru-P1 Bulk Uploader (Un-Official)</span>
        </div>
        <div className="flex gap-4 items-center">
          <FormFieldWrapper id="end-of-song">
            <select
              id="end-of-song"
              name="play-next"
              className="p-4 bg-[--btn] w-32 rounded-md text-white"
              value={playListId || ""}
              onChange={(e) => {
                navigate(`/setlist/${e.target.value}`);
              }}
            >
              <option disabled key={"null"} value="">
                Set Lists
              </option>
              {session?.playlists?.map((playlist) => (
                <option key={playlist?.id} value={playlist?.id}>
                  {playlist?.name}
                </option>
              ))}
            </select>
          </FormFieldWrapper>
          {window.location.hostname === "localhost" ? (
            <Button
              disabled={
                isIdoruImport
                  ? false
                  : !session?.playlists?.[playlistIndex]?.filePath
              }
              label="Reset"
              theme={"secondary"}
              onClick={() => {
                setSession("", {
                  session: {
                    checkMissingFiles: false,
                    deviceImport: false,
                    filePath: "",
                    id: crypto.randomUUID(),
                    name: "",
                    playlists: [],
                  },
                  playlists: [],
                  songs: [],
                });
                navigate("/");
              }}
            />
          ) : null}
          <Button
            disabled={
              isIdoruImport
                ? false
                : !session?.playlists?.[playlistIndex]?.filePath
            }
            label="Export"
            theme={"secondary"}
            onClick={handleExport}
          />
          <FileImport
            onFileUpload={handleImport}
            label="Import"
            accept=".idoru,.json"
          />
        </div>
      </nav>
      <DragDropContext onDragEnd={onDragEnd}>
        <FileDrop onFrameDrop={onFrameDrop}>
          {/* 
            Todo: Style body based on drag event.
            onDragOver: function(event): Callback when the user is dragging over the target. Also adds the file-drop-dragging-over-target class to the file-drop-target.

            onDragLeave: function(event): Callback when the user leaves the target. Removes the file-drop-dragging-over-target class from the file-drop-target.
          */}
          <Outlet context={[session, setSession, songsById]} />
        </FileDrop>
      </DragDropContext>
    </div>
  );
}

export default App;
