import React from "react";
import { useParams } from "react-router-dom";
import { DragHandle } from "../../Components/Icons";
import Input from "../../Components/Input";
import FormFieldWrapper from "../../Components/FormFieldWrapper";
import Accordian from "../../Components/Accordian";
import Track from "./Track";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useOutletContext } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { cloneDeep } from "lodash";

const Songs = () => {
  let { playListId } = useParams();
  const { session, setSession, songsById } = useOutletContext();
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
                          <FormFieldWrapper id="song-title">
                            <Input
                              placeholder="Song Title"
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
                                setSession(
                                  `songs[${songIndex}].bpm`,
                                  +e.target.value
                                );
                              }}
                            />
                          </FormFieldWrapper>
                          <div
                            {...draggableProvided.dragHandleProps}
                            className="border border-[--btn-darker] p-1 rounded-md hover:bg-[--btn-hover] bg-[--btn]"
                          >
                            <DragHandle />
                          </div>
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
