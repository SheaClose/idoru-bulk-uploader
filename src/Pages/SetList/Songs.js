import React from "react";
import { useParams } from "react-router-dom";
import { DragHandle, Delete, Copy, Paste } from "../../Components/Icons";
import Input from "../../Components/Input";
import FormFieldWrapper from "../../Components/FormFieldWrapper";
import Accordian from "../../Components/Accordian";
import Track from "./Track";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useOutletContext } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { cloneDeep, merge, pick } from "lodash";
import Button from "../../Components/Button";
import PopOver from "../../Components/PopOver";
import { toast } from "react-hot-toast";

const Songs = () => {
  let { playListId } = useParams();
  const {
    session,
    setSession,
    songsById,
    byPassConfirmation,
    setByPassConfirmation,
  } = useOutletContext();
  const playlistIndex = session?.playlists?.findIndex(
    ({ id }) => id === playListId
  );
  const playlist = session?.playlists?.[playlistIndex];

  const handleTrackDrop = ({ source, destination }) => {
    const songId = destination?.droppableId;
    const sourceIndex = source?.index;
    const destinationIndex = destination?.index;
    if (sourceIndex == null || destinationIndex == null) return; // something went wrong, abandon ship!
    const songIndex = session.songs.findIndex(({ id }) => id === songId);
    const song = cloneDeep(session?.songs[songIndex]);

    const tracks = [];
    for (const track of Object.values(song.inputFiles)) {
      tracks.push(track);
    }
    const [track] = tracks.splice(sourceIndex, 1);
    tracks.splice(destinationIndex, 0, track);
    tracks.forEach((track, index) => {
      const incIndex = index + 1;
      track.channelName = `Channel ${incIndex}`;
      if (track.displayName.match(/[F\d]{2}/) != null) {
        // Update display name if it's still the F[1-n] format.
        track.displayName = `F${incIndex}`;
      }
      song.inputFiles[`F${incIndex}`] = track;
    });
    setSession(`songs[${songIndex}]`, song);
  };

  const handleSongDelete = (songId) => {
    const songs = session?.songs?.filter(({ id }) => id !== songId);
    const playListSongs = session?.playlists?.[playlistIndex]?.songs.filter(
      (id) => id !== songId
    );
    setSession([
      [`songs`, songs],
      [`playlists.[${playlistIndex}].songs`, playListSongs],
    ]);
  };

  const handleCopy = (song) => {
    const trackKeys = Object.keys(song?.inputFiles);
    const displayNamePaths = trackKeys.map(
      (track) => `inputFiles.${track}.displayName`
    );
    navigator.clipboard.writeText(
      JSON.stringify(pick(song, ["endOfSong", ...displayNamePaths, "outputs"]))
    );
    toast.success("Copied Song Configuration to Clipboard!");
  };

  const handlePaste = async (song, songIndex) => {
    try {
      const targetSong = cloneDeep(song);
      const text = await navigator.clipboard.readText();
      const sourceSongConfiguration = JSON.parse(text);
      const mergedSong = merge(targetSong, sourceSongConfiguration);
      setSession(`songs[${songIndex}]`, mergedSong);
    } catch (error) {
      console.warn("error: ", error?.message);
      if (error?.message.includes("not valid JSON"))
        return toast.error(
          "Invalid song configuration pasted. \n\n You might have copied something else to your clipboard, try copying and pasting again",
          { duration: 5000 }
        );
      toast.error("Something went wrong!");
    }
  };
  return (
    <Droppable droppableId={playListId}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {playlist?.songs?.map((id, playlistSongIndex) => {
            const song = songsById[id];
            const songIndex = session.songs.findIndex(
              (_song) => _song.id === id
            );
            return (
              <Draggable key={id} draggableId={id} index={playlistSongIndex}>
                {(draggableProvided) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                  >
                    <Accordian
                      header={
                        <div className="w-full flex items-center gap-4 pl-10 py-2 relative">
                          <span className="absolute inset-x-2 inset-y-4 w-1">
                            {playlistSongIndex + 1}.
                          </span>
                          {/* TODO: make pattern work */}
                          <FormFieldWrapper id="song-title">
                            <Input
                              required={true}
                              warningLength={16}
                              pattern="[A-Za-z0-9!@#$%^_=+\-&\(\) ]{0,32}"
                              placeholder="Song Title"
                              maxLength={32}
                              id="song-title"
                              type="text"
                              value={song?.name}
                              onChange={(e) => {
                                setSession(
                                  `songs[${songIndex}].name`,
                                  e.target.value
                                );
                              }}
                            />
                          </FormFieldWrapper>
                          <FormFieldWrapper id="end-of-song">
                            <select
                              id="end-of-song"
                              name="play-next"
                              className="py-4 pl-[4px] pr-[2px] border-r-[8px] border-r-transparent bg-[--btn] rounded-md"
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
                                setSession(
                                  `songs[${songIndex}].bpm`,
                                  +e.target.value
                                );
                              }}
                            />
                          </FormFieldWrapper>
                          <span {...draggableProvided.dragHandleProps}>
                            <Button
                              theme="actionButton"
                              label={<DragHandle />}
                            />
                          </span>
                        </div>
                      }
                    >
                      <DragDropContext onDragEnd={handleTrackDrop}>
                        <Droppable droppableId={song.id}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              <div className="pl-10 flex gap-2">
                                <PopOver
                                  onClick={() => handleCopy(song)}
                                  popoverChildren={
                                    <>
                                      <p>Copy song Configuration: </p>
                                      <p>
                                        End of Song Behavior, Track display
                                        names, Input/Output routing
                                      </p>
                                    </>
                                  }
                                >
                                  <Button
                                    theme="actionButton"
                                    label={<Copy />}
                                    onClick={() => handleCopy(song)}
                                  />
                                </PopOver>
                                <PopOver
                                  onClick={() => handlePaste(song, songIndex)}
                                  popoverChildren={
                                    <>
                                      <p>Paste song Configuration: </p>
                                      <p>
                                        End of Song Behavior, Track display
                                        names, Input/Output routing
                                      </p>
                                    </>
                                  }
                                >
                                  <Button
                                    theme="actionButton"
                                    title="Paste Song Configuration"
                                    label={<Paste />}
                                    onClick={() => handlePaste(song, songIndex)}
                                  />
                                </PopOver>
                                <Button
                                  theme="actionButton"
                                  title="Delete Song"
                                  label={<Delete />}
                                  onClick={() => {
                                    if (byPassConfirmation)
                                      return handleSongDelete(song.id);
                                    toast.custom(
                                      <div className="bg-[--btn] text-white p-4">
                                        <div className="flex gap-4 items-center">
                                          <div className="flex flex-col items-start gap-4">
                                            <div>You really wanna do that?</div>
                                            <div className="flex gap-2 text-xs">
                                              <input
                                                autoFocus
                                                value={byPassConfirmation}
                                                type="checkbox"
                                                name=""
                                                id=""
                                                onChange={({ target }) =>
                                                  setByPassConfirmation(
                                                    target?.checked
                                                  )
                                                }
                                              />
                                              (Don't remind me again)
                                            </div>
                                          </div>
                                          <span className="border-[1px] border-[--white] rounded-md">
                                            <Button
                                              theme="secondary"
                                              label={"Nope"}
                                              onClick={() => toast.remove()}
                                            />
                                          </span>
                                          <Button
                                            label={"Yep"}
                                            onClick={() => {
                                              handleSongDelete(song.id);
                                              toast.remove();
                                            }}
                                          />
                                        </div>
                                      </div>,
                                      {
                                        position: "top-center",
                                        duration: 20000,
                                      }
                                    );
                                  }}
                                />
                              </div>
                              {Object.entries(song.inputFiles)
                                // .slice(0, 6)
                                .map(([songFileId, inputFile], index) => {
                                  return (
                                    <Track
                                      disabled={index > 5}
                                      trackIndex={index}
                                      inputId={`IN${index + 1}`}
                                      key={`${song.id}-${songFileId}-${inputFile}-${inputFile.id}`}
                                      songFileId={songFileId}
                                      inputFile={inputFile}
                                      songIndex={songIndex}
                                    />
                                  );
                                })}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </Accordian>
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Songs;
