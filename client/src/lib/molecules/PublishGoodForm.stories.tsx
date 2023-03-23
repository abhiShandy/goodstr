import AddGoodForm from "./PublishGoodForm";

import { ComponentStory, ComponentMeta } from "@storybook/react";

const meta: ComponentMeta<typeof AddGoodForm> = {
  title: "AddGoodForm",
  component: AddGoodForm,
  decorators: [
    (Story) => (
      <div className="max-w-lg mx-auto">
        <Story />
      </div>
    ),
  ],
};

export default meta;

const Template: ComponentStory<typeof AddGoodForm> = (args) => (
  <AddGoodForm {...args} />
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
