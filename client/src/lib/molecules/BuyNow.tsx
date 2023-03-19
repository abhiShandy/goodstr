import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { LNInvoice } from "./LNInvoice";

export type BuyNowProps = {
  price: number;
  invoice: string;
};

export const BuyNow = (props: BuyNowProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-3 px-8 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        Buy now for {props.price} sats
      </button>

      <Transition appear show={isDialogOpen} as={Fragment}>
        <Dialog
          onClose={() => {
            setIsDialogOpen(false);
          }}
          open={isDialogOpen}
          as="div"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    LN Invoice
                  </Dialog.Title>
                  <Dialog.Description>
                    <LNInvoice invoice={props.invoice} />
                  </Dialog.Description>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
