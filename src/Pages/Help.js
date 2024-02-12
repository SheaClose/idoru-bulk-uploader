import React from "react";

const Help = () => {
  return (
    <div className="w-auto text-white m-4 p-4 md:m-20 md:p-12 bg-[--btn] rounded-md flex flex-col gap-8 max-w-6xl break-words">
      <div className="text-2xl font-extrabold text-[--btn-text-hover]">
        How to use this App.
      </div>
      <div className="text-xl font-medium grid gap-8 md:px-8">
        <div className="grid gap-4">
          <div className="text-lg font-extrabold text-[--btn-text-hover]">
            Importing *.idoru files:
          </div>
          <p>
            If you simply want to update values in a pre-existing session;
            Updating song names/order, track names/order, End of song Behavior,
            BPM, routing configuration, etc.
          </p>
          <p>
            Select the hamburger menu from the top right corner of the page.
          </p>
          <p>
            Select "Import":
            <img
              src="https://s3.ca-central-1.amazonaws.com/assets.sheaclose.com/Import+Medium.jpeg"
              alt=""
            />
          </p>
          <p>
            Select your *.idoru session and edit. Changes will be saved on every
            change.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="text-lg font-extrabold text-[--btn-text-hover]">
            Drag/Drop Folder into app:
          </div>
          <p>
            When dragging a folder into the app, your file structure needs to be
            correctly configured. The expected set up is{" "}
            <span className="font-semibold">
              [folder that is named what you want your playlist named]
            </span>{" "}
            &gt;{" "}
            <span className="font-semibold">[folders named by song title]</span>{" "}
            &gt;{" "}
            <span className="font-semibold">
              [tracks/midi files to be associated with each song]
            </span>
            .
            <img
              src="https://s3.ca-central-1.amazonaws.com/assets.sheaclose.com/File+Structure+Medium.jpeg"
              alt=""
            />
          </p>
          <p>
            From a file explorer on your system grab the root directory ("Set
            List" in the above photo), drag it into the browser window and drop
            it in the body of the page. On file drop, you will be provided an
            option on how to upload.
            <img
              src="https://s3.ca-central-1.amazonaws.com/assets.sheaclose.com/uplod+options.jpeg"
              alt=""
            />
          </p>
          <p>
            <span className="font-semibold">Accurate</span>: This is the
            superior way to upload files. The app will parse the file structure
            and inspect each track provided. This is necessary to correctly
            configure the track meta-data used by the Idoru App and verify the
            files can be used.
          </p>
          <p>
            <span className="font-semibold">Fast</span>: Depending on the number
            of files you are importing the "accurate" method can be very time
            consuming. As an alternative I have provided a fast method. The
            benefit is that only the folder/file names will be parsed, and as
            such will complete extremely quickly. The drawback is that the files
            meta-data has to be assumed. If your bit rate or sample rate are
            invalid, you will need to repeat the process. It is also assumed all
            songs are in stereo, meaning you will have fewer channels for
            routing when you import into the Idoru app.
          </p>
        </div>
      </div>
      <div className="text-xl font-medium grid gap-8 md:px-8">
        <div className="grid gap-4">
          <div className="text-lg font-extrabold text-[--btn-text-hover]">
            After Importing:
          </div>
          <p>
            If you import your session via drag/drop, you will notice an input
            in your setlist titled "Path to Directory:". Due to limitations of
            browsers, files imported will only include relative paths from the
            directory that is selected. In order to correctly export files into
            the Idoru app, the absolute path from the root of your computer must
            be provided.
          </p>
          <p>
            <span className="font-semibold">Windows</span>: In the File
            explorer, from the directory you uploaded copy the file path from
            the url bar.
          </p>
          <img
            src="https://s3.ca-central-1.amazonaws.com/assets.sheaclose.com/Screenshot+(3).png"
            alt=""
          />
          <p>
            <span className="font-semibold">Mac</span>: In finder, either right
            click the directory you uploaded and select "Get Info" or from
            within the directory you uploaded, select "File &gt; Get Info" \n\n
            then right click the pathname (titled "Where") and select "Copy as
            Pathname"
          </p>
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <img
              src="https://s3.ca-central-1.amazonaws.com/assets.sheaclose.com/Get+Info+Medium.jpeg"
              alt=""
            />
            <img
              src="https://s3.ca-central-1.amazonaws.com/assets.sheaclose.com/Copy+as+pathname+Medium.jpeg"
              alt=""
            />
          </div>
          <p>
            Paste this into the "Path to Directory:" input in the setlist view.
            From here your session is ready to edit. Changes will be saved on
            every change.
          </p>
        </div>
      </div>
      <div className="text-xl font-medium grid gap-8 md:px-8">
        <div className="grid gap-4">
          <div className="text-lg font-extrabold text-[--btn-text-hover]">
            Exporting *.idoru files:
          </div>
          <p>
            Once you are done editing, select the hamburger menu from the
            top-right of the page. Select "Export". If you have provided a
            "Session Name" in the provided input, this will be the file name,
            otherwise it will be saved as "Untitled Session"
          </p>
          <p>
            You can then open this file in the Idoru app. Verify that the songs
            are mapped correctly (no errors appear.) Then you are good to "Send
            to P-1". If all went correctly you should be good to go.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
