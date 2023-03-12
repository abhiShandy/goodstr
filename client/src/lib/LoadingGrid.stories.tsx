import { LoadingGrid } from "./LoadingGrid";

import { ComponentStory, ComponentMeta } from "@storybook/react";

const meta: ComponentMeta<typeof LoadingGrid> = {
  title: "LoadingGrid",
  component: LoadingGrid,
};

export default meta;

const Template: ComponentStory<typeof LoadingGrid> = () => <LoadingGrid />;

export const Default = Template.bind({});
