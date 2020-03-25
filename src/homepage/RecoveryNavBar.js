import React from "react";
import { Link } from "react-router-dom"

const navStyle ={ borderRadius: "0" }

const RecoveryNavBar = (props) => {
    return (
        <div className="ui inverted menu" style={navStyle}>
            <Link to="/" className="item"> Home </Link>


            <div className="right menu">
                {/* eslint-disable-next-line*/}
                {props.user.id ? <a onClick={() => props.signOut()} className="item">Sign Out</a> : null } 
            </div>
        </div>
    )
}

export default RecoveryNavBar;