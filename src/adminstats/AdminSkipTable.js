import React from "react"
import SkipStatRecord from "./SkipStatRecord"

const AdminSkipTable = (props) => {
    return (
        <table className="ui celled table stats-table">
        <thead>
            <tr>
                <th>Credit Union</th>
                <th>Total Skips Sent</th>
                <th>Total Skips Closed/Worked</th>
                <th>Total Skips Found</th>
                <th>Percentage of Skips Found</th>
            </tr>
        </thead>
        <tbody>
            {props.skipStats.length === 0 ? <tr><td>Loading...</td></tr> : (
                props.skipStats.map(data => {
                    return < SkipStatRecord key={data.cuname} dataObj={data} />
                })
            )}
        </tbody>
    </table>
    )
}

export default AdminSkipTable