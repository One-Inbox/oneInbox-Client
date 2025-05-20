import React from "react";

const IconUser = ({ name, customSize = "w-10 h-10 text-xl" }) => {
  const nameArray = name ? name.split(" ") : null;
  const firstNameI = name ? nameArray[0][0].toUpperCase() : null;
  const lastNameI = name && nameArray[1] ? nameArray[1][0] : firstNameI;

  const fullNameI = name ? `${firstNameI}${lastNameI}` : null;

  return (
    <div>
      {fullNameI === null ? (
        <img
          src="/userIcon/noUser.svg"
          className={`${customSize} rounded-full drop-shadow-lg`}
        />
      ) : firstNameI === "A" ||
        firstNameI === "F" ||
        firstNameI === "K" ||
        firstNameI === "O" ||
        firstNameI === "T" ||
        firstNameI === "Y" ? (
        <div
          className={`bg-sky-950 ${customSize} rounded-full drop-shadow-lg text-center flex justify-center items-center font-semibold text-['Inter'] text-white`}
        >
          <h2>{fullNameI}</h2>
        </div>
      ) : firstNameI === "B" ||
        firstNameI === "G" ||
        firstNameI === "L" ||
        firstNameI === "P" ||
        firstNameI === "U" ||
        firstNameI === "Z" ? (
        <div
          className={`bg-green-400 ${customSize} rounded-full drop-shadow-lg text-center flex justify-center items-center font-semibold text-['Inter'] text-white`}
        >
          <h2>{fullNameI}</h2>
        </div>
      ) : firstNameI === "C" ||
        firstNameI === "H" ||
        firstNameI === "M" ||
        firstNameI === "Q" ||
        firstNameI === "V" ? (
        <div
          className={`bg-amber-500 ${customSize} rounded-full drop-shadow-lg text-center flex justify-center items-center font-semibold text-['Inter'] text-white`}
        >
          <h2>{fullNameI}</h2>
        </div>
      ) : firstNameI === "D" ||
        firstNameI === "I" ||
        firstNameI === "N" ||
        firstNameI === "R" ||
        firstNameI === "W" ? (
        <div
          className={`bg-neutral-200 ${customSize} rounded-full drop-shadow-lg text-center flex justify-center items-center font-semibold text-['Inter'] text-white`}
        >
          <h2>{fullNameI}</h2>
        </div>
      ) : (
        <div
          className={`bg-stone-300 ${customSize} rounded-full drop-shadow-lg text-center flex justify-center items-center font-semibold text-['Inter'] text-white`}
        >
          <h2>{fullNameI}</h2>
        </div>
      )}
    </div>
  );
};

export default IconUser;
