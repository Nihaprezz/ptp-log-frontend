import React from "react";
import Swal from "sweetalert2"
import { Link } from "react-router-dom"

const FollowUpRows = (props) => {
    let { id, acct_no, first_name, last_name, veh_info, veh_vin, follow_up_date, repo_company, comments} = props.repoObj;
    let cuName; 
    props.repoObj.creditunion ? cuName = props.repoObj.creditunion.name : cuName = 'CU Deleted'

    const shortenComment = (comment) => {
        if(comment.length > 20){
            return comment.substring(0, 20) + "..."
        } else {
            return comment
        }
    }

    const showFullCommt = () => {
        Swal.fire(`${comments.trim()}`)
    }

    return (
        <tr>
            <td>{acct_no}</td>
            <td>{cuName}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{veh_info}</td>
            <td>{veh_vin}</td>
            <td>{follow_up_date}</td>
            <td>{repo_company}</td>
            <td onClick={() => showFullCommt()} style={{cursor: 'pointer'}}>{shortenComment(comments)}</td>
            <td>
            {/* to={{pathname: `/auction`, state: {showAuction: true}}} */}
            {/* to={`repo_record/${id}`} */}
                <Link className="ui button" to={{pathname: `/repo_record/${id}`, state: 'follow_ups'}}>Edit</Link>
            </td>
        </tr>
    )
}

export default FollowUpRows;