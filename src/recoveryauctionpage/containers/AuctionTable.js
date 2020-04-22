import React from "react";
import AuctionTableRow from "../components/AuctionTableRow"

const AuctionTable = (props) => {

    let auctionRecords;
    if(props.auctionRecords.error){
        auctionRecords = <tr><td>No Auction Records Found</td></tr>
    } else {
        auctionRecords = props.auctionRecords.map(record => {
            return < AuctionTableRow key={record.id} auctionObj={record} isadmin={props.userAdmin} />
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
                        <th>Auction</th>
                        <th>Floor</th>
                        <th>Sale Date</th>
                        {props.userAdmin ? (
                            <th></th>
                        ): null}
                    </tr>
                </thead>
                <tbody>
                    {props.auctionRecords.length === 0 ? <tr><td>Loading..</td></tr> : (
                        auctionRecords
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AuctionTable