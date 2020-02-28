import React from "react"

const PTPRecord = (props) => {
    console.log(props)
    let {acct_no, first_name, last_name, ptp_amt, ptp_date, created_at, comments, collected_amt } = props.recordObj
    let cuName = props.recordObj.creditunion.name

    return (
        <tr>
            <td>{acct_no}</td>
            <td>{cuName}</td>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>${ptp_amt.toFixed(2)}</td>
            <td>{ptp_date}</td>
            <td><a className="ui button">Edit</a></td>
        </tr>
    )
}

export default PTPRecord