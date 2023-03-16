import { Home } from "./Home";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { products } from "../fake";

export default {
  title: "Pages/Home",
  component: Home,
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />;

export const Default = Template.bind({});
Default.args = {
  products,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
  error: "Something went wrong",
};

export const Empty = Template.bind({});
Empty.args = {
  products: [],
};
