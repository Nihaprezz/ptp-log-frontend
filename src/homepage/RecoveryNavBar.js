import React, { useState } from "react";
import { Link } from "react-router-dom"

const navStyle ={ borderRadius: "0" }

const RecoveryNavBar = (props) => {
    const [dropDown, setDropDown] = useState(false)

    const toggleDropDown = () => {
        setDropDown(!dropDown)
    }

    return (
        <div className="ui inverted menu" style={navStyle}>
            <Link to="/" className="item"> Home </Link>

            <div className="ui dropdown item" onClick={() => toggleDropDown()}>
            Status <i className="dropdown icon"></i>

                <div style={{display: dropDown ? "block" : "none"}} className="menu">
                    <Link to="/repossessed" className="item"> Repossessed </Link>
                    <Link to="/auction" className="item"> Auction </Link>
                    <Link to="/sold" className="item"> Sold </Link>
                    <Link to="/closed" className="item"> Closed </Link>
                </div>
            </div>

            <Link className="item" to="/recovery_stats">Recovery Stats</Link>
            <Link className="item" to="/search_repo">Search</Link>


            <div className="right menu">
                {/* eslint-disable-next-line*/}
                {props.user.id ? <a onClick={() => props.signOut()} className="item">Sign Out</a> : null } 
            </div>
        </div>
    )
}

export default RecoveryNavBar;