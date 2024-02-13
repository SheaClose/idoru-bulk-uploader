import toast from "react-hot-toast";

const supportsFileSystemAccessAPI =
  "getAsFileSystemHandle" in DataTransferItem.prototype;
const supportsWebkitGetAsEntry =
  "webkitGetAsEntry" in DataTransferItem.prototype;

export const handleAsyncFileTransfer = async (event) => {
  event.preventDefault();
  let setlist = {};
  if (!supportsFileSystemAccessAPI && !supportsWebkitGetAsEntry) return;
  const item = event?.dataTransfer?.items?.[0];
  if (!item) return;
  let setlistName;
  const _setlist = await (supportsFileSystemAccessAPI
    ? item.getAsFileSystemHandle()
    : item.webkitGetAsEntry());
  if (_setlist?.kind !== "directory")
    return toast.error(
      "This app does not currently support importing files, See /help for more information on how to correctly use this application"
    );
  setlistName = _setlist?.name;
  setlist.name = setlistName;
  for await (const song of _setlist?.values()) {
    /* ignore files in "song" level of parsing */
    if (song?.kind !== "directory") continue;
    setlist[song.name] = [];
    for await (const track of song.values()) {
      const trackIsAudio = track.name.toLowerCase().includes(".wav");
      const trackIsMidi = track.name.toLowerCase().includes(".mid");
      if (track?.kind !== "file" || !(trackIsAudio || trackIsMidi)) {
        continue;
      }
      setlist[song.name].push(track);
    }
  }
  return setlist;
};
