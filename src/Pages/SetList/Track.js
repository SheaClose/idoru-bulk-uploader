import React from "react";
import Input from "../../Components/Input";
import Checkbox from "../../Components/Checkbox";
import Button from "../../Components/Button";
import FormFieldWrapper from "../../Components/FormFieldWrapper";
import { Close, DragHandle, HeadPhones, Note } from "../../Components/Icons";
import { get } from "lodash";
import { useOutletContext } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
const Track = ({
  inputId,
  songFileId,
  songIndex,
  disabled = false,
  trackIndex,
}) => {
  const { session, setSession } = useOutletContext();
  const song = session?.songs[songIndex];

  const activeOutputs =
    Object.entries(song.outputs)?.reduce((acc, [outputName, outputConfig]) => {
      return {
        ...acc,
        [outputName]: outputConfig?.[inputId]?.active,
      };
    }, {}) || {};

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
              <Button
                theme="actionButton"
                label={<Close />}
                onClick={() => {
                  console.log("remove track");
                }}
              />
              {!hasNoTrack ? (
                <span
                  {...draggableProvided.dragHandleProps}
                  className="hover:!cursor-grab"
                >
                  <Button theme="actionButton" label={<DragHandle />} />
                </span>
              ) : null}
              {/* <div
                {...draggableProvided.dragHandleProps}
                className="border border-[--btn-darker] p-1 rounded-md hover:bg-[--btn-hover] bg-[--btn]"
              >
                <DragHandle />
              </div> */}
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default Track;
