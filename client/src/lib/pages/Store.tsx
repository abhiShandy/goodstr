import { Navbar } from "../molecules/Navbar";
import GoodList, { Good } from "../molecules/GoodList";
import StoreHeader from "../molecules/StoreHeader";

export type StoreProps = {
  store?: { name: string; description: string };
  goods?: Good[];
};

export const Store = (props: StoreProps) => {
  return (
    <>
      <Navbar />
      {props.store && <StoreHeader store={props.store} />}
      {props.goods && <GoodList goods={props.goods} />}
    </>
  );
};
