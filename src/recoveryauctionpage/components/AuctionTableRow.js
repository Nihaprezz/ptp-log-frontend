import React from "react";
import { Link } from "react-router-dom";

const AuctionTableRow = (props) => {

    let { id, acct_no, first_name, last_name, veh_info, veh_vin } = props.auctionObj;
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
            <td>{floor ? '$' + floor.toLocaleString() : '$0'}</td>
            <td>{sale_date ? sale_date : 'TBD'}</td>
            {props.isadmin ? (
                <td>
                    <Link className="ui button" to={`/auction_record/${id}`}>Update</Link>
                </td>
            ): null}
        </tr>
    )
}

export default AuctionTableRow;