import StoreHeader from "./StoreHeader";
import { faker } from "@faker-js/faker";

import { ComponentStory, ComponentMeta } from "@storybook/react";

const meta: ComponentMeta<typeof StoreHeader> = {
  title: "StoreHeader",
  component: StoreHeader,
};

export default meta;

const Template: ComponentStory<typeof StoreHeader> = (args) => (
  <StoreHeader {...args} />
);
export const Default = Template.bind({});

Default.args = {
  name: faker.company.name(),
  description: faker.lorem.paragraph(),
};
