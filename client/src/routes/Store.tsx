import { useQuery } from "react-query";
import { Navbar } from "../lib/molecules/Navbar";
import ProductList from "../lib/molecules/ProductList";
import StoreHeader from "../lib/molecules/StoreHeader";
import { fetchStoreProducts } from "./api/products";
import { fetchStore } from "./api/stores";

export const Store = () => {
  const storeId = window.location.pathname.split("/")[2];

  const { data: store } = useQuery(storeId, () => fetchStore(storeId));

  const { data: products } = useQuery(
    `${storeId}/products`,
    fetchStoreProducts
  );

  return (
    <>
      <Navbar />
      {store && (
        <StoreHeader name={store.name} description={store.description} />
      )}
      {products && <ProductList products={products} />}
    </>
  );
};
