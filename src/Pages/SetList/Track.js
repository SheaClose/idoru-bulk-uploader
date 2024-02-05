import React from "react";
import Input from "../../Components/Input";
import Checkbox from "../../Components/Checkbox";
import FormFieldWrapper from "../../Components/FormFieldWrapper";
import { HeadPhones, Note } from "../../Components/Icons";
import { get } from "lodash";
import useSetStorage from "../../utils/useSetStorage";

const Track = ({ inputFile, songFileId, songIndex, song }) => {
  const activeOutputs = Object.entries(song.outputs)
    .map(([outputName, outputConfig]) => {
      const trackConfig = Object.values(outputConfig).find(
        (val) => val.songFileId === songFileId
      );
      if (trackConfig?.active) return outputName;
      return undefined;
    })
    .filter((c) => c);
  const { session, setSession } = useSetStorage();
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
      <div className="flex gap-2 pl-8 pt-2">
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
            isChecked={activeOutputs?.includes("headphones")}
            onChecked={(checked) => {}}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>1.</span>
          <Checkbox
            isChecked={activeOutputs?.includes("output1")}
            onChecked={(checked) => {}}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>2.</span>
          <Checkbox
            isChecked={activeOutputs?.includes("output2")}
            onChecked={(checked) => {}}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>3.</span>
          <Checkbox
            isChecked={activeOutputs?.includes("output3")}
            onChecked={(checked) => {}}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>4.</span>
          <Checkbox
            isChecked={activeOutputs?.includes("output4")}
            onChecked={(checked) => {}}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>5.</span>
          <Checkbox
            isChecked={activeOutputs?.includes("output5")}
            onChecked={(checked) => {}}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>6.</span>
          <Checkbox
            isChecked={activeOutputs?.includes("output6")}
            onChecked={(checked) => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Track;
