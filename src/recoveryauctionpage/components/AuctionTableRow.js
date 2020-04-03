import React from "react";

const AuctionTableRow = (props) => {

    let { acct_no, first_name, last_name, veh_info, veh_vin } = props.auctionObj;
    let { auction_name, floor, sale_date } = props.auctionObj.auction_record;
    let { name } = props.auctionObj.creditunion;

    return (
        <tr>
            <td>{acct_no}</td>
            <td>{name}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{veh_info}</td>
            <td>{veh_vin}</td>
            <td>{auction_name}</td>
            <td>{floor ? floor : '$0'}</td>
            <td>{sale_date ? sale_date : 'TBD'}</td>
            <td>
                <button className="ui button">Update</button>
            </td>

        </tr>
    )
}

export default AuctionTableRow;