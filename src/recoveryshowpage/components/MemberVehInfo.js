import React from "react";
//need to figure out how to show the static info and that info needs to be updated.
const MemberVehInfo = (props) => {
    let { first_name, last_name, veh_info } = props.recordObj
  
    return (
        <div>
            This will be the container for the member and vehicle info.
        </div>
    )
}

export default MemberVehInfo;