import ProductOverview from "./ProductOverview";

import { ComponentStory, ComponentMeta } from "@storybook/react";

const meta: ComponentMeta<typeof ProductOverview> = {
  title: "ProductOverview",
  component: ProductOverview,
};

export default meta;

const Template: ComponentStory<typeof ProductOverview> = (args) => (
  <ProductOverview {...args} />
);

export const Default = Template.bind({});
Default.args = {
  product: {
    title: "Everyday Ruck Snack",
    seller: {
      npub: "npubejkkjd3ffozhvf1briotnw79j9mzvz4z7ey6ifw9ld7975w1ex5csr5a92r",
    },
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg",
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  },
};

export const FewDownloads = Template.bind({});
FewDownloads.args = {
  product: {
    title: "Everyday Ruck Snack",
    seller: {
      npub: "npubejkkjd3ffozhvf1briotnw79j9mzvz4z7ey6ifw9ld7975w1ex5csr5a92r",
    },
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg",
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  },
  downloads: 42,
};

export const NoProduct = Template.bind({});
NoProduct.args = {
  product: null,
};

export const NoDownloads = Template.bind({});
NoDownloads.args = {
  product: {
    title: "Everyday Ruck Snack",
    seller: {
      npub: "npubejkkjd3ffozhvf1briotnw79j9mzvz4z7ey6ifw9ld7975w1ex5csr5a92r",
    },
    description:
      "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg",
    imageAlt:
      "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  },
  downloads: 0,
};
