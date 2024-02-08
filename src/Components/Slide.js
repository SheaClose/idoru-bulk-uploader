import React, { useRef } from "react";
import FileImport from "./FileImport";
import { Close, Menu } from "./Icons";
const Slide = ({ onNavItemSelect }) => {
  const sideBar = useRef(null);
  const sideNav = useRef(null);

  const openNav = () => {
    sideBar.current.style.width = "100%";
    sideNav.current.style.width = "200px";
    sideNav.current.style.right = "0";
  };
  const closeNav = () => {
    sideBar.current.style.width = "0";
    sideNav.current.style.width = "0";
    sideNav.current.style.right = "-64px";
  };
  return (
    <>
      <div className="hover:cursor-pointer" onClick={openNav}>
        <Menu height="36" width="36" />
      </div>

      {/* background overlay element, will close navbar when clicked*/}
      <div
        onClick={closeNav}
        className="fixed top-0 right-0 bg-transparent w-0 h-full overflow-x-hidden duration-500 z-10"
        ref={sideBar}
      >
        {/* <!--navigation menu contents--> */}
        <div
          ref={sideNav}
          className="fixed top-0 bg-charcoal w-0 h-full flex pr-8 pt-24 overflow-x-hidden duration-500 font-bold z-50 justify-end"
          style={{ right: "-64px" }}
        >
          {/* <!--exit icon, will close navbar when clicked--> */}
          <span
            className="text-3xl absolute top-0 right-0 mr-10 mt-12 hover:cursor-pointer"
            onClick={closeNav}
          >
            <Close height="36" width="36" />
          </span>
          {/* <!--menu links--> */}
          <ul className="text-2xl text-end [&_li]:cursor-pointer">
            <li className="p-2">
              <FileImport
                onFileUpload={(...args) => onNavItemSelect("Import", ...args)}
                label="Import"
                accept=".idoru,.json"
              />
            </li>
            <li onClick={() => onNavItemSelect("Export")} className="p-2">
              Export
            </li>
            <li onClick={() => onNavItemSelect("Reset")} className="p-2">
              Reset
            </li>
            <li onClick={() => onNavItemSelect("Help")} className="p-2">
              Help
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Slide;
