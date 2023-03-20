import { useQuery } from "react-query";
import { fetchProducts } from "./api/products";
import DiscoverPage from "../lib/pages/Discover";

const Discover = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery("listProducts", fetchProducts);

  return (
    <DiscoverPage products={products} error={error} isLoading={isLoading} />
  );
};

export default Discover;
