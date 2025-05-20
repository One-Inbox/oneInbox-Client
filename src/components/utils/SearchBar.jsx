import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByContactAction } from "../../redux/actions/actionFilters";

const SearchBar = ({ customWidth = "w-56", customButton = "bg-stone-400" }) => {
  const dispatch = useDispatch();
  const [contact, setContact] = useState("");

  //handler que setea el estado local
  const handlerChange = (e) => {
    setContact(e.target.value);
  };

  //handler que despacha la action searchByName
  const handlerDispatch = async () => {
    dispatch(searchByContactAction(contact));
    setContact(""); //setea constact al estado inicial
  };

  return (
    <div
      className={`${customWidth} h-6 bg-white drop-shadow rounded-[30px] flex items-center gap-1 pl-1`}
    >
      <input
        className=" w-36 bg-white text-black pl-2 text-sm font-normal font-['Inter'] rounded-[30px] focus:outline-none"
        type="search"
        value={contact}
        onChange={handlerChange}
        placeholder="contacto..."
      />
      <button
        className={`px-3 py-1 h-5 ${customButton} hover:bg-amber-500 rounded-[30px]  text-xs font-normal font-['Oswald'] flex items-center`}
        onClick={handlerDispatch}
      >
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
