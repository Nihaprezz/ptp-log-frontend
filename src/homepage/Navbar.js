import React from "react";

const Navbar = (props) => {
    return (
        <div>
            <button onClick={() => props.signOut()} className="ui red button">Sign Out</button>
        </div>
    )
}

export default Navbar