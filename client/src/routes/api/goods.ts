import axios from "axios";
import { Good } from "../../lib/molecules/GoodList";

export type ListGoodResponse = {
  id: number;
  title: string;
  publisher: { npub: string };
  images: { url: string }[];
};

export const fetchGoods = async (): Promise<Good[]> => {
  const response = await axios.get<ListGoodResponse[]>(
    import.meta.env.VITE_BASE_URL + "/goods"
  );
  const goods: Good[] = [];
  response.data.forEach((d) => {
    goods.push({
      id: d.id,
      title: d.title,
      imageSrc: d.images[0].url,
      publisher: d.publisher,
      imageAlt: d.title,
    });
  });
  return goods;
};

interface RetrieveGoodResponse {
  id: string;
  title: string;
  description: string;
  npub: string;
  images: Array<{ src: string }>;
  asset: {
    s3Key: string;
  };
}

export const fetchGood = async (goodId: string) => {
  const PRODUCTS_URL = import.meta.env.VITE_BASE_URL + "/goods/" + goodId;
  const response = await axios.get<RetrieveGoodResponse>(PRODUCTS_URL);
  return {
    title: response.data.title,
    publisher: { npub: response.data.npub },
    description: response.data.description,
    imageSrc: response.data.images[0].src,
    imageAlt: response.data.title,
    assetKey: response.data.asset.s3Key,
  };
};

type CreateGoodInput = {
  good: {
    title: string;
    description: string;
    assetKey: string;
    npub: string;
  };
  images: [{ type: string; base64str: string }];
};

export const createGood = async ({ good, images }: CreateGoodInput) => {
  const PRODUCTS_URL = import.meta.env.VITE_BASE_URL + "/goods";

  const response = await axios.post<{ good: { id: string } }>(PRODUCTS_URL, {
    title: good.title,
    description: good.description,
    images: [
      {
        type: images[0].type,
        data: images[0].base64str,
      },
    ],
    assetKey: good.assetKey,
    npub: good.npub,
  });

  return response.data.good.id;
};

export const fetchGoodDownloads = async (goodId: string) => {
  const response = await axios.get<{ downloads: number }>(
    import.meta.env.VITE_BASE_URL + "/goods/" + goodId + "/downloads"
  );
  return response.data.downloads;
};
