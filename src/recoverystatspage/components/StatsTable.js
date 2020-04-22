import React from "react";
import StatsRecord from "./StatsRecord"

const StatsTable = (props) => {

    return (
        <div style={{marginBottom: '2%'}}>
            <div style={{width: '98%', margin: 'auto', textAlign: 'left', paddingBottom: '1%'}}>
                    <h3 className="ui dividing header">Repossession Stats Per CU: </h3>
            </div>

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
                <tbody>
                    {props.cuStats.length === 0 ? <tr><td>Loading...</td></tr> : (
                        props.cuStats.map((cu, index) => {
                            return < StatsRecord key={index} cuObj={cu}/>
                        })
                    )}
                </tbody>
            </table>
        </div>

    )
}

export default StatsTable