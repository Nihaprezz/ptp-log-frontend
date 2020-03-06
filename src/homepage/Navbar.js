import React from "react";
import { Link } from "react-router-dom";

const navStyle ={
    borderRadius: "0"
}

const Navbar = (props) => {
    return (
        <div className="ui inverted menu" style={navStyle}>
            <Link to="/" className="item"> Home </Link>
            { props.user.isadmin ? < Link to="/credit_unions" className="item">Add Credit Union</Link>: null}
            { props.user.isadmin ? < Link to="/admin_page" className="item">Admin Page</Link>: null}
            < Link to="/stats" className="item"> Stats </Link>
            < Link to="/stats" className="item"> Skip Tracing </Link>
            <div className="right menu">
                {/* eslint-disable-next-line*/}
                {props.user.id ? <a onClick={() => props.signOut()} className="item">Sign Out</a> : null } 
            </div>

        </div>
    )
}

export default Navbar