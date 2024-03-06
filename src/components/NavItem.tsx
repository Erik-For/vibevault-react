import React from "react"
import { IconType } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom"

const NavItem = ({ text, Icon, src } : {text: string, Icon: IconType | null, src: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selected = location.pathname == src;
  return (
    <div onClick={(e) => {
        e.preventDefault();
        navigate(src);
    }} style={{ color: selected? "#9CA38F" : "#FFFFFF"}} className="active:scale-[.95] transition-transform md:flex-row select-none cursor-pointer flex flex-col flex-start justify-center items-center grow md:grow-0 w-11/12 md:m-1 h-full md:h-10 md:border-2 border-transparent bg-gray-850 md:bg-gray-900 md:rounded-md">
        {Icon ? <Icon className="text-2xl md:text-3xl"/> : ""}
        <p className="font-medium md:pl-2 text-xs md:text-sm">{text}</p>
    </div>
  )
}

export default NavItem