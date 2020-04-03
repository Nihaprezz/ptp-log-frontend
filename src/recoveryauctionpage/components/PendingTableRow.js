import React from "react";

const backend_url = process.env.REACT_APP_BACKEND;

const PendingTableRow = (props) => {
    let { id, acct_no, first_name, last_name, veh_info, veh_vin } = props.repoObj
    let { auction_name, transport_date } = props.repoObj.auction_record
    let cuName = props.repoObj.creditunion.name
    
    function updatePending(id){
        console.log('attempting to update the record', id)
    }

    return (
        <tr>
            <td>{acct_no}</td>
            <td>{cuName}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{veh_info}</td>
            <td>{veh_vin}</td>
            <td>{transport_date}</td>
            <td>{auction_name}</td>
            {props.isadmin ? (
                <td>
                    <button className="ui button" onClick={() => updatePending(id)}>Arrived</button>
                </td>
            ): null}
        </tr>
    )
}

export default PendingTableRow