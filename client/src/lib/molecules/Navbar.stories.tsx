import { Navbar } from "./Navbar";

import { ComponentStory, Meta } from "@storybook/react";

const meta: Meta = {
  title: "Navbar",
  component: Navbar,
};

export default meta;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Home = Template.bind({});

Home.args = {
  currentPage: "home",
};

export const AddProduct = Template.bind({});

AddProduct.args = {
  currentPage: "add-product",
};
