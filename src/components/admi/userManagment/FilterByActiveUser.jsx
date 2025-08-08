import React from "react";
import userActiveJson from "../../../../public/json/userActiveJson";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByActiveUser } from "../../../redux/actions/actionFilters";

const FilterByActiveUser = () => {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState("TODOS");
  const parseBoolean = (str) => {
    return String(str).toLowerCase() === "true";
  };
  const handlerOnChange = (e) => {
    setSelectedFilter(e.target.value);
    const value =
      e.target.value !== "TODOS"
        ? parseBoolean(e.target.value)
        : e.target.value;
    dispatch(filterByActiveUser(value));
  };

  return (
    <div>
      {userActiveJson &&
        userActiveJson.map((element, index) => {
          return (
            <div key={index} className="flex items-center m-2">
              <img src={element.icon} className="w-8 h-8" />
              <label className=" text-white text-xs font-normal font-['Oswald'] capitalize ml-3 ">
                {element.name}
                <input
                  type="radio"
                  value={element.value}
                  checked={selectedFilter === `${element.value}`}
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

export default FilterByActiveUser;
