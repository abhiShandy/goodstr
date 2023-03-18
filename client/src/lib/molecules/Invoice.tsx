import { FC } from "react";
import { LNInvoice } from "./LNInvoice";

export type InvoiceProps = {
  invoice: string;
};

export const Invoice: FC<InvoiceProps> = (props) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6 text-center">
        <div className="text-xl">Invoice</div>
        <LNInvoice invoice={props.invoice} />
      </div>
    </div>
  );
};
