import { useState } from "react";

const ArchivedButton = () => {
  const [isArchived, setIsArchived] = useState(false);
  const handlerOnClick = () => {
    console.log("me archivo");
    setIsArchived(!isArchived);
  };

  return (
    <div>
      {isArchived ? (
        <img
          src={"/managmentIcons/unarchive-icon.svg"}
          className="w-8 h-auto"
          onClick={handlerOnClick}
          alt="desarchivar"
        />
      ) : (
        <img
          src={"/managmentIcons/archive-icon.svg"}
          className="w-8 h-auto"
          onClick={handlerOnClick}
          alt="archivar"
        />
      )}
    </div>
  );
};

export default ArchivedButton;
