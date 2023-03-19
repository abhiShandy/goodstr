import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { LoadingGrid } from "../molecules/LoadingGrid";
import { Navbar } from "../molecules/Navbar";
import ProductList, { Product } from "../molecules/ProductList";

export type HomeProps = {
  products?: Product[];
  error: unknown;
  isLoading: boolean;
};

const SomethingWentWrong = () => {
  return (
    <>
      <Navbar currentPage="discover" />
      <div className="mt-16 flex justify-center text-red-600">
        <span>
          <ExclamationTriangleIcon className="h-6  mr-2" />
        </span>
        <span>Something went wrong</span>
      </div>
    </>
  );
};

export const Home = (props: HomeProps) => {
  if (props.isLoading)
    return (
      <>
        <Navbar currentPage="discover" />
        <LoadingGrid centered />
      </>
    );

  if (props.error) return <SomethingWentWrong />;

  if (props.products && props.products.length > 0)
    return (
      <>
        <Navbar currentPage="discover" />
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

  return <SomethingWentWrong />;
};
