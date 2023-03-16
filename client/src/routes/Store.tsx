import axios from "axios";
import { useQuery } from "react-query";

type RetrieveStoreResponse = {
  id: string;
  name: string;
  description: string;
};

export const Store = () => {
  const storeId = window.location.pathname.split("/")[2];

  const fetchStore = async () => {
    const STORES_URL = import.meta.env.VITE_BASE_URL + "/stores/" + storeId;
    const response = await axios.get<RetrieveStoreResponse>(STORES_URL);
    return {
      name: response.data.name,
      description: response.data.description,
    };
  };

  const { data: store, error, isLoading } = useQuery(storeId, fetchStore);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  if (store)
    return (
      <div>
        <h1>Store</h1>
      </div>
    );

  return <div>Something went wrong</div>;
};
