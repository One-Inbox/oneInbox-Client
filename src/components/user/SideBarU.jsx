import SelectUser from "../utils/selectUser/SelectUser";
import FilterBySocialMedia from "../utils/filters/FilterBySocialMedia";
import FilterByState from "../utils/filters/FilterByState";
import ResetButtom from "../utils/buttons/ResetButton";
import GoHomeButton from "../utils/buttons/GoHomeButton";
import statesJson2 from "../../../public/json/statesJson2";

const SideBarU = () => {
  return (
    <div className="w-48 h-screen bg-sky-950 fixed top-0">
      <img
        src="/logos/logo.svg"
        alt="Logo"
        className="w-20 h-auto mt-2 mx-auto z-50"
      />
      <div className="flex flex-col justify-between pt-4">
        <SelectUser />
        <div className="mt-3">
          <FilterBySocialMedia />
        </div>
        <div className="mt-3">
          <FilterByState statesList={statesJson2} />
        </div>
        <div className="flex flex-col items-center mt-4">
          <div className="mb-1">
            <ResetButtom />
          </div>
          <GoHomeButton />
        </div>
      </div>
    </div>
  );
};

export default SideBarU;
