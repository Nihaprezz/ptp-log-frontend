import React from "react";

const ClosedRepoRow = (props) => {

    let { id, acct_no, first_name, last_name, veh_info, veh_vin, repo_company, closed_reason} = props.repoObj
    let { name } = props.repoObj.creditunion
    
    return (
        <tr>
            <td>{acct_no}</td>
            <td>{name}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{veh_info}</td>
            <td>{veh_vin}</td>
            <td>{repo_company}</td>
            <td>{closed_reason}</td>
            {props.isadmin ? (
                <td>
                    <button onClick={() => props.archiveRepo(id)}
                    className="ui button">Archive</button>
                </td>
            ): null}
        </tr>
    )
}

export default ClosedRepoRow