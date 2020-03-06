import React from "react";

const PTPRecordsContainer = (props) => {
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
            </table>
        </div>
    )
}

export default PTPRecordsContainer