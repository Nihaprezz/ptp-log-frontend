import React from "react"
import StatsRecord from "../regularstats/StatsRecord"  //Re-using component from regular stats

const PTPAdminTable = (props) => {
    return (
        <table className="ui celled table stats-table">
        <thead>
            <tr>
                <th>Credit Union</th>
                <th>Total PTP's Taken</th>
                <th>Total Broken PTPs</th>
                <th>Total Amount Promised</th>
                <th>Total Amount Collected</th>
                <th>Percentage of $ Collected</th> 
                <th>Percentage of Promises Broken</th>
            </tr>
        </thead>
        <tbody>
            {props.monthStats.length === 0 ? <tr><td>Loading...</td></tr> : (
                props.monthStats.map(data => {
                    return < StatsRecord key={data.cuname} dataObj={data} />
                })
            )}
        </tbody>
    </table>
    )
}

export default PTPAdminTable;

