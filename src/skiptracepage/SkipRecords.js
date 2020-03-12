import React from "react"
import { Link } from "react-router-dom"

const SkipRecords = (props) => {
    let { id, acct_no, first_name, last_name, data_created, results } = props.skipObj
    let cuName = props.skipObj.creditunion.name

    return (
        <tr>
            <td>{acct_no}</td>
            <td>{cuName}</td>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{data_created}</td>
            {results =! "pending" ? (
                <Link className="ui primary button" to={`/skip/${id}`}> View Results </Link>
            ): null}
        </tr>
    )   
}

export default SkipRecords