import React from "react";

const Spinner = ({text}) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full animate-pulse bg-[#4ADE80]"></div>
          <div className="w-8 h-8 rounded-full animate-pulse bg-[#4ADE80]"></div>
          <div className="w-8 h-8 rounded-full animate-pulse bg-[#4ADE80]"></div>
        </div>
        <p className="text-base text-amber-500 font-[Inter]">{text}</p>
      </div>
    </div>
  );
};

export default Spinner;
