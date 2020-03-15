import React from "react";

const SkipReassignForm = (props) => {
    return (
            <div >
            <h3>Re-assign Skip Records</h3>
            <div className="ui horizontal divider">OR</div>
            <h3>Delete Skip Records</h3>
            <p>0 Selected Records</p>
            <button className="ui red button" >Delete PTP's</button>
        </div>  
    )
}

export default SkipReassignForm