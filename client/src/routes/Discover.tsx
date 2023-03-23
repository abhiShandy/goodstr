import { useQuery } from "react-query";
import { fetchGoods } from "./api/goods";
import DiscoverPage from "../lib/pages/Discover";

const Discover = () => {
  const { data: goods, error, isLoading } = useQuery("listGoods", fetchGoods);

  return <DiscoverPage goods={goods} error={error} isLoading={isLoading} />;
};

export default Discover;
