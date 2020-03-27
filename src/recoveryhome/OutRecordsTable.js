import React from "react";
import OutRecord from "./OutRecords"

const OutRecordsTable = (props) => {
    let records;
    records = props.activeRepos.map(record => {
        return < OutRecord key={record.id} repoObj={record} />
    })

    
    return (
        <div className="out-for-repo-table">
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
                    {records}
                </tbody>
            </table>
        </div>
    )
}

export default OutRecordsTable;