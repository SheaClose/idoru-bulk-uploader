import React, { useEffect } from "react";
import "./App.css";
import idoruLogo from "./resources/Idoru-Logo-word_Dark.png";
import Button from "./Components/Button";
import FileImport from "./Components/FileImport";
import { useLocation, useParams, useNavigate, Outlet } from "react-router-dom";
import FormFieldWrapper from "./Components/FormFieldWrapper";
import useSetStorage from "./utils/useSetStorage";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const { session, setSession } = useSetStorage();
  let { playListId } = useParams();
  const navigate = useNavigate();
  let { pathname } = useLocation();

  const handleImport = (e) => {
    if (!e?.target?.files?.length) return;
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const text = e.target.result;
      setSession("", JSON.parse(text));
      navigate(`/setlist/${JSON.parse(text)?.playlists?.[0]?.id}`);
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

  const onDragEnd = ({
    source: { index: sourceIndex },
    destination: { index: destinationIndex },
  }) => {
    const playlistIndex = session?.playlists?.findIndex(
      ({ id }) => id === playListId
    );
    const songs = session?.playlists?.[playlistIndex]?.songs;
    const newSongs = [...songs];
    const [songId] = newSongs.splice(sourceIndex, 1);
    newSongs.splice(destinationIndex, 0, songId);
    setSession(`playlists[${playlistIndex}].songs`, newSongs);
  };

  return (
    <div className="app">
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
          <Button
            label="Save"
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
          <FileImport
            onFileUpload={handleImport}
            label="Import"
            accept=".idoru,.json"
          />
        </div>
      </nav>
      <DragDropContext onDragEnd={onDragEnd}>
        <Outlet />
      </DragDropContext>
    </div>
  );
}

export default App;
