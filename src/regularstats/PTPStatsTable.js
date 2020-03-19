import React from "react";
import StatsRecord from "./StatsRecord"

const PTPStatsTable = (props) => {
    return (
        <table className="ui celled table stats-table">
        <thead>
        <tr>
            <th>Credit Union</th>
            <th>Total PTP's Taken</th>
            <th>Total Closed PTPs</th>
            <th>Total Amount Promise</th>
            <th>Total Amount Collected</th>
            <th>Percentage of Amount Collected</th>
        </tr>
        </thead>
        <tbody>
            {props.userStats.length === 0 ? <tr><td>Loading...</td></tr> : (
                props.userStats.map(data => {
                    return < StatsRecord key={data.cuname} dataObj={data} />
                })
            )}
        </tbody>
    </table>
    )
}

export default PTPStatsTable