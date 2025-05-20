import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { filterByStateAction } from "../../../redux/actions/actionFilters";

const FilterByState = ({ statesList }) => {
  //console.log("statesList", statesList);

  const dispatch = useDispatch();

  // Estado para almacenar el filtro seleccionado
  const [selectedFilter, setSelectedFilter] = useState(
    sessionStorage.getItem("state") || "TODOS"
  );

  // Función para manejar el cambio de estado de un radio button
  const handlerOnChange = (e) => {
    setSelectedFilter(e.target.value);
    dispatch(filterByStateAction(e.target.value));
    sessionStorage.setItem("state", e.target.value);
    //console.log("despacho el filtro por state con payload", e.target.value);
  };

  return (
    <div>
      {statesList &&
        statesList.map((state, index) => {
          return (
            <div key={index} className="flex items-center m-2">
              <img src={state.icon} className="w-8 h-8" />
              <label className=" text-white text-xs font-normal font-['Oswald'] capitalize ml-3 ">
                {/* {console.log("nombre", state.name)} */}
                {state.name.toUpperCase()}
                <input
                  type="radio"
                  value={state.name}
                  checked={selectedFilter === `${state.name}`}
                  onChange={handlerOnChange}
                  className="absolute right-3 w-4 h-4 accent-amber-400"
                />
              </label>
              <br />
            </div>
          );
        })}
      <div className="flex items-center m-2">
        <img src="/logos/iconoLogoBlanco.svg" className="w-8 h-8" />
        <label className=" text-white text-xs font-normal font-['Oswald'] capitalize ml-3 ">
          TODOS
          <input
            type="radio"
            value="TODOS"
            checked={selectedFilter === "TODOS"}
            onChange={handlerOnChange}
            className="absolute right-3 w-4 h-4 accent-amber-400"
          />
        </label>
        <br />
      </div>
    </div>
  );
};

export default FilterByState;
