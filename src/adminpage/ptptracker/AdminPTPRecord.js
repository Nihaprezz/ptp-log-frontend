import React from "react";
import Swal from "sweetalert2";

const AdminPTPRecord = (props) => {
    let {acct_no, first_name, last_name, ptp_amt, ptp_date, collected_amt, followed_up, date_created, comments} = props.data
    let creditunion; 
    props.data.creditunion.name ? creditunion = props.data.creditunion.name : creditunion = 'CU Deleted'

    function showCommentBox(comments){
        Swal.fire(`${comments}`)
    }
    return (
        <tr>
            <td>{creditunion}</td>
            <td>{acct_no}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>${ptp_amt.toFixed(2)}</td>
            <td>{ptp_date}</td>
            <td>${collected_amt.toFixed(2)}</td>
            <td>{followed_up > 0 ? "Yes" : "No"}</td>
            <td>{date_created}</td>
            <td onClick={() => showCommentBox(comments)}>{comments.substr(0,10) + "..."}</td>
        </tr>
    )
}

export default AdminPTPRecord