import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import socialMediaJson from "../../../../public/json/socialMediaJson";
import { filterBySocialMediaAction } from "../../../redux/actions/actionFilters";

const FilterBySocialMedia = () => {
  const dispatch = useDispatch();
  //en lugar de realizar el sort sobre el json, deberia realizarse sobre el array de redes sociales activas
  const sortSocialMedia = socialMediaJson.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (b.name > a.name) {
      return -1;
    }
    return 0;
  });

  // Estado para almacenar el filtro seleccionado
  const [selectedFilter, setSelectedFilter] = useState("TODOS");

  // Función para manejar el cambio de estado de un radio button
  const handlerOnChange = (e) => {
    setSelectedFilter(e.target.value);
    //console.log("filtro seleccionado", e.target.value);
    dispatch(filterBySocialMediaAction(e.target.value));
    sessionStorage.setItem("socialMedia", e.target.value);
  };

  return (
    <div>
      {sortSocialMedia &&
        sortSocialMedia.map((sm, index) => {
          return (
            <div key={index} className="flex items-center m-2">
              <img src={sm.icon} className="w-8 h-8" />
              <label className=" text-white text-xs font-normal font-['Oswald'] capitalize ml-3 ">
                {sm.name.toUpperCase()}
                <input
                  type="radio"
                  value={sm.name}
                  checked={selectedFilter === `${sm.name}`}
                  onChange={handlerOnChange}
                  className=" absolute right-3 w-4 h-4 accent-amber-400"
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
            className=" absolute right-3 w-4 h-4 accent-amber-400"
          />
        </label>
        <br />
      </div>
    </div>
  );
};

export default FilterBySocialMedia;
