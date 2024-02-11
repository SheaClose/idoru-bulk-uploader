import React, { useMemo } from "react";
import Input from "../../Components/Input";
import Checkbox from "../../Components/Checkbox";
import Button from "../../Components/Button";
import FormFieldWrapper from "../../Components/FormFieldWrapper";
import { Delete, DragHandle, HeadPhones, Note } from "../../Components/Icons";
import { get } from "lodash";
import { useOutletContext } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import { toast } from "react-hot-toast";

const Track = ({
  inputId,
  songFileId,
  songIndex,
  disabled = false,
  trackIndex,
}) => {
  const { session, setSession, byPassConfirmation, setByPassConfirmation } =
    useOutletContext();
  const song = session?.songs[songIndex];

  const activeOutputs = useMemo(() => {
    return (
      Object.entries(song.outputs)?.reduce(
        (acc, [outputName, outputConfig]) => {
          return {
            ...acc,
            [outputName]: outputConfig?.[inputId]?.active,
          };
        },
        {}
      ) || {}
    );
  }, [song, inputId]);

  const handleSetCheckBoxValue = (checkBoxName, checked) => {
    setSession([
      [
        `songs[${songIndex}].outputs.${checkBoxName}.${inputId}.active`,
        checked,
      ],
      [
        `songs[${songIndex}].outputs.${checkBoxName}.${inputId}.songFileId`,
        checked ? songFileId : "NC",
      ],
    ]);
  };
  const hasNoTrack = !song?.inputFiles?.[songFileId]?.fileName?.length;
  const trackDisbaled = disabled || hasNoTrack;
  const trackId = song?.inputFiles?.[songFileId].id;
  const checkBoxConfig = [
    {
      containerClass: "flex flex-col gap-1 justify-between mr-2 pr-3",
      containerStyle: {
        borderRight: "3px solid var(--btn-lighter)",
      },
      spanClass: "pt-1",
      spanChild: <HeadPhones height={16} width={16} />,
      checkBoxName: "headphones",
    },
    {
      containerClass: "flex flex-col gap-1",
      checkBoxName: "output1",
    },
    {
      containerClass: "flex flex-col gap-1",
      checkBoxName: "output2",
    },
    {
      containerClass: "flex flex-col gap-1",
      checkBoxName: "output3",
    },
    {
      containerClass: "flex flex-col gap-1",
      checkBoxName: "output4",
    },
    {
      containerClass: "flex flex-col gap-1",
      checkBoxName: "output5",
    },
    {
      containerClass: "flex flex-col gap-1",
      checkBoxName: "output6",
    },
  ];

  const handleDeleteTrack = () => {
    const tracks = [];
    /* clear track from inputFiles */
    for (const track of Object.values(song.inputFiles)) {
      tracks.push(track);
    }
    song.inputFiles = {};
    tracks.splice(trackIndex, 1);
    Array.from({ length: 7 }, (_, index) => {
      return {
        id: crypto.randomUUID(),
        displayName: `F${index + 1}`,
        songFile: "",
        fileName: "",
        directory: "",
        duration: 0,
        channelName: `Channel ${index + 1}`,
        numberOfChannels: 1,
        bitsPerSample: null,
        sampleRate: null,
        missingFile: false,
      };
    }).forEach((trackTemplate, index) => {
      const incIndex = index + 1;
      const track = tracks[index];
      if (!track) return (song.inputFiles[`F${incIndex}`] = trackTemplate);
      if (track.displayName.match(/[F\d]{2}/) != null) {
        // Update display name if it's still the F[1-n] format.
        track.displayName = trackTemplate.displayName;
      }
      song.inputFiles[`F${incIndex}`] = track;
      // if there's a file name, set this input as active on that output
      song.outputs[`output${incIndex}`][`IN${incIndex}`].active =
        !!track?.fileName;

      // if no track, clear all outputs referencing of this track
      if (!track?.fileName) {
        Object.values(song.outputs).forEach((output) => {
          output[`IN${incIndex}`].active = false;
        });
      }
    });
    setSession(`songs[${songIndex}]`, song);
  };
  return (
    <div className="pl-20 mt-4">
      <Draggable
        key={`${inputId}-${trackId}-${songIndex}`}
        draggableId={inputId}
        index={trackIndex}
        isDragDisabled={hasNoTrack}
      >
        {(draggableProvided) => (
          <div
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
          >
            <div className="flex items-center gap-4">
              <Note />
              <FormFieldWrapper id="track-title">
                <Input
                  disabled={trackDisbaled}
                  placeholder="Display Name"
                  className="w-16"
                  maxLength="2"
                  id="track-title"
                  type="text"
                  value={
                    song?.inputFiles?.[songFileId]?.displayName || songFileId
                  }
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
              <div className="flex gap-2">
                {checkBoxConfig.map(
                  (
                    {
                      containerClass,
                      containerStyle,
                      spanClass,
                      spanChild,
                      checkBoxName,
                    },
                    index
                  ) => {
                    return (
                      <div
                        key={`${inputId}-${index}-${checkBoxName}`}
                        className={containerClass}
                        style={containerStyle || {}}
                      >
                        <span className={spanClass}>
                          {spanChild ? spanChild : `${index}.`}
                        </span>
                        <Checkbox
                          disabled={trackDisbaled}
                          checkboxName={checkBoxName}
                          isChecked={activeOutputs[checkBoxName]}
                          onChecked={handleSetCheckBoxValue}
                        />
                      </div>
                    );
                  }
                )}
              </div>
              {!hasNoTrack ? (
                <>
                  <Button
                    theme="actionButton"
                    title="Delete Track"
                    label={<Delete />}
                    onClick={() => {
                      if (byPassConfirmation) {
                        return handleDeleteTrack();
                      }
                      toast.custom(
                        <div className="bg-[--btn] text-white p-4">
                          <div className="flex gap-4 items-center">
                            <div className="flex flex-col items-start gap-4">
                              <div>You really wanna do that?</div>
                              <div className="flex gap-2 text-xs">
                                <input
                                  value={byPassConfirmation}
                                  type="checkbox"
                                  name=""
                                  autoFocus
                                  id=""
                                  onChange={({ target }) =>
                                    setByPassConfirmation(target?.checked)
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
                                handleDeleteTrack();
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
                  <span {...draggableProvided.dragHandleProps}>
                    <Button
                      title="Move Track in Song"
                      theme="actionButton"
                      label={<DragHandle />}
                    />
                  </span>
                </>
              ) : null}
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default Track;
