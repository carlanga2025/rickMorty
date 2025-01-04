import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-slate-800 rounded-md w-screen h-screen">
      <h1 className="font-bold text-green-500 text-[68px] pt-[180px] font-mono text-center py-20">The Rick and Morty API</h1>
      <ul className=" flex justify-evenly font-bold text-violet-500 text-[58px] font-mono py-5">
        <li className="py-20">
          <NavLink to="/character">Personajes</NavLink>
        </li>

        <li className="py-20 ">
          <NavLink to="/episodes">Episodios</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;