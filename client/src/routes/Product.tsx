import { useQuery } from "react-query";
import { LoadingGrid } from "../lib/molecules/LoadingGrid";
import { Navbar } from "../lib/molecules/Navbar";
import ProductOverview from "../lib/molecules/ProductOverview";
import { fetchProduct } from "./api/products";

const Product = () => {
  const productId = window.location.pathname.split("/")[2];

  const {
    data: product,
    error,
    isLoading,
  } = useQuery(productId, () => fetchProduct(productId));

  if (isLoading)
    return (
      <>
        <Navbar />
        <LoadingGrid centered />
      </>
    );

  if (error) return <div>Something went wrong</div>;

  if (product)
    return (
      <>
        <Navbar />
        <ProductOverview product={product} onDownload={() => {}} />
      </>
    );

  return <div>Something went wrong</div>;
};

export default Product;
