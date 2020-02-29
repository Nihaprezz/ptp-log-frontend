import React from "react";


 
const UserRecord = (props) => {
    console.log(props.userObj.isadmin)
    
    return (
        <div className="user-record-container">
            <p>{props.userObj.username}</p>
            <div className="user-record-btns">  
             <button className="ui button">Edit</button> 
             {props.userObj.isadmin ? <p>Admin</p> : null}
            </div>
            
        </div>
    )
}

export default UserRecord;