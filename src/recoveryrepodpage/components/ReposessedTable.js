import React from "react";
import RepoRecord from "./RepodRecord";

const RepossessedTable = (props) => {
    let records; 
    if(props.repoRecords.message){
        records = <tr><td>No Vehicles Repossessed</td></tr>
    } else {
        records = props.repoRecords.map(record => {
            return < RepoRecord key={record.id} repoObj={record} isadmin={props.isadmin} update={props.update}/>
        })
    }

    return (
        <div style={{width: "98%", margin: "auto"}}>
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Account No</th>
                        <th>Credit Union</th>
                        <th>Member Name</th>
                        <th>Vehicle</th>
                        <th>Vin</th>
                        <th>Repo Company</th>
                        <th>Repod On</th>
                        <th>Days Stored</th>

                        {props.isadmin ? (
                            <th>Update</th>
                        ) : null}
                    </tr>
                </thead>
                <tbody>
                    {props.repoRecords.length !== 0 ? (
                        records
                    ) : <tr><td>Loading...</td></tr>}
                </tbody>
            </table>
        </div>
    )
}

export default RepossessedTable;