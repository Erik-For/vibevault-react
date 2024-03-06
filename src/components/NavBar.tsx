import React from "react"
import { User } from "../types";
import NavItem from "./NavItem";
import { FaSearch, FaHome, FaArchive } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row w-full h-1/16 z-50 md:h-screen md:w-3/10 lg:w-1/5 md:flex-col md:justify-start justify-center items-center bg-gray-850">
      <div onClick={(e) => {
          e.preventDefault();
          navigate("/");
      }} className="hidden md:flex select-none cursor-pointer">
        <img draggable="false" alt="VibeVault" className="w-48 h-auto p-4" src={logo}></img>
      </div>
      <NavItem text="Home" Icon={ FaHome } src="/" />
      <NavItem text="Search" Icon={ FaSearch} src="/search" />
      <NavItem text="Library" Icon={ FaArchive } src="/library" />
      <hr className="hidden md:flex h-px bg-gray-200 pt-1 rounded-md mb-1 mt-1 border-0 w-7/8 dark:bg-gray-700" />
      <div className="hidden md:flex">

      </div>
  </div>
  )
}

export default NavBar