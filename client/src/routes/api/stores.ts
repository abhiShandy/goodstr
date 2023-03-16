import axios from "axios";

export type RetrieveStoreResponse = {
  id: string;
  name: string;
  description: string;
};

export const fetchStore = async (storeId: string) => {
  const STORES_URL = import.meta.env.VITE_BASE_URL + "/stores/" + storeId;
  const response = await axios.get<RetrieveStoreResponse>(STORES_URL);
  return {
    name: response.data.name,
    description: response.data.description,
  };
};
