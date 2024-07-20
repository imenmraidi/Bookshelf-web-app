import React from "react";
function TopBar({ addBook }) {
  return (
    <div className=" h-20 flex items-center p-4 space-x-4">
      <div
        className="bg-beige p-2 shadow-black-2 border-2 border-black 
      rounded-md "
      >
        immy's bookshelf
      </div>
      <div
        className="bg-orange-100 p-2 shadow-black-2 border-2 border-black 
      rounded-md "
      >
        +100
      </div>
      <div
        className="bg-orange-100 p-2 shadow-black-2 border-2 border-black 
      rounded-md "
      >
        +200
      </div>
      <button
        className="bg-[#BEF0CD] rounded-md border-2
        border-[#3D3D3D] shadow-grey-2 flex justify-center items-center p-1
        active:shadow-none active:translate-y-0.5 active:translate-x-0.5 transform transition duration-200"
        onClick={addBook}
      >
        <lord-icon
          src="https://cdn.lordicon.com/zyzoecaw.json"
          trigger="morph"
          state="morph-book"
          class="size-8"
        ></lord-icon>
      </button>
    </div>
  );
}

export default TopBar;
