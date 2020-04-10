import React from "react";
import StatsRecord from "./StatsRecord";

const CUCStatsTable = (props) => {
    return (
        <div style={{marginBottom: '2%'}}>
            <div style={{width: '98%', margin: 'auto', textAlign: 'left', paddingBottom: '1%'}}>
                    <h3 className="ui dividing header">CUC Overall Stats: </h3>
            </div>

            <table style={{width: '98%', margin: 'auto'}} className="ui celled table">
                <thead>
                    <tr>
                        <th>Total Vehicles Placed Out</th>
                        <th>Total Vehicles Repossessed</th>
                        <th>Total Vehicles Sold</th>
                        <th>Percentage of Vehicles Repo'd</th>
                        <th>Percentage of Vehicles Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {props.cucStats.length === 0 ? (
                        <tr><td>Loading...</td></tr>
                    ) : (
                        < StatsRecord cuObj={props.cucStats}/>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CUCStatsTable