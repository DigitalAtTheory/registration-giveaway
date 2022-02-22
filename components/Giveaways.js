import { CalendarIcon, TrashIcon } from "@heroicons/react/outline";

export default function Giveaways({ giveaways, handleDeleteGiveaway }) {
  return (
    <div className="bg-white shadow-lg overflow-hidden sm:rounded-md my-24">
      <ul className="divide-y divide-gray-200">
        {giveaways.map((giveaway) => {
          return (
            <li key={giveaway.id}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center w-full">
                  <h2 className="text-lg uppercase text-indigo-500 font-bold">
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
                      <span className="bg-indigo-100 px-2 rounded-full text-indigo-600">
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
