import ProductList, { Product } from "../lib/ProductList";
import { faker } from "@faker-js/faker";

export const Home = () => {
  const fakeProduct = (): Product => {
    return {
      id: faker.datatype.number(),
      name: faker.commerce.productName(),
      href: "#",
      price: faker.commerce.price(undefined, undefined, 0) + " sats",
      imageSrc: faker.image.imageUrl(undefined, undefined, "art", true),
      imageAlt: faker.commerce.productName(),
    };
  };

  const products = Array.from({ length: 12 }, fakeProduct);
  return <ProductList products={products} />;
};
