import React from "react"
import { Link } from "react-router-dom"
import { decipherSSN } from "../utils/index"

const AdminSkipRecord = (props) => {
    let { id, acct_no, first_name, last_name, data_created, ssn } = props.skipObj
    let cuName = props.skipObj.creditunion.name
    let user = props.skipObj.user.username



    return (
        <tr>
            <td>{user}</td>
            <td>{cuName}</td>
            <td>{acct_no}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{decipherSSN(ssn)}</td>
            <td>{data_created}</td>
            <td>
                <button onClick={() => props.updateResults(id)} className="ui button">Update</button>
            </td>
        </tr>
    )   
}

export default AdminSkipRecord