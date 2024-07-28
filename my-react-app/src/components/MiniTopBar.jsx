import React from "react";
function MiniTopBar({
  status,
  shelves,
  search,
  setSearch,
  selectedShelf,
  setSelectedShelf,
}) {
  return (
    <div
      className={`flex  h-${status === "C" ? 6 : 9} justify-${
        status === "C" ? "center" : "between"
      } px-5 w-full`}
    >
      <h3 className="flex  items-center text-2xl font italic">
        {status === "R"
          ? "My readings"
          : status === "C"
          ? "Currently reading"
          : "To read list"}
      </h3>
      {status !== "C" && (
        <div className="flex space-x-3">
          <div
            className="flex bg-[#FEF9EF] rounded-lg pr-1 pl-1 border-2
         border-[#3D3D3D] shadow-grey-2 items-center"
          >
            <lord-icon
              src="https://cdn.lordicon.com/kkvxgpti.json"
              trigger="hover"
              class="size-7"
            ></lord-icon>
            <input
              type="text"
              className="outline-none bg-inherit p-1"
              value={search}
              onChange={e => setSearch(e.target.value.toLowerCase())}
            />
          </div>
          <select
            value={selectedShelf}
            onChange={event => {
              setSelectedShelf(event.target.value);
            }}
            className="flex bg-[#FFD787] rounded-lg pr-1 pl-1 border-2
         border-[#3D3D3D] shadow-grey-2 outline-none"
          >
            <option value="">shelves</option>
            {shelves &&
              shelves.map(shelf => (
                <option key={shelf} value={shelf}>
                  {shelf}
                </option>
              ))}
          </select>

          {/* <button
          className="bg-[#FFD787] rounded-lg border-2
         border-[#3D3D3D] shadow-grey-2 flex justify-center items-center p-1
          active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transform transition duration-200"
        >
          <lord-icon
            src="https://cdn.lordicon.com/eouimtlu.json"
            trigger="morph"
            class="size-7"
          ></lord-icon>
        </button> */}
        </div>
      )}
    </div>
  );
}

export default MiniTopBar;
