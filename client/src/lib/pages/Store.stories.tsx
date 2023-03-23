import { Store } from "./Store";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { goods, store } from "../fake";

export default {
  title: "Pages/Store",
  component: Store,
} as ComponentMeta<typeof Store>;

const Template: ComponentStory<typeof Store> = (args) => <Store {...args} />;

export const Default = Template.bind({});
Default.args = {
  store,
  goods,
};

export const EmptyStore = Template.bind({});
EmptyStore.args = {
  goods,
};

export const EmptyGoods = Template.bind({});
EmptyGoods.args = {
  store,
};
