import { Navbar } from "./Navbar";

import { ComponentStory, Meta } from "@storybook/react";

const meta: Meta = {
  title: "Navbar",
  component: Navbar,
};

export default meta;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Discover = Template.bind({});

Discover.args = {
  currentPage: "discover",
};

export const Sell = Template.bind({});

Sell.args = {
  currentPage: "sell",
  isLoggedIn: true,
};
