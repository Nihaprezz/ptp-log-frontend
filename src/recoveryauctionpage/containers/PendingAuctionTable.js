import React from "react"
import PendingTableRow from "../components/PendingTableRow"

const PendingAuctionTable = (props) => {
  
    let tableRows;
    if(props.repoRecords.error){
        tableRows = <tr><td>No Auction Records Found</td></tr>
    } else {
        tableRows = props.repoRecords.map(repo => {
            return < PendingTableRow key={repo.id} repoObj={repo} isadmin={props.userAdmin} update={props.update}/>
        })
    }

    return (
        <div style={{width: "98%", margin: "auto", paddingTop: '1vh'}}>
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Acct No</th>
                        <th>Credit Union</th>
                        <th>Member Name</th>
                        <th>Vehicle</th>
                        <th>Vin</th>
                        <th>Transport Set On</th>
                        <th>Auction</th>
                        {props.userAdmin ? (
                            <th></th>
                        ): null}
                    </tr>
                </thead>
                <tbody>
                    {props.repoRecords.length === 0 ? <tr><td>Loading...</td></tr> : (
                        tableRows
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PendingAuctionTable