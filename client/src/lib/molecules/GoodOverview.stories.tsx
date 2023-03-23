import GoodOverview from "./GoodOverview";

import { ComponentStory, ComponentMeta } from "@storybook/react";

const meta: ComponentMeta<typeof GoodOverview> = {
  title: "GoodOverview",
  component: GoodOverview,
};

export default meta;

const Template: ComponentStory<typeof GoodOverview> = (args) => (
  <GoodOverview {...args} />
);

export const Default = Template.bind({});
Default.args = {
  good: {
    title: "Everyday Ruck Snack",
    publisher: {
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
  good: {
    title: "Everyday Ruck Snack",
    publisher: {
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

export const NoGood = Template.bind({});
NoGood.args = {
  good: null,
};

export const NoDownloads = Template.bind({});
NoDownloads.args = {
  good: {
    title: "Everyday Ruck Snack",
    publisher: {
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
