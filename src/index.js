import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import SetList from "./Pages/SetList/SetList";
import About from "./Pages/About";
import "./index.css";
import Help from "./Pages/Help";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "setlist/",
        element: <SetList />,
      },
      {
        path: "setlist/:playListId",
        element: <SetList />,
      },
      {
        path: "",
        element: <About />,
      },
      {
        path: "help",
        element: <Help />,
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
