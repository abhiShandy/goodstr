import ProductList, { Product } from "../lib/ProductList";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../lib/Navbar";

type ListProductResponse = {
  id: number;
  name: string;
  price: number;
  images: { url: string }[];
};

export const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get<ListProductResponse[]>(import.meta.env.VITE_BASE_URL + "/products")
      .then(({ data }) => {
        const products: Product[] = [];
        data.forEach((d) => {
          products.push({
            id: d.id,
            name: d.name,
            href: "#",
            imageSrc: d.images[0].url,
            price: d.price,
            imageAlt: d.name,
          });
        });
        setProducts(products);
      });
    setLoading(false);
  }, []);

  return (
    <>
      <Navbar currentPage="home" />
      <ProductList products={products} isLoading={loading} />
    </>
  );
};
