import React from "react";

const IconUserProfile = ({ name }) => {
  //console.log("name: ", name);
  const nameArray = name ? name.split(" ") : null;
  //console.log("name en array: ", nameArray);
  const firstNameI = name ? nameArray[0][0].toUpperCase() : null;
  //console.log("inicial del primer nombre: ", firstNameI);
  const lastNameI = name ? nameArray[1][0] : null;
  //console.log("inicial del apellido: ", lastNameI);
  const fullNameI = name ? `${firstNameI}${lastNameI}` : null;
  //console.log(fullNameI);

  return (
    <div>
      {fullNameI === null ? (
        <img
          src="/userIcon/noUser.svg"
          className=" w-14 h-14 rounded-full drop-shadow-lg"
        />
      ) : firstNameI === "A" ||
        firstNameI === "F" ||
        firstNameI === "K" ||
        firstNameI === "O" ||
        firstNameI === "T" ||
        firstNameI === "Y" ? (
        <div className="bg-sky-950 w-14 h-14 rounded-full drop-shadow-lg text-center flex justify-center items-center font-semibold text-['Inter'] text-white text-lg">
          <h2>{fullNameI}</h2>
        </div>
      ) : firstNameI === "B" ||
        firstNameI === "G" ||
        firstNameI === "L" ||
        firstNameI === "P" ||
        firstNameI === "U" ||
        firstNameI === "Z" ? (
        <div className="bg-green-400 w-14 h-14 rounded-full drop-shadow-lg text-center flex justify-center items-center font-semibold text-['Inter'] text-white text-lg">
          <h2>{fullNameI}</h2>
        </div>
      ) : firstNameI === "C" ||
        firstNameI === "H" ||
        firstNameI === "M" ||
        firstNameI === "Q" ||
        firstNameI === "V" ? (
        <div className="bg-amber-500 w-14 h-14 rounded-full drop-shadow-lg text-center flex justify-center items-center font-semibold text-['Inter'] text-white text-lg">
          <h2>{fullNameI}</h2>
        </div>
      ) : firstNameI === "D" ||
        firstNameI === "I" ||
        firstNameI === "N" ||
        firstNameI === "R" ||
        firstNameI === "W" ? (
        <div className="bg-neutral-200 w-14 h-14 rounded-full drop-shadow-lg text-center flex justify-center items-center font-semibold text-['Inter'] text-white text-lg">
          <h2>{fullNameI}</h2>
        </div>
      ) : (
        <div className="bg-stone-300 w-14 h-14 rounded-full drop-shadow-lg text-center flex justify-center items-center font-semibold text-['Inter'] text-white text-lg">
          <h2>{fullNameI}</h2>
        </div>
      )}
    </div>
  );
};

export default IconUserProfile;
