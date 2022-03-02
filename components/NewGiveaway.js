import { DocumentAddIcon, PlusIcon } from "@heroicons/react/outline";

export default function NewGiveaway({ setOpen }) {
  return (
    <div className="text-center border-2 border-gray-300 border-dashed px-2 py-10 rounded-lg mt-24">
      <div>
        <DocumentAddIcon className="mx-auto h-12 w-12 text-gray-400" />
      </div>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No Giveaways</h3>
      <p className="mt-1 text-sm text-gray-500">
        Register a new giveway by clicking the button below
      </p>
      <div className="mt-6">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-900 bg-gold-500"
        >
          <PlusIcon className="ml-1 mr-2 h-5 w-5" />
          New Giveaway
        </button>
      </div>
    </div>
  );
}
