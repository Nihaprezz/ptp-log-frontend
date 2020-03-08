import React from "react"

const ResultsPTPRecord = (props) => {
    let {id, first_name, last_name, acct_no, ptp_date, date_created } = props.ptpObj;
    let cuName = props.ptpObj.creditunion.name;
    let userName = props.ptpObj.user.username;

    return (
        <tr>
            <td>{userName}</td>
            <td>{cuName}</td>
            <td>{acct_no}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{ptp_date}</td>
            <td>{date_created}</td>
            <td>
                <input onChange={(e) => props.handleCheckbox(e, id)}
                type="checkbox" ></input>
            </td>
        </tr>
    )
}

export default ResultsPTPRecord;