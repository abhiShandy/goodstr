import {
  BoltIcon,
  DocumentDuplicateIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { FC } from "react";
import { PrimaryButton, SecondaryButton } from "../atoms/Button";

export type LNInvoiceProps = {
  invoice: string;
};

export const LNInvoice: FC<LNInvoiceProps> = (props) => {
  const length = props.invoice.length;
  return (
    <div className="grid grid-cols-1 gap-4 mx-auto mt-4 flex-wrap max-w-sm">
      <div className="flex flex-row items-center justify-center">
        <BoltIcon className="h-5 w-5 mr-2" />
        {props.invoice.substring(0, 8) +
          "........" +
          props.invoice.substring(length - 8)}
      </div>
      <div className="flex flex-row items-center justify-between gap-2">
        <SecondaryButton>
          <DocumentDuplicateIcon className="h-5 w-5" />
          Copy
        </SecondaryButton>
        <PrimaryButton>
          <WalletIcon className="h-5 w-5" />
          Pay
        </PrimaryButton>
      </div>
    </div>
  );
};
