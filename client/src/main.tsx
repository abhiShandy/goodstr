import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./routes/Home";
import { CreateProduct } from "./routes/CreateProduct";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductPage as Product } from "./routes/Product";
import { QueryClient, QueryClientProvider } from "react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products/new",
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
