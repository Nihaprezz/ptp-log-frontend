import React from "react";

const OutRecordsTable = (props) => {
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
            </table>
        </div>
    )
}

export default OutRecordsTable;