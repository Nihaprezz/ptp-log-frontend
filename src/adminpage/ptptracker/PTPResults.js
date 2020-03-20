import React from "react";
import PTPRecord from "./AdminPTPRecord"

const PTPResults = (props) => {
    console.log(props.ptpData)

    let ptpRecords;
    if(!props.ptpData.message){
        ptpRecords = props.ptpData.map(data => {
            return < PTPRecord key={data.id} data={data}/>
        })
    }

    return (
        <div className="cu-table-container">
            <br></br>
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Credt Union</th>
                        <th>Account No</th>
                        <th>Member Name</th>
                        <th>PTP Amt</th>
                        <th>PTP Date</th>
                        <th>Collected Amt</th>
                        <th>Followed Up</th>
                        <th>PTP Created On</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {props.ptpData.message ? <tr><td>{props.ptpData.message}</td></tr> : ptpRecords}
                </tbody>
            </table>
        </div>
    )
}

export default PTPResults;