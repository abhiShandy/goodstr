import { Navbar } from "./Navbar";

import { ComponentStory, Meta } from "@storybook/react";

const meta: Meta = {
  title: "Navbar",
  component: Navbar,
};

export default meta;

const Template: ComponentStory<typeof Navbar> = () => <Navbar />;

export const Default = Template.bind({});
