import ProductList from "./ProductList";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { products } from "../fake";

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
  products,
};

export const Empty = Template.bind({});
Empty.args = {
  products: [],
};
