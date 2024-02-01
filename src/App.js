import { useRef } from "react";
import "./App.css";

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
    body.current.style.outline = "solid red 1px";
    body.current.style.background = "red";
  };
  const dragleave = (e) => {
    body.current.style.outline = "";
    body.current.style.background = "black";
  };
  const drop = async (e) => {
    e.preventDefault();
    if (!supportsFileSystemAccessAPI && !supportsWebkitGetAsEntry) {
      // Cannot handle directories.
      return;
    }
    body.current.style.outline = "";
    body.current.style.background = "black";

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
    <div>
      <div
        onDragOver={dragover}
        onDragEnter={dragenter}
        onDragLeave={dragleave}
        onDrop={drop}
        ref={body}
        className="app"
      >
        Bulk Upload!
      </div>
    </div>
  );
}

export default App;
