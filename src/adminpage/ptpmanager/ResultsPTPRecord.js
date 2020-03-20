import React from "react"

const ResultsPTPRecord = (props) => {
    console.log(props)
    let {id, first_name, last_name, acct_no, ptp_date, date_created, ptp_amt, collected_amt } = props.ptpObj;
    let cuName, userName;

    props.ptpObj.user ? userName = props.ptpObj.user.username : userName = 'User Deleted'
    props.ptpObj.creditunion ? cuName = props.ptpObj.creditunion.name : cuName = "CU Deleted"

    return (
        <tr>
            <td>{userName}</td>
            <td>{cuName}</td>
            <td>{acct_no}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{ptp_date}</td>
            <td>$ {ptp_amt.toFixed(2)}</td>
            <td>$ {collected_amt.toFixed(2)}</td>
            <td>{date_created}</td>
            <td>
                <input onChange={(e) => props.handleCheckbox(e, id)}
                type="checkbox" ></input>
            </td>
        </tr>
    )
}

export default ResultsPTPRecord;