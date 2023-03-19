import { ComponentMeta } from "@storybook/react";
import { LNInvoice } from "./LNInvoice";
import { LNInvoice as RawLNInvoice } from "../fake";

export default {
  title: "Molecules/LNInvoice",
  component: LNInvoice,
} as ComponentMeta<typeof LNInvoice>;

export const Default = () => <LNInvoice invoice={RawLNInvoice} />;
