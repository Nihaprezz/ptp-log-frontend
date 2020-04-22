import React from "react";
import SoldRecord from "./SoldRecord"

const SoldTable = (props) => {
    let soldRows; 
    if(props.soldRecords.message){
        soldRows = <tr><td>No Sold Vehicles</td></tr>
    } else {
        soldRows = props.soldRecords.map(record => {
            return <SoldRecord key={record.id} repoObj={record} isadmin={props.isadmin}/>
        })
    }

    return (
        <div style={{width: "98%", margin: "auto", paddingTop: "1%"}}>
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Acct No</th>
                        <th>Credit Union</th>
                        <th>Member Name</th>
                        <th>Vehicle</th>
                        <th>Vin</th>
                        <th>Sold Location</th>
                        <th>Sold Amt</th>
                        <th>CU Check Sent</th>
                        <th>Deficiency Amt</th>
                        <th>Deficieny Sent</th>
                        {props.isadmin ? <th></th> : null}
                    </tr>
                </thead>
                <tbody>
                    {props.soldRecords.length === 0 ? <tr><td>Loading...</td></tr> : (
                        soldRows
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default SoldTable;