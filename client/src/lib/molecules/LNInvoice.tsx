import { BoltIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { PrimaryButton, SecondaryButton } from "../atoms/Button";

export type LNInvoiceProps = {
  invoice: string;
};

export const LNInvoice: FC<LNInvoiceProps> = (props) => {
  const length = props.invoice.length;
  return (
    <div className="flex flex-row justify-between mt-4">
      <div className="flex flex-row items-center">
        <BoltIcon className="h-5 w-5 mr-2" />
        {props.invoice.substring(0, 8) +
          "........" +
          props.invoice.substring(length - 8)}
      </div>
      <div className="flex flex-row items-center gap-2">
        <SecondaryButton>
          <DocumentDuplicateIcon className="h-5 w-5" />
          Copy
        </SecondaryButton>
        <PrimaryButton>Pay</PrimaryButton>
      </div>
    </div>
  );
};
