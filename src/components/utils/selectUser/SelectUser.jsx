import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getUserByIdAction,
  cleanUserByIdAction,
} from "../../../redux/actions/actionsUsers";
import IconUser from "./IconUser";

const SelectUser = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  //console.log("usuarios", users);

  const user = useSelector((state) => state.user);

  const selectHandler = async (e) => {
    const value = e.target.value;
    if (value === "") {
      sessionStorage.removeItem("userId");
      dispatch(cleanUserByIdAction());
    } else {
      sessionStorage.setItem("userId", value);
      dispatch(getUserByIdAction(value));
    }
  };

  return (
    <div className="flex items-center">
      <div>
        {!user ? (
          <img className="w-10 h-10" src="/noUser.svg" />
        ) : user.image ? (
          <img className="w-10 h-10" src={user.image} />
        ) : (
          <IconUser name={user.name} />
        )}
      </div>
      <div>
        <select
          name="selectUser"
          onChange={selectHandler}
          value={user ? user.id : ""}
          className="text-md bg-sky-950 rounded-2xl text-white text-sm font-normal font-['Oswald'] capitalize ml-3"
        >
          <option value="" hidden={!user}>
            usuario...
          </option>
          {users &&
            users.map((user, index) => {
              return (
                <option key={index} value={user.id}>
                  {user.name.toUpperCase()}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default SelectUser;
