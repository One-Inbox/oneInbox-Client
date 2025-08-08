import React from "react";
import SearchUser from "./SearchUser";
import FilterByPrivilege from "./FilterByPrivilege";
import FilterByActiveUser from "./FilterByActiveUser";
import AddUserButton from "./AddUserButton";
import ResetUserManagment from "./ResetUserManagment";
import { useState } from "react";

const MenuUserManagment = ({ searchInput, setSearchInput }) => {
  const [selectedByActive, setSelectedByActive] = useState("TODOS");
  const [selectedByPrivilege, setSelectedByPrivilege] = useState("TODOS");
  return (
    <div className="sticky w-56 h-screen overflow-y-auto overflow-x-hidden bg-green-400 flex flex-col py-4">
      <div className="flex flex-col justify-between mt-6 mx-auto">
        <SearchUser searchInput={searchInput} setSearchInput={setSearchInput} />
      </div>
      <div className="mt-10">
        <FilterByPrivilege
          selectedByPrivilege={selectedByPrivilege}
          setSelectedByPrivilege={setSelectedByPrivilege}
        />
      </div>
      <div className="mt-6">
        <FilterByActiveUser
          selectedByActive={selectedByActive}
          setSelectedByActive={setSelectedByActive}
        />
      </div>
      <div className="flex flex-col items-center mt-6">
        <div className="mb-2">
          <ResetUserManagment
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            selectedByActive={selectedByActive}
            setSelectedByActive={setSelectedByActive}
            selectedByPrivilege={selectedByPrivilege}
            setSelectedByPrivilege={setSelectedByPrivilege}
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-12">
        <div className="mb-2">
          <AddUserButton />
        </div>
      </div>
    </div>
  );
};

export default MenuUserManagment;
