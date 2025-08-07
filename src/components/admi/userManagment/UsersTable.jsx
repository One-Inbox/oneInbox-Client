import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Spinner from "../../utils/spinners/Spinner";
import IconUser from "../../utils/selectUser/IconUser";
import PrivilegeIcons from "./PrivilegeIcons";
import EditUserButton from "./EditUserButton";
import DeleteUserButton from "./DeleteUserButton";
import FormattedTimestamp from "../../utils/FormatedTimeStamp";
import timeStampToISO from "../../utils/timeStampToISO";

const UsersTable = () => {
  const allUsers = useSelector((state) => state.users);

  const [loading, setLoading] = useState(true);

  const onlyDate = (date) => {
    const cleanDate = date.includes("T") ? date.split("T")[0] : date;
    const [year, month, day] = cleanDate.split("-");
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    let timeoutId;
    if (allUsers && allUsers.length) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId); // Limpia el timeout si el componente se desmonta
    };
  }, [allUsers]);

  return (
    <div className="w-full">
      <table className="min-w-full w-full table-auto bg-white ">
        <thead className="bg-stone-200 shadow-md relative z-10">
          <tr>
            <th className="py-2 text-xs text-center text-normal font-['Oswald']">
              USUARIO
            </th>
            <th className="py-2 text-xs text-center text-normal font-['Oswald']">
              FECHA ALTA
            </th>
            <th className=" pr-4 py-2 text-xs text-center text-normal font-['Oswald']">
              ACTIVO
            </th>
            <th className=" pr-4 py-2 text-xs text-center text-normal font-['Oswald']">
              FECHA BAJA
            </th>
            <th className=" px-4 py-2 text-xs text-center text-normal font-['Oswald']">
              TELEFONO
            </th>
            <th className=" px-4 py-2 text-xs text-center text-normal font-['Oswald']">
              E-MAIL
            </th>
            <th className=" px-4 py-2 text-xs text-center text-normal font-['Oswald']">
              PRIVILEGIO
            </th>
            <th className=" px-4 py-2 text-xs text-center text-normal font-['Oswald']">
              <span className="hidden">acciones</span>
            </th>
          </tr>
        </thead>
        {loading ? (
          <tr>
            <td colSpan="6" className="text-center py-4 h-[600px]">
              <Spinner text={"loading..."} />
            </td>
          </tr>
        ) : (
          <tbody className="overflow-x-auto">
            {allUsers && !allUsers.length ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 h-[600px] font-normal font-['Inter']"
                >
                  {/* ver de hacer un filter con los textos segun los filtros aplicados */}
                  <span> no hay usuarios que coincidan con su búsqueda</span>
                </td>
              </tr>
            ) : (
              allUsers &&
              allUsers.map((user, index) => {
                return (
                  <tr key={index} className="odd:bg-white even:bg-stone-300 ">
                    <td className=" pl-8 py-2 text-center text-xs font-normal">
                      <div className=" flex items-center justify-start space-x-6 ml-4 font-['Inter'] capitalize w-auto h-6">
                        <IconUser
                          name={user.name}
                          customSize="w-8 h-8 text-lg"
                        />
                        <span>{user.name.toUpperCase()}</span>
                      </div>
                    </td>
                    <td className=" px-4 py-2 text-center text-xs font-normal font-['Inter'] capitalize">
                      {onlyDate(user.admissionDate)}
                    </td>
                    <td className=" pr-4 py-2 text-center text-xs font-normal font-['Inter'] capitalize w-6 h-auto">
                      {user.active ? (
                        <img
                          src={"/managmentIcons/userActive-icon.svg"}
                          alt="activo"
                        />
                      ) : (
                        <img
                          src={"/managmentIcons/userUnactive-icon.svg"}
                          alt="inactivo"
                        />
                      )}
                    </td>
                    <td className=" px-4 py-2 text-center text-xs font-normal font-['Inter'] capitalize">
                      {user.dischargeDate ? onlyDate(user.dischargeDate) : "-"}
                    </td>
                    <td className=" px-4 py-2 text-center text-xs font-normal font-['Inter'] capitalize">
                      {user.phone}
                    </td>
                    <td className=" px-4 py-2 text-center text-xs font-normal font-['Inter'] ">
                      {user.email}
                    </td>
                    <td className=" pl-12 py-2 text-center">
                      <PrivilegeIcons privilege={user.privilege} />
                    </td>
                    <td className="px-4 py-2 text-center text-xs font-normal font-['Inter'] capitalize mx-4">
                      <div className="flex items-center justify-center space-x-6">
                        <EditUserButton userId={user.id} />
                        <DeleteUserButton user={user} />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default UsersTable;
