import React from "react";
import ResultsPTPRecord from "./ResultsPTPRecord"

const PTPRecordsContainer = (props) => {
    console.log(props)
    return (
        <div className="ui segment">
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>CU Name</th>
                        <th>Account No</th>
                        <th>Member Name</th>
                        <th>PTP Date</th>
                        <th>Created On</th>
                        <th>
                            <label className="select-all">Select All</label>
                            <input className="select-all-chbox" type="checkbox"></input>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.ptpData.message ? <tr><td>{props.ptpData.message}</td></tr> : (
                        props.ptpData.map(record => {
                            return < ResultsPTPRecord key={record.id} ptpObj={record}/>
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PTPRecordsContainer