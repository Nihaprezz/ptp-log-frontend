import React from "react";

const UserRecord = (props) => {
    
    return (
        <div className="user-record-container ui card">
            <p>{props.userObj.username}</p>
            <button className="ui button" onClick={() => props.changeToEdit(props.userObj)}>Edit</button> 
        </div>
    )
}

export default UserRecord;