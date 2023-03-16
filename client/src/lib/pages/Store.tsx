import { Navbar } from "../molecules/Navbar";
import ProductList, { Product } from "../molecules/ProductList";
import StoreHeader from "../molecules/StoreHeader";

export type StoreProps = {
  store?: { name: string; description: string };
  products?: Product[];
};

export const Store = (props: StoreProps) => {
  return (
    <>
      <Navbar />
      {props.store && <StoreHeader store={props.store} />}
      {props.products && <ProductList products={props.products} />}
    </>
  );
};
