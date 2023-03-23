import React from "react";
import ReactDOM from "react-dom/client";
import { Home, Publish, Good, Discover } from "./routes";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/discover",
    element: <Discover />,
  },
  {
    path: "/publish",
    element: <Publish />,
  },
  {
    path: "/g/:goodId",
    element: <Good />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
