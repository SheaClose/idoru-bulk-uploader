import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    /* children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/music",
        element: <Music />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/press-kit",
        element: <PressKit />,
      },
    ], */
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
