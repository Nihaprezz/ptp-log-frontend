import React from "react";
import ResultsPTPRecord from "./ResultsPTPRecord"

const PTPRecordsContainer = (props) => {

    return (
        <div className="ui segment">
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th className="addpointer" onClick={() => props.handleSortBy('user')}>User</th>
                        <th className="addpointer" onClick={() => props.handleSortBy('cu')}>CU Name</th>
                        <th>Account No</th>
                        <th>Member Name</th>
                        <th className="addpointer" onClick={() => props.handleSortBy('date')}>PTP Date</th>
                        <th>PTP Amt</th>
                        <th>Collected Amt</th>
                        <th>Created On</th>
                        <th>
                            <label className="select-all">Select All</label>
                            <input onChange={(e) => props.handleSelectAll(e)}
                            className="select-all-chbox" type="checkbox"></input>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.ptpData.message ? <tr><td>{props.ptpData.message}</td></tr> : (
                        props.ptpData.map(record => {
                            return < ResultsPTPRecord key={record.id} ptpObj={record} selectedAll={props.selectedAll} handleCheckbox={props.handleCheckbox}/>
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PTPRecordsContainer