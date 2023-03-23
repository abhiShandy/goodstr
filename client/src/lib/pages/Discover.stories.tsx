import Discover from "./Discover";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { goods } from "../fake";

export default {
  title: "Pages/Discover",
  component: Discover,
} as ComponentMeta<typeof Discover>;

const Template: ComponentStory<typeof Discover> = (args) => (
  <Discover {...args} />
);

export const Default = Template.bind({});
Default.args = {
  goods,
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
  goods: [],
};
