import React from "react";

const SpinnerLogin = (props) => {
  const name = props.props.name ? props.props.name : null;

  

  return (
    <div className="w-screen h-screen bg-sky-950 m-0">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full animate-pulse bg-[#4ADE80]"></div>
          <div className="w-8 h-8 rounded-full animate-pulse bg-[#4ADE80]"></div>
          <div className="w-8 h-8 rounded-full animate-pulse bg-[#4ADE80]"></div>
        </div>
        <p className="text-base text-amber-500 font-[Inter]">
          ingresando al OneInbox de {name}
        </p>
      </div>
    </div>
  );
};

export default SpinnerLogin;
