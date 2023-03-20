import { useQuery } from "react-query";
import { fetchProducts } from "./api/products";
import { Home as HomePage } from "../lib/pages/Home";

const Discover = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery("listProducts", fetchProducts);

  return <HomePage products={products} error={error} isLoading={isLoading} />;
};

export default Discover;
