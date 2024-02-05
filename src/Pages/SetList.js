import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Input from "../Components/Input";
import FormFieldWrapper from "../Components/FormFieldWrapper";
import { Playlist, Note, Help, Folder } from "../Components/Icons";
import { get } from "lodash";
import Accordian from "../Components/Accordian";
import useSetStorage from "../utils/useSetStorage";
const PlayList = () => {
  let { playListId } = useParams();
  const [session, setSession] = useSetStorage();
  const playlistIndex = session.playlists.findIndex(
    ({ id }) => id === playListId
  );
  const playlist = session.playlists[playlistIndex];

  const songsById = useMemo(() => {
    if (!session?.songs) return;
    const songsById = session.songs.reduce((acc, song) => {
      return { ...acc, [song.id]: song };
    }, {});
    return songsById;
  }, [session?.songs]);

  return (
    <div className="w-full text-white p-8">
      <div className="w-full flex gap-8">
        <div className="flex items-center gap-4">
          <Playlist />
          <FormFieldWrapper id="session-name">
            <Input
              id="session-name"
              name="session-name"
              type="text"
              value={playlist?.name}
              onChange={(e) => {
                setSession(`playlists[${playlistIndex}].name`, e.target.value);
              }}
            />
          </FormFieldWrapper>
        </div>
        <div className="flex items-center gap-4">
          <Folder />
          <FormFieldWrapper id="src-path">
            <div className="flex items-center relative">
              <Input
                placeholder="Path to Directory"
                id="src-path"
                name="src-path"
                type="text"
                value={
                  /*
                    This is a temp value. Will be used to fill out songs[:i].inputFiles[:key].directory.
                    Needs to be cleaned up on save.
                    TODO: remove this value before exporting *.idoru file.
                  */
                  session?.playlists?.[playlistIndex]?.filePath || ""
                }
                onChange={(e) => {
                  setSession(
                    `playlists[${playlistIndex}].filePath`,
                    e?.target?.value
                  );
                }}
              />
              <span
                className="absolute inset-t-2 right-2 hover:cursor-pointer"
                onClick={() =>
                  alert(
                    `Due to limitations of browsers, files imported will only include relative paths from the directory that is selected. In order to correctly export files in the Idoru app, the absolute path from the root of your computer must be provided. \n\nSee the FAQ for more information.`
                  )
                }
              >
                <Help height={14} width={14} />
              </span>
            </div>
          </FormFieldWrapper>
        </div>
      </div>
      {playlist?.songs?.map((id, playlistSongIndex) => {
        const song = songsById[id];
        const songIndex = session.songs.findIndex((_song) => _song.id === id);
        return (
          <Accordian
            key={id}
            header={
              <div
                className="w-full flex items-center gap-4 pl-10 mt-4 relative"
                key={id}
              >
                <span className="absolute inset-x-2 inset-y-4 w-1">
                  {playlistSongIndex + 1}.
                </span>
                <FormFieldWrapper id="song-title">
                  <Input
                    placeholder="Song Title"
                    id="song-title"
                    type="text"
                    value={song?.name}
                    onChange={(e) => {
                      setSession(`songs[${songIndex}].name`, e.target.value);
                    }}
                  />
                </FormFieldWrapper>
                <FormFieldWrapper id="end-of-song">
                  <select
                    id="end-of-song"
                    name="play-next"
                    className="p-4 bg-[--btn] w-96 rounded-md"
                    value={song.endOfSong}
                    onChange={(e) => {
                      setSession(
                        `songs[${songIndex}].endOfSong`,
                        e.target.value
                      );
                    }}
                  >
                    <option disabled value="">
                      End of Song Behavior:
                    </option>
                    <option value="PlayNext">Play Next</option>
                    <option value="QueueNext">Queue Next</option>
                    <option value="Loop">Loop</option>
                  </select>
                </FormFieldWrapper>
                <FormFieldWrapper id="song-title">
                  <Input
                    placeholder="BPM"
                    className="w-16"
                    id="bpm"
                    type="text"
                    value={song.bpm}
                    onChange={(e) => {
                      setSession(`songs[${songIndex}].bpm`, +e.target.value);
                    }}
                  />
                </FormFieldWrapper>
              </div>
            }
          >
            {Object.entries(song.inputFiles)
              .slice(0, 6)
              .map(([songFileId, inputFile]) => {
                return (
                  <div className="pl-20 mt-4" key={inputFile.id}>
                    <div className="flex items-center gap-4">
                      <Note />
                      <FormFieldWrapper id="track-title">
                        <Input
                          placeholder="Display Name"
                          className="w-16"
                          maxLength="2"
                          id="track-title"
                          type="text"
                          value={inputFile.displayName || songFileId}
                          onChange={(e) => {
                            setSession(
                              `songs[${songIndex}].inputFiles[${songFileId}].displayName`,
                              e?.target?.value?.toUpperCase()
                            );
                          }}
                        />
                      </FormFieldWrapper>
                      <FormFieldWrapper id="track-title">
                        <Input
                          placeholder="Track Name"
                          className="w-48"
                          maxLength="2"
                          id="track-title"
                          type="text"
                          disabled
                          readOnly
                          value={get(
                            session,
                            `songs[${songIndex}].inputFiles[${songFileId}].fileName`
                          )}
                          onChange={null}
                        />
                      </FormFieldWrapper>
                    </div>
                    {/* TODO: make routing work? */}
                    {/* <div className="flex gap-2 pl-8 pt-2">
                    <div
                      className="flex flex-col gap-1 justify-between mr-2 pr-4"
                      style={{
                        borderRight: "3px solid var(--btn-lighter)",
                      }}
                    >
                      <span className="pt-1">
                        <HeadPhones height={16} width={16} />
                      </span>
                      <Checkbox
                        isChecked={false}
                        onChecked={(checked) => {
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span>1.</span>
                      <Checkbox
                        isChecked={false}
                        onChecked={(checked) => {
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span>2.</span>
                      <Checkbox
                        isChecked={
                          song?.outputs?.output2?.[songFileId]?.active
                        }
                        onChecked={(checked) => {
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span>3.</span>
                      <Checkbox
                        isChecked={
                          song?.outputs?.output3?.[songFileId]?.active
                        }
                        onChecked={(checked) => {
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span>4.</span>
                      <Checkbox
                        isChecked={
                          song?.outputs?.output4?.[songFileId]?.active
                        }
                        onChecked={(checked) => {
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span>5.</span>
                      <Checkbox
                        isChecked={
                          song?.outputs?.output5?.[songFileId]?.active
                        }
                        onChecked={(checked) => {
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span>6.</span>
                      <Checkbox
                        isChecked={
                          song?.outputs?.output6?.[songFileId]?.active
                        }
                        onChecked={(checked) => {
                        }}
                      />
                    </div>
                  </div> */}
                  </div>
                );
              })}
          </Accordian>
        );
      })}
    </div>
  );
};

export default PlayList;
// TODO: Implement Drag/Drop import
// const supportsFileSystemAccessAPI =
//   "getAsFileSystemHandle" in DataTransferItem.prototype;
// const supportsWebkitGetAsEntry =
//   "webkitGetAsEntry" in DataTransferItem.prototype;
// const body = useRef(null);
// const dragover = (e) => {
//   e.preventDefault();
// };
// const dragenter = (e) => {
//   body.current.style.outline = "solid var(--white) 1px";
//   body.current.style.background = "var(--btn-hover)";
// };
// const dragleave = (e) => {
//   body.current.style.outline = "";
//   body.current.style.background = "var(--charcoal)";
// };
// const drop = async (e) => {
//   e.preventDefault();
//   if (!supportsFileSystemAccessAPI && !supportsWebkitGetAsEntry) {
//     // Cannot handle directories.
//     return;
//   }
//   body.current.style.outline = "";
//   body.current.style.background = "var(--charcoal)";

//   const fileHandlesPromises = [...e.dataTransfer.items]
//     .filter((item) => item.kind === "file")
//     // …and, depending on previous feature detection…
//     .map((item) =>
//       supportsFileSystemAccessAPI
//         ? // …either get a modern `FileSystemHandle`…
//           item.getAsFileSystemHandle()
//         : // …or a classic `FileSystemFileEntry`.
//           item.webkitGetAsEntry()
//     );
//   (await Promise.all(fileHandlesPromises)).forEach(async (setList) => {
//     if (setList.kind === "directory") {
//       for await (const song of setList.values()) {
//         if (song.kind === "directory") {
//           // for await (const track of song.values()) {
//           // }
//         }
//       }
//     }
//   });
// };
