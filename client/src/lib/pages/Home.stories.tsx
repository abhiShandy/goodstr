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
