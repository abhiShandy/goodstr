import { Store } from "./Store";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { products, store } from "../fake";

export default {
  title: "Pages/Store",
  component: Store,
} as ComponentMeta<typeof Store>;

const Template: ComponentStory<typeof Store> = (args) => <Store {...args} />;

export const Default = Template.bind({});
Default.args = {
  store,
  products,
};

export const EmptyStore = Template.bind({});
EmptyStore.args = {
  products,
};

export const EmptyProducts = Template.bind({});
EmptyProducts.args = {
  store,
};
