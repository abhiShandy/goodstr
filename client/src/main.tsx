import React from "react";
import ReactDOM from "react-dom/client";
import { Home, CreateProduct, Product, Discover } from "./routes";
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
    path: "/sell",
    element: <CreateProduct />,
  },
  {
    path: "/products/:productId",
    element: <Product />,
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
