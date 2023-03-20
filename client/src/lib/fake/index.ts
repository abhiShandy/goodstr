import { Product } from "../molecules/ProductList";
import { Store } from "../molecules/StoreHeader";
import { faker } from "@faker-js/faker";

export const products: Product[] = [
  {
    id: 1,
    title: "Earthen Bottle",
    seller: { npub: "npub" + faker.random.alphaNumeric(59) },
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    title: "Nomad Tumbler",
    seller: { npub: "npub" + faker.random.alphaNumeric(59) },
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    title: "Focus Paper Refill",
    seller: { npub: "npub" + faker.random.alphaNumeric(59) },
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    title: "Machined Mechanical Pencil",
    seller: { npub: "npub" + faker.random.alphaNumeric(59) },
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  // More products...
];

export const store: Store = {
  name: faker.company.name(),
  description: faker.lorem.paragraph(),
};

export const LNInvoice =
  "lnbc100u1pjpt0g6pp5wequkpkp394a3yv03hxmvvyyaef0te88pn5t0kpqtpzy280fvz7sdq823jhxaqcqzysxqr23ssp5ckktp4nhk8f4ej07pp0r3mkmqw7wxxpwrtgz6vpnn33tqg8j4vgq9qyyssqjhqesr0v4w7yqeh8alj804dvtp5wjatvm4pldgftxen25d8crsuxk7u0yn4ryqwgxakl7cn8mnrp5huta69hsxs5nkh24mlkakdfz4gp8txk7y";
