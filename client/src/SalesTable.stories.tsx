import SalesTable from "./SalesTable";

import { ComponentStory, ComponentMeta } from "@storybook/react";

const meta: ComponentMeta<typeof SalesTable> = {
  title: "SalesTable",
  component: SalesTable,
};

export default meta;

const Template: ComponentStory<typeof SalesTable> = (args) => (
  <SalesTable {...args} />
);

export const Default = Template.bind({});

Default.args = {
  sales: [
    {
      id: "1",
      productName: "BTC Poster",
      productPrice: "20000 sats",
      buyerPubKey: "npub1fsdgw",
      purchaseDate: new Date(2009, 1, 9),
    },
    {
      id: "2",
      productName: "BTC Wallet",
      productPrice: "3000000 sats",
      buyerPubKey: "npub1fsg534gdsv",
      purchaseDate: new Date(2012, 1, 9),
    },
  ],
};
