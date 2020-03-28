import React from "react";
import OutRecord from "./OutRecords"

const OutRecordsTable = (props) => {
    let records;
    if(props.activeRepos.message){
        records = <tr><td>{props.activeRepos.message}</td></tr>
    } else {
        records = props.activeRepos.map(record => {
            return < OutRecord key={record.id} repoObj={record} />
        })
    }

    let holdrecords; 
    if(props.activeHolds.message){
        holdrecords = <tr><td>{props.activeHolds.message}</td></tr>
    } else {
        holdrecords = props.activeHolds.map(record => {
            return < OutRecord key={record.id} repoObj={record} />
        })
    }

    return (
        <div className="out-for-repo-table">
            <div className="ui tabular menu">
                <a className={props.showHold ? 'item' : 'item active'} onClick={() => props.toggleActiveRepos(false)}>
                    Active
                </a>

                <a className={props.showHold ? 'item active' : 'item'} onClick={() => props.toggleActiveRepos(true)}>
                    On Hold
                </a>
            </div>

            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Acct No</th>
                        <th>Credit Union</th>
                        <th>Member Name</th>
                        <th>Vehicle Info</th>
                        <th>Vin</th>
                        <th>Placed Out On</th>
                        <th>Days</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {props.showHold ? holdrecords : records}
                </tbody>
            </table>
        </div>
    )
}

export default OutRecordsTable;