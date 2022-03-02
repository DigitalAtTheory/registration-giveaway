import { CalendarIcon, TrashIcon, PlusIcon } from "@heroicons/react/outline";

export default function Giveaways({
  giveaways,
  handleDeleteGiveaway,
  setOpen,
}) {
  return (
    <div className="bg-white shadow-lg overflow-hidden sm:rounded-md my-24">
      <div className="text-center mt-4 mb-8">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-900 bg-gold-500"
        >
          <PlusIcon className="ml-1 mr-2 h-5 w-5" />
          New Giveaway
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {giveaways.map((giveaway) => {
          return (
            <li key={giveaway.id}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center w-full">
                  <h2 className="text-lg uppercase text-gold-600 font-bold">
                    <span className="text-sm uppercase text-gray-700">
                      Receipt #:
                    </span>{" "}
                    {giveaway.number}
                  </h2>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-600 font-bold flex items-center gap-2 text-sm">
                      <span>
                        <CalendarIcon className="w-5 h-5" />
                      </span>
                      <span className="bg-gold-100 px-2 rounded-full text-gold-700">
                        {giveaway.registeredTime}
                      </span>
                    </p>
                    <button
                      onClick={() => handleDeleteGiveaway(giveaway.ref)}
                      className="bg-red-200 p-1 rounded"
                    >
                      <TrashIcon className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
