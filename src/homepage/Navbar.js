import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    return (
        <div>
            <button onClick={() => props.signOut()} className="ui red button">Sign Out</button>
            { props.user.isadmin ? < Link to="/credit_unions" className="ui button">Add Credit Union</Link>: null}
        </div>
    )
}

export default Navbar