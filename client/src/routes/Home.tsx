import ProductList, { Product } from "../lib/ProductList";
import axios from "axios";
import { Navbar } from "../lib/Navbar";
import { useQuery } from "react-query";
import { LoadingGrid } from "../lib/LoadingGrid";

type ListProductResponse = {
  id: number;
  name: string;
  price: number;
  images: { url: string }[];
};

export const Home = () => {
  const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get<ListProductResponse[]>(
      import.meta.env.VITE_BASE_URL + "/products"
    );
    const products: Product[] = [];
    response.data.forEach((d) => {
      products.push({
        id: d.id,
        name: d.name,
        imageSrc: d.images[0].url,
        price: d.price,
        imageAlt: d.name,
      });
    });
    return products;
  };

  const {
    data: products,
    error,
    isLoading,
  } = useQuery("listProducts", fetchProducts);

  if (isLoading)
    return (
      <>
        <Navbar currentPage="home" />
        <LoadingGrid centered />
      </>
    );

  if (error) return <div>Something went wrong</div>;

  if (products)
    return (
      <>
        <Navbar currentPage="home" />
        <ProductList products={products} />
      </>
    );

  return <div>Something went wrong</div>;
};
