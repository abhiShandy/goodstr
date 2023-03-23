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

interface RetrieveProductResponse {
  id: string;
  title: string;
  description: string;
  npub: string;
  images: Array<{ src: string }>;
  asset: {
    s3Key: string;
  };
}

export const fetchProduct = async (productId: string) => {
  const PRODUCTS_URL = import.meta.env.VITE_BASE_URL + "/products/" + productId;
  const response = await axios.get<RetrieveProductResponse>(PRODUCTS_URL);
  return {
    title: response.data.title,
    seller: { npub: response.data.npub },
    description: response.data.description,
    imageSrc: response.data.images[0].src,
    imageAlt: response.data.title,
    assetKey: response.data.asset.s3Key,
  };
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

export const createProduct = async ({
  product,
  images,
}: CreateProductInput) => {
  const PRODUCTS_URL = import.meta.env.VITE_BASE_URL + "/products";

  const response = await axios.post<{ product: { id: string } }>(PRODUCTS_URL, {
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

  return response.data.product.id;
};

export const fetchProductDownloads = async (productId: string) => {
  const response = await axios.get<{ downloads: number }>(
    import.meta.env.VITE_BASE_URL + "/products/" + productId + "/downloads"
  );
  return response.data.downloads;
};
