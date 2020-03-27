import React from "react";
import { daysInBetween } from "../utils/index"

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
            <td>{daysInBetween(created_on)}</td>
            <td>
                <button className="ui button"> Edit </button>
            </td>
        </tr>
    )
}

export default OutRecord;