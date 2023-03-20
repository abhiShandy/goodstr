import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { LoadingGrid } from "../lib/molecules/LoadingGrid";
import { Navbar } from "../lib/molecules/Navbar";
import ProductOverview, { Product } from "../lib/molecules/ProductOverview";

interface RetrieveProductResponse {
  id: string;
  title: string;
  description: string;
  npub: string;
  images: Array<{ src: string }>;
}

export const ProductPage = () => {
  // const [product, setProduct] = useState<Product | null>(null);

  const productId = window.location.pathname.split("/")[2];

  const fetchProduct = async () => {
    const PRODUCTS_URL =
      import.meta.env.VITE_BASE_URL + "/products/" + productId;
    const response = await axios.get<RetrieveProductResponse>(PRODUCTS_URL);
    console.log(response.data);
    return {
      title: response.data.title,
      seller: { npub: response.data.npub },
      description: response.data.description,
      imageSrc: response.data.images[0].src,
      imageAlt: response.data.title,
    };
  };

  const { data: product, error, isLoading } = useQuery(productId, fetchProduct);

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
        <ProductOverview product={product} />
      </>
    );

  return <div>Something went wrong</div>;
};
