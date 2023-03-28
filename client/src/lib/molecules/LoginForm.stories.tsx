import LoginForm from "./LoginForm";
import { ComponentStory, ComponentMeta } from "@storybook/react";

const meta: ComponentMeta<typeof LoginForm> = {
  title: "LoginForm",
  component: LoginForm,
  decorators: [
    (Story) => (
      <div className="bg-purple-50">
        <Story />
      </div>
    ),
  ],
};

export default meta;

const Template: ComponentStory<typeof LoginForm> = (args) => (
  <LoginForm {...args} />
);

export const Default = Template.bind({});
