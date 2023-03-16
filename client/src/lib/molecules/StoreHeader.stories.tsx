import StoreHeader from "./StoreHeader";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { store } from "../fake";

const meta: ComponentMeta<typeof StoreHeader> = {
  title: "StoreHeader",
  component: StoreHeader,
};

export default meta;

const Template: ComponentStory<typeof StoreHeader> = (args) => (
  <StoreHeader {...args} />
);
export const Default = Template.bind({});

Default.args = {
  store,
};
