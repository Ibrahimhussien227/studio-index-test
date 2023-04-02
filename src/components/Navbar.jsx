import React from "react";

import { ReactComponent as Vertical } from "../assets/vertical.svg";
import { ReactComponent as Horizontal } from "../assets/horizontal.svg";
import { useStateContext } from "../contexts/ContextProvider";

const Navbarr = () => {
  const { shape, setShape } = useStateContext();

  return (
    <div className="flex sm:justify-between justify-center py-10">
      <div />
      <div className="flex flex-row sm:mr-10 gap-5">
        <Horizontal
          onClick={() => {
            localStorage.setItem("SHAPE", "horizontal");
            setShape("horizontal");
          }}
          className={`${
            shape === "horizontal" ? "stroke-[#00A0AB]" : "stroke-[#C7C7C7]"
          } hover:stroke-gray-400 cursor-pointer`}
        />
        <Vertical
          onClick={() => {
            localStorage.setItem("SHAPE", "vertical");
            setShape("vertical");
          }}
          className={`${
            shape === "vertical" ? "stroke-[#00A0AB]" : "stroke-[#C7C7C7]"
          } hover:stroke-gray-400 cursor-pointer`}
        />
      </div>
    </div>
  );
};

export default Navbarr;
