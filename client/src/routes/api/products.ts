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

export const getS3UploadUrl = async (): Promise<{
  url: string;
  key: string;
}> => {
  const res = await axios.get<{ url: string; key: string }>(
    import.meta.env.VITE_BASE_URL + "/assets-s3"
  );
  return res.data;
};

export const uploadAsset = async (url: string, file: File): Promise<void> => {
  await axios.put(url, file);
};

type CreateProductInput = {
  product: {
    title: string;
    description: string;
    assetKey: string;
    npub: string;
  };
  images: [{ type: string; base64str: string }];
};

export const createProduct = ({ product, images }: CreateProductInput) => {
  const PRODUCTS_URL = import.meta.env.VITE_BASE_URL + "/products";
  return axios.post(PRODUCTS_URL, {
    title: product.title,
    description: product.description,
    images: [
      {
        type: images[0].type,
        data: images[0].base64str,
      },
    ],
    assetKey: product.assetKey,
    npub: product.npub,
  });
};
