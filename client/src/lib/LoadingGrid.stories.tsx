import { LoadingGrid } from "./LoadingGrid";

import { ComponentStory, ComponentMeta } from "@storybook/react";

const meta: ComponentMeta<typeof LoadingGrid> = {
  title: "LoadingGrid",
  component: LoadingGrid,
};

export default meta;

const Template: ComponentStory<typeof LoadingGrid> = (args) => (
  <LoadingGrid {...args} />
);

export const Default = Template.bind({});

export const Centered = Template.bind({});
Centered.args = {
  centered: true,
};
