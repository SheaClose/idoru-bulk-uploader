import React from "react";
import Input from "../../Components/Input";
import Checkbox from "../../Components/Checkbox";
import FormFieldWrapper from "../../Components/FormFieldWrapper";
import { HeadPhones, Note } from "../../Components/Icons";
import { get } from "lodash";
import useSetStorage from "../../utils/useSetStorage";

const Track = ({ inputId, songFileId, songIndex }) => {
  const { session, setSession } = useSetStorage();
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

  const trackDisbaled = !song?.inputFiles?.[songFileId]?.fileName?.length;
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
            value={song?.inputFiles?.[songFileId]?.displayName || songFileId}
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
                  key={`${inputId}-${index}`}
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
      </div>
    </div>
  );
};

export default Track;
