import React from "react";
import { Link } from "react-router-dom";


const SoldRecord = (props) => {
    let { id, acct_no, first_name, last_name, veh_info, veh_vin } = props.repoObj
    let { sale_location, sold_amt, cu_check_sent, deficiency_amt, deficiency_sent } = props.repoObj.sold_record
    let name;
    props.repoObj.creditunion ? name = props.repoObj.creditunion.name : name = "CU Deleted"
  
    return (
        <tr>
            <td>{acct_no}</td>
            <td>{name}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{veh_info}</td>
            <td>{veh_vin}</td>
            <td>{sale_location}</td>
            <td>${sold_amt.toLocaleString()}</td>
            <td>{cu_check_sent ? cu_check_sent : "No"}</td>
            <td>{deficiency_amt ? deficiency_amt : "$0"}</td>
            <td>{deficiency_sent ? deficiency_sent : "No"}</td>
            {props.isadmin ? (
                <td>
                    <Link to={`/sold_record/${id}`} className="ui button">Edit</Link>
                </td>
            ): null}  
        </tr>
    )
}

export default SoldRecord;