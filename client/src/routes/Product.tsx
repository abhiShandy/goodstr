import { useQuery } from "react-query";
import { LoadingGrid } from "../lib/molecules/LoadingGrid";
import { Navbar } from "../lib/molecules/Navbar";
import ProductOverview from "../lib/molecules/ProductOverview";
import { getAssetDownloadURL } from "./api/assets";
import { fetchProduct, fetchProductDownloads } from "./api/products";

const Product = () => {
  const productId = window.location.pathname.split("/")[2];

  const downloadAsset = async () => {
    try {
      const url = await getAssetDownloadURL(productId);
      window.open(url);
    } catch (e) {
      console.error(e);
      alert("Error downloading asset");
    }
  };

  const {
    data: product,
    error,
    isLoading,
  } = useQuery(productId, () => fetchProduct(productId));

  const { data: downloads } = useQuery(productId + "downloads", () =>
    fetchProductDownloads(productId)
  );

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
        <ProductOverview
          product={product}
          onDownload={downloadAsset}
          downloads={downloads}
        />
      </>
    );

  return <div>Something went wrong</div>;
};

export default Product;
