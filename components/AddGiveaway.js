import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function AddGiveaway({
  open,
  setOpen,
  receiptNumber,
  setReceiptNumber,
  noPurchaseNeeded,
  setNoPurchaseNeeded,
  addNewGiveaway,
  formError,
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-center  justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          {/* <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span> */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Add New Giveaway
                  </Dialog.Title>
                  <div className="my-10">
                    <div className="text-left">
                      <label
                        htmlFor="receiptNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Enter a receipt number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="receiptNumber"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Ex. R1234567890"
                          value={receiptNumber}
                          onChange={(e) => setReceiptNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="relative flex items-start py-4 text-left mt-5">
                      <div className="min-w-0 flex-1 text-sm">
                        <label
                          htmlFor="noPurchase"
                          className="font-medium text-gray-700"
                        >{`Claimed "No Purchase Necessary"`}</label>
                        <p className="text-gray-400 text-xs">
                          Only click this checkbox if customer claims that no
                          purchase is necessary for the giveaway
                        </p>
                      </div>
                      <div className="ml-3 flex items-center h-5">
                        <input
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={noPurchaseNeeded}
                          onChange={(e) =>
                            setNoPurchaseNeeded(!noPurchaseNeeded)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:mb-5">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={addNewGiveaway}
                >
                  Add New Giveaway
                </button>
              </div>
              {formError && (
                <p className="mt-2 text-center font-bold text-sm text-red-500">
                  You must choose no purchase necessary or enter a receipt
                  number
                </p>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
