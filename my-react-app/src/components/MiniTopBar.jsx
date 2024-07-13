import React from "react";
function MiniTopBar({ openAddBookModal, shelves }) {
  return (
    <div className="flex  h-9 justify-between pl-6 pr-6">
      <h1 className="flex items-center text-3xl italic">My read list</h1>
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
          <input type="text" className="outline-none bg-inherit p-1" />
        </div>
        <select
          className="flex bg-[#FDA79A] rounded-lg pr-1 pl-1 border-2
         border-[#3D3D3D] shadow-grey-2 outline-none"
        >
          {shelves.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <button
          className="bg-[#FFD787] rounded-lg border-2
         border-[#3D3D3D] shadow-grey-2 flex justify-center items-center p-1
          active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transform transition duration-200"
        >
          <lord-icon
            src="https://cdn.lordicon.com/eouimtlu.json"
            trigger="morph"
            class="size-7"
          ></lord-icon>
        </button>
        <button
          className="bg-[#BEF0CD] rounded-lg border-2
        border-[#3D3D3D] shadow-grey-2 flex justify-center items-center p-1
        active:shadow-none active:translate-y-0.5 active:translate-x-0.5 transform transition duration-200"
          onClick={openAddBookModal}
        >
          <lord-icon
            src="https://cdn.lordicon.com/zyzoecaw.json"
            trigger="morph"
            state="morph-book"
            class="size-7"
          ></lord-icon>
        </button>
      </div>
    </div>
  );
}

export default MiniTopBar;
