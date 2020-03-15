import React from "react"
import { Link } from "react-router-dom";

const PTPRecord = (props) => {
    
    let {id, acct_no, first_name, last_name, ptp_amt, ptp_date } = props.recordObj
    let cuName = props.recordObj.creditunion.name


    return (
        <tr>
            <td>{acct_no}</td>
            <td>{cuName}</td>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>${ptp_amt.toFixed(2)}</td>
            <td>{ptp_date}</td>
            <td><Link className="ui button" to={{pathname: `/promisetopay/${id}`, state: `${props.ptpType}`}}>
                Edit
            </Link></td>
        </tr>
    )
}

export default PTPRecord