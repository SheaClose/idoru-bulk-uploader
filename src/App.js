import React, { useRef, useState, useEffect, useMemo } from "react";
import "./App.css";
import idoruLogo from "./resources/Idoru-Logo-word_Dark.png";
import Button from "./Components/Button";
import Input from "./Components/Input";
import FormFieldWrapper from "./Components/FormFieldWrapper";
import FileImport from "./Components/FileImport";
import { Playlist, Note, Help } from "./Components/Icons";
import { set } from "lodash";
import setListTemplate from "./resources/setlistTemplate.json";

const supportsFileSystemAccessAPI =
  "getAsFileSystemHandle" in DataTransferItem.prototype;
const supportsWebkitGetAsEntry =
  "webkitGetAsEntry" in DataTransferItem.prototype;

function App() {
  const [session, setSession] = useState(
    JSON.parse(localStorage.getItem("iP1Session"))
  );
  const songsById = useMemo(() => {
    const songsById = session.songs.reduce((acc, song) => {
      return { ...acc, [song.id]: song };
    }, {});
    // console.log("songsById: ", songsById);
    return songsById;
  }, [session?.songs]);
  React.useEffect(() => {
    localStorage.setItem("iP1Session", JSON.stringify(session));
  }, [session]);
  const body = useRef(null);
  const dragover = (e) => {
    e.preventDefault();
  };
  const dragenter = (e) => {
    body.current.style.outline = "solid var(--white) 1px";
    body.current.style.background = "var(--btn-hover)";
  };
  const dragleave = (e) => {
    body.current.style.outline = "";
    body.current.style.background = "var(--charcoal)";
  };
  const drop = async (e) => {
    e.preventDefault();
    if (!supportsFileSystemAccessAPI && !supportsWebkitGetAsEntry) {
      // Cannot handle directories.
      return;
    }
    body.current.style.outline = "";
    body.current.style.background = "var(--charcoal)";

    const fileHandlesPromises = [...e.dataTransfer.items]
      .filter((item) => item.kind === "file")
      // …and, depending on previous feature detection…
      .map((item) =>
        supportsFileSystemAccessAPI
          ? // …either get a modern `FileSystemHandle`…
            item.getAsFileSystemHandle()
          : // …or a classic `FileSystemFileEntry`.
            item.webkitGetAsEntry()
      );
    (await Promise.all(fileHandlesPromises)).forEach(async (setList) => {
      console.log("setList: ", setList);
      if (setList.kind === "directory") {
        for await (const song of setList.values()) {
          if (song.kind === "directory") {
            // for await (const track of song.values()) {
            //   // console.log("resolve: ", await setList.resolve(track));
            //   // console.log({
            //   //   setList,
            //   //   song,
            //   //   track,
            //   // });
            // }
          }
        }
      }
    });
  };
  const handleSetSession = (path, value) => {
    setSession(set({ ...session }, path, value));
  };
  const handleImport = (e) => {
    console.log(e?.target?.files.length);
    if (!e?.target?.files.length) return;
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
          <span>Idoru-P1 Bulk Uploader</span>
        </div>
        <div className="flex gap-4">
          <Button
            label="Reset Session"
            onClick={() => {
              setSession({
                session: {
                  checkMissingFiles: false,
                  deviceImport: false,
                  filePath: "",
                  id: "71b913ac-1094-42c1-9e36-0c81e770d27a",
                  name: "",
                  playlists: [],
                },
                playlists: [{}],
                songs: [{}],
              });
            }}
          />
          {/* <Button
            label="Import SessionTemplate"
            onClick={() => {
              setSession(setListTemplate);
            }}
          /> */}
          <FileImport
            onFileUpload={handleImport}
            label="Import Idoru File"
            accept=".idoru"
          />
        </div>
      </nav>
      <div
        onDragOver={dragover}
        onDragEnter={dragenter}
        onDragLeave={dragleave}
        onDrop={drop}
        ref={body}
        className="w-full text-white p-8"
      >
        {/* Playlist name */}
        {session?.playlists?.map((playlist, index) => (
          <React.Fragment key={playlist.id}>
            <div className="w-full flex items-center gap-4">
              <Playlist />
              <FormFieldWrapper id="session-name" label="Playlist Name">
                <Input
                  id="session-name"
                  name="session-name"
                  type="text"
                  value={playlist.name}
                  onChange={(e) => {
                    handleSetSession(
                      `playlists[${index}].name`,
                      e.target.value
                    );
                  }}
                />
              </FormFieldWrapper>
              <FormFieldWrapper
                id="src-path"
                label={
                  <div className="flex gap-1">
                    Path to Directory{" "}
                    <span className="hover:cursor-pointer text-base">
                      <Help height={14} width={14} />
                    </span>
                  </div>
                }
              >
                <Input
                  id="src-path"
                  name="src-path"
                  type="text"
                  value={session.session.filePath}
                  onChange={(e) => {
                    handleSetSession("session.filePath", e?.target?.value);
                  }}
                />
              </FormFieldWrapper>
            </div>
            {/* playlist */}
            {playlist?.songs?.map((id) => {
              const song = songsById[id];
              const songIndex = session.songs.findIndex(
                (_song) => _song.id === id
              );
              return (
                <div
                  className="w-full flex items-center gap-4 pl-10 mt-4"
                  key={id}
                >
                  <Note />
                  <FormFieldWrapper id="song-title" label="Song Title">
                    <Input
                      id="song-title"
                      type="text"
                      value={song.name}
                      onChange={(e) => {
                        setSession(
                          set(
                            { ...session },
                            `songs[${songIndex}].name`,
                            e.target.value
                          )
                        );
                      }}
                    />
                  </FormFieldWrapper>
                  <FormFieldWrapper id="end-of-song" label="End of Song">
                    <select
                      id="end-of-song"
                      name="play-next"
                      id="play-next"
                      className="p-4 bg-[--btn] w-96 rounded-md"
                      value={song.endOfSong}
                      onChange={(e) => {
                        setSession(
                          set(
                            { ...session },
                            `songs[${songIndex}].endOfSong`,
                            e.target.value
                          )
                        );
                      }}
                    >
                      <option value=""></option>
                      <option value="PlayNext">Play Next</option>
                      <option value="QueueNext">Queue Next</option>
                      <option value="Loop">Loop</option>
                    </select>
                  </FormFieldWrapper>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default App;
