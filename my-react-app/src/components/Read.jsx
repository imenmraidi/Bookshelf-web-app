import React, { useEffect, useState } from "react";
import MiniTopBar from "./MiniTopBar";
import Library from "./Library";
import useAxios from "../utils/useAxios";
import { useSelector } from "react-redux";
function Read() {
  const [booksByShelf, setBooksByShelf] = useState([]);
  const [shelves, setShelves] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useSelector(state => state.auth);
  const api = useAxios();

  const fetchData = async () => {
    try {
      const response = await api.post(
        "http://localhost:3002/api/book/booksByShelf",
        { userId: user.id, status: "R" }
      );
      console.log(response.data);
      setBooksByShelf(response.data);
      setShelves(response.data.map(s => s._id));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className="w-full h-full overflow-auto md:w-1/2 flex flex-col flex-grow 
     space-y-4 p-4  "
    >
      <MiniTopBar />
      <Library booksByShelf={booksByShelf} setBooksByShelf={setBooksByShelf} />
    </div>
  );
}

export default Read;
