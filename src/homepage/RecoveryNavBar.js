import React, { useState } from "react";
import { Link } from "react-router-dom"

const navStyle ={ borderRadius: "0" }

const RecoveryNavBar = (props) => {
    const [dropDown, setDropDown] = useState(false)
    const [statDropdown, setStatDropdown] = useState(false)

    const toggleDropDown = () => {
        setDropDown(!dropDown)
    }

    const toggleStatDrop = () => {
        setStatDropdown(!statDropdown);
    }

    return (
        <div className="ui inverted menu" style={navStyle}>
            <Link to="/" className="item"> Home </Link>

            {/* STATUS DROPDOWN */}
            <div className="ui dropdown item" onClick={() => toggleDropDown()}>
            Status <i className="dropdown icon"></i>

                <div style={{display: dropDown ? "block" : "none"}} className="menu">
                    <Link to="/repossessed" className="item"> Repossessed </Link>
                    <Link to="/auction" className="item"> Auction </Link>
                    <Link to="/sold" className="item"> Sold </Link>
                    <Link to="/closed" className="item"> Closed </Link>
                </div>
            </div>

            {/* STATS DROPDOWN */}
            <div className="ui dropdown item" onClick={() => toggleStatDrop()}>
            Stats <i className="dropdown icon"></i>

                <div style={{display: statDropdown ? 'block': 'none'}} className="menu">
                    <Link to="/recovery_stats" className="item"> Recovery Stats </Link>
                    <Link to="/admin_stats" className="item"> PTP Stats </Link>
                </div>
            </div>

            <Link className="item" to="/search_repo">Search</Link>

            {props.user.isadmin ? <Link className="item" to="/admin_page">Admin Page</Link> : null}

            <div className="right menu">
                {/* eslint-disable-next-line*/}
                {props.user.id ? <a onClick={() => props.signOut()} className="item">Sign Out</a> : null } 
            </div>
        </div>
    )
}

export default RecoveryNavBar;