import { useQuery } from "react-query";
import { fetchStoreProducts } from "./api/products";
import { fetchStore } from "./api/stores";
import { Store as StorePage } from "../lib/pages/Store";

export const Store = () => {
  const storeId = window.location.pathname.split("/")[2];

  const { data: store } = useQuery(storeId, () => fetchStore(storeId));

  const { data: products } = useQuery(
    `${storeId}/products`,
    fetchStoreProducts
  );

  return <StorePage store={store} products={products} />;
};
