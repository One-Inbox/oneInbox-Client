import React from "react";
import { useSelector } from "react-redux";

const BusinessData = () => {
  const business = useSelector((state) => state.business);
  //1rem = 16px
  return (
    <div className="w-[48.5rem] h-auto bg-neutral-200 rounded-tr-[50px] rounded-bl-[50px] relative">
      <div className="flex flex-col items-center pt-6 mt-2">
        <h4 className="text-xs font-normal font-['Oswald'] uppercase">
          datos de la empresa
        </h4>
        <h1 className="text-base font-normal font-['Oswald'] uppercase">
          {!business.name ? null : business.name}
        </h1>
      </div>
      <div className="flex flex-row justify-between px-12 mt-6">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <h4 className="text-sm font-normal font-['Oswald'] uppercase">
              Password:
            </h4>
            <span className="text-sm font-normal font-['Inter'] ml-2">
              {business.password ? business.password : null}
            </span>
          </div>
          <div className="flex flex-row">
            <h4 className="text-sm font-normal font-['Oswald'] uppercase">
              DIRECCION:
            </h4>
            <span className="text-sm font-normal font-['Inter'] ml-2">
              {business.address ? business.address : null}
            </span>
          </div>
          <div className="flex flex-row">
            <h4 className="text-sm font-normal font-['Oswald'] uppercase">
              pais:
            </h4>
            <span className="text-sm font-normal font-['Inter'] ml-2">
              {business.country ? business.country : null}
            </span>
          </div>
        </div>
        <div className="flex flex-col px-12">
          <div className="flex flex-row">
            <h4 className="text-sm font-normal font-['Oswald'] uppercase">
              E-MAIL:
            </h4>
            <span className="text-sm font-normal font-['Inter'] ml-2">
              {business.email ? business.email : null}
            </span>
          </div>
          <div className="flex flex-row">
            <h4 className="text-sm font-normal font-['Oswald'] uppercase">
              provincia/estado:
            </h4>
            <span className="text-sm font-normal font-['Inter'] ml-2">
              {business.city ? business.city : "buenos aires"}
            </span>
          </div>
          <div className="flex flex-row mb-12">
            <h4 className="text-sm font-normal font-['Oswald'] uppercase">
              TELEFONO:
            </h4>
            <span className="text-sm font-normal font-['Inter'] ml-2">
              {business.phone ? business.phone : null}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessData;
