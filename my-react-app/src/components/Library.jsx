import { React, useState } from "react";
import Shelf from "./Shelf";
import MiniTopBar from "./MiniTopBar";
function Library({ booksByShelf, status }) {
  const [search, setSearch] = useState("");
  const [selectedShelf, setSelectedShelf] = useState("");
  return (
    booksByShelf && (
      <>
        <div className="flex p-2 overflow-auto   ">
          <div className="bg-[#BF785E] w-4 rounded-md border-2 border-black shadow-black-2"></div>
          <div className=" flex flex-grow flex-col w-full h-full overflow-y-auto scroll-smooth scrollbar-none pb-1 ">
            <MiniTopBar
              status={status}
              shelves={booksByShelf.map(b => b.shelf)}
              search={search}
              setSearch={setSearch}
              selectedShelf={selectedShelf}
              setSelectedShelf={setSelectedShelf}
            />
            <div className=" flex flex-grow flex-col w-full h-full overflow-y-auto scroll-smooth scrollbar-none  ">
              {booksByShelf && search
                ? booksByShelf
                    .map(item => {
                      // Filter books within each shelf
                      const filteredBooks = item.books.filter(
                        book =>
                          book.title
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          book.authors.some(author =>
                            author.toLowerCase().includes(search.toLowerCase())
                          )
                      );

                      // Return the shelf only if it contains matching books
                      if (filteredBooks.length > 0) {
                        return { ...item, books: filteredBooks };
                      } else if (
                        item.shelf.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return item;
                      } else {
                        return null; // If no books match, return null
                      }
                    })
                    .filter(item => item !== null)
                    .map(s => <Shelf status={status} shelf={s} key={s.shelf} />)
                : selectedShelf
                ? booksByShelf
                    .filter(item => {
                      return item.shelf.includes(selectedShelf);
                    })
                    .map(s => <Shelf status={status} shelf={s} key={s.shelf} />)
                : booksByShelf.map(s => (
                    <Shelf status={status} shelf={s} key={s.shelf} />
                  ))}
            </div>
          </div>
          <div
            className="bg-[#BF785E] w-4 rounded-md border-2
         border-black shadow-black-2"
          ></div>
        </div>
      </>
    )
  );
}

export default Library;
