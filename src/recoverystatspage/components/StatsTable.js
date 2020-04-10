import React from "react";
import StatsRecord from "./StatsRecord"

const StatsTable = (props) => {
    return (
        <div>
            <table style={{width: '98%', margin: 'auto'}} className="ui celled table">
                <thead>
                    <tr>
                        <th>Credit Union</th>
                        <th>Total Vehicles Placed Out</th>
                        <th>Total Vehicles Repossessed</th>
                        <th>Total Vehicles Sold</th>
                        <th>Percentage of Vehicles Repo'd</th>
                        <th>Percentage of Vehicles Sold</th>
                    </tr>
                </thead>
            </table>
            <StatsRecord />
        </div>

    )
}

export default StatsTable