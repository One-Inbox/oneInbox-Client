import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMessagesReceivedAction,
  getAllMessagesSentAction,
} from "../../../redux/actions/actionMessages";
import {
  getAllUsersAction
} from "../../../redux/actions/actionsUsers"


const SpinnerLoginBusiness = () => {
 
  const dispatch = useDispatch()
  const business = useSelector((state) => state.business);
  const businessId = business ? business.id : null;
  const businessName = business ? business.name : null;
 
  useEffect(() => {
    if (businessId) {
      dispatch(getAllMessagesReceivedAction());
      dispatch(getAllMessagesSentAction());
      //dispatch(getAllUsersAction());
      sessionStorage.setItem('businessId', business.id)
    }
  }, [dispatch, businessId]);
    
 businessId &&  sessionStorage.setItem('loginBusiness', true)

  return (
    <div className="w-screen h-screen bg-sky-950 m-0">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full animate-pulse bg-[#4ADE80]"></div>
          <div className="w-8 h-8 rounded-full animate-pulse bg-[#4ADE80]"></div>
          <div className="w-8 h-8 rounded-full animate-pulse bg-[#4ADE80]"></div>
        </div>
        <p className="text-base text-amber-500 font-[Inter]">
          ingresando al OneInbox de {businessName}
        </p>
      </div>
    </div>
  );
};

export default SpinnerLoginBusiness;