import ProductList, { Product } from "../lib/ProductList";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import axios from "axios";

type ListProductResponse = {
  id: number;
  name: string;
  price: string;
  images: { url: string }[];
};

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
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
  }, []);

  return <ProductList products={products} />;
};
