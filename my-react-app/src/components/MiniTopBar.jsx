import React from "react";
function MiniTopBar() {
  return (
    <div className="flex space-x-3 h-10 justify-between pl-2 pr-2">
      <h1 className="flex items-center text-3xl italic">My read list</h1>
      <div className="flex space-x-4">
        <div className="flex bg-white rounded-lg pr-1 pl-1 border-2
         border-[#3D3D3D] shadow-grey-2 items-center">
          <lord-icon
            src="https://cdn.lordicon.com/kkvxgpti.json"
            trigger="hover"
            class=""
          ></lord-icon>
          <input type="text" className="outline-none p-1" />
        </div>
        <select
          className="flex bg-[#FDA79A] rounded-lg pr-1 pl-1 border-2
         border-[#3D3D3D] shadow-grey-2 outline-none"
        >
          <option value="">Shelves</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>

        <button
          className="bg-[#FFD787] rounded-lg border-2
         border-[#3D3D3D] shadow-grey-2 flex justify-center items-center p-1"
        >
          <lord-icon
            src="https://cdn.lordicon.com/eouimtlu.json"
            trigger="morph"
            class=""
          ></lord-icon>
        </button>
        <button
          className="bg-[#BEF0CD] rounded-lg border-2
        border-[#3D3D3D] shadow-grey-2 flex justify-center items-center p-1
        animate-bounce 
        "
        >
          <lord-icon
            src="https://cdn.lordicon.com/zyzoecaw.json"
            trigger="morph"
            state="morph-book"
            class=""
          ></lord-icon>
        </button>
      </div>
    </div>
  );
}

export default MiniTopBar;
