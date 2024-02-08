import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import idoruLogo from "./resources/Idoru-Logo-word_Dark.png";
import Slide from "./Components/Slide";
import { useLocation, useParams, useNavigate, Outlet } from "react-router-dom";
import FormFieldWrapper from "./Components/FormFieldWrapper";
import { DragDropContext } from "react-beautiful-dnd";
import { set } from "lodash";
import { FileDrop } from "react-file-drop";
import { onDrop, generateNewTrack } from "./resources/parseFiles";
import Spinner from "./Components/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
function App() {
  let { playListId } = useParams();
  const navigate = useNavigate();
  let { pathname } = useLocation();
  const [session, ogSetSession] = useState(
    JSON.parse(localStorage.getItem("iP1Session"))
  );
  const [loading, setLoading] = useState(false);
  const [byPassConfirmation, setByPassConfirmation] = useState(false);
  useEffect(() => {
    localStorage.setItem("iP1Session", JSON.stringify(session));
  }, [session]);

  /**
   * This will create a global state and a way to set it
   *
   * @param {string | [string, any]} path the nested path value that needs to be changed
   * @param {any} [value] the value to set it to
   *
   * @returns {undefined}
   */
  const setSession = (path, value) => {
    // No path given, overwrite the entire file
    if (!path) {
      ogSetSession(value);
      return;
    }

    // Multiple values given, itterate over values ([ [path, val], [path, val] ]), then update all at once.
    if (Array.isArray(path)) {
      const newSession = path.reduce(
        (acc, [nextPath, nextVal]) => {
          return set(acc, nextPath, nextVal);
        },
        { ...JSON.parse(localStorage.getItem("iP1Session")) }
      );
      ogSetSession(newSession);
      return;
    }

    // expected path value pair given.
    ogSetSession(
      set({ ...JSON.parse(localStorage.getItem("iP1Session")) }, path, value)
    );
  };

  const songsById = useMemo(() => {
    if (!session?.songs) return;
    const songsById = session.songs.reduce((acc, song) => {
      return { ...acc, [song.id]: song };
    }, {});
    return songsById;
  }, [session?.songs]);

  const handleImport = (e) => {
    if (!e?.target?.files?.length) return;
    setLoading(true);
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const text = e.target.result;
      setSession("", JSON.parse(text));
      setLoading(false);
      navigate(`/setlist/${JSON.parse(text)?.playlists?.[0]?.id}`);
    };
    fileReader.readAsText(e?.target?.files[0]);
  };

  useEffect(() => {
    if (pathname === "/" && session?.playlists?.length) {
      // if landing on root, but playlists exist, go ahead and load first playlist
      navigate(`/setlist/${session.playlists?.[0]?.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragEnd = ({ source, destination }) => {
    const sourceIndex = source?.index;
    const destinationIndex = destination?.index;
    // something went wrong, abandon ship!
    if (sourceIndex == null || destinationIndex == null) return;

    const playlistIndex = session?.playlists?.findIndex(
      ({ id }) => id === playListId
    );
    const songs = session?.playlists?.[playlistIndex]?.songs;
    const newSongs = [...songs];
    const [songId] = newSongs.splice(sourceIndex, 1);
    newSongs.splice(destinationIndex, 0, songId);
    setSession(`playlists[${playlistIndex}].songs`, newSongs);
  };

  const handleExport = () => {
    /*
      TODO: once drag import is done, address song locations based on:
        session?.playlists?.[playlistIndex]?.filePath
      Unless an *.idoru file was used for import.
    */
    let canUpload = true;
    session.playlists.forEach((playlist, playlistIndex) => {
      if (playlist.hasOwnProperty("filePath") && !playlist.filePath) {
        canUpload = false;
        return toast(
          `Setlists that were created within this tool MUST have a file path to the directory. \n\nCheck Setlist named: "${playlist.name}" and verify "Path to Directory:" is filled out. \n\nSee FAQ for more info.`,
          { duration: 7500 }
        );
      }
      playlist.songs.forEach((songId) => {
        const song = songsById[songId];
        const newF7 = generateNewTrack(7);
        newF7.directory = "";
        song.inputFiles = Object.entries(song.inputFiles)
          .sort((a, z) => a[0].toUpperCase().localeCompare(z[0].toUpperCase()))
          .slice(0, 6)
          .reduce((acc, [key, val]) => {
            val.directory = val.directory.replace(
              "#{directory}",
              session?.playlists?.[playlistIndex]?.filePath
            );
            return { ...acc, [key]: val };
          }, {});
        song.inputFiles["F7"] = newF7;
      });
    });
    /* END cleanup */
    if (!canUpload) return;
    /* Verify Values?  */
    const fileName = `${session?.session?.name || "Untitled Session"}.idoru`;
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:application/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(session))
    );
    element.setAttribute("download", fileName);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const onFrameDrop = async (event) => {
    setLoading(true);
    toast(
      `Depending on how many songs you're adding, this may take a moment, please be patient, JavaSconcript is trying it's best..
          
          Like, seriously, if the spinner's running, we're processing, go get a tea or something.`,
      { duration: 70000 }
    );
    const { newSession, latestSetlistId } =
      (await onDrop(event, session)) || {};
    toast.remove();
    setLoading(false);
    if (!newSession) {
      return;
    }
    ogSetSession(newSession);
    navigate(`/setlist/${latestSetlistId}`);
  };

  const onNavItemSelect = (navItem, ...args) => {
    switch (navItem) {
      case "Import":
        handleImport(...args);
        break;

      case "Export":
        handleExport();
        break;

      case "Reset":
        setSession("", {
          session: {
            checkMissingFiles: false,
            deviceImport: false,
            filePath: "",
            id: crypto.randomUUID(),
            name: "",
            playlists: [],
          },
          playlists: [],
          songs: [],
        });
        navigate("/");
        break;

      case "Help":
        navigate("/help");
        break;

      default:
        break;
    }
  };
  return (
    <div className="app">
      {/* <Modal /> */}
      {loading ? <Spinner /> : null}
      <Toaster toastOptions={{ duration: 5000 }} />

      <nav className="w-full p-8 md:pl-16 pr-6 md:py-8 text-white bg-black flex justify-between items-center">
        <Link to="/" className="flex gap-4 items-center font-bold text-2xl">
          <img className="h-10 w-10" src={idoruLogo} alt="Logo" />{" "}
          <div className="flex flex-col">Idoru-P1 Bulk Uploader</div>
        </Link>
        <Slide onNavItemSelect={onNavItemSelect} />
      </nav>
      <DragDropContext onDragEnd={onDragEnd}>
        <FileDrop onFrameDrop={onFrameDrop}>
          {/* 
            Todo: Style body based on drag event.
            onDragOver: function(event): Callback when the user is dragging over the target. Also adds the file-drop-dragging-over-target class to the file-drop-target.

            onDragLeave: function(event): Callback when the user leaves the target. Removes the file-drop-dragging-over-target class from the file-drop-target.
          */}
          <FormFieldWrapper
            id="end-of-song"
            className="w-full"
          ></FormFieldWrapper>
          <Outlet
            context={{
              session,
              setSession,
              songsById,
              byPassConfirmation,
              setByPassConfirmation,
            }}
          />
        </FileDrop>
      </DragDropContext>
    </div>
  );
}

export default App;
