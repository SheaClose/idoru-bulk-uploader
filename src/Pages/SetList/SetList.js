import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import FormFieldWrapper from "../../Components/FormFieldWrapper";
import { Playlist, Help, Folder, Close } from "../../Components/Icons";
import { useOutletContext } from "react-router-dom";
import Songs from "./Songs";
import toast from "react-hot-toast";

const PlayList = () => {
  let { playListId } = useParams();
  const navigate = useNavigate();
  const { session, setSession, byPassConfirmation, setByPassConfirmation } =
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

  const handleSetlistDelete = () => {
    const playlists = session?.playlists?.filter(({ id }) => id !== playListId);
    const sessionPlaylists = session?.session?.playlists?.filter(
      (id) => id !== playListId
    );
    setSession([
      [`playlists`, playlists],
      [`session.playlists`, sessionPlaylists],
    ]);
    const newPlaylistId = session?.session?.playlists[0];
    navigate(newPlaylistId ? `/setlist/${newPlaylistId}` : "/");
  };

  return (
    <div className="w-full text-white p-8">
      {session?.playlists?.length ? (
        <div className="pb-8 mt-[-1rem] w-full flex justify-end">
          <FormFieldWrapper id="session-name">
            <Input
              placeholder="Session Name"
              id="session-name"
              name="session-name"
              type="text"
              value={session?.session?.name}
              onChange={(e) => {
                setSession(`session.name`, e.target.value);
              }}
            />
          </FormFieldWrapper>
        </div>
      ) : null}
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
        {playlist?.hasOwnProperty("filePath") ? (
          <div className="flex items-center gap-4">
            <Folder />
            <FormFieldWrapper id="src-path">
              <div className="flex items-center relative">
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
                    setSession(
                      `playlists[${playlistIndex}].filePath`,
                      filePath
                    );
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
                    toast(
                      `Due to limitations of browsers, files imported will only include relative paths from the directory that is selected. In order to correctly export files in the Idoru app, the absolute path from the root of your computer must be provided. \n\nSee the FAQ for more information.`,
                      { duration: 10000 }
                    )
                  }
                >
                  <Help height={14} width={14} />
                </span>
              </div>
            </FormFieldWrapper>
          </div>
        ) : null}
        <Button
          theme="actionButton"
          style={{ marginLeft: "-1rem" }}
          title="Delete Setlist"
          autoFocus={true}
          label={<Close />}
          onClick={() => {
            if (byPassConfirmation) {
              return handleSetlistDelete();
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
                      handleSetlistDelete();
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
      <Songs />
    </div>
  );
};

export default PlayList;
