import React from "react";
import ReactDOM from "react-dom/client";
import { Home, Store, CreateProduct, Product } from "./routes";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/str/:storeId",
    element: <Store />,
  },
  {
    path: "/add",
    element: <CreateProduct />,
  },
  {
    path: "/products/:productId",
    element: <Product />,
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
