import React, { useState, useEffect } from "react";
import "./App.css";
import idoruLogo from "./resources/Idoru-Logo-word_Dark.png";
import Button from "./Components/Button";
import FileImport from "./Components/FileImport";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import FormFieldWrapper from "./Components/FormFieldWrapper";
function App() {
  const [session, setSession] = useState(
    JSON.parse(localStorage.getItem("iP1Session"))
  );
  let { playListId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("iP1Session", JSON.stringify(session));
  }, [session]);

  const handleImport = (e) => {
    if (!e?.target?.files?.length) return;
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const text = e.target.result;
      setSession(JSON.parse(text));
    };
    fileReader.readAsText(e?.target?.files[0]);
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
              {session?.playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </FormFieldWrapper>
          <Button
            label="Save"
            theme={"secondary"}
            onClick={() => {
              setSession({
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
            }}
          />
          <FileImport
            onFileUpload={handleImport}
            label="Import"
            accept=".idoru"
          />
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
