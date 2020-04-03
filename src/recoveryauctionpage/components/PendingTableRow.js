import React from "react";
import Swal from "sweetalert2"

const backend_url = process.env.REACT_APP_BACKEND;

const PendingTableRow = (props) => {
    let { acct_no, first_name, last_name, veh_info, veh_vin } = props.repoObj
    let { id, auction_name, transport_date } = props.repoObj.auction_record
    let cuName = props.repoObj.creditunion.name
    
    function updatePending(id){
        Swal.showLoading()
        fetch(backend_url + `/auction_records/update_transit/${id}`, {
            method: 'PATCH', 
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }, 
            body: JSON.stringify({
                in_transit: false
            })
        })
        .then(resp => resp.json())
        .then(updatedRecord => {
            Swal.close()
            if (updatedRecord.id){
                Swal.fire('Updated', 'Vehicle has been transported.', 'success')
                props.update(updatedRecord)
            } else {
                Swal.fire('Error', 'Unable to update record.', 'error')
            }
        })
        .catch(err => alert(err))
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