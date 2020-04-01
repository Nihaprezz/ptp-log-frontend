import React from "react";
import { daysInBetween } from "../../utils/index"

const RepodRecord = (props) => {
    let { acct_no, first_name, last_name, veh_info, veh_vin, repo_company, repod_on } = props.repoObj;
    let cuName;
    props.repoObj.creditunion ? cuName = props.repoObj.creditunion.name : cuName = 'Credit Union Deleted'

    return (
        <tr>
            <td>{acct_no}</td>
            <td>{cuName}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{veh_info}</td>
            <td>{veh_vin}</td>
            <td>{repo_company}</td>
            <td>{repod_on}</td>
            <td>{daysInBetween(repod_on)}</td>
            {props.isadmin ? (
                <td>
                    <button className="ui button">Update</button>
                </td>
            ): null}
        </tr>
    )
}

export default RepodRecord