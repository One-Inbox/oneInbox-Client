import React from "react";
import privilegeJson from "../../../../public/json/privilegeJson";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByPrivilegeUserAction } from "../../../redux/actions/actionFilters";

const FilterByPrivilege = ({ selectedByPrivilege, setSelectedByPrivilege }) => {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState("TODOS");

  const handlerOnChange = (e) => {
    setSelectedByPrivilege(e.target.value);
    dispatch(filterByPrivilegeUserAction(e.target.value));
  };

  return (
    <div>
      {privilegeJson &&
        privilegeJson.map((priv, index) => {
          return (
            <div key={index} className="flex items-center m-2">
              <img src={priv.icon} className="w-8 h-8" />
              <label className=" text-white text-xs font-normal font-['Oswald'] capitalize ml-3 ">
                {priv.name}
                <input
                  type="radio"
                  value={priv.value}
                  checked={selectedByPrivilege === `${priv.value}`}
                  onChange={handlerOnChange}
                  className=" absolute right-3 w-4 h-4 accent-amber-400"
                />
              </label>
              <br />
            </div>
          );
        })}
    </div>
  );
};

export default FilterByPrivilege;
