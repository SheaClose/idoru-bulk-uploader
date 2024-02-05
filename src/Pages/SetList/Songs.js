import React from "react";
import { useParams } from "react-router-dom";
import Input from "../../Components/Input";
import FormFieldWrapper from "../../Components/FormFieldWrapper";
import Accordian from "../../Components/Accordian";
import useSetStorage from "../../utils/useSetStorage";
import Track from "./Track";

const Songs = () => {
  let { playListId } = useParams();
  const { session, setSession, songsById } = useSetStorage();
  const playlistIndex = session?.playlists?.findIndex(
    ({ id }) => id === playListId
  );
  const playlist = session?.playlists?.[playlistIndex];

  return (
    <>
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
                  <Track
                    key={inputFile.id}
                    songFileId={songFileId}
                    song={song}
                    inputFile={inputFile}
                    songIndex={songIndex}
                  />
                );
              })}
          </Accordian>
        );
      })}
    </>
  );
};

export default Songs;
