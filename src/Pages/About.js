import React, { useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const [truncateIs, setTruncateIs] = useState(true);
  const [truncateIsNot, setTruncateIsNot] = useState(true);
  return (
    <div className="w-auto text-white m-4 p-4 md:m-20 md:p-12 bg-[--btn] rounded-md flex flex-col gap-8 max-w-6xl break-words">
      <div
        className="relative h-80 w-full bg-[center_center] bg-no-repeat bg-cover bg-[--charcoal] rounded-xl"
        style={{
          backgroundImage:
            'url("https://s3.ca-central-1.amazonaws.com/assets.sheaclose.com/product_top_front2x.jpeg")',
        }}
      >
        <div className="absolute opacity-10"></div>
      </div>
      <div className="text-2xl font-extrabold text-[--btn-text-hover]">
        The (Unofficial) Idoru P-1 Bulk Uploader
      </div>
      <div className="text-xl font-medium grid gap-8 md:px-8">
        <div className="text-lg font-extrabold text-[--btn-text-hover] -mb-4">
          What this app is!
        </div>
        <p>
          Simply put, this web application is a way to quickly generate a
          setlist by dragging and dropping a Folder (separated by song) directly
          into the browser window. The app will then process the the
          sub-directories automatically creating a setlist, songs, and mapping
          tracks (and some basic routing) for you.
        </p>
        {truncateIs ? (
          <span
            className="-mt-6 cursor-pointer text-[--btn-text] text-sm"
            onClick={() => setTruncateIs(false)}
          >
            [show more]
          </span>
        ) : (
          <>
            <p>
              After purchasing the Idoru P-1, and subsequently using the Idoru
              app. I found myself missing functionality I have used with other
              backing track apps. While the app gives you an incredible amount
              of fine tune adjustments, I don't find myself using the vast
              majority of those adjustments... With great power comes great
              complexity.
            </p>
            <p>
              Thankfully, the Idoru team has chosen to handle all of the
              configuration of sessions/setlists/songs/tracks via a file format
              called JSON. Because of this, it's *relatively* straight-forward
              to to reverse engineer the setup of sessions, allowing me to build
              a tool that can do the things I wished the app already did. Having
              spoken with a member of the Idoru team (and with their approval,)
              I've created this tool as a companion to the Idoru app. Adding,
              what I believe to be, improvements to the workflow of generating
              setlists.
            </p>
            <span
              className="-mt-6 cursor-pointer text-[--btn-text] text-sm"
              onClick={() => setTruncateIs(true)}
            >
              [show less]
            </span>
          </>
        )}

        <div className="text-lg font-extrabold text-[--btn-text-hover] -mb-4">
          and isn't...
        </div>
        <p>
          There are limitations to what one can achieve in Javascript and in the
          context of a browser window. Because of that, this is explicitly a
          companion TO the Idoru app, not a replacement OF it. From within this
          page, you can import an existing *.idoru session and quickly make some
          common adjustments (session/setlist/song/track/display names, channel
          routing, re-ordering, end of song behavior, BPM, etc..) all from a
          single view. When those changes are made, you can then export the
          changes to a new *.idoru file. Only from there will you be able to
          send your session to the P1. A website, from an internet browser is
          not capable of modifying files on your computer, or connecting to your
          pedal, and nor SHOULD it be.
        </p>
        {truncateIsNot ? (
          <span
            className="-mt-6 cursor-pointer text-[--btn-text] text-sm"
            onClick={() => setTruncateIsNot(false)}
          >
            [show more]
          </span>
        ) : (
          <>
            <p>
              Because of these limitations, some rather clunky compromises have
              had to be made, and this app is fairly prescriptive in its usage.
              I have tried to make it as intuitive as is possible, however, you
              will likely need to check out the{" "}
              <Link to="/help">Help page</Link> to understand how to get the
              most out of this app, and some basic instructions for its use.
            </p>
            <p>
              This is very much a work in progress, so you may see some bugs. If
              you have trouble with this app, please{" "}
              <a
                className="underline text-[--btn-text-hover]"
                href="mailto:sheaclose@gmail.com"
              >
                contact me
              </a>
              . I hope to make this something that is as useful for you as it is
              for me.
            </p>
            <span
              className="-mt-6 cursor-pointer text-[--btn-text] text-sm"
              onClick={() => setTruncateIsNot(true)}
            >
              [show less]
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default About;
