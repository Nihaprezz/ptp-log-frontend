import React from "react";
import { Link } from "react-router-dom";

const navStyle ={
    borderRadius: "0"
}

const Navbar = (props) => {
    return (
        <div className="ui inverted menu" style={navStyle}>
            <Link to="/" className="item"> Home </Link>

            { props.user.isadmin ? (
                <React.Fragment>
                    < Link to="/credit_unions" className="item">Add Credit Union</Link>
                    < Link to="/admin_page" className="item">Admin Page</Link>
                </React.Fragment>
            ): null}

            {props.user.id ? ( 
                <React.Fragment>
                    < Link to={props.user.isadmin ? "/admin_stats" : "/user_stats"} className="item"> Stats </Link>
                    < Link to={props.user.isadmin ? "/skip_manager" : "/skip_trace"} className="item"> Skip Tracing </Link>
                </React.Fragment>
            ): null }

            <div className="right menu">
                {/* eslint-disable-next-line*/}
                {props.user.id ? <a onClick={() => props.signOut()} className="item">Sign Out</a> : null } 
            </div>

        </div>
    )
}

export default Navbar