import { useRef } from "react";
import "./App.css";
import idoruLogo from "./resources/Idoru-Logo-word_Dark.png";
import Button from "./Components/Button";
const supportsFileSystemAccessAPI =
  "getAsFileSystemHandle" in DataTransferItem.prototype;
const supportsWebkitGetAsEntry =
  "webkitGetAsEntry" in DataTransferItem.prototype;

function App() {
  const body = useRef(null);
  const dragover = (e) => {
    e.preventDefault();
  };
  const dragenter = (e) => {
    body.current.style.outline = "solid var(--white) 1px";
    body.current.style.background = "var(--btn-hover)";
  };
  const dragleave = (e) => {
    body.current.style.outline = "";
    body.current.style.background = "var(--charcoal)";
  };
  const drop = async (e) => {
    e.preventDefault();
    if (!supportsFileSystemAccessAPI && !supportsWebkitGetAsEntry) {
      // Cannot handle directories.
      return;
    }
    body.current.style.outline = "";
    body.current.style.background = "var(--charcoal)";

    const fileHandlesPromises = [...e.dataTransfer.items]
      .filter((item) => item.kind === "file")
      // …and, depending on previous feature detection…
      .map((item) =>
        supportsFileSystemAccessAPI
          ? // …either get a modern `FileSystemHandle`…
            item.getAsFileSystemHandle()
          : // …or a classic `FileSystemFileEntry`.
            item.webkitGetAsEntry()
      );
    (await Promise.all(fileHandlesPromises)).forEach(async (setList) => {
      console.log("setList: ", setList);
      if (setList.kind === "directory") {
        for await (const song of setList.values()) {
          if (song.kind === "directory") {
            // for await (const track of song.values()) {
            //   // console.log("resolve: ", await setList.resolve(track));
            //   // console.log({
            //   //   setList,
            //   //   song,
            //   //   track,
            //   // });
            // }
          }
        }
      }
    });
  };
  return (
    <div className="app">
      <nav className="w-full px-16 py-8 text-white bg-black flex justify-between">
        <div className="flex gap-4 items-center font-bold text-2xl">
          <img className="h-10 w-10" src={idoruLogo} alt="Logo" />{" "}
          <span>Idoru-P1 Bulk Uploader</span>
        </div>
        <Button
          label="Import Session"
          onClick={() => {
            console.log("Clicked!");
          }}
        />
      </nav>
      <div
        onDragOver={dragover}
        onDragEnter={dragenter}
        onDragLeave={dragleave}
        onDrop={drop}
        ref={body}
        className="h-64 w-full text-white p-8"
      >
        Drop Files here
      </div>
    </div>
  );
}

export default App;
