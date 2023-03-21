import axios from "axios";
import { Product } from "../../lib/molecules/ProductList";

export type ListProductResponse = {
  id: number;
  title: string;
  seller: { npub: string };
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
      title: d.title,
      imageSrc: d.images[0].url,
      seller: d.seller,
      imageAlt: d.title,
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
      title: d.title,
      imageSrc: d.images[0].url,
      seller: d.seller,
      imageAlt: d.title,
    });
  });
  return products;
};

export const getS3UploadUrl = async () => {
  const res = await axios.get<{ url: string; key: string }>(
    import.meta.env.VITE_BASE_URL + "/assets-s3"
  );
  return res.data;
};

export const uploadAsset = async (url: string, file: File) => {
  const res = await axios.put(url, file);
  return res;
};
