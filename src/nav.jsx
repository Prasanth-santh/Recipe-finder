import React from "react";
import './nav.css'
import Logo from './assets/imgs/logo.svg'
import { FaSearch } from "react-icons/fa";

export default function Nav(){
    return(
        <div className="Nav_overall">
            <div className="logo">
                <img src={Logo}/>
                <h2> Recipe Finder</h2>
            </div>
            <div className="search_bar">
                <input ></input>
                <FaSearch className="icon" />
            </div>
        </div>
    )
}