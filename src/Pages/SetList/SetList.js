import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import FormFieldWrapper from "../../Components/FormFieldWrapper";
import { Playlist, Folder, Delete, Copy } from "../../Components/Icons";
import { useOutletContext } from "react-router-dom";
import Songs from "./Songs";
import toast from "react-hot-toast";
import { cloneDeep } from "lodash";

const PlayList = () => {
  let { playListId } = useParams();
  const navigate = useNavigate();
  const {
    session,
    setSession,
    byPassConfirmation,
    setByPassConfirmation,
    delimiter,
    songsById,
  } = useOutletContext();
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
  const handleSetListCopy = () => {
    const newSession = cloneDeep(session);
    /* Create New setlist from selected set list */
    const newPlaylist = cloneDeep(playlist);
    newPlaylist.id = crypto.randomUUID();
    newPlaylist.name = `${playlist.name} (Copy)`;

    /* add setlist to session */
    newSession.session.playlists.push(newPlaylist.id);
    newSession.playlists.push(newPlaylist);

    /* Create new songs from songs associated with this setlist, add them to songs/setlist */
    const newSongs = playlist.songs.map((songId) => {
      const newSong = cloneDeep(songsById[songId]);
      /* Create new song id */
      newSong.id = crypto.randomUUID();
      return newSong;
    });
    newSession.playlists[session.playlists.length - 1].songs = newSongs.map(
      ({ id }) => id
    );
    newSession.songs.push(...newSongs);
    setSession("", newSession);
    navigate(`/setlist/${newPlaylist.id}`);
  };
  const handleRemoveSetList = () => {
    const newSession = cloneDeep(session);
    /* remove setlist from session */
    newSession.session.playlists = newSession.session.playlists.filter(
      (id) => id !== playListId
    );
    newSession.playlists = newSession.playlists.filter(
      (playlist) => playlist.id !== playListId
    );

    /* Filter out songs related to this setlist */
    const newSongs = newSession.songs.filter(
      ({ id }) => !playlist.songs.includes(id)
    );
    newSession.songs = newSongs;
    setSession("", newSession);
    navigate(
      `/setlist/${newSession?.playlists?.[newSession.playlists.length - 1]?.id}`
    );
  };
  return (
    <div className="w-full text-white p-8">
      {session?.playlists?.length ? (
        <div className="flex justify-between mt-[-1rem] mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Playlist />
            <select
              id="end-of-song"
              name="play-next"
              className="py-4 pl-1 pr-[2px] border-r-[8px] border-r-transparent bg-[--btn] w-96 rounded-md text-white"
              value={playListId || ""}
              onChange={(e) => {
                navigate(`/setlist/${e.target.value}`);
              }}
            >
              <option disabled key={"null"} value="">
                Set Lists
              </option>
              {session?.playlists?.map((playlist) => (
                <option key={playlist?.id} value={playlist?.id}>
                  {playlist?.name}{" "}
                </option>
              ))}
            </select>
            <Button
              title="Duplicate current Set List"
              theme="actionButton"
              label={<Copy />}
              onClick={handleSetListCopy}
            />
            <Button
              title="Duplicate current Set List"
              theme="actionButton"
              label={<Delete />}
              onClick={handleRemoveSetList}
            />
          </div>
          <div className="w-full flex justify-end">
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
        {/* 
          playlist.filePath is a property generated locally, it's presence indicates the setlist was
          by the bulk-uploader. Thus, a directory string must be provided by the end-user in order to
          export a session.
         */}
        {playlist?.hasOwnProperty("filePath") ? (
          <div className="flex items-center gap-4">
            <Folder />
            <FormFieldWrapper id="src-path">
              <div className="flex items-center relative">
                <Input
                  placeholder="Path to Directory"
                  required={true}
                  id="src-path"
                  name="src-path"
                  type="text"
                  title="Due to limitations of browsers, files imported will only include relative paths from the directory that is selected. In order to correctly export files in the Idoru app, the absolute path from the root of your computer must be provided. See the /Help for more information."
                  value={session?.playlists?.[playlistIndex]?.filePath || ""}
                  onBlur={(e) => {
                    let filePath = e?.target?.value;
                    if (!filePath) return;
                    /* ensure file path ends in / */
                    if (!filePath.endsWith(delimiter)) filePath += delimiter;
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
              </div>
            </FormFieldWrapper>
          </div>
        ) : null}
        <Button
          theme="actionButton"
          style={{ marginLeft: "-1rem" }}
          title="Delete Setlist"
          label={<Delete />}
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
                        autoFocus
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
