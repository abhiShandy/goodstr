import AddProductForm from "./AddProductForm";

import { ComponentStory, ComponentMeta } from "@storybook/react";

const meta: ComponentMeta<typeof AddProductForm> = {
  title: "AddProductForm",
  component: AddProductForm,
  decorators: [
    (Story) => (
      <div className="max-w-lg mx-auto">
        <Story />
      </div>
    ),
  ],
};

export default meta;

const Template: ComponentStory<typeof AddProductForm> = (args) => (
  <AddProductForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: () => {},
};

export const Loading = Template.bind({});
Loading.args = {
  onSubmit: () => {},
  isLoading: true,
};
