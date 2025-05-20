import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MessagesCounter from "./utils/MessagesCounter";
import SearchBar from "./utils/SearchBar";
import LoginButton from "./utils/buttons/LoginButton";
import LogoutButton from "./utils/buttons/LogoutButton";

const NavBar = () => {
  const business = useSelector((state) => state.business);
  const login = useSelector((state) => state.admiLogin);
  const admi = sessionStorage.getItem('Admi')

  return (
    <div className="sticky w-screen h-14 flex">
      <div className="bg-sky-950 w-48 h-14"></div>
      <div className="bg-stone-300 flex-grow flex items-center px-8 justify-between">
        <h2 className="text-black text-3xl font-semibold font-['Inter'] capitalize ml-8">
          OneInbox
        </h2>
        <span className="text-black text-xs font-normal font-['Oswald'] uppercase">
          {business ? business.name : "bandeja de entradas"}
          <br />
          <MessagesCounter />
        </span>
        {login || admi ? null : <SearchBar />}
        {login || admi ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
  );
};

export default NavBar;
