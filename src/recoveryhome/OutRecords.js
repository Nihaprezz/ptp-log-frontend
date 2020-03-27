import React from "react";

//need to figure out how to show how many dates its been out by subtracting the day it was placed out with todays date

const OutRecord = (props) => {
    let {acct_no, first_name, last_name, veh_info, veh_vin, created_on } = props.repoObj
    let cuName, user;

    props.repoObj.creditunion.name ? cuName = props.repoObj.creditunion.name : cuName = "CU Deleted"
    props.repoObj.user.username ? user = props.repoObj.user.username : user = 'User Deleted'
 
    return (
        <tr>
            <td>{acct_no}</td>
            <td>{cuName}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{veh_info}</td>
            <td>{veh_vin}</td>
            <td>{created_on}</td>
        </tr>
    )
}

export default OutRecord;