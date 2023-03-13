import ProductList from "./ProductList";

import { ComponentStory, ComponentMeta } from "@storybook/react";

const meta: ComponentMeta<typeof ProductList> = {
  title: "ProductList",
  component: ProductList,
};

export default meta;

const Template: ComponentStory<typeof ProductList> = (args) => (
  <ProductList {...args} />
);

export const Default = Template.bind({});

Default.args = {
  products: [
    {
      id: 1,
      name: "Earthen Bottle",
      price: 48000,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
      imageAlt:
        "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    },
    {
      id: 2,
      name: "Nomad Tumbler",
      price: 35000,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
      imageAlt:
        "Olive drab green insulated bottle with flared screw lid and flat top.",
    },
    {
      id: 3,
      name: "Focus Paper Refill",
      price: 89000,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
      imageAlt:
        "Person using a pen to cross a task off a productivity paper card.",
    },
    {
      id: 4,
      name: "Machined Mechanical Pencil",
      price: 35000,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
      imageAlt:
        "Hand holding black machined steel mechanical pencil with brass tip and top.",
    },
    // More products...
  ],
};

export const Empty = Template.bind({});
Empty.args = {
  products: [],
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  products: [],
};
