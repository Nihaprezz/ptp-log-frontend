import React from "react"

const AdvResultsRow = (props) => {

    let {id, acct_no, archive_record, created_on, first_name, last_name, repod, repod_on, veh_info, veh_vin} = props.repoObj

    let cuName; 
    props.repoObj.creditunion ? cuName = props.repoObj.creditunion.name : cuName = 'CU Deleted'

    return (
        <tr>
            <td>{acct_no}</td>
            <td>{cuName}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{veh_info}</td>
            <td>{veh_vin}</td>
            <td>{created_on}</td>
            <td>{repod ? repod_on : 'No'}</td>
            <td>{archive_record ? 'Yes' : 'No'}</td>
            <td>
                <input id="adv-results-row-chkbx" type="checkbox" onClick={(e) => props.selectRecord(e, id)}/>
            </td>
        </tr>
    )
}

export default AdvResultsRow;