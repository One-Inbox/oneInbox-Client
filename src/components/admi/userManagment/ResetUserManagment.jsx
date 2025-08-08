import React from "react";
import { useDispatch } from "react-redux";
import { getAllUsersAction } from "../../../redux/actions/actionsUsers";
import {
  filterByActiveUser,
  filterByPrivilegeUserAction,
} from "../../../redux/actions/actionFilters";

const ResetUserManagment = ({
  searchInput,
  setSearchInput,
  selectedByActive,
  setSelectedByActive,
  selectedByPrivilege,
  setSelectedByPrivilege,
}) => {
  const dispatch = useDispatch();

  const handlerOnClick = async () => {
    if (selectedByActive !== "TODOS") {
      await dispatch(filterByActiveUser("TODOS"));
      setSelectedByActive("TODOS");
    }
    if (selectedByPrivilege !== "TODOS") {
      await dispatch(filterByPrivilegeUserAction("TODOS"));
      setSelectedByPrivilege("TODOS");
    }
    if (searchInput !== "") {
      await setSearchInput("");
    }
    dispatch(getAllUsersAction);
  };

  return (
    <div>
      <button
        onClick={handlerOnClick}
        className="w-fit h-fit  px-8 py-1 bg-green-400 hover:bg-amber-500 rounded-[30px] shadow-inner text-white text-xs font-normal font-['Oswald']"
      >
        RESET
      </button>
    </div>
  );
};
export default ResetUserManagment;
