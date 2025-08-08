const SearchUser = ({ searchInput, setSearchInput }) => {
  //handler que setea el estado local
  const handlerChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="w-48 h-6 bg-white drop-shadow rounded-[30px] flex items-center gap-1 pl-1">
      <input
        className=" w-36 bg-white text-black pl-2 text-sm font-normal font-['Inter'] rounded-[30px] focus:outline-none"
        type="search"
        value={searchInput}
        onChange={handlerChange}
        placeholder="usuario..."
      />
    </div>
  );
};

export default SearchUser;
