import React from "react";

const UserRecord = (props) => {
    let {username, isadmin} = props.userObj  

    return (
        // <div className="user-record-container ui card">
        //     <p>{props.userObj.username}</p>
        //     <button className="ui button" onClick={() => props.changeToEdit(props.userObj)}>Edit</button> 
        // </div>
        <tr>
            <td>{username}</td>
            {isadmin ? <td>Yes</td> : <td>No</td>}
            <td>
                <button className="ui button" onClick={() => props.changeToEdit(props.userObj)}>Edit</button>  
            </td>
            <td>
                <button className="ui red button" onClick={() => props.deleteUser(props.userObj)}>Delete</button>
            </td>
        </tr>
    )
}

export default UserRecord;