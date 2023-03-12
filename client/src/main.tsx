import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./routes/Home";
import { CreateProduct } from "./routes/CreateProduct";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products/new",
    element: <CreateProduct />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
