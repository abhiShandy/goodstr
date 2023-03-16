import { useQuery } from "react-query";
import { fetchProducts } from "./api/products";
import { Home as HomePage } from "../lib/pages/Home";

export const Home = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery("listProducts", fetchProducts);

  return <HomePage products={products} error={error} isLoading={isLoading} />;
};
