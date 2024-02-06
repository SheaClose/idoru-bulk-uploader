import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../Components/Input";
import FormFieldWrapper from "../../Components/FormFieldWrapper";
import { Playlist, Help, Folder } from "../../Components/Icons";
import { useOutletContext } from "react-router-dom";
import Songs from "./Songs";
import classNames from "classnames";

const PlayList = () => {
  let { playListId } = useParams();
  const navigate = useNavigate();
  const { session, setSession, setListsNeedingDirectoryPath } =
    useOutletContext();
  const playlistIndex = session?.playlists?.findIndex(
    ({ id }) => id === playListId
  );
  const playlist = session?.playlists?.[playlistIndex];
  useEffect(() => {
    if (!playlist) {
      navigate("/");
    }
  }, [playlist, navigate]);

  return (
    <div className="w-full text-white p-8">
      <div className="w-full flex gap-8 py-2">
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
            <div
              className={classNames("flex items-center relative", {
                "ring-1 ring-[--pink]":
                  setListsNeedingDirectoryPath.includes(playListId) &&
                  !session?.playlists?.[playlistIndex]?.filePath,
              })}
            >
              <Input
                placeholder="Path to Directory"
                id="src-path"
                name="src-path"
                type="text"
                value={session?.playlists?.[playlistIndex]?.filePath || ""}
                onBlur={(e) => {
                  let filePath = e?.target?.value;
                  if (!filePath) return;
                  /* ensure file path ends in / */
                  if (!filePath.endsWith("/")) filePath += "/";
                  setSession(`playlists[${playlistIndex}].filePath`, filePath);
                }}
                onChange={(e) =>
                  setSession(
                    `playlists[${playlistIndex}].filePath`,
                    e?.target?.value
                  )
                }
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
      <Songs />
    </div>
  );
};

export default PlayList;
