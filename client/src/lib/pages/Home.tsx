import { LoadingGrid } from "../molecules/LoadingGrid";
import { Navbar } from "../molecules/Navbar";
import ProductList, { Product } from "../molecules/ProductList";

export type HomeProps = {
  products?: Product[];
  error: unknown;
  isLoading: boolean;
};

export const Home = (props: HomeProps) => {
  if (props.isLoading)
    return (
      <>
        <Navbar currentPage="home" />
        <LoadingGrid centered />
      </>
    );

  if (props.error) return <div>Something went wrong</div>;

  if (props.products)
    return (
      <>
        <Navbar currentPage="home" />
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-8">
          <div className="border-b border-gray-200 pb-5">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Latest Products
            </h3>
          </div>
        </div>
        <ProductList products={props.products} />
      </>
    );

  return <div>Something went wrong</div>;
};
