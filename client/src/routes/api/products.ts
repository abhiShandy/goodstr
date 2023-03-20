import axios from "axios";
import { Product } from "../../lib/molecules/ProductList";

export type ListProductResponse = {
  id: number;
  name: string;
  price: number;
  images: { url: string }[];
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<ListProductResponse[]>(
    import.meta.env.VITE_BASE_URL + "/products"
  );
  const products: Product[] = [];
  response.data.forEach((d) => {
    products.push({
      id: d.id,
      name: d.name,
      imageSrc: d.images[0].url,
      price: d.price,
      imageAlt: d.name,
    });
  });
  return products;
};

export const fetchStoreProducts = async (): Promise<Product[]> => {
  const response = await axios.get<ListProductResponse[]>(
    import.meta.env.VITE_BASE_URL + "/products"
  );
  const products: Product[] = [];
  response.data.forEach((d) => {
    products.push({
      id: d.id,
      name: d.name,
      imageSrc: d.images[0].url,
      price: d.price,
      imageAlt: d.name,
    });
  });
  return products;
};
