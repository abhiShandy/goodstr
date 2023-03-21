import axios from "axios";

export const getAssetUploadURL = async (): Promise<{
  url: string;
  key: string;
}> => {
  const res = await axios.get<{ url: string; key: string }>(
    import.meta.env.VITE_BASE_URL + "/assets/upload"
  );
  return res.data;
};

export const uploadAsset = async (url: string, file: File): Promise<void> => {
  await axios.put(url, file);
};

export const getAssetDownloadURL = async (
  productId: string
): Promise<string> => {
  const res = await axios.get<{ url: string }>(
    import.meta.env.VITE_BASE_URL + "/products/assets/" + productId
  );
  return res.data.url;
};
