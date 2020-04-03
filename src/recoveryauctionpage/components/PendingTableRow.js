import React from "react";

const PendingTableRow = (props) => {
    let { acct_no, first_name, last_name, veh_info, veh_vin } = props.repoObj
    let { auction_name, transport_date } = props.repoObj.auction_record
    let cuName = props.repoObj.creditunion.name
    

    return (
        <tr>
            <td>{acct_no}</td>
            <td>{cuName}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{veh_info}</td>
            <td>{veh_vin}</td>
            <td>{transport_date}</td>
            <td>{auction_name}</td>
        </tr>
    )
}

export default PendingTableRow