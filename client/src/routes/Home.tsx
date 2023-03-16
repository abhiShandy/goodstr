import ProductList from "../lib/ProductList";
import { Navbar } from "../lib/Navbar";
import { useQuery } from "react-query";
import { LoadingGrid } from "../lib/LoadingGrid";
import { fetchProducts } from "./api/products";

export const Home = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery("listProducts", fetchProducts);

  if (isLoading)
    return (
      <>
        <Navbar currentPage="home" />
        <LoadingGrid centered />
      </>
    );

  if (error) return <div>Something went wrong</div>;

  if (products)
    return (
      <>
        <Navbar currentPage="home" />
        <ProductList products={products} />
      </>
    );

  return <div>Something went wrong</div>;
};
