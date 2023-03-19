import { ComponentMeta } from "@storybook/react";
import { LNInvoice } from "../fake";
import { BuyNow } from "./BuyNow";

export default {
  title: "Molecules/BuyNow",
  component: BuyNow,
} as ComponentMeta<typeof BuyNow>;

export const Default = () => <BuyNow price={1235} invoice={LNInvoice} />;
