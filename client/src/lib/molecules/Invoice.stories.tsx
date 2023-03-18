import { Invoice } from "./Invoice";

import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Molecules/Invoice",
  component: Invoice,
} as ComponentMeta<typeof Invoice>;

const Template: ComponentStory<typeof Invoice> = (args) => (
  <Invoice {...args} />
);

export const Default = Template.bind({});
Default.args = {
  invoice:
    "lnbc100u1pjpt0g6pp5wequkpkp394a3yv03hxmvvyyaef0te88pn5t0kpqtpzy280fvz7sdq823jhxaqcqzysxqr23ssp5ckktp4nhk8f4ej07pp0r3mkmqw7wxxpwrtgz6vpnn33tqg8j4vgq9qyyssqjhqesr0v4w7yqeh8alj804dvtp5wjatvm4pldgftxen25d8crsuxk7u0yn4ryqwgxakl7cn8mnrp5huta69hsxs5nkh24mlkakdfz4gp8txk7y",
};
