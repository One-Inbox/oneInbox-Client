import React from "react";
import userActiveJson from "../../../../public/json/userActiveJson";
import { useState } from "react";

const FilterByActiveUser = () => {
  const [selectedFilter, setSelectedFilter] = useState("TODOS");

  const handlerOnChange = (e) => {
    setSelectedFilter(e.target.value);
    console.log("elijo a: ", selectedFilter);
  };

  return (
    <div>
      {/* <span> FILTER BY ACTIVE USER: <br/> No Implement Yet </span> */}
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
