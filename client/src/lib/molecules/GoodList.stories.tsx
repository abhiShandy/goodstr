import GoodList from "./GoodList";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { goods } from "../fake";

const meta: ComponentMeta<typeof GoodList> = {
  title: "GoodList",
  component: GoodList,
};

export default meta;

const Template: ComponentStory<typeof GoodList> = (args) => (
  <GoodList {...args} />
);

export const Default = Template.bind({});

Default.args = {
  goods,
};

export const Empty = Template.bind({});
Empty.args = {
  goods: [],
};
