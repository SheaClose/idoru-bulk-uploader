import { cloneDeep } from "lodash";
import toast from "react-hot-toast";
const supportsFileSystemAccessAPI =
  "getAsFileSystemHandle" in DataTransferItem.prototype;
const supportsWebkitGetAsEntry =
  "webkitGetAsEntry" in DataTransferItem.prototype;

const playlistTemplate = {
  id: "",
  name: "",
  isOpen: true,
  songs: [],
  stereoLinks: [],
  outputs: {
    headphones: { level: 95 },
    output1: { level: 95 },
    output2: { level: 95 },
    output3: { level: 95 },
    output4: { level: 95 },
    output5: { level: 95 },
    output6: { level: 95 },
  },
};

const songTemplate = {
  id: "",
  name: "",
  level: 0,
  bpm: 120,
  endOfSong: "QueueNext",
  midiFile: {
    id: "8aca8d93-a13d-4dd3-81da-ea51d695c984",
    fileName: null,
    filePath: null,
  },
  inputFiles: {
    F1: {
      id: "",
      displayName: "F1",
      songFile: "",
      fileName: "",
      directory: "",
      duration: 0,
      channelName: "Channel 1",
      numberOfChannels: 1,
      bitsPerSample: 16,
      sampleRate: 44100,
      missingFile: false,
    },
    F2: {
      id: "",
      displayName: "F2",
      songFile: "",
      fileName: "",
      directory: "",
      duration: 0,
      channelName: "Channel 2",
      numberOfChannels: 1,
      bitsPerSample: 16,
      sampleRate: 44100,
      missingFile: false,
    },
    F3: {
      id: "",
      displayName: "F3",
      songFile: "",
      fileName: "",
      directory: "",
      duration: 0,
      channelName: "Channel 3",
      numberOfChannels: 2,
      bitsPerSample: 16,
      sampleRate: 44100,
      missingFile: false,
    },
    F4: {
      id: "",
      displayName: "F4",
      songFile: "",
      fileName: "",
      directory: "",
      duration: 0,
      channelName: "Channel 4",
      numberOfChannels: 2,
      bitsPerSample: 16,
      sampleRate: 44100,
      missingFile: false,
    },
    F5: {
      id: "",
      displayName: "F5",
      songFile: "",
      fileName: "",
      directory: "",
      duration: 0,
      channelName: "Channel 5",
      numberOfChannels: 1,
      bitsPerSample: null,
      sampleRate: null,
      missingFile: false,
    },
    F6: {
      id: "",
      displayName: "F6",
      songFile: "",
      fileName: "",
      directory: "",
      duration: 0,
      channelName: "Channel 6",
      numberOfChannels: 1,
      bitsPerSample: null,
      sampleRate: null,
      missingFile: false,
    },
    F7: {
      id: "",
      displayName: "",
      songFile: "",
      fileName: "",
      directory: "",
      duration: 0,
      channelName: "Channel 7",
      numberOfChannels: 1,
      bitsPerSample: null,
      sampleRate: null,
      missingFile: false,
    },
  },
  outputs: {
    headphones: {
      IN1: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN2: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN3: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN4: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN5: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN6: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN7: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
    },
    output1: {
      IN1: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN2: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN3: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN4: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN5: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN6: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN7: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
    },
    output2: {
      IN1: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN2: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN3: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN4: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN5: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN6: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN7: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
    },
    output3: {
      IN1: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN2: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN3: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN4: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN5: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN6: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN7: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
    },
    output4: {
      IN1: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN2: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN3: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN4: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN5: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN6: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN7: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
    },
    output5: {
      IN1: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN2: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN3: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN4: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN5: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN6: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN7: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
    },
    output6: {
      IN1: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN2: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN3: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN4: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN5: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN6: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN7: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
    },
    output7: {
      IN1: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN2: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN3: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN4: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN5: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN6: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
      IN7: {
        songFileId: "NC",
        level: 95,
        mute: false,
        active: false,
      },
    },
  },
};

const sessionTemplate = {
  session: {
    isBulkUploader: true,
    checkMissingFiles: false,
    deviceImport: false,
    filePath: "",
    id: "",
    name: "",
    playlists: [],
  },
  playlists: [],
  songs: [],
};

const generateNewSession = () => {
  const session = cloneDeep(sessionTemplate);
  session.session.id = crypto.randomUUID();
  return session;
};

const addPlaylistToSession = (session, setlistName) => {
  const playlist = cloneDeep(playlistTemplate);
  playlist.id = crypto.randomUUID();
  playlist.name = setlistName;
  session.session.playlists.push(playlist.id);
  session.playlists.push(playlist);
  return playlist.id;
};

const generateNewSong = (name) => {
  const song = cloneDeep(songTemplate);
  song.id = crypto.randomUUID();
  song.name = name;
  return song;
};

const addSongToSession = (session, playlistIndex, song) => {
  session.playlists[playlistIndex].songs.push(song.id);
  session.songs.push(song);
};

export const generateNewTrack = (index, fileName = "", path, trackConfig) => {
  const track = {
    id: crypto.randomUUID(),
    displayName: `F${index}`,
    songFile: "",
    fileName: fileName,
    directory: `#{directory}/${path}`,
    duration: trackConfig?.duration || 0,
    channelName: `Channel ${index}`,
    numberOfChannels: trackConfig?.numberOfChannels || 1,
    bitsPerSample: 16,
    sampleRate: trackConfig?.sampleRate || 44100,
    missingFile: false,
  };
  return track;
};

export const onDrop = async (event, session) => {
  event.preventDefault();
  let newSession;
  /* Start new Session */
  if (!session) {
    newSession = generateNewSession();
  } else {
    newSession = cloneDeep(session);
  }

  if (!supportsFileSystemAccessAPI && !supportsWebkitGetAsEntry) {
    toast(
      "System doesn't support directory upload. Please import *.idoru file to use this application."
    );
    return;
  }

  const item = event?.dataTransfer?.items?.[0];
  if (!item) return;
  let setlistName;
  const setlist = await (supportsFileSystemAccessAPI
    ? item.getAsFileSystemHandle()
    : item.webkitGetAsEntry());
  if (setlist?.kind !== "directory") {
    toast.remove();
    return toast("Setlist must be a directory!", { duration: 2000 });
  }
  setlistName = setlist.name;
  let playlistId = addPlaylistToSession(newSession, setlistName);
  for await (const song of setlist.values()) {
    /* skip files (.DS_Store, etc) in song directory */
    if (song?.kind !== "directory") continue;
    const newSong = generateNewSong(song.name);
    const tracks = [];
    for await (const track of song.values()) {
      /* ignore any further directories, focus only on files */
      /* Only accept .wav files */
      if (
        track?.kind !== "file" ||
        !track.name.toLowerCase().includes(".wav")
      ) {
        continue;
      }
      const trackFile = await track.getFile();
      tracks.push(
        new Promise((res, rej) => {
          const audioContext = new AudioContext();
          const reader = new FileReader();
          function decodedDone(decoded) {
            new Float32Array(decoded.length);
            decoded.getChannelData(0);
          }
          reader.onload = async function () {
            const arrayBuffer = reader.result;
            res({
              name: track.name,
              data: await audioContext.decodeAudioData(
                arrayBuffer,
                decodedDone
              ),
            });
          };
          reader.readAsArrayBuffer(trackFile);
        })
      );
    }
    const tracksData = await Promise.all(tracks);
    /*
      assign tracks to song input files,
      assign first 6 inputs to corresponding output.
    */
    tracksData
      .sort((a, z) => {
        return a.name.toLowerCase().localeCompare(z.name.toLowerCase());
      })
      .forEach(({ name, data }, index) => {
        const incIndex = index + 1;
        newSong.inputFiles[`F${incIndex}`] = generateNewTrack(
          incIndex,
          name,
          `${setlistName}/${song.name}/${name}`,
          data
        );
        if (incIndex > 6) return;
        newSong.outputs[`output${incIndex}`][
          `IN${incIndex}`
        ].songFileId = `F${incIndex}`;
        newSong.outputs[`output${incIndex}`][`IN${incIndex}`].active = true;
      });
    addSongToSession(
      newSession,
      newSession.session.playlists.findIndex((c) => c === playlistId),
      newSong
    );
  }
  return { newSession, latestSetlistId: playlistId };
};
